import { motion } from 'framer-motion'
import type { MetricCard } from '@/types/finance'
import { formatCompactCurrency, formatPercentage, getChangeColor, getMetricColor } from '@/lib/utils'
import { TrendingUp, TrendingDown } from 'lucide-react'

interface MetricCardProps {
  metric: MetricCard
  isExpanded?: boolean
  onClick?: () => void
}

export function MetricCardComponent({ metric, isExpanded, onClick }: MetricCardProps) {
  const formatValue = (value: number, format?: string) => {
    switch (format) {
      case 'currency':
        return formatCompactCurrency(value)
      case 'percentage':
        return formatPercentage(value)
      default:
        return value.toString()
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: Math.random() * 0.2 }}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.98 }}
      onClick={onClick}
      className="relative overflow-hidden"
    >
      <div className="bg-white/80 backdrop-blur-lg backdrop-filter backdrop-saturate-150 border border-white/20 rounded-2xl shadow-xl p-6 cursor-pointer transition-all duration-300 hover:shadow-2xl hover:bg-white/90">
        {/* Gradient Background */}
        <div className={`absolute top-0 right-0 w-32 h-32 ${getMetricColor(metric.color)} opacity-10 rounded-full blur-3xl`} />

        <div className="relative z-10">
          {/* Header */}
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-sm font-medium text-gray-600">{metric.title}</h3>
            <div className={`w-2 h-2 ${getMetricColor(metric.color)} rounded-full animate-pulse-slow`} />
          </div>

          {/* Value */}
          <div className="mb-3">
            <motion.div
              key={metric.value}
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.3, type: "spring" }}
              className="text-3xl font-bold text-gray-900"
            >
              {formatValue(metric.value, metric.format)}
              {metric.unit && <span className="text-lg font-normal text-gray-600 ml-1">{metric.unit}</span>}
            </motion.div>
          </div>

          {/* Change Indicator */}
          <div className="flex items-center space-x-2">
            {metric.changeType === 'increase' ? (
              <TrendingUp className={`w-4 h-4 ${getChangeColor(metric.changeType)}`} />
            ) : (
              <TrendingDown className={`w-4 h-4 ${getChangeColor(metric.changeType)}`} />
            )}
            <span className={`text-sm font-medium ${getChangeColor(metric.changeType)}`}>
              {metric.changeType === 'increase' ? '+' : ''}{formatPercentage(metric.change)}
            </span>
            <span className="text-xs text-gray-500">vs last period</span>
          </div>

          {/* Expanded Content */}
          {isExpanded && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="mt-4 pt-4 border-t border-gray-200"
            >
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Previous Period</span>
                  <span className="font-medium text-gray-900">
                    {formatValue(metric.value / (1 + metric.change / 100), metric.format)}
                  </span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Change</span>
                  <span className={`font-medium ${getChangeColor(metric.changeType)}`}>
                    {metric.changeType === 'increase' ? '+' : ''}{formatCompactCurrency(metric.value - (metric.value / (1 + metric.change / 100)))}
                  </span>
                </div>
              </div>
            </motion.div>
          )}
        </div>
      </div>
    </motion.div>
  )
}