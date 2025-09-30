import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Area,
  AreaChart
} from 'recharts'
import type { Anomaly, Scenario, ExecutiveBriefing } from '@/types/finance'
import { GlassCard } from '@/components/ui/GlassCard'
import { formatCurrency, formatCompactCurrency, formatNumber } from '@/lib/utils'
import {
  Brain,
  AlertTriangle,
  TrendingUp,
  FileText,
  ChevronDown,
  ChevronUp,
  Zap,
  Target,
  Clock
} from 'lucide-react'

interface StrategicInsightsProps {
  anomalies: Anomaly[]
  scenarios: Scenario[]
  briefings: ExecutiveBriefing[]
}

export function StrategicInsights({ anomalies, scenarios, briefings }: StrategicInsightsProps) {
  const [expandedBriefing, setExpandedBriefing] = useState<string | null>(null)
  const [selectedScenario, setSelectedScenario] = useState<string>('Current Burn Rate')

  // Generate runway projection data for different scenarios
  const generateRunwayData = () => {
    const baseData = []
    for (let i = 0; i <= 24; i++) {
      const month = new Date()
      month.setMonth(month.getMonth() + i)

      baseData.push({
        month: month.toLocaleDateString('en-US', { month: 'short', year: 'numeric' }),
        current: Math.max(18.5 - i * 0.8, 0),
        optimistic: Math.max(24.2 - i * 0.6, 0),
        conservative: Math.max(14.8 - i * 0.9, 0),
        aggressive: Math.max(12.3 - i * 1.1, 0)
      })
    }
    return baseData
  }

  const runwayData = generateRunwayData()

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'high': return 'text-red-600 bg-red-50 border-red-200'
      case 'medium': return 'text-yellow-600 bg-yellow-50 border-yellow-200'
      case 'low': return 'text-blue-600 bg-blue-50 border-blue-200'
      default: return 'text-gray-600 bg-gray-50 border-gray-200'
    }
  }

  const getSeverityIcon = (severity: string) => {
    switch (severity) {
      case 'high': return <AlertTriangle className="w-4 h-4" />
      case 'medium': return <Zap className="w-4 h-4" />
      case 'low': return <Target className="w-4 h-4" />
      default: return <Clock className="w-4 h-4" />
    }
  }

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'border-l-red-500'
      case 'medium': return 'border-l-yellow-500'
      case 'low': return 'border-l-blue-500'
      default: return 'border-l-gray-500'
    }
  }

  const RunwayTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white/95 backdrop-blur-lg p-4 rounded-xl shadow-xl border border-white/20">
          <p className="text-sm font-semibold text-gray-900 mb-2">{label}</p>
          {payload.map((entry: any, index: number) => (
            <p key={index} className="text-sm" style={{ color: entry.color }}>
              {entry.name}: {entry.value.toFixed(1)} months
            </p>
          ))}
        </div>
      )
    }
    return null
  }

  return (
    <section className="mb-8">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.5 }}
        className="flex items-center justify-between mb-6"
      >
        <h2 className="text-2xl font-bold text-white flex items-center">
          <Brain className="w-6 h-6 mr-2" />
          Strategic Insights Module
        </h2>
        <div className="flex items-center space-x-2 text-white/80 text-sm">
          <Zap className="w-4 h-4 text-yellow-400" />
          <span>AI-powered analysis active</span>
        </div>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        {/* AI Anomaly Detection */}
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
        >
          <GlassCard>
            <div className="mb-4">
              <h3 className="text-lg font-semibold text-gray-900 mb-2 flex items-center">
                <Brain className="w-5 h-5 mr-2 text-purple-500" />
                AI Anomaly Detection
              </h3>
              <p className="text-sm text-gray-600">Unusual patterns detected in financial data</p>
            </div>
            <div className="space-y-3">
              {anomalies.map((anomaly, index) => (
                <motion.div
                  key={anomaly.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3, delay: 0.7 + index * 0.1 }}
                  className={`p-4 rounded-xl border ${getSeverityColor(anomaly.severity)} cursor-pointer hover:shadow-lg transition-all duration-200`}
                >
                  <div className="flex items-start justify-between">
                    <div className="flex items-center space-x-3">
                      <div className={getSeverityColor(anomaly.severity).split(' ')[0]}>
                        {getSeverityIcon(anomaly.severity)}
                      </div>
                      <div>
                        <h4 className="font-medium text-gray-900">{anomaly.title}</h4>
                        <p className="text-sm text-gray-600 mt-1">{anomaly.description}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-sm font-medium">
                        {anomaly.type === 'revenue' ? '+' : '-'}
                        {formatCompactCurrency(Math.abs(anomaly.value - anomaly.expectedValue))}
                      </p>
                      <p className="text-xs text-gray-500">{anomaly.date}</p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </GlassCard>
        </motion.div>

        {/* Predictive Runway Forecasting */}
        <motion.div
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.7 }}
        >
          <GlassCard>
            <div className="mb-4">
              <h3 className="text-lg font-semibold text-gray-900 mb-2 flex items-center">
                <TrendingUp className="w-5 h-5 mr-2 text-green-500" />
                Predictive Runway Forecasting
              </h3>
              <p className="text-sm text-gray-600">Cash runway under different scenarios</p>
            </div>
            <ResponsiveContainer width="100%" height={250}>
              <AreaChart data={runwayData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                <XAxis dataKey="month" stroke="#6b7280" />
                <YAxis stroke="#6b7280" />
                <Tooltip content={<RunwayTooltip />} />
                <Area
                  type="monotone"
                  dataKey="aggressive"
                  stackId="1"
                  stroke="#ef4444"
                  fillOpacity={0.3}
                  fill="#ef4444"
                  name="Aggressive Expansion"
                />
                <Area
                  type="monotone"
                  dataKey="conservative"
                  stackId="1"
                  stroke="#f59e0b"
                  fillOpacity={0.3}
                  fill="#f59e0b"
                  name="Conservative"
                />
                <Area
                  type="monotone"
                  dataKey="current"
                  stackId="1"
                  stroke="#6366f1"
                  fillOpacity={0.3}
                  fill="#6366f1"
                  name="Current"
                />
                <Area
                  type="monotone"
                  dataKey="optimistic"
                  stackId="1"
                  stroke="#10b981"
                  fillOpacity={0.3}
                  fill="#10b981"
                  name="Optimistic"
                />
              </AreaChart>
            </ResponsiveContainer>

            {/* Scenario Selector */}
            <div className="mt-4 grid grid-cols-2 gap-2">
              {scenarios.map((scenario) => (
                <button
                  key={scenario.name}
                  onClick={() => setSelectedScenario(scenario.name)}
                  className={`p-3 rounded-lg text-left transition-all duration-200 ${
                    selectedScenario === scenario.name
                      ? 'bg-primary/10 border border-primary/30 text-primary font-medium'
                      : 'bg-gray-50 border border-gray-200 text-gray-700 hover:bg-gray-100'
                  }`}
                >
                  <div className="text-sm font-medium">{scenario.name}</div>
                  <div className="text-xs text-gray-600">{scenario.runwayMonths} months</div>
                </button>
              ))}
            </div>
          </GlassCard>
        </motion.div>
      </div>

      {/* Executive Briefing Generator */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.8 }}
      >
        <GlassCard>
          <div className="mb-4">
            <h3 className="text-lg font-semibold text-gray-900 mb-2 flex items-center">
              <FileText className="w-5 h-5 mr-2 text-blue-500" />
              Automated Executive Briefing
            </h3>
            <p className="text-sm text-gray-600">AI-generated insights and key takeaways for leadership</p>
          </div>
          <div className="space-y-4">
            {briefings.map((briefing, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: 0.9 + index * 0.1 }}
                className={`border-l-4 ${getPriorityColor(briefing.priority)} bg-white/50 rounded-lg overflow-hidden`}
              >
                <button
                  onClick={() => setExpandedBriefing(expandedBriefing === briefing.title ? null : briefing.title)}
                  className="w-full p-4 text-left hover:bg-white/70 transition-colors duration-200"
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="font-semibold text-gray-900">{briefing.title}</h4>
                      <p className="text-xs text-gray-500 mt-1">
                        {new Date(briefing.timestamp).toLocaleDateString('en-US', {
                          month: 'short',
                          day: 'numeric',
                          year: 'numeric',
                          hour: '2-digit',
                          minute: '2-digit'
                        })}
                      </p>
                    </div>
                    <div className="flex items-center space-x-2">
                      <span className={`text-xs px-2 py-1 rounded-full ${
                        briefing.priority === 'high' ? 'bg-red-100 text-red-700' :
                        briefing.priority === 'medium' ? 'bg-yellow-100 text-yellow-700' :
                        'bg-blue-100 text-blue-700'
                      }`}>
                        {briefing.priority} priority
                      </span>
                      {expandedBriefing === briefing.title ? (
                        <ChevronUp className="w-4 h-4 text-gray-600" />
                      ) : (
                        <ChevronDown className="w-4 h-4 text-gray-600" />
                      )}
                    </div>
                  </div>
                </button>
                <AnimatePresence>
                  {expandedBriefing === briefing.title && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                      className="px-4 pb-4"
                    >
                      <ul className="space-y-2">
                        {briefing.points.map((point, pointIndex) => (
                          <li key={pointIndex} className="flex items-start space-x-2">
                            <div className="w-1.5 h-1.5 bg-primary rounded-full mt-2 flex-shrink-0" />
                            <span className="text-sm text-gray-700">{point}</span>
                          </li>
                        ))}
                      </ul>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            ))}
          </div>
        </GlassCard>
      </motion.div>
    </section>
  )
}