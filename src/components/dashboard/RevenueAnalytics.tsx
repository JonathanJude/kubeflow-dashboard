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
  Legend,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Area,
  AreaChart
} from 'recharts'
import type { RevenueData, GeographicRevenue, ProductPerformance } from '@/types/finance'
import { GlassCard } from '@/components/ui/GlassCard'
import { ExportControls } from '@/components/ui/ExportControls'
import { formatCurrency, formatCompactCurrency, formatPercentage } from '@/lib/utils'
import { TrendingUp, Globe, Package, ArrowUpRight } from 'lucide-react'

interface RevenueAnalyticsProps {
  revenueData: RevenueData[]
  geographicData: GeographicRevenue[]
  productData: ProductPerformance[]
}

const COLORS = ['#6366f1', '#8b5cf6', '#10b981', '#f59e0b', '#ef4444', '#06b6d4']

export function RevenueAnalytics({ revenueData, geographicData, productData }: RevenueAnalyticsProps) {
  const [selectedSegment, setSelectedSegment] = useState<string>('all')

  // Process revenue data for charts
  const totalRevenueByMonth = revenueData.map(item => ({
    month: item.date,
    total: item.total,
    enterprise: item.enterprise,
    startup: item.startup,
    smb: item.smb
  }))

  // Geographic data for pie chart
  const topGeographic = geographicData.slice(0, 6).map(item => ({
    name: item.country,
    value: item.revenue,
    ...item
  }))

  // Custom tooltip for revenue charts
  const RevenueTooltip = ({ active, payload, label }: any) => {
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
  }

  const GeographicTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload
      return (
        <div className="bg-white/95 backdrop-blur-lg p-4 rounded-xl shadow-xl border border-white/20">
          <p className="text-sm font-semibold text-gray-900">{data.country}</p>
          <p className="text-sm text-gray-600">Revenue: {formatCompactCurrency(data.revenue)}</p>
          <p className="text-sm text-gray-600">Share: {formatPercentage(data.percentage)}</p>
          <p className="text-sm text-green-600">Growth: {formatPercentage(data.growth)}</p>
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
        transition={{ duration: 0.8, delay: 0.2 }}
        className="flex items-center justify-between mb-6"
      >
        <div className="flex items-center">
          <h2 className="text-2xl font-bold text-white flex items-center">
            <TrendingUp className="w-6 h-6 mr-2" />
            Revenue Analytics
          </h2>
          <div className="flex items-center space-x-2 text-white/80 text-sm ml-6">
            <ArrowUpRight className="w-4 h-4 text-green-400" />
            <span>89% YoY Growth</span>
          </div>
        </div>
        <ExportControls
          data={{ revenue: { trends: revenueData, geographic: geographicData, products: productData } }}
          category="revenue"
        />
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        {/* ARR Trends Chart */}
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          <GlassCard>
            <div className="mb-4">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">ARR Trends</h3>
              <p className="text-sm text-gray-600">Monthly recurring revenue by segment</p>
            </div>
            <ResponsiveContainer width="100%" height={300}>
              <AreaChart data={totalRevenueByMonth}>
                <defs>
                  <linearGradient id="colorEnterprise" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#6366f1" stopOpacity={0.8}/>
                    <stop offset="95%" stopColor="#6366f1" stopOpacity={0.1}/>
                  </linearGradient>
                  <linearGradient id="colorStartup" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#8b5cf6" stopOpacity={0.8}/>
                    <stop offset="95%" stopColor="#8b5cf6" stopOpacity={0.1}/>
                  </linearGradient>
                  <linearGradient id="colorSMB" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#10b981" stopOpacity={0.8}/>
                    <stop offset="95%" stopColor="#10b981" stopOpacity={0.1}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                <XAxis dataKey="month" stroke="#6b7280" />
                <YAxis stroke="#6b7280" tickFormatter={(value) => formatCompactCurrency(value)} />
                <Tooltip content={<RevenueTooltip />} />
                <Legend />
                <Area
                  type="monotone"
                  dataKey="enterprise"
                  stackId="1"
                  stroke="#6366f1"
                  fillOpacity={1}
                  fill="url(#colorEnterprise)"
                  name="Enterprise"
                />
                <Area
                  type="monotone"
                  dataKey="startup"
                  stackId="1"
                  stroke="#8b5cf6"
                  fillOpacity={1}
                  fill="url(#colorStartup)"
                  name="Startup"
                />
                <Area
                  type="monotone"
                  dataKey="smb"
                  stackId="1"
                  stroke="#10b981"
                  fillOpacity={1}
                  fill="url(#colorSMB)"
                  name="SMB"
                />
              </AreaChart>
            </ResponsiveContainer>
          </GlassCard>
        </motion.div>

        {/* Geographic Distribution */}
        <motion.div
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <GlassCard>
            <div className="mb-4">
              <h3 className="text-lg font-semibold text-gray-900 mb-2 flex items-center">
                <Globe className="w-5 h-5 mr-2" />
                Geographic Distribution
              </h3>
              <p className="text-sm text-gray-600">Revenue by region</p>
            </div>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={topGeographic}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={(entry: any) => `${entry.country}: ${formatPercentage(entry.percentage)}`}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="revenue"
                >
                  {topGeographic.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip content={<GeographicTooltip />} />
              </PieChart>
            </ResponsiveContainer>
          </GlassCard>
        </motion.div>
      </div>

      {/* Product Performance */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.5 }}
      >
        <GlassCard>
          <div className="mb-4">
            <h3 className="text-lg font-semibold text-gray-900 mb-2 flex items-center">
              <Package className="w-5 h-5 mr-2" />
              Product Performance
            </h3>
            <p className="text-sm text-gray-600">Revenue comparison across product lines</p>
          </div>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={productData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
              <XAxis
                dataKey="product"
                stroke="#6b7280"
                angle={-45}
                textAnchor="end"
                height={100}
                interval={0}
                tick={{ fontSize: 10 }}
              />
              <YAxis stroke="#6b7280" tickFormatter={(value) => formatCompactCurrency(value)} />
              <Tooltip
                content={({ active, payload, label }) => {
                  if (active && payload && payload.length) {
                    const data = payload[0].payload
                    return (
                      <div className="bg-white/95 backdrop-blur-lg p-4 rounded-xl shadow-xl border border-white/20">
                        <p className="text-sm font-semibold text-gray-900 mb-2">{label}</p>
                        <p className="text-sm text-gray-600">Revenue: {formatCompactCurrency(data.revenue)}</p>
                        <p className="text-sm text-gray-600">Units: {formatCompactCurrency(data.units)}</p>
                        <p className="text-sm text-green-600">Growth: {formatPercentage(data.growth)}</p>
                        <p className="text-sm text-blue-600">Margin: {formatPercentage(data.margin)}</p>
                      </div>
                    )
                  }
                  return null
                }}
              />
              <Bar dataKey="revenue" fill="#6366f1" radius={[8, 8, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </GlassCard>
      </motion.div>
    </section>
  )
}