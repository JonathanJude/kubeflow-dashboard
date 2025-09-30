import { useState } from 'react'
import { Calendar, ChevronDown } from 'lucide-react'
import { getDateRangeText } from '@/lib/utils'

interface DateRangeSelectorProps {
  selectedRange: number
  onRangeChange: (days: number) => void
}

export function DateRangeSelector({ selectedRange, onRangeChange }: DateRangeSelectorProps) {
  const [isOpen, setIsOpen] = useState(false)
  const ranges = [7, 30, 90]

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center space-x-2 bg-white/80 backdrop-blur-lg border border-white/20 rounded-xl px-4 py-2 text-sm font-medium text-gray-700 hover:bg-white/90 transition-colors duration-200"
      >
        <Calendar className="w-4 h-4" />
        <span>{getDateRangeText(selectedRange)}</span>
        <ChevronDown className={`w-4 h-4 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`} />
      </button>

      {isOpen && (
        <div className="absolute top-full mt-2 w-48 bg-white/95 backdrop-blur-lg border border-white/20 rounded-xl shadow-xl z-50 overflow-hidden">
          {ranges.map((range) => (
            <button
              key={range}
              onClick={() => {
                onRangeChange(range)
                setIsOpen(false)
              }}
              className={`w-full text-left px-4 py-2 text-sm hover:bg-gray-50 transition-colors duration-150 ${
                selectedRange === range ? 'bg-primary/10 text-primary font-medium' : 'text-gray-700'
              }`}
            >
              {getDateRangeText(range)}
            </button>
          ))}
        </div>
      )}
    </div>
  )
}