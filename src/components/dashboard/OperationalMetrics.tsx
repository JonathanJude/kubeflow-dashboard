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
  Legend
} from 'recharts'
import { GlassCard } from '@/components/ui/GlassCard'
import { formatPercentage, formatNumber } from '@/lib/utils'
import { operationalTrends, operationalMetricsData } from '@/data/mockData'
import {
  Server,
  Zap,
  Users,
  MessageSquare,
  TrendingDown,
  ThumbsUp
} from 'lucide-react'

export function OperationalMetrics() {
  const [selectedMetric, setSelectedMetric] = useState<string>('uptime')

  const OperationalTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white/95 backdrop-blur-lg p-4 rounded-xl shadow-xl border border-white/20">
          <p className="text-sm font-semibold text-gray-900 mb-2">{label}</p>
          {payload.map((entry: any, index: number) => (
            <p key={index} className="text-sm" style={{ color: entry.color }}>
              {entry.name}: {entry.name.includes('Rate') || entry.name.includes('Satisfaction')
                ? formatPercentage(entry.value)
                : entry.name.includes('Time')
                ? `${entry.value}ms`
                : formatNumber(entry.value)
              }
            </p>
          ))}
        </div>
      )
    }
    return null
  }

  const getHealthStatus = (value: number, type: string) => {
    if (type === 'uptime') return value >= 99.9 ? 'excellent' : value >= 99.5 ? 'good' : 'warning'
    if (type === 'responseTime') return value <= 100 ? 'excellent' : value <= 200 ? 'good' : 'warning'
    if (type === 'errorRate') return value <= 0.01 ? 'excellent' : value <= 0.05 ? 'good' : 'warning'
    if (type === 'satisfaction') return value >= 4.5 ? 'excellent' : value >= 4.0 ? 'good' : 'warning'
    return 'good'
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'excellent': return 'text-green-600 bg-green-50 border-green-200'
      case 'good': return 'text-blue-600 bg-blue-50 border-blue-200'
      case 'warning': return 'text-yellow-600 bg-yellow-50 border-yellow-200'
      default: return 'text-gray-600 bg-gray-50 border-gray-200'
    }
  }

  const keyMetrics = [
    {
      title: 'Server Uptime',
      value: operationalMetricsData.serverUptime,
      unit: '%',
      icon: Server,
      status: getHealthStatus(operationalMetricsData.serverUptime, 'uptime'),
      description: 'Last 30 days availability'
    },
    {
      title: 'Response Time',
      value: operationalMetricsData.responseTime,
      unit: 'ms',
      icon: Zap,
      status: getHealthStatus(operationalMetricsData.responseTime, 'responseTime'),
      description: 'Average API response time'
    },
    {
      title: 'Error Rate',
      value: operationalMetricsData.errorRate,
      unit: '%',
      icon: TrendingDown,
      status: getHealthStatus(operationalMetricsData.errorRate, 'errorRate'),
      description: 'System error percentage'
    },
    {
      title: 'Customer Satisfaction',
      value: operationalMetricsData.customerSatisfaction,
      unit: '/5.0',
      icon: ThumbsUp,
      status: getHealthStatus(operationalMetricsData.customerSatisfaction, 'satisfaction'),
      description: 'Average satisfaction score'
    },
    {
      title: 'Active Users',
      value: operationalMetricsData.activeUsers,
      unit: '',
      icon: Users,
      status: 'good',
      description: 'Monthly active users'
    },
    {
      title: 'Support Tickets',
      value: operationalMetricsData.supportTickets,
      unit: '',
      icon: MessageSquare,
      status: 'good',
      description: 'Open support tickets'
    }
  ]

  return (
    <section className="mb-8">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.6 }}
        className="flex items-center justify-between mb-6"
      >
        <h2 className="text-2xl font-bold text-white flex items-center">
          <Server className="w-6 h-6 mr-2" />
          Operational Metrics
        </h2>
        <div className="flex items-center space-x-2 text-white/80 text-sm">
          <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></span>
          <span>All systems operational</span>
        </div>
      </motion.div>

      {/* Key Performance Indicators */}
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-6">
        {keyMetrics.map((metric, index) => (
          <motion.div
            key={metric.title}
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.7 + index * 0.1 }}
            whileHover={{ y: -5, boxShadow: "0 20px 40px rgba(0,0,0,0.1)" }}
          >
            <GlassCard>
              <div className="text-center">
                <div className="flex justify-center mb-3">
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                    metric.status === 'excellent' ? 'bg-green-100' :
                    metric.status === 'good' ? 'bg-blue-100' :
                    'bg-yellow-100'
                  }`}>
                    <metric.icon className={`w-5 h-5 ${
                      metric.status === 'excellent' ? 'text-green-600' :
                      metric.status === 'good' ? 'text-blue-600' :
                      'text-yellow-600'
                    }`} />
                  </div>
                </div>
                <h3 className="text-sm font-medium text-gray-600 mb-1">{metric.title}</h3>
                <div className="text-xl font-bold text-gray-900">
                  {metric.value}{metric.unit}
                </div>
                <div className="mt-2">
                  <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(metric.status)}`}>
                    {metric.status}
                  </span>
                </div>
                <p className="text-xs text-gray-500 mt-2">{metric.description}</p>
              </div>
            </GlassCard>
          </motion.div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Operational Trends Chart */}
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.8 }}
        >
          <GlassCard>
            <div className="mb-4">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">System Performance Trends</h3>
              <p className="text-sm text-gray-600">6-month operational metrics overview</p>
            </div>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={operationalTrends}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                <XAxis dataKey="month" stroke="#6b7280" />
                <YAxis stroke="#6b7280" />
                <Tooltip content={<OperationalTooltip />} />
                <Legend />
                <Line
                  type="monotone"
                  dataKey="uptime"
                  stroke="#10b981"
                  strokeWidth={3}
                  dot={{ fill: '#10b981', strokeWidth: 2, r: 4 }}
                  name="Uptime %"
                />
                <Line
                  type="monotone"
                  dataKey="satisfaction"
                  stroke="#6366f1"
                  strokeWidth={3}
                  dot={{ fill: '#6366f1', strokeWidth: 2, r: 4 }}
                  name="Satisfaction"
                />
              </LineChart>
            </ResponsiveContainer>
          </GlassCard>
        </motion.div>

        {/* User Growth Chart */}
        <motion.div
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.9 }}
        >
          <GlassCard>
            <div className="mb-4">
              <h3 className="text-lg font-semibold text-gray-900 mb-2 flex items-center">
                <Users className="w-5 h-5 mr-2" />
                User Growth & Engagement
              </h3>
              <p className="text-sm text-gray-600">Active users and performance metrics</p>
            </div>
            <ResponsiveContainer width="100%" height={300}>
              <AreaChart data={operationalTrends}>
                <defs>
                  <linearGradient id="colorUsers" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#6366f1" stopOpacity={0.8}/>
                    <stop offset="95%" stopColor="#6366f1" stopOpacity={0.1}/>
                  </linearGradient>
                  <linearGradient id="colorResponse" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#f59e0b" stopOpacity={0.8}/>
                    <stop offset="95%" stopColor="#f59e0b" stopOpacity={0.1}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                <XAxis dataKey="month" stroke="#6b7280" />
                <YAxis stroke="#6b7280" />
                <Tooltip content={<OperationalTooltip />} />
                <Legend />
                <Area
                  type="monotone"
                  dataKey="activeUsers"
                  stroke="#6366f1"
                  fillOpacity={1}
                  fill="url(#colorUsers)"
                  strokeWidth={2}
                  name="Active Users"
                />
                <Line
                  type="monotone"
                  dataKey="responseTime"
                  stroke="#f59e0b"
                  strokeWidth={3}
                  dot={false}
                  name="Response Time (ms)"
                />
              </AreaChart>
            </ResponsiveContainer>
          </GlassCard>
        </motion.div>
      </div>

      {/* Additional Operational Metrics */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 1.0 }}
      >
        <GlassCard>
          <div className="mb-4">
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Customer Experience Metrics</h3>
            <p className="text-sm text-gray-600">NPS, churn, and satisfaction indicators</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="text-center">
              <div className="text-3xl font-bold text-gray-900 mb-2">{operationalMetricsData.netPromoterScore}</div>
              <div className="text-sm text-gray-600">Net Promoter Score</div>
              <div className="mt-2 w-full bg-gray-200 rounded-full h-2">
                <div className="bg-green-500 h-2 rounded-full" style={{ width: '72%' }}></div>
              </div>
              <div className="text-xs text-gray-500 mt-1">Excellent (72/100)</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-gray-900 mb-2">{operationalMetricsData.churnRate}%</div>
              <div className="text-sm text-gray-600">Monthly Churn Rate</div>
              <div className="mt-2 w-full bg-gray-200 rounded-full h-2">
                <div className="bg-yellow-500 h-2 rounded-full" style={{ width: '21%' }}></div>
              </div>
              <div className="text-xs text-gray-500 mt-1">Below industry average</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-gray-900 mb-2">{operationalMetricsData.newSignups}</div>
              <div className="text-sm text-gray-600">New Signups</div>
              <div className="mt-2 w-full bg-gray-200 rounded-full h-2">
                <div className="bg-blue-500 h-2 rounded-full" style={{ width: '89%' }}></div>
              </div>
              <div className="text-xs text-gray-500 mt-1">+23.5% vs last month</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-gray-900 mb-2">{operationalMetricsData.conversionRate}%</div>
              <div className="text-sm text-gray-600">Conversion Rate</div>
              <div className="mt-2 w-full bg-gray-200 rounded-full h-2">
                <div className="bg-purple-500 h-2 rounded-full" style={{ width: '62.5%' }}></div>
              </div>
              <div className="text-xs text-gray-500 mt-1">Above SaaS average</div>
            </div>
          </div>
        </GlassCard>
      </motion.div>
    </section>
  )
}