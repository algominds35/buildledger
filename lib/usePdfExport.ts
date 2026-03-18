'use client'

import { useCallback, useState } from 'react'

export function usePdfExport() {
  const [exporting, setExporting] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const exportPdf = useCallback(async (elementId: string, _filename: string) => {
    setExporting(true)
    setError(null)
    try {
      const el = document.getElementById(elementId)
      if (!el) {
        setError('Report area not found. Please refresh and try again.')
        return
      }

      // Inject a temporary print stylesheet that shows only the report element
      const style = document.createElement('style')
      style.id = '__pdf-print-style__'
      style.textContent = `
        @media print {
          body > * { display: none !important; }
          #${elementId} { display: block !important; }
          #${elementId}, #${elementId} * { -webkit-print-color-adjust: exact !important; print-color-adjust: exact !important; }
          .print\\:hidden { display: none !important; }
        }
      `
      document.head.appendChild(style)

      // Give browser a frame to apply styles, then print
      await new Promise((r) => setTimeout(r, 80))
      window.print()

      // Clean up
      document.head.removeChild(style)
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
