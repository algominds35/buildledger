'use client'

import { useCallback, useState } from 'react'

export function usePdfExport() {
  const [exporting, setExporting] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const exportPdf = useCallback(async (elementId: string, filename: string) => {
    setExporting(true)
    setError(null)
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

      const canvas = await html2canvas(el, {
        scale: 2,
        useCORS: true,
        logging: false,
        backgroundColor: '#f8fafc',
        windowWidth: el.scrollWidth,
        windowHeight: el.scrollHeight,
      })

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
