import { useState } from 'react'
import { motion } from 'framer-motion'
import {
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
  LineChart,
  Line,
  FunnelChart,
  Funnel,
  LabelList,
  Legend } from 'recharts'
import { GlassCard } from '@/components/ui/GlassCard'
import { formatCompactCurrency, formatPercentage, formatNumber } from '@/lib/utils'
import { salesMetricsData, salesFunnelData } from '@/data/mockData'
import {
  Target,
  TrendingUp,
  Users,
  DollarSign,
  Clock,
  Award
} from 'lucide-react'

export function SalesPerformance() {
  const [selectedPeriod, setSelectedPeriod] = useState('current')

  const salesKPIs = [
    {
      title: 'Pipeline Value',
      value: salesMetricsData.pipelineValue,
      unit: '$',
      format: 'currency',
      icon: Target,
      change: 67.8,
      changeType: 'increase' as const,
      description: 'Total qualified pipeline'
    },
    {
      title: 'Deals Closed',
      value: salesMetricsData.dealsClosed,
      unit: '',
      format: 'number',
      icon: Award,
      change: 15.4,
      changeType: 'increase' as const,
      description: 'Won deals this period'
    },
    {
      title: 'Average Deal Size',
      value: salesMetricsData.averageDealSize,
      unit: '$',
      format: 'currency',
      icon: DollarSign,
      change: 8.9,
      changeType: 'increase' as const,
      description: 'Average contract value'
    },
    {
      title: 'Sales Cycle',
      value: salesMetricsData.salesCycleLength,
      unit: ' days',
      format: 'number',
      icon: Clock,
      change: -12.3,
      changeType: 'decrease' as const,
      description: 'Average sales cycle length'
    },
    {
      title: 'Conversion Rate',
      value: salesMetricsData.leadConversionRate,
      unit: '%',
      format: 'percentage',
      icon: TrendingUp,
      change: 3.2,
      changeType: 'increase' as const,
      description: 'Lead to customer conversion'
    },
    {
      title: 'Quota Attainment',
      value: salesMetricsData.quotaAttainment,
      unit: '%',
      format: 'percentage',
      icon: Users,
      change: 18.7,
      changeType: 'increase' as const,
      description: 'Team quota achievement'
    }
  ]

  // Sales team performance data
  const salesTeamPerformance = [
    { name: 'Sarah Chen', quota: 500000, actual: 685000, attainment: 137, deals: 8 },
    { name: 'Mike Johnson', quota: 400000, actual: 523000, attainment: 131, deals: 6 },
    { name: 'Emily Davis', quota: 450000, actual: 478000, attainment: 106, deals: 5 },
    { name: 'Alex Kumar', quota: 350000, actual: 445000, attainment: 127, deals: 7 },
    { name: 'Jessica Lee', quota: 300000, actual: 289000, attainment: 96, deals: 4 }
  ]

  // Monthly sales performance
  const monthlySalesPerformance = [
    { month: 'Jul', target: 850000, actual: 785000, forecast: 820000 },
    { month: 'Aug', target: 900000, actual: 945000, forecast: 890000 },
    { month: 'Sep', target: 950000, actual: 1020000, forecast: 980000 },
    { month: 'Oct', target: 1000000, actual: 1180000, forecast: 1050000 },
    { month: 'Nov', target: 1050000, actual: 1250000, forecast: 1120000 },
    { month: 'Dec', target: 1100000, actual: 1340000, forecast: 1180000 }
  ]

  const COLORS = ['#6366f1', '#8b5cf6', '#10b981', '#f59e0b', '#ef4444']

  const SalesTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white/95 backdrop-blur-lg p-4 rounded-xl shadow-xl border border-white/20">
          <p className="text-sm font-semibold text-gray-900 mb-2">{label}</p>
          {payload.map((entry: any, index: number) => (
            <p key={index} className="text-sm" style={{ color: entry.color }}>
              {entry.name}: {entry.name.includes('Rate') || entry.name.includes('Attainment')
                ? formatPercentage(entry.value)
                : entry.name.includes('$')
                ? formatCompactCurrency(entry.value)
                : formatNumber(entry.value)
              }
            </p>
          ))}
        </div>
      )
    }
    return null
  }

  const FunnelTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload
      return (
        <div className="bg-white/95 backdrop-blur-lg p-4 rounded-xl shadow-xl border border-white/20">
          <p className="text-sm font-semibold text-gray-900 mb-2">{data.stage}</p>
          <p className="text-sm text-gray-600">Leads: {formatNumber(data.count)}</p>
          <p className="text-sm text-gray-600">Conversion: {formatPercentage(data.conversionRate)}</p>
          <p className="text-sm text-gray-600">Value: {formatCompactCurrency(data.value)}</p>
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
        transition={{ duration: 0.8, delay: 0.7 }}
        className="flex items-center justify-between mb-6"
      >
        <h2 className="text-2xl font-bold text-white flex items-center">
          <Target className="w-6 h-6 mr-2" />
          Sales Performance
        </h2>
        <div className="flex items-center space-x-2 text-white/80 text-sm">
          <Award className="w-4 h-4 text-yellow-400" />
          <span>124% quota attainment</span>
        </div>
      </motion.div>

      {/* Sales KPIs */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4 mb-6">
        {salesKPIs.map((kpi, index) => (
          <motion.div
            key={kpi.title}
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.8 + index * 0.1 }}
            whileHover={{ y: -5, boxShadow: "0 20px 40px rgba(0,0,0,0.1)" }}
          >
            <GlassCard>
              <div className="text-center">
                <div className="flex justify-center mb-3">
                  <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                    <kpi.icon className="w-5 h-5 text-primary" />
                  </div>
                </div>
                <h3 className="text-sm font-medium text-gray-600 mb-1">{kpi.title}</h3>
                <div className="text-xl font-bold text-gray-900">
                  {kpi.format === 'currency' ? formatCompactCurrency(kpi.value) :
                   kpi.format === 'percentage' ? formatPercentage(kpi.value) :
                   formatNumber(kpi.value)}
                  {kpi.unit}
                </div>
                <div className="flex items-center justify-center mt-2 space-x-1">
                  <span className={`text-xs font-medium ${
                    kpi.changeType === 'increase' ? 'text-green-600' : 'text-red-600'
                  }`}>
                    {kpi.changeType === 'increase' ? '+' : ''}{kpi.change}%
                  </span>
                  <span className="text-xs text-gray-500">vs target</span>
                </div>
                <p className="text-xs text-gray-500 mt-2">{kpi.description}</p>
              </div>
            </GlassCard>
          </motion.div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        {/* Sales Funnel */}
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.9 }}
        >
          <GlassCard>
            <div className="mb-4">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Sales Funnel Performance</h3>
              <p className="text-sm text-gray-600">Lead conversion through sales stages</p>
            </div>
            <ResponsiveContainer width="100%" height={350}>
              <FunnelChart>
                <Funnel
                  data={salesFunnelData}
                  dataKey="count"
                  isAnimationActive={true}
                  fill="#6366f1"
                >
                  <LabelList
                    dataKey="stage"
                    position="center"
                    fill="#fff"
                    fontSize={12}
                  />
                </Funnel>
                <Tooltip content={<FunnelTooltip />} />
              </FunnelChart>
            </ResponsiveContainer>

            {/* Funnel conversion rates */}
            <div className="mt-4 space-y-2">
              {salesFunnelData.slice(0, -1).map((stage, index) => {
                const nextStage = salesFunnelData[index + 1]
                const conversionRate = (nextStage.count / stage.count) * 100
                return (
                  <div key={stage.stage} className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">{stage.stage} → {nextStage.stage}</span>
                    <span className="text-sm font-medium text-gray-900">{formatPercentage(conversionRate)}</span>
                  </div>
                )
              })}
            </div>
          </GlassCard>
        </motion.div>

        {/* Sales Team Performance */}
        <motion.div
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 1.0 }}
        >
          <GlassCard>
            <div className="mb-4">
              <h3 className="text-lg font-semibold text-gray-900 mb-2 flex items-center">
                <Users className="w-5 h-5 mr-2" />
                Sales Team Performance
              </h3>
              <p className="text-sm text-gray-600">Individual quota attainment</p>
            </div>
            <ResponsiveContainer width="100%" height={350}>
              <BarChart data={salesTeamPerformance} margin={{ top: 20, right: 30, left: 20, bottom: 60 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                <XAxis
                  dataKey="name"
                  stroke="#6b7280"
                  angle={-45}
                  textAnchor="end"
                  height={80}
                  interval={0}
                  tick={{ fontSize: 10 }}
                />
                <YAxis stroke="#6b7280" tickFormatter={(value) => formatPercentage(value)} />
                <Tooltip content={<SalesTooltip />} />
                <Bar dataKey="attainment" fill="#6366f1" radius={[8, 8, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>

            {/* Team Stats */}
            <div className="mt-4 grid grid-cols-3 gap-4 text-center">
              <div>
                <div className="text-lg font-bold text-gray-900">{formatCompactCurrency(salesMetricsData.pipelineValue)}</div>
                <div className="text-xs text-gray-600">Total Pipeline</div>
              </div>
              <div>
                <div className="text-lg font-bold text-gray-900">{salesMetricsData.salesTeamSize}</div>
                <div className="text-xs text-gray-600">Team Size</div>
              </div>
              <div>
                <div className="text-lg font-bold text-gray-900">{formatPercentage(salesMetricsData.forecastAccuracy)}</div>
                <div className="text-xs text-gray-600">Forecast Accuracy</div>
              </div>
            </div>
          </GlassCard>
        </motion.div>
      </div>

      {/* Monthly Sales Performance */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 1.1 }}
      >
        <GlassCard>
          <div className="mb-4">
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Monthly Sales Performance</h3>
            <p className="text-sm text-gray-600">Target vs actual vs forecast performance</p>
          </div>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={monthlySalesPerformance}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
              <XAxis dataKey="month" stroke="#6b7280" />
              <YAxis stroke="#6b7280" tickFormatter={(value) => formatCompactCurrency(value)} />
              <Tooltip content={<SalesTooltip />} />
              <Legend />
              <Line
                type="monotone"
                dataKey="target"
                stroke="#9ca3af"
                strokeWidth={2}
                strokeDasharray="5 5"
                name="Target"
              />
              <Line
                type="monotone"
                dataKey="forecast"
                stroke="#f59e0b"
                strokeWidth={3}
                name="Forecast"
              />
              <Line
                type="monotone"
                dataKey="actual"
                stroke="#10b981"
                strokeWidth={3}
                name="Actual"
              />
            </LineChart>
          </ResponsiveContainer>

          {/* Performance Summary */}
          <div className="mt-6 p-4 bg-gradient-to-r from-green-50 to-blue-50 rounded-xl border border-green-200">
            <div className="flex items-center justify-between">
              <div>
                <h4 className="font-medium text-gray-900">Q4 Performance Summary</h4>
                <p className="text-sm text-gray-600">Exceeded targets by 18.7% on average</p>
              </div>
              <div className="text-right">
                <div className="text-2xl font-bold text-green-600">118.7%</div>
                <div className="text-sm text-gray-600">Average attainment</div>
              </div>
            </div>
          </div>
        </GlassCard>
      </motion.div>
    </section>
  )
}