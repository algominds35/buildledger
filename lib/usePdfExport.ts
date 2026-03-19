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
    // NOTE: Do NOT use position:fixed on the print root — browsers only print the first viewport
    // of fixed elements, so long tables get clipped. Use normal document flow instead.
    style.textContent = `
      @media print {
        @page { size: landscape; margin: 0.5in; }
        html, body {
          height: auto !important;
          min-height: 0 !important;
          overflow: visible !important;
          background: white !important;
        }
        body * { visibility: hidden !important; }
        #${elementId}, #${elementId} * { visibility: visible !important; }
        #${elementId} {
          position: static !important;
          display: block !important;
          width: 100% !important;
          max-width: 100% !important;
          height: auto !important;
          min-height: 0 !important;
          overflow: visible !important;
          page-break-inside: auto !important;
          -webkit-print-color-adjust: exact !important;
          print-color-adjust: exact !important;
        }
        /* Unwrap horizontal scrollers so full table width prints across pages */
        #${elementId} .overflow-x-auto,
        #${elementId} .overflow-hidden {
          overflow: visible !important;
          max-height: none !important;
        }
        #${elementId} table {
          width: 100% !important;
          max-width: 100% !important;
          font-size: 10px !important;
        }
        #${elementId} thead {
          display: table-header-group !important;
        }
        #${elementId} th,
        #${elementId} td {
          position: static !important;
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
