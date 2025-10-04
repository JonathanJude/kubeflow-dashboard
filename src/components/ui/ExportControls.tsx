import { useState } from 'react'
import { motion } from 'framer-motion'
import { Calendar, Filter, Settings, ChevronDown } from 'lucide-react'
import { ExportButton } from './ExportButton'
import { cn } from '@/lib/utils'
import type { MetricCategory } from '@/lib/exportService'

interface ExportControlsProps {
  data: any
  category: MetricCategory
  className?: string
  showDateRange?: boolean
  showAdvanced?: boolean
}

const dateRanges = [
  { label: 'Last 7 days', value: 7 },
  { label: 'Last 30 days', value: 30 },
  { label: 'Last 90 days', value: 90 },
  { label: 'Year to date', value: 365 },
  { label: 'All time', value: 0 }
]

export function ExportControls({
  data,
  category,
  className,
  showDateRange = true,
  showAdvanced = true
}: ExportControlsProps) {
  const [selectedRange, setSelectedRange] = useState(30)
  const [showOptions, setShowOptions] = useState(false)

  return (
    <div className={cn('flex items-center space-x-3 flex-wrap gap-2', className)}>
      {/* Date Range Selector */}
      {showDateRange && category !== 'all' && (
        <div className="relative z-50">
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => setShowOptions(!showOptions)}
            className="flex items-center px-3 py-2 text-sm bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors duration-150 sm:px-2 sm:py-1.5"
          >
            <Calendar className="w-4 h-4 mr-2 text-gray-500" />
            {dateRanges.find(range => range.value === selectedRange)?.label || 'Last 30 days'}
            <ChevronDown className="w-4 h-4 ml-2 text-gray-400" />
          </motion.button>

          {showOptions && (
            <motion.div
              initial={{ opacity: 0, y: -10, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -10, scale: 0.95 }}
              className="absolute left-0 mt-2 w-48 bg-white rounded-xl shadow-xl border border-gray-200 z-[9999] sm:w-44 max-w-[calc(100vw-2rem)] xs:right-0 xs:left-auto"
            >
              <div className="p-2">
                {dateRanges.map((range) => (
                  <motion.button
                    key={range.value}
                    whileHover={{ backgroundColor: '#f9fafb' }}
                    onClick={() => {
                      setSelectedRange(range.value)
                      setShowOptions(false)
                    }}
                    className={cn(
                      'w-full flex items-center px-3 py-2 text-sm rounded-lg transition-colors duration-150',
                      selectedRange === range.value
                        ? 'bg-blue-50 text-blue-700 font-medium'
                        : 'text-gray-700 hover:bg-gray-50'
                    )}
                  >
                    {range.label}
                  </motion.button>
                ))}
              </div>
            </motion.div>
          )}

          {showOptions && (
            <div
              className="fixed inset-0 z-[9998]"
              onClick={() => setShowOptions(false)}
            />
          )}
        </div>
      )}

      {/* Export Button */}
      <ExportButton
        data={data}
        category={category}
        onExportStart={() => console.log('Export started for', category)}
        onExportComplete={(filename) => console.log('Export completed:', filename)}
        onExportError={(error) => console.error('Export failed:', error)}
      />

      {/* Advanced Options */}
      {showAdvanced && (
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className="flex items-center px-3 py-2 text-sm bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors duration-150"
        >
          <Settings className="w-4 h-4 mr-2 text-gray-500" />
          Options
        </motion.button>
      )}
    </div>
  )
}