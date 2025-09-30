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
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
  Legend } from 'recharts'
import { GlassCard } from '@/components/ui/GlassCard'
import { formatPercentage, formatNumber } from '@/lib/utils'
import { teamProductivity } from '@/data/mockData'
import {
  Users,
  Target,
  Zap,
  Heart,
  TrendingUp,
  Award
} from 'lucide-react'

export function TeamProductivity() {
  const [selectedTeam, setSelectedTeam] = useState<string>('all')

  // Team performance over time
  const teamPerformanceTrends = [
    { month: 'Jul', engineering: 78, sales: 112, marketing: 89, support: 95, product: 88, overall: 92 },
    { month: 'Aug', engineering: 82, sales: 118, marketing: 91, support: 93, product: 90, overall: 93 },
    { month: 'Sep', engineering: 85, sales: 122, marketing: 93, support: 94, product: 92, overall: 95 },
    { month: 'Oct', engineering: 88, sales: 125, marketing: 95, support: 96, product: 94, overall: 97 },
    { month: 'Nov', engineering: 91, sales: 128, marketing: 97, support: 97, product: 95, overall: 98 },
    { month: 'Dec', engineering: 92, sales: 124, marketing: 98, support: 98, product: 95, overall: 98 }
  ]

  // Employee satisfaction and engagement
  const employeeEngagement = [
    { category: 'Job Satisfaction', engineering: 4.3, sales: 4.6, marketing: 4.4, support: 4.2, product: 4.5, company: 4.4 },
    { category: 'Work-Life Balance', engineering: 4.1, sales: 3.8, marketing: 4.2, support: 4.0, product: 4.3, company: 4.1 },
    { category: 'Career Growth', engineering: 4.2, sales: 4.4, marketing: 4.1, support: 3.9, product: 4.3, company: 4.2 },
    { category: 'Management', engineering: 4.0, sales: 4.5, marketing: 4.3, support: 4.1, product: 4.2, company: 4.2 },
    { category: 'Compensation', engineering: 4.4, sales: 4.7, marketing: 4.2, support: 3.8, product: 4.4, company: 4.3 },
    { category: 'Company Culture', engineering: 4.3, sales: 4.6, marketing: 4.5, support: 4.3, product: 4.5, company: 4.4 }
  ]

  // Headcount growth
  const headcountGrowth = [
    { month: 'Jul', engineering: 15, sales: 10, marketing: 7, support: 5, product: 4, total: 41 },
    { month: 'Aug', engineering: 16, sales: 11, marketing: 7, support: 5, product: 5, total: 44 },
    { month: 'Sep', engineering: 17, sales: 11, marketing: 8, support: 6, product: 5, total: 47 },
    { month: 'Oct', engineering: 17, sales: 12, marketing: 8, support: 6, product: 5, total: 48 },
    { month: 'Nov', engineering: 18, sales: 12, marketing: 8, support: 6, product: 5, total: 49 },
    { month: 'Dec', engineering: 18, sales: 12, marketing: 8, support: 6, product: 5, total: 49 }
  ]

  const COLORS = ['#6366f1', '#8b5cf6', '#10b981', '#f59e0b', '#ef4444']

  const TeamTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white/95 backdrop-blur-lg p-4 rounded-xl shadow-xl border border-white/20">
          <p className="text-sm font-semibold text-gray-900 mb-2">{label}</p>
          {payload.map((entry: any, index: number) => (
            <p key={index} className="text-sm" style={{ color: entry.color }}>
              {entry.name}: {typeof entry.value === 'number' && entry.name.includes('Score')
                ? entry.value.toFixed(1)
                : entry.name.includes('Rate')
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

  const ProductivityTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload
      return (
        <div className="bg-white/95 backdrop-blur-lg p-4 rounded-xl shadow-xl border border-white/20">
          <p className="text-sm font-semibold text-gray-900 mb-2">{data.team}</p>
          <p className="text-sm text-gray-600">Efficiency: {formatPercentage(data.efficiency)}</p>
          <p className="text-sm text-gray-600">Satisfaction: {data.satisfaction.toFixed(1)}/5.0</p>
          <p className="text-sm text-gray-600">Headcount: {data.headcount}</p>
          {data.output && <p className="text-sm text-gray-600">Output: {formatNumber(data.output)}</p>}
        </div>
      )
    }
    return null
  }

  const getTeamColor = (team: string) => {
    switch (team) {
      case 'Engineering': return '#6366f1'
      case 'Sales': return '#10b981'
      case 'Marketing': return '#8b5cf6'
      case 'Support': return '#f59e0b'
      case 'Product': return '#ef4444'
      default: return '#6b7280'
    }
  }

  const totalHeadcount = teamProductivity.reduce((sum, team) => sum + team.headcount, 0)
  const avgSatisfaction = teamProductivity.reduce((sum, team) => sum + team.satisfaction, 0) / teamProductivity.length
  const avgEfficiency = teamProductivity.reduce((sum, team) => sum + team.efficiency, 0) / teamProductivity.length

  return (
    <section className="mb-8">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.9 }}
        className="flex items-center justify-between mb-6"
      >
        <h2 className="text-2xl font-bold text-white flex items-center">
          <Users className="w-6 h-6 mr-2" />
          Team Productivity
        </h2>
        <div className="flex items-center space-x-2 text-white/80 text-sm">
          <TrendingUp className="w-4 h-4 text-green-400" />
          <span>{avgEfficiency.toFixed(0)}% avg efficiency</span>
        </div>
      </motion.div>

      {/* Team Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 1.0 }}
        >
          <GlassCard>
            <div className="text-center">
              <div className="flex justify-center mb-3">
                <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center">
                  <Users className="w-5 h-5 text-blue-600" />
                </div>
              </div>
              <h3 className="text-sm font-medium text-gray-600 mb-1">Total Headcount</h3>
              <div className="text-2xl font-bold text-gray-900">{formatNumber(totalHeadcount)}</div>
              <p className="text-xs text-green-600 mt-2">+19% YoY</p>
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
                <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center">
                  <Target className="w-5 h-5 text-green-600" />
                </div>
              </div>
              <h3 className="text-sm font-medium text-gray-600 mb-1">Avg Efficiency</h3>
              <div className="text-2xl font-bold text-gray-900">{avgEfficiency.toFixed(0)}%</div>
              <p className="text-xs text-green-600 mt-2">+8% vs last quarter</p>
            </div>
          </GlassCard>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 1.1 }}
        >
          <GlassCard>
            <div className="text-center">
              <div className="flex justify-center mb-3">
                <div className="w-10 h-10 rounded-full bg-purple-100 flex items-center justify-center">
                  <Heart className="w-5 h-5 text-purple-600" />
                </div>
              </div>
              <h3 className="text-sm font-medium text-gray-600 mb-1">Avg Satisfaction</h3>
              <div className="text-2xl font-bold text-gray-900">{avgSatisfaction.toFixed(1)}/5.0</div>
              <p className="text-xs text-green-600 mt-2">+0.2 vs last quarter</p>
            </div>
          </GlassCard>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 1.15 }}
        >
          <GlassCard>
            <div className="text-center">
              <div className="flex justify-center mb-3">
                <div className="w-10 h-10 rounded-full bg-yellow-100 flex items-center justify-center">
                  <Award className="w-5 h-5 text-yellow-600" />
                </div>
              </div>
              <h3 className="text-sm font-medium text-gray-600 mb-1">Top Performer</h3>
              <div className="text-2xl font-bold text-gray-900">Sales</div>
              <p className="text-xs text-green-600 mt-2">124% attainment</p>
            </div>
          </GlassCard>
        </motion.div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        {/* Team Performance Comparison */}
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 1.2 }}
        >
          <GlassCard>
            <div className="mb-4">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Team Performance Metrics</h3>
              <p className="text-sm text-gray-600">Efficiency and satisfaction by team</p>
            </div>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={teamProductivity} margin={{ top: 20, right: 30, left: 20, bottom: 60 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                <XAxis
                  dataKey="team"
                  stroke="#6b7280"
                  angle={-45}
                  textAnchor="end"
                  height={80}
                  interval={0}
                  tick={{ fontSize: 10 }}
                />
                <YAxis stroke="#6b7280" />
                <Tooltip content={<ProductivityTooltip />} />
                <Bar dataKey="efficiency" fill="#6366f1" radius={[8, 8, 0, 0]} name="Efficiency %" />
              </BarChart>
            </ResponsiveContainer>

            {/* Team Quick Stats */}
            <div className="mt-4 grid grid-cols-2 gap-4">
              {teamProductivity.map((team) => (
                <div key={team.team} className="text-center p-3 bg-gray-50 rounded-lg">
                  <div className="text-lg font-bold text-gray-900" style={{ color: getTeamColor(team.team) }}>
                    {formatPercentage(team.efficiency)}
                  </div>
                  <div className="text-xs text-gray-600">{team.team}</div>
                  <div className="text-xs text-gray-500">{team.headcount} members</div>
                </div>
              ))}
            </div>
          </GlassCard>
        </motion.div>

        {/* Employee Engagement Radar */}
        <motion.div
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 1.3 }}
        >
          <GlassCard>
            <div className="mb-4">
              <h3 className="text-lg font-semibold text-gray-900 mb-2 flex items-center">
                <Heart className="w-5 h-5 mr-2" />
                Employee Engagement Analysis
              </h3>
              <p className="text-sm text-gray-600">Satisfaction metrics across categories</p>
            </div>
            <ResponsiveContainer width="100%" height={300}>
              <RadarChart data={employeeEngagement}>
                <PolarGrid stroke="#e5e7eb" />
                <PolarAngleAxis dataKey="category" stroke="#6b7280" />
                <PolarRadiusAxis
                  angle={90}
                  domain={[3.5, 5]}
                  stroke="#6b7280"
                />
                <Radar
                  name="Company Average"
                  dataKey="company"
                  stroke="#6366f1"
                  fill="#6366f1"
                  fillOpacity={0.6}
                  strokeWidth={2}
                />
                <Radar
                  name="Engineering"
                  dataKey="engineering"
                  stroke="#10b981"
                  fill="#10b981"
                  fillOpacity={0.3}
                  strokeWidth={2}
                />
                <Radar
                  name="Sales"
                  dataKey="sales"
                  stroke="#f59e0b"
                  fill="#f59e0b"
                  fillOpacity={0.3}
                  strokeWidth={2}
                />
                <Legend />
              </RadarChart>
            </ResponsiveContainer>
          </GlassCard>
        </motion.div>
      </div>

      {/* Performance Trends */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 1.4 }}
      >
        <GlassCard>
          <div className="mb-4">
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Team Performance Trends</h3>
            <p className="text-sm text-gray-600">Monthly efficiency scores by team</p>
          </div>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={teamPerformanceTrends}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
              <XAxis dataKey="month" stroke="#6b7280" />
              <YAxis stroke="#6b7280" domain={[70, 100]} />
              <Tooltip content={<TeamTooltip />} />
              <Legend />
              <Line type="monotone" dataKey="engineering" stroke="#6366f1" strokeWidth={3} name="Engineering" />
              <Line type="monotone" dataKey="sales" stroke="#10b981" strokeWidth={3} name="Sales" />
              <Line type="monotone" dataKey="marketing" stroke="#8b5cf6" strokeWidth={3} name="Marketing" />
              <Line type="monotone" dataKey="support" stroke="#f59e0b" strokeWidth={3} name="Support" />
              <Line type="monotone" dataKey="product" stroke="#ef4444" strokeWidth={3} name="Product" />
              <Line type="monotone" dataKey="overall" stroke="#6b7280" strokeWidth={3} strokeDasharray="5 5" name="Company Average" />
            </LineChart>
          </ResponsiveContainer>

          {/* Performance Summary */}
          <div className="mt-6 p-4 bg-gradient-to-r from-green-50 to-blue-50 rounded-xl border border-green-200">
            <div className="flex items-center justify-between">
              <div>
                <h4 className="font-medium text-gray-900">Q4 Performance Summary</h4>
                <p className="text-sm text-gray-600">All teams exceeding efficiency targets</p>
              </div>
              <div className="text-right">
                <div className="text-2xl font-bold text-green-600">98%</div>
                <div className="text-sm text-gray-600">Company average efficiency</div>
              </div>
            </div>
          </div>
        </GlassCard>
      </motion.div>
    </section>
  )
}