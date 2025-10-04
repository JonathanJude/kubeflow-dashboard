import { useState, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  Download,
  ChevronDown,
  FileText,
  FileSpreadsheet,
  Database,
  FileImage,
  Calendar,
  CheckCircle,
  AlertCircle,
  Loader
} from 'lucide-react'
import { cn } from '@/lib/utils'
import { exportMetrics, type ExportFormat, type MetricCategory, type ExportOptions } from '@/lib/exportService'
import { validateExportData, createProgressTracker, type ProgressCallback } from '@/lib/exportUtils'

interface ExportButtonProps {
  data: any
  category: MetricCategory
  className?: string
  variant?: 'primary' | 'secondary' | 'ghost'
  size?: 'sm' | 'md' | 'lg'
  onExportStart?: () => void
  onExportComplete?: (filename: string) => void
  onExportError?: (error: string) => void
}

const exportIcons = {
  csv: FileSpreadsheet,
  json: Database,
  pdf: FileImage,
  excel: FileSpreadsheet
}

const exportLabels = {
  csv: 'Export as CSV',
  json: 'Export as JSON',
  pdf: 'Export as PDF',
  excel: 'Export as Excel'
}

export function ExportButton({
  data,
  category,
  className,
  variant = 'primary',
  size = 'md',
  onExportStart,
  onExportComplete,
  onExportError
}: ExportButtonProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [isExporting, setIsExporting] = useState(false)
  const [selectedFormat, setSelectedFormat] = useState<ExportFormat | null>(null)
  const [exportProgress, setExportProgress] = useState<string | null>(null)
  const [exportError, setExportError] = useState<string | null>(null)
  const dropdownRef = useRef<HTMLDivElement>(null)

  const handleExport = async (format: ExportFormat) => {
    try {
      setIsExporting(true)
      setSelectedFormat(format)
      setExportError(null)
      setExportProgress('Preparing export...')

      // Validate data
      const validation = validateExportData(data, category)
      if (!validation.isValid) {
        throw new Error(`Validation failed: ${validation.errors.join(', ')}`)
      }

      if (validation.warnings.length > 0) {
        console.warn('Export warnings:', validation.warnings)
      }

      onExportStart?.()

      // Create progress tracker
      const progressTracker = createProgressTracker((progress) => {
        setExportProgress(progress.message || progress.stage)
      }, [
        'Preparing data',
        'Formatting content',
        'Generating file',
        'Creating download',
        'Finalizing'
      ])

      progressTracker.nextStage('Preparing data...')

      // Configure export options
      const options: ExportOptions = {
        format,
        category,
        includeCharts: true,
        filename: `${category}-metrics-${new Date().toISOString().split('T')[0]}`
      }

      progressTracker.nextStage('Formatting content...')
      await new Promise(resolve => setTimeout(resolve, 500)) // Simulate processing

      progressTracker.nextStage('Generating file...')
      await exportMetrics(data, options)

      progressTracker.nextStage('Creating download...')
      await new Promise(resolve => setTimeout(resolve, 300)) // Simulate processing

      progressTracker.complete(`Successfully exported as ${format.toUpperCase()}`)

      setTimeout(() => {
        onExportComplete?.(options.filename || '')
        setIsExporting(false)
        setSelectedFormat(null)
        setExportProgress(null)
        setIsOpen(false)
      }, 1000)

    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Export failed'
      setExportError(errorMessage)
      onExportError?.(errorMessage)
      setIsExporting(false)
      setSelectedFormat(null)
      setExportProgress(null)
    }
  }

  const getVariantStyles = () => {
    switch (variant) {
      case 'secondary':
        return 'bg-gray-100 hover:bg-gray-200 text-gray-700 border-gray-300'
      case 'ghost':
        return 'bg-transparent hover:bg-gray-100 text-gray-600 border-gray-200'
      default:
        return 'bg-blue-600 hover:bg-blue-700 text-white border-blue-600'
    }
  }

  const getSizeStyles = () => {
    switch (size) {
      case 'sm':
        return 'px-3 py-1.5 text-sm sm:px-2 sm:py-1 xs:px-1.5'
      case 'lg':
        return 'px-6 py-3 text-base sm:px-4 sm:py-2'
      default:
        return 'px-4 py-2 text-sm sm:px-3 sm:py-1.5'
    }
  }

  return (
    <div className="relative z-50" ref={dropdownRef}>
      {/* Main Button */}
      <motion.button
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        onClick={() => !isExporting && setIsOpen(!isOpen)}
        disabled={isExporting}
        className={cn(
          'inline-flex items-center justify-between rounded-lg border font-medium transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2',
          getVariantStyles(),
          getSizeStyles(),
          isExporting && 'opacity-50 cursor-not-allowed',
          className
        )}
      >
        <div className="flex items-center">
          {isExporting ? (
            <Loader className="w-4 h-4 mr-2 animate-spin" />
          ) : (
            <Download className="w-4 h-4 mr-2" />
          )}
          {isExporting
            ? (exportProgress || 'Exporting...')
            : 'Export'
          }
        </div>
        {!isExporting && (
          <ChevronDown className="w-4 h-4 ml-2" />
        )}
      </motion.button>

      {/* Dropdown Menu */}
      <AnimatePresence>
        {isOpen && !isExporting && (
          <motion.div
            initial={{ opacity: 0, y: -10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="absolute right-0 mt-2 w-56 bg-white rounded-xl shadow-xl border border-gray-200 z-[9999] sm:w-48 xs:w-44 max-w-[calc(100vw-2rem)] xs:right-0 xs:left-auto xs:ml-0"
          >
            <div className="p-2">
              <div className="px-3 py-2 text-xs font-medium text-gray-500 uppercase tracking-wider">
                Export Format
              </div>

              {(['csv', 'json', 'pdf', 'excel'] as ExportFormat[]).map((format) => {
                const Icon = exportIcons[format]
                return (
                  <motion.button
                    key={format}
                    whileHover={{ backgroundColor: '#f9fafb' }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => handleExport(format)}
                    className="w-full flex items-center px-3 py-2 text-sm text-gray-700 hover:bg-gray-50 rounded-lg transition-colors duration-150"
                  >
                    <Icon className="w-4 h-4 mr-3 text-gray-400" />
                    <span className="flex-1 text-left">{exportLabels[format]}</span>
                    <span className="text-xs text-gray-400">
                      {format.toUpperCase()}
                    </span>
                  </motion.button>
                )
              })}
            </div>

            <div className="border-t border-gray-100 px-3 py-2">
              <div className="flex items-center text-xs text-gray-500">
                <Calendar className="w-3 h-3 mr-1" />
                Last 30 days of data
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Export Status Overlay */}
      <AnimatePresence>
        {isExporting && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="absolute right-0 mt-2 w-64 bg-white rounded-xl shadow-xl border border-gray-200 z-[9999] sm:w-56 xs:w-48 max-w-[calc(100vw-2rem)] xs:right-0 xs:left-auto"
          >
            <div className="p-4">
              <div className="flex items-center mb-3">
                {selectedFormat && (
                  <div className="flex items-center">
                    {(() => {
                      const Icon = exportIcons[selectedFormat]
                      return <Icon className="w-5 h-5 mr-2 text-blue-600" />
                    })()}
                    <span className="font-medium text-gray-900">
                      Exporting as {selectedFormat?.toUpperCase()}
                    </span>
                  </div>
                )}
              </div>

              {exportProgress && (
                <div className="mb-3">
                  <div className="flex items-center text-sm text-gray-600">
                    <Loader className="w-4 h-4 mr-2 animate-spin text-blue-600" />
                    {exportProgress}
                  </div>
                </div>
              )}

              {/* Progress Bar */}
              <div className="w-full bg-gray-200 rounded-full h-1.5">
                <motion.div
                  className="bg-blue-600 h-1.5 rounded-full"
                  initial={{ width: '0%' }}
                  animate={{ width: selectedFormat ? '100%' : '0%' }}
                  transition={{ duration: 2, ease: 'easeInOut' }}
                />
              </div>

              {exportError && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="mt-3 flex items-center text-sm text-red-600"
                >
                  <AlertCircle className="w-4 h-4 mr-2" />
                  {exportError}
                </motion.div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Success Notification */}
      <AnimatePresence>
        {exportProgress && exportProgress.includes('Successfully') && !isExporting && (
          <motion.div
            initial={{ opacity: 0, y: -10, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.9 }}
            className="absolute right-0 mt-2 w-64 bg-green-50 border border-green-200 rounded-xl shadow-lg z-[9999] sm:w-56 xs:w-48 max-w-[calc(100vw-2rem)] xs:right-0 xs:left-auto"
          >
            <div className="p-3 flex items-center">
              <CheckCircle className="w-5 h-5 mr-2 text-green-600" />
              <span className="text-sm font-medium text-green-800">
                {exportProgress}
              </span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Click outside to close */}
      {isOpen && !isExporting && (
        <div
          className="fixed inset-0 z-[9998]"
          onClick={() => setIsOpen(false)}
        />
      )}
    </div>
  )
}