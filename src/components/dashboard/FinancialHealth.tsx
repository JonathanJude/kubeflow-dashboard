import { useState } from 'react'
import { motion } from 'framer-motion'
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Area,
  AreaChart,
  ComposedChart,
  Legend } from 'recharts'
import type { FinancialHealth } from '@/types/finance'
import { GlassCard } from '@/components/ui/GlassCard'
import { formatCurrency, formatCompactCurrency, formatPercentage } from '@/lib/utils'
import { TrendingDown, Activity, DollarSign, AlertTriangle } from 'lucide-react'

interface FinancialHealthProps {
  financialData: FinancialHealth[]
}

export function FinancialHealth({ financialData }: FinancialHealthProps) {
  const [selectedMetric, setSelectedMetric] = useState<string>('burnRate')

  // Cash flow data for waterfall chart
  const cashFlowData = financialData.map(item => ({
    month: item.month,
    operating: item.operatingCashFlow,
    investing: item.investingCashFlow,
    financing: item.financingCashFlow,
    net: item.operatingCashFlow + item.investingCashFlow + item.financingCashFlow
  }))

  // Burn rate projection
  const burnRateProjection = [
    ...financialData.map(item => ({
      month: item.month,
      actual: item.burnRate,
      projected: null
    })),
    ...[1, 2, 3, 4, 5, 6].map(month => ({
      month: `Proj ${month}`,
      actual: null,
      projected: 335000 * (1 + month * 0.05) // 5% increase per month
    }))
  ]

  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white/95 backdrop-blur-lg p-4 rounded-xl shadow-xl border border-white/20">
          <p className="text-sm font-semibold text-gray-900 mb-2">{label}</p>
          {payload.map((entry: any, index: number) => (
            <p key={index} className="text-sm" style={{ color: entry.color }}>
              {entry.name}: {entry.name.includes('Rate') || entry.name.includes('Margin')
                ? formatPercentage(entry.value)
                : formatCompactCurrency(entry.value)
              }
            </p>
          ))}
        </div>
      )
    }
    return null
  }

  const BurnRateTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload
      return (
        <div className="bg-white/95 backdrop-blur-lg p-4 rounded-xl shadow-xl border border-white/20">
          <p className="text-sm font-semibold text-gray-900 mb-2">{label}</p>
          {data.actual && (
            <p className="text-sm text-blue-600">Actual: {formatCompactCurrency(data.actual)}</p>
          )}
          {data.projected && (
            <p className="text-sm text-purple-600">Projected: {formatCompactCurrency(data.projected)}</p>
          )}
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
        transition={{ duration: 0.8, delay: 0.3 }}
        className="flex items-center justify-between mb-6"
      >
        <h2 className="text-2xl font-bold text-white flex items-center">
          <Activity className="w-6 h-6 mr-2" />
          Financial Health Metrics
        </h2>
        <div className="flex items-center space-x-2 text-white/80 text-sm">
          <AlertTriangle className="w-4 h-4 text-yellow-400" />
          <span>18.5 months runway</span>
        </div>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        {/* Burn Rate Tracker */}
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <GlassCard>
            <div className="mb-4">
              <h3 className="text-lg font-semibold text-gray-900 mb-2 flex items-center">
                <TrendingDown className="w-5 h-5 mr-2 text-red-500" />
                Burn Rate & Projection
              </h3>
              <p className="text-sm text-gray-600">Monthly cash burn with 6-month forecast</p>
            </div>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={burnRateProjection}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                <XAxis dataKey="month" stroke="#6b7280" />
                <YAxis stroke="#6b7280" tickFormatter={(value) => formatCompactCurrency(value)} />
                <Tooltip content={<BurnRateTooltip />} />
                <Legend />
                <Line
                  type="monotone"
                  dataKey="actual"
                  stroke="#ef4444"
                  strokeWidth={3}
                  dot={{ fill: '#ef4444', strokeWidth: 2, r: 4 }}
                  name="Actual Burn Rate"
                />
                <Line
                  type="monotone"
                  dataKey="projected"
                  stroke="#8b5cf6"
                  strokeWidth={3}
                  strokeDasharray="5 5"
                  dot={false}
                  name="Projected Burn Rate"
                />
              </LineChart>
            </ResponsiveContainer>

            {/* Sustainability Indicator */}
            <div className="mt-4 p-4 bg-gradient-to-r from-yellow-50 to-orange-50 rounded-xl border border-yellow-200">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-900">Sustainability Status</p>
                  <p className="text-xs text-gray-600">Current trajectory: 18.5 months runway</p>
                </div>
                <div className="w-12 h-12 relative">
                  <svg className="w-12 h-12 transform -rotate-90">
                    <circle
                      cx="24"
                      cy="24"
                      r="20"
                      stroke="#fbbf24"
                      strokeWidth="4"
                      fill="none"
                    />
                    <circle
                      cx="24"
                      cy="24"
                      r="20"
                      stroke="#f59e0b"
                      strokeWidth="4"
                      fill="none"
                      strokeDasharray={`${(18.5 / 24) * 125.6} 125.6`}
                      className="transition-all duration-1000"
                    />
                  </svg>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span className="text-xs font-bold text-gray-900">77%</span>
                  </div>
                </div>
              </div>
            </div>
          </GlassCard>
        </motion.div>

        {/* Gross & Net Margins */}
        <motion.div
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
        >
          <GlassCard>
            <div className="mb-4">
              <h3 className="text-lg font-semibold text-gray-900 mb-2 flex items-center">
                <DollarSign className="w-5 h-5 mr-2 text-green-500" />
                Margin Trends
              </h3>
              <p className="text-sm text-gray-600">Gross and net margins with benchmarks</p>
            </div>
            <ResponsiveContainer width="100%" height={300}>
              <ComposedChart data={financialData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                <XAxis dataKey="month" stroke="#6b7280" />
                <YAxis stroke="#6b7280" tickFormatter={(value) => formatPercentage(value)} />
                <Tooltip content={<CustomTooltip />} />
                <Legend />
                <Line
                  type="monotone"
                  dataKey="grossMargin"
                  stroke="#10b981"
                  strokeWidth={3}
                  name="Gross Margin"
                />
                <Line
                  type="monotone"
                  dataKey="netMargin"
                  stroke="#f59e0b"
                  strokeWidth={3}
                  name="Net Margin"
                />
                {/* Benchmark lines */}
                <Line
                  type="monotone"
                  dataKey={() => 75}
                  stroke="#6b7280"
                  strokeWidth={2}
                  strokeDasharray="5 5"
                  dot={false}
                  name="SaaS Gross Margin Benchmark"
                />
                <Line
                  type="monotone"
                  dataKey={() => 20}
                  stroke="#6b7280"
                  strokeWidth={2}
                  strokeDasharray="5 5"
                  dot={false}
                  name="SaaS Net Margin Benchmark"
                />
              </ComposedChart>
            </ResponsiveContainer>
          </GlassCard>
        </motion.div>
      </div>

      {/* Cash Flow Waterfall */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.6 }}
      >
        <GlassCard>
          <div className="mb-4">
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Cash Flow Analysis</h3>
            <p className="text-sm text-gray-600">Operating, Investing, and Financing cash flows</p>
          </div>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={cashFlowData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
              <XAxis dataKey="month" stroke="#6b7280" />
              <YAxis stroke="#6b7280" tickFormatter={(value) => formatCompactCurrency(value)} />
              <Tooltip
                content={({ active, payload, label }) => {
                  if (active && payload && payload.length) {
                    return (
                      <div className="bg-white/95 backdrop-blur-lg p-4 rounded-xl shadow-xl border border-white/20">
                        <p className="text-sm font-semibold text-gray-900 mb-2">{label}</p>
                        {payload.map((entry: any, index: number) => (
                          <p key={index} className="text-sm" style={{ color: entry.color }}>
                            {entry.name}: {formatCompactCurrency(entry.value)}
                          </p>
                        ))}
                      </div>
                    )
                  }
                  return null
                }}
              />
              <Legend />
              <Bar dataKey="operating" stackId="stack" fill="#ef4444" name="Operating CF" />
              <Bar dataKey="investing" stackId="stack" fill="#f59e0b" name="Investing CF" />
              <Bar dataKey="financing" stackId="stack" fill="#10b981" name="Financing CF" />
            </BarChart>
          </ResponsiveContainer>
        </GlassCard>
      </motion.div>
    </section>
  )
}