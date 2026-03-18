'use client'

import { useCallback, useState } from 'react'

export function usePdfExport() {
  const [exporting, setExporting] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const exportPdf = useCallback(async (elementId: string, _filename: string) => {
    setExporting(true)
    setError(null)

    const el = document.getElementById(elementId)
    if (!el) {
      setError('Report area not found. Please refresh and try again.')
      setExporting(false)
      return
    }

    // Remove any previous print style
    const existing = document.getElementById('__pdf-print-style__')
    if (existing) existing.remove()

    // Inject print stylesheet — shows only the target element, hides everything else
    const style = document.createElement('style')
    style.id = '__pdf-print-style__'
    style.textContent = `
      @media print {
        body * { visibility: hidden !important; }
        #${elementId}, #${elementId} * { visibility: visible !important; }
        #${elementId} {
          position: fixed !important;
          top: 0 !important;
          left: 0 !important;
          width: 100% !important;
          -webkit-print-color-adjust: exact !important;
          print-color-adjust: exact !important;
        }
      }
    `
    document.head.appendChild(style)

    // Small delay so styles apply before print dialog opens
    setTimeout(() => {
      window.print()
      // Clean up after dialog closes
      setTimeout(() => {
        style.remove()
        setExporting(false)
      }, 500)
    }, 100)
  }, [])

  const clearError = useCallback(() => setError(null), [])

  return { exportPdf, exporting, error, clearError }
}
