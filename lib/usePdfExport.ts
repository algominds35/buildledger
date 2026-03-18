'use client'

import { useCallback, useState } from 'react'

// html2canvas cannot parse oklch/lab colors produced by Tailwind CSS v4.
// This patches all computed styles on the element tree to replace unsupported
// color values with a plain hex fallback before capture.
function patchOklchColors(root: HTMLElement): () => void {
  const patched: Array<{ el: HTMLElement; prop: string; old: string }> = []
  const unsupported = /oklch|oklab|lab\(|lch\(/i

  const walk = (el: HTMLElement) => {
    const cs = window.getComputedStyle(el)
    const props = [
      'color', 'backgroundColor', 'borderColor',
      'borderTopColor', 'borderRightColor', 'borderBottomColor', 'borderLeftColor',
      'outlineColor', 'textDecorationColor', 'fill', 'stroke',
    ]
    for (const prop of props) {
      const val = cs.getPropertyValue(prop)
      if (val && unsupported.test(val)) {
        const old = (el.style as Record<string, string>)[prop] ?? ''
        patched.push({ el, prop, old })
        // Use a safe neutral fallback; most of these are decorative
        const fallback =
          prop === 'backgroundColor' ? '#ffffff' :
          prop === 'color' ? '#1e293b' :
          '#cbd5e1'
          ; (el.style as Record<string, string>)[prop] = fallback
      }
    }
    for (const child of Array.from(el.children)) {
      if (child instanceof HTMLElement) walk(child)
    }
  }

  walk(root)

  return () => {
    for (const { el, prop, old } of patched) {
      (el.style as Record<string, string>)[prop] = old
    }
  }
}

export function usePdfExport() {
  const [exporting, setExporting] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const exportPdf = useCallback(async (elementId: string, filename: string) => {
    setExporting(true)
    setError(null)
    let restoreColors: (() => void) | null = null
    try {
      const el = document.getElementById(elementId)
      if (!el) {
        setError('Report area not found. Please refresh and try again.')
        return
      }

      // Ensure element is in view and layout is complete before capture
      el.scrollIntoView({ behavior: 'instant', block: 'start' })
      await new Promise((r) => requestAnimationFrame(() => requestAnimationFrame(r)))
      await new Promise((r) => setTimeout(r, 150))

      const html2canvas = (await import('html2canvas')).default
      const jspdfMod = await import('jspdf')
      const jsPDFCtor =
        (jspdfMod as { jsPDF?: typeof import('jspdf').jsPDF; default?: typeof import('jspdf').jsPDF }).jsPDF ??
        (jspdfMod as { default?: typeof import('jspdf').jsPDF }).default
      if (!jsPDFCtor) {
        setError('PDF library failed to load. Please refresh and try again.')
        return
      }

      // Temporarily expand element for full capture
      const prevOverflow = el.style.overflow
      el.style.overflow = 'visible'

      // Patch oklch/lab colors that html2canvas cannot parse (Tailwind v4)
      restoreColors = patchOklchColors(el)

      const canvas = await html2canvas(el, {
        scale: 2,
        useCORS: true,
        logging: false,
        backgroundColor: '#f8fafc',
        windowWidth: el.scrollWidth,
        windowHeight: el.scrollHeight,
      })

      restoreColors()
      restoreColors = null
      el.style.overflow = prevOverflow

      // Use JPEG to avoid jsPDF 2.4+ PNG addImage bugs (Acrobat "error on this page" / black background).
      const imgData = canvas.toDataURL('image/jpeg', 0.92)
      const pdf = new jsPDFCtor({ orientation: 'landscape', unit: 'mm', format: 'a4' })

      const pageW = pdf.internal.pageSize.getWidth()
      const pageH = pdf.internal.pageSize.getHeight()
      const imgW = canvas.width
      const imgH = canvas.height
      const ratio = Math.min(pageW / imgW, pageH / imgH)

      const scaledW = imgW * ratio
      const scaledH = imgH * ratio
      const margin = (pageH - scaledH) / 2

      let yOffset = margin
      let heightLeft = imgH * ratio
      const pageContentH = pageH

      pdf.addImage(imgData, 'JPEG', (pageW - scaledW) / 2, yOffset, scaledW, scaledH)
      heightLeft -= pageContentH - margin

      while (heightLeft > 0) {
        pdf.addPage()
        yOffset = margin - (scaledH - heightLeft)
        pdf.addImage(imgData, 'JPEG', (pageW - scaledW) / 2, yOffset, scaledW, scaledH)
        heightLeft -= pageContentH
      }

      pdf.save(filename)
    } catch (err) {
      if (restoreColors) { restoreColors(); restoreColors = null }
      const message = err instanceof Error ? err.message : 'PDF export failed'
      console.error('PDF export failed:', err)
      setError(`Could not generate PDF. ${message}. Try refreshing and try again.`)
    } finally {
      setExporting(false)
    }
  }, [])

  const clearError = useCallback(() => setError(null), [])

  return { exportPdf, exporting, error, clearError }
}
