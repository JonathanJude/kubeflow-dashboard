import { useState } from 'react'
import { motion } from 'framer-motion'
import type { MetricCard } from '@/types/finance'
import { MetricCardComponent } from '@/components/ui/MetricCard'
import { DateRangeSelector } from '@/components/ui/DateRangeSelector'
import { TrendingUp, Activity, DollarSign, Users } from 'lucide-react'

interface ExecutiveSummaryProps {
  metrics: MetricCard[]
  dateRange: number
  onDateRangeChange: (days: number) => void
}

export function ExecutiveSummary({ metrics, dateRange, onDateRangeChange }: ExecutiveSummaryProps) {
  const [expandedCards, setExpandedCards] = useState<Set<string>>(new Set())

  const toggleCardExpansion = (cardId: string) => {
    const newExpanded = new Set(expandedCards)
    if (newExpanded.has(cardId)) {
      newExpanded.delete(cardId)
    } else {
      newExpanded.add(cardId)
    }
    setExpandedCards(newExpanded)
  }

  const getIcon = (iconName?: string) => {
    switch (iconName) {
      case 'trending-up': return <TrendingUp className="w-5 h-5" />
      case 'activity': return <Activity className="w-5 h-5" />
      case 'dollar-sign': return <DollarSign className="w-5 h-5" />
      case 'users': return <Users className="w-5 h-5" />
      default: return <Activity className="w-5 h-5" />
    }
  }

  return (
    <motion.section
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
      className="mb-8"
    >
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between mb-6">
        <div>
          <h1 className="text-4xl font-bold text-white mb-2">Executive Dashboard</h1>
          <p className="text-white/80 text-lg">Kubeflow Technologies - Real-time Financial Overview</p>
        </div>
        <DateRangeSelector selectedRange={dateRange} onRangeChange={onDateRangeChange} />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {metrics.map((metric, index) => (
          <motion.div
            key={metric.id}
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{
              duration: 0.5,
              delay: index * 0.1,
              type: "spring",
              stiffness: 100
            }}
            whileHover={{
              y: -5,
              boxShadow: "0 20px 40px rgba(0,0,0,0.1)"
            }}
          >
            <div className="relative">
              {/* Animated background gradient */}
              <div className="absolute inset-0 bg-gradient-to-r from-white/20 to-white/5 rounded-2xl transform rotate-1" />

              <MetricCardComponent
                metric={metric}
                isExpanded={expandedCards.has(metric.id)}
                onClick={() => toggleCardExpansion(metric.id)}
              />

              {/* Floating icon */}
              <div className="absolute -top-2 -right-2 w-10 h-10 bg-white/90 backdrop-blur-lg rounded-full flex items-center justify-center shadow-lg animate-float">
                <div className="text-primary">
                  {getIcon(metric.icon)}
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Summary Stats Bar */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.6 }}
        className="mt-8 glass-heavy rounded-2xl p-6"
      >
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 text-center">
          <div>
            <div className="text-2xl font-bold text-white">$2.28M</div>
            <div className="text-white/70 text-sm">Annual Recurring Revenue</div>
          </div>
          <div>
            <div className="text-2xl font-bold text-white">342</div>
            <div className="text-white/70 text-sm">Active Customers</div>
          </div>
          <div>
            <div className="text-2xl font-bold text-white">5.45x</div>
            <div className="text-white/70 text-sm">LTV:CAC Ratio</div>
          </div>
          <div>
            <div className="text-2xl font-bold text-white">89%</div>
            <div className="text-white/70 text-sm">YoY Growth</div>
          </div>
        </div>
      </motion.div>
    </motion.section>
  )
}