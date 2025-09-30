import { useState } from 'react'
import { motion } from 'framer-motion'
import {
  LineChart,
  Line,
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
import { GlassCard } from '@/components/ui/GlassCard'
import { formatCompactCurrency, formatPercentage, formatNumber } from '@/lib/utils'
import { customerSegments, featureAdoption } from '@/data/mockData'
import {
  Users,
  Star,
  TrendingUp,
  Target,
  Heart,
  PieChart as PieChartIcon
} from 'lucide-react'

export function CustomerAnalytics() {
  const [selectedSegment, setSelectedSegment] = useState<string>('all')

  // Customer growth over time
  const customerGrowth = [
    { month: 'Jul', enterprise: 15, midMarket: 42, smallBiz: 89, startup: 25, total: 171 },
    { month: 'Aug', enterprise: 19, midMarket: 58, smallBiz: 105, startup: 34, total: 216 },
    { month: 'Sep', enterprise: 24, midMarket: 72, smallBiz: 123, startup: 42, total: 261 },
    { month: 'Oct', enterprise: 29, midMarket: 79, smallBiz: 134, startup: 48, total: 290 },
    { month: 'Nov', enterprise: 33, midMarket: 85, smallBiz: 145, startup: 54, total: 317 },
    { month: 'Dec', enterprise: 37, midMarket: 89, smallBiz: 156, startup: 60, total: 342 }
  ]

  // Customer satisfaction by segment
  const satisfactionBySegment = [
    { segment: 'Enterprise', satisfaction: 4.7, nps: 78, retention: 94, supportScore: 4.8 },
    { segment: 'Mid-Market', satisfaction: 4.5, nps: 65, retention: 89, supportScore: 4.5 },
    { segment: 'Small Business', satisfaction: 4.3, nps: 52, retention: 84, supportScore: 4.2 },
    { segment: 'Startup', satisfaction: 4.6, nps: 71, retention: 91, supportScore: 4.6 }
  ]

  // Revenue contribution by segment
  const revenueContribution = customerSegments.map(seg => ({
    name: seg.segment,
    value: seg.revenue,
    customers: seg.customers,
    growth: seg.growth,
    avgContract: seg.avgContractValue
  }))

  const COLORS = ['#6366f1', '#8b5cf6', '#10b981', '#f59e0b']

  const CustomerTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white/95 backdrop-blur-lg p-4 rounded-xl shadow-xl border border-white/20">
          <p className="text-sm font-semibold text-gray-900 mb-2">{label}</p>
          {payload.map((entry: any, index: number) => (
            <p key={index} className="text-sm" style={{ color: entry.color }}>
              {entry.name}: {formatNumber(entry.value)}
            </p>
          ))}
        </div>
      )
    }
    return null
  }

  const SegmentTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload
      return (
        <div className="bg-white/95 backdrop-blur-lg p-4 rounded-xl shadow-xl border border-white/20">
          <p className="text-sm font-semibold text-gray-900 mb-2">{data.name}</p>
          <p className="text-sm text-gray-600">Revenue: {formatCompactCurrency(data.value)}</p>
          <p className="text-sm text-gray-600">Customers: {formatNumber(data.customers)}</p>
          <p className="text-sm text-green-600">Growth: {formatPercentage(data.growth)}</p>
          <p className="text-sm text-gray-600">Avg Contract: {formatCompactCurrency(data.avgContract)}</p>
        </div>
      )
    }
    return null
  }

  const getSegmentColor = (segment: string) => {
    switch (segment) {
      case 'Enterprise': return '#6366f1'
      case 'Mid-Market': return '#8b5cf6'
      case 'Small Business': return '#10b981'
      case 'Startup': return '#f59e0b'
      default: return '#6b7280'
    }
  }

  const totalRevenue = customerSegments.reduce((sum, seg) => sum + seg.revenue, 0)
  const totalCustomers = customerSegments.reduce((sum, seg) => sum + seg.customers, 0)
  const avgSatisfaction = customerSegments.reduce((sum, seg) => sum + seg.satisfaction, 0) / customerSegments.length

  return (
    <section className="mb-8">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.8 }}
        className="flex items-center justify-between mb-6"
      >
        <h2 className="text-2xl font-bold text-white flex items-center">
          <Users className="w-6 h-6 mr-2" />
          Customer Analytics
        </h2>
        <div className="flex items-center space-x-2 text-white/80 text-sm">
          <Star className="w-4 h-4 text-yellow-400" />
          <span>4.6 avg satisfaction</span>
        </div>
      </motion.div>

      {/* Customer Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.9 }}
        >
          <GlassCard>
            <div className="text-center">
              <div className="flex justify-center mb-3">
                <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center">
                  <Users className="w-5 h-5 text-blue-600" />
                </div>
              </div>
              <h3 className="text-sm font-medium text-gray-600 mb-1">Total Customers</h3>
              <div className="text-2xl font-bold text-gray-900">{formatNumber(totalCustomers)}</div>
              <p className="text-xs text-green-600 mt-2">+89% YoY</p>
            </div>
          </GlassCard>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.95 }}
        >
          <GlassCard>
            <div className="text-center">
              <div className="flex justify-center mb-3">
                <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center">
                  <Star className="w-5 h-5 text-green-600" />
                </div>
              </div>
              <h3 className="text-sm font-medium text-gray-600 mb-1">Avg Satisfaction</h3>
              <div className="text-2xl font-bold text-gray-900">{avgSatisfaction.toFixed(1)}</div>
              <p className="text-xs text-green-600 mt-2">+0.4 vs last quarter</p>
            </div>
          </GlassCard>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 1.0 }}
        >
          <GlassCard>
            <div className="text-center">
              <div className="flex justify-center mb-3">
                <div className="w-10 h-10 rounded-full bg-purple-100 flex items-center justify-center">
                  <TrendingUp className="w-5 h-5 text-purple-600" />
                </div>
              </div>
              <h3 className="text-sm font-medium text-gray-600 mb-1">Revenue Per Customer</h3>
              <div className="text-2xl font-bold text-gray-900">{formatCompactCurrency(totalRevenue / totalCustomers)}</div>
              <p className="text-xs text-green-600 mt-2">+23% YoY</p>
            </div>
          </GlassCard>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 1.05 }}
        >
          <GlassCard>
            <div className="text-center">
              <div className="flex justify-center mb-3">
                <div className="w-10 h-10 rounded-full bg-yellow-100 flex items-center justify-center">
                  <Heart className="w-5 h-5 text-yellow-600" />
                </div>
              </div>
              <h3 className="text-sm font-medium text-gray-600 mb-1">Net Promoter Score</h3>
              <div className="text-2xl font-bold text-gray-900">72</div>
              <p className="text-xs text-green-600 mt-2">Excellent</p>
            </div>
          </GlassCard>
        </motion.div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        {/* Customer Growth by Segment */}
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 1.1 }}
        >
          <GlassCard>
            <div className="mb-4">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Customer Growth by Segment</h3>
              <p className="text-sm text-gray-600">Monthly customer acquisition trends</p>
            </div>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={customerGrowth}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                <XAxis dataKey="month" stroke="#6b7280" />
                <YAxis stroke="#6b7280" />
                <Tooltip content={<CustomerTooltip />} />
                <Legend />
                <Line type="monotone" dataKey="enterprise" stroke="#6366f1" strokeWidth={3} name="Enterprise" />
                <Line type="monotone" dataKey="midMarket" stroke="#8b5cf6" strokeWidth={3} name="Mid-Market" />
                <Line type="monotone" dataKey="smallBiz" stroke="#10b981" strokeWidth={3} name="Small Business" />
                <Line type="monotone" dataKey="startup" stroke="#f59e0b" strokeWidth={3} name="Startup" />
                <Line type="monotone" dataKey="total" stroke="#ef4444" strokeWidth={3} strokeDasharray="5 5" name="Total" />
              </LineChart>
            </ResponsiveContainer>
          </GlassCard>
        </motion.div>

        {/* Revenue Distribution */}
        <motion.div
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 1.2 }}
        >
          <GlassCard>
            <div className="mb-4">
              <h3 className="text-lg font-semibold text-gray-900 mb-2 flex items-center">
                <PieChartIcon className="w-5 h-5 mr-2" />
                Revenue Distribution by Segment
              </h3>
              <p className="text-sm text-gray-600">Revenue contribution across customer segments</p>
            </div>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={revenueContribution}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, percentage }) => `${name}: ${formatPercentage((revenueContribution.find(r => r.name === name)?.value || 0) / totalRevenue * 100)}`}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {revenueContribution.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={getSegmentColor(entry.name)} />
                  ))}
                </Pie>
                <Tooltip content={<SegmentTooltip />} />
              </PieChart>
            </ResponsiveContainer>

            {/* Segment Summary */}
            <div className="mt-4 grid grid-cols-2 gap-4">
              {customerSegments.map((segment) => (
                <div key={segment.segment} className="text-center p-3 bg-gray-50 rounded-lg">
                  <div className="text-lg font-bold text-gray-900" style={{ color: getSegmentColor(segment.segment) }}>
                    {formatPercentage(segment.revenue / totalRevenue * 100)}
                  </div>
                  <div className="text-xs text-gray-600">{segment.segment}</div>
                  <div className="text-xs text-gray-500">{segment.customers} customers</div>
                </div>
              ))}
            </div>
          </GlassCard>
        </motion.div>
      </div>

      {/* Customer Satisfaction Radar */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 1.3 }}
      >
        <GlassCard>
          <div className="mb-4">
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Customer Satisfaction Analysis</h3>
            <p className="text-sm text-gray-600">Satisfaction metrics across customer segments</p>
          </div>
          <ResponsiveContainer width="100%" height={300}>
            <RadarChart data={satisfactionBySegment}>
              <PolarGrid stroke="#e5e7eb" />
              <PolarAngleAxis dataKey="segment" stroke="#6b7280" />
              <PolarRadiusAxis
                angle={90}
                domain={[0, 5]}
                stroke="#6b7280"
              />
              <Radar
                name="Satisfaction Score"
                dataKey="satisfaction"
                stroke="#6366f1"
                fill="#6366f1"
                fillOpacity={0.6}
                strokeWidth={2}
              />
              <Radar
                name="Support Score"
                dataKey="supportScore"
                stroke="#10b981"
                fill="#10b981"
                fillOpacity={0.4}
                strokeWidth={2}
              />
              <Legend />
            </RadarChart>
          </ResponsiveContainer>
        </GlassCard>
      </motion.div>
    </section>
  )
}