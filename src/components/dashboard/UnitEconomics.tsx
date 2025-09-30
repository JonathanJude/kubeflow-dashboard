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
  PieChart,
  Pie,
  Cell,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar,
  Legend
} from 'recharts'
import type { UnitEconomics, CohortData } from '@/types/finance'
import { GlassCard } from '@/components/ui/GlassCard'
import { formatCurrency, formatCompactCurrency, formatPercentage, formatNumber } from '@/lib/utils'
import { Users, TrendingUp, Clock, Target } from 'lucide-react'

interface UnitEconomicsProps {
  unitEconomics: UnitEconomics
  cohortData: CohortData[]
}

export function UnitEconomics({ unitEconomics, cohortData }: UnitEconomicsProps) {
  const [cacScenario, setCacScenario] = useState(1.0) // Multiplier for CAC scenarios

  // Calculate scenario-based metrics
  const scenarioMetrics = {
    cac: unitEconomics.cac * cacScenario,
    ltvCacRatio: unitEconomics.ltv / (unitEconomics.cac * cacScenario),
    cacPaybackMonths: (unitEconomics.cac * cacScenario) / (unitEconomics.averageRevenuePerCustomer * unitEconomics.monthlyActiveCustomers / 12)
  }

  // Benchmark data for radar chart
  const benchmarkData = [
    {
      metric: 'LTV:CAC',
      current: unitEconomics.ltvCacRatio,
      benchmark: 3.0,
      excellent: 5.0
    },
    {
      metric: 'CAC Payback',
      current: Math.min(unitEconomics.cacPaybackMonths / 24 * 100, 100), // Invert and scale to 0-100
      benchmark: 50,
      excellent: 25
    },
    {
      metric: 'Retention',
      current: 85,
      benchmark: 80,
      excellent: 90
    },
    {
      metric: 'Margin',
      current: 75,
      benchmark: 70,
      excellent: 85
    },
    {
      metric: 'Growth',
      current: 89,
      benchmark: 50,
      excellent: 100
    }
  ]

  // Prepare cohort data for heatmap
  const cohortHeatmapData = cohortData.map(cohort => ({
    cohort: cohort.cohort,
    ...cohort.retentionRates.reduce((acc, rate, index) => {
      acc[`month${index + 1}`] = rate
      return acc
    }, {} as Record<string, number>)
  }))

  const COLORS = ['#10b981', '#f59e0b', '#ef4444', '#6366f1', '#8b5cf6']

  const GaugeChart = ({ value, max, label, color }: { value: number; max: number; label: string; color: string }) => {
    const percentage = (value / max) * 100
    const rotation = (percentage * 180) / 100 - 90

    return (
      <div className="flex flex-col items-center">
        <div className="relative w-32 h-16">
          <svg viewBox="0 0 100 50" className="w-full h-full">
            <path
              d="M 10 45 A 40 40 0 0 1 90 45"
              stroke="#e5e7eb"
              strokeWidth="8"
              fill="none"
            />
            <path
              d="M 10 45 A 40 40 0 0 1 90 45"
              stroke={color}
              strokeWidth="8"
              fill="none"
              strokeDasharray={`${percentage * 1.57} 157`}
              className="transition-all duration-1000"
            />
          </svg>
          <div className="absolute inset-0 flex items-center justify-center mt-2">
            <span className="text-lg font-bold text-gray-900">{value.toFixed(1)}</span>
          </div>
        </div>
        <p className="text-sm text-gray-600 mt-2">{label}</p>
      </div>
    )
  }

  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white/95 backdrop-blur-lg p-4 rounded-xl shadow-xl border border-white/20">
          <p className="text-sm font-semibold text-gray-900 mb-2">{label}</p>
          {payload.map((entry: any, index: number) => (
            <p key={index} className="text-sm" style={{ color: entry.color }}>
              {entry.name}: {typeof entry.value === 'number' && entry.name.includes('Rate')
                ? formatPercentage(entry.value)
                : formatNumber(entry.value)
              }
            </p>
          ))}
        </div>
      )
    }
    return null
  }

  const getRetentionColor = (rate: number) => {
    if (rate >= 90) return '#10b981'
    if (rate >= 80) return '#f59e0b'
    return '#ef4444'
  }

  return (
    <section className="mb-8">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.4 }}
        className="flex items-center justify-between mb-6"
      >
        <h2 className="text-2xl font-bold text-white flex items-center">
          <Users className="w-6 h-6 mr-2" />
          Unit Economics Panel
        </h2>
        <div className="flex items-center space-x-2 text-white/80 text-sm">
          <Target className="w-4 h-4 text-green-400" />
          <span>5.45x LTV:CAC Ratio</span>
        </div>
      </motion.div>

      {/* Key Metrics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.5 }}
        >
          <GlassCard>
            <div className="text-center">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">LTV:CAC Ratio</h3>
              <GaugeChart
                value={scenarioMetrics.ltvCacRatio}
                max={8}
                label="Ratio"
                color={scenarioMetrics.ltvCacRatio >= 3 ? '#10b981' : '#ef4444'}
              />
              <div className="mt-4 space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Industry Benchmark</span>
                  <span className="text-gray-900 font-medium">3.0x</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Current Performance</span>
                  <span className={`font-medium ${scenarioMetrics.ltvCacRatio >= 3 ? 'text-green-600' : 'text-red-600'}`}>
                    {scenarioMetrics.ltvCacRatio.toFixed(2)}x
                  </span>
                </div>
              </div>
            </div>
          </GlassCard>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.6 }}
        >
          <GlassCard>
            <div className="text-center">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">CAC Payback Period</h3>
              <GaugeChart
                value={scenarioMetrics.cacPaybackMonths}
                max={24}
                label="Months"
                color={scenarioMetrics.cacPaybackMonths <= 12 ? '#10b981' : '#f59e0b'}
              />
              <div className="mt-4 space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Industry Target</span>
                  <span className="text-gray-900 font-medium">12 months</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Current Period</span>
                  <span className={`font-medium ${scenarioMetrics.cacPaybackMonths <= 12 ? 'text-green-600' : 'text-yellow-600'}`}>
                    {scenarioMetrics.cacPaybackMonths.toFixed(1)} months
                  </span>
                </div>
              </div>
            </div>
          </GlassCard>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.7 }}
        >
          <GlassCard>
            <div className="text-center">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Scenario Analysis</h3>
              <div className="space-y-4">
                <div>
                  <label className="text-sm text-gray-600">CAC Multiplier</label>
                  <input
                    type="range"
                    min="0.5"
                    max="2"
                    step="0.1"
                    value={cacScenario}
                    onChange={(e) => setCacScenario(parseFloat(e.target.value))}
                    className="w-full mt-2"
                  />
                  <div className="flex justify-between text-xs text-gray-500 mt-1">
                    <span>0.5x</span>
                    <span className="font-medium text-gray-900">{cacScenario.toFixed(1)}x</span>
                    <span>2.0x</span>
                  </div>
                </div>
                <div className="pt-4 border-t border-gray-200">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Adjusted CAC</span>
                    <span className="font-medium text-gray-900">{formatCurrency(scenarioMetrics.cac)}</span>
                  </div>
                  <div className="flex justify-between text-sm mt-1">
                    <span className="text-gray-600">Impact on Ratio</span>
                    <span className={`font-medium ${scenarioMetrics.ltvCacRatio >= 3 ? 'text-green-600' : 'text-red-600'}`}>
                      {scenarioMetrics.ltvCacRatio.toFixed(2)}x
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </GlassCard>
        </motion.div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Cohort Retention Matrix */}
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.8 }}
        >
          <GlassCard>
            <div className="mb-4">
              <h3 className="text-lg font-semibold text-gray-900 mb-2 flex items-center">
                <Clock className="w-5 h-5 mr-2" />
                Customer Cohort Retention
              </h3>
              <p className="text-sm text-gray-600">Monthly retention rates by customer cohort</p>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-gray-200">
                    <th className="text-left py-2 px-2 text-gray-600">Cohort</th>
                    <th className="text-center py-2 px-2 text-gray-600">Size</th>
                    {cohortData[0]?.retentionRates.map((_, index) => (
                      <th key={index} className="text-center py-2 px-2 text-gray-600">M{index + 1}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {cohortData.map((cohort, cohortIndex) => (
                    <tr key={cohortIndex} className="border-b border-gray-100">
                      <td className="py-2 px-2 font-medium text-gray-900">{cohort.cohort}</td>
                      <td className="text-center py-2 px-2 text-gray-600">{cohort.size}</td>
                      {cohort.retentionRates.map((rate, monthIndex) => (
                        <td key={monthIndex} className="text-center py-2 px-2">
                          <span
                            className="px-2 py-1 rounded text-xs font-medium"
                            style={{
                              backgroundColor: `${getRetentionColor(rate)}20`,
                              color: getRetentionColor(rate)
                            }}
                          >
                            {rate}%
                          </span>
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </GlassCard>
        </motion.div>

        {/* Benchmark Radar Chart */}
        <motion.div
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.9 }}
        >
          <GlassCard>
            <div className="mb-4">
              <h3 className="text-lg font-semibold text-gray-900 mb-2 flex items-center">
                <TrendingUp className="w-5 h-5 mr-2" />
                Performance vs Benchmarks
              </h3>
              <p className="text-sm text-gray-600">Key metrics compared to industry standards</p>
            </div>
            <ResponsiveContainer width="100%" height={300}>
              <RadarChart data={benchmarkData}>
                <PolarGrid stroke="#e5e7eb" />
                <PolarAngleAxis dataKey="metric" stroke="#6b7280" />
                <PolarRadiusAxis
                  angle={90}
                  domain={[0, 100]}
                  stroke="#6b7280"
                />
                <Radar
                  name="Current"
                  dataKey="current"
                  stroke="#6366f1"
                  fill="#6366f1"
                  fillOpacity={0.6}
                  strokeWidth={2}
                />
                <Radar
                  name="Benchmark"
                  dataKey="benchmark"
                  stroke="#f59e0b"
                  fill="#f59e0b"
                  fillOpacity={0.3}
                  strokeWidth={2}
                />
                <Radar
                  name="Excellent"
                  dataKey="excellent"
                  stroke="#10b981"
                  fill="#10b981"
                  fillOpacity={0.2}
                  strokeWidth={2}
                />
                <Legend />
              </RadarChart>
            </ResponsiveContainer>
          </GlassCard>
        </motion.div>
      </div>
    </section>
  )
}