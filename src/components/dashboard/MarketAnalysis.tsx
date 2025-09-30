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
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar,
  Legend } from 'recharts'
import { GlassCard } from '@/components/ui/GlassCard'
import { formatCompactCurrency, formatPercentage, formatNumber } from '@/lib/utils'
import { competitiveAnalysis, marketMetricsData } from '@/data/mockData'
import {
  Globe,
  TrendingUp,
  Target,
  Award,
  Users,
  DollarSign
} from 'lucide-react'

export function MarketAnalysis() {
  const [selectedMetric, setSelectedMetric] = useState<string>('marketShare')

  // Market growth trends
  const marketGrowthTrends = [
    { quarter: 'Q1 2023', totalMarket: 450000000, ourRevenue: 890000, marketShare: 0.2, growthRate: 25.6 },
    { quarter: 'Q2 2023', totalMarket: 520000000, ourRevenue: 1230000, marketShare: 0.24, growthRate: 38.2 },
    { quarter: 'Q3 2023', totalMarket: 580000000, ourRevenue: 1560000, marketShare: 0.27, growthRate: 26.8 },
    { quarter: 'Q4 2023', totalMarket: 650000000, ourRevenue: 1890000, marketShare: 0.29, growthRate: 21.2 },
    { quarter: 'Q1 2024', totalMarket: 720000000, ourRevenue: 2340000, marketShare: 0.33, growthRate: 23.8 },
    { quarter: 'Q2 2024', totalMarket: 780000000, ourRevenue: 2850000, marketShare: 0.37, growthRate: 21.8 }
  ]

  // Competitive positioning
  const competitivePositioning = [
    { metric: 'Market Share', kubeflow: 2.8, industry: 5.2, leader: 12.5 },
    { metric: 'Growth Rate', kubeflow: 156.3, industry: 45.6, leader: 89.1 },
    { metric: 'Customer Satisfaction', kubeflow: 4.6, industry: 4.2, leader: 4.8 },
    { metric: 'Innovation Score', kubeflow: 8.5, industry: 6.8, leader: 9.2 },
    { metric: 'Brand Awareness', kubeflow: 23.5, industry: 35.6, leader: 68.9 },
    { metric: 'Price Competitiveness', kubeflow: 7.8, industry: 6.5, leader: 5.2 }
  ]

  // Market opportunity analysis
  const marketOpportunities = [
    { segment: 'Enterprise Kubernetes', currentRevenue: 1450000, marketSize: 250000000, penetration: 0.58, growth: 89.1 },
    { segment: 'Multi-Cloud Management', currentRevenue: 585000, marketSize: 180000000, penetration: 0.33, growth: 156.7 },
    { segment: 'DevOps Automation', currentRevenue: 234000, marketSize: 320000000, penetration: 0.07, growth: 234.5 },
    { segment: 'Security & Compliance', currentRevenue: 89000, marketSize: 150000000, penetration: 0.06, growth: 178.9 },
    { segment: 'Cost Optimization', currentRevenue: 0, marketSize: 95000000, penetration: 0, growth: 0 }
  ]

  const COLORS = ['#6366f1', '#8b5cf6', '#10b981', '#f59e0b', '#ef4444']

  const MarketTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white/95 backdrop-blur-lg p-4 rounded-xl shadow-xl border border-white/20">
          <p className="text-sm font-semibold text-gray-900 mb-2">{label}</p>
          {payload.map((entry: any, index: number) => (
            <p key={index} className="text-sm" style={{ color: entry.color }}>
              {entry.name}: {typeof entry.value === 'number' && entry.name.includes('Share')
                ? formatPercentage(entry.value)
                : entry.name.includes('Revenue')
                ? formatCompactCurrency(entry.value)
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

  const CompetitorTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload
      return (
        <div className="bg-white/95 backdrop-blur-lg p-4 rounded-xl shadow-xl border border-white/20">
          <p className="text-sm font-semibold text-gray-900 mb-2">{data.competitor}</p>
          <p className="text-sm text-gray-600">Market Share: {formatPercentage(data.marketShare)}</p>
          <p className="text-sm text-gray-600">Revenue: {formatCompactCurrency(data.revenue)}</p>
          <p className="text-sm text-green-600">Growth: {formatPercentage(data.growth)}</p>
          <p className="text-xs text-blue-600 mt-1">Strengths: {data.strengths}</p>
          <p className="text-xs text-red-600">Weaknesses: {data.weaknesses}</p>
        </div>
      )
    }
    return null
  }

  const OpportunityTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload
      return (
        <div className="bg-white/95 backdrop-blur-lg p-4 rounded-xl shadow-xl border border-white/20">
          <p className="text-sm font-semibold text-gray-900 mb-2">{data.segment}</p>
          <p className="text-sm text-gray-600">Current Revenue: {formatCompactCurrency(data.currentRevenue)}</p>
          <p className="text-sm text-gray-600">Market Size: {formatCompactCurrency(data.marketSize)}</p>
          <p className="text-sm text-blue-600">Penetration: {formatPercentage(data.penetration)}</p>
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
        transition={{ duration: 0.8, delay: 1.0 }}
        className="flex items-center justify-between mb-6"
      >
        <h2 className="text-2xl font-bold text-white flex items-center">
          <Globe className="w-6 h-6 mr-2" />
          Market Analysis
        </h2>
        <div className="flex items-center space-x-2 text-white/80 text-sm">
          <TrendingUp className="w-4 h-4 text-green-400" />
          <span>156% growth vs market</span>
        </div>
      </motion.div>

      {/* Market Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 1.1 }}
        >
          <GlassCard>
            <div className="text-center">
              <div className="flex justify-center mb-3">
                <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center">
                  <Target className="w-5 h-5 text-blue-600" />
                </div>
              </div>
              <h3 className="text-sm font-medium text-gray-600 mb-1">Market Share</h3>
              <div className="text-2xl font-bold text-gray-900">{formatPercentage(marketMetricsData.marketShare)}</div>
              <p className="text-xs text-green-600 mt-2">+0.9% pts</p>
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
                <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center">
                  <TrendingUp className="w-5 h-5 text-green-600" />
                </div>
              </div>
              <h3 className="text-sm font-medium text-gray-600 mb-1">Market Growth</h3>
              <div className="text-2xl font-bold text-gray-900">{formatPercentage(marketMetricsData.marketGrowthRate)}</div>
              <p className="text-xs text-green-600 mt-2">Above average</p>
            </div>
          </GlassCard>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 1.2 }}
        >
          <GlassCard>
            <div className="text-center">
              <div className="flex justify-center mb-3">
                <div className="w-10 h-10 rounded-full bg-purple-100 flex items-center justify-center">
                  <DollarSign className="w-5 h-5 text-purple-600" />
                </div>
              </div>
              <h3 className="text-sm font-medium text-gray-600 mb-1">TAM</h3>
              <div className="text-2xl font-bold text-gray-900">$850M</div>
              <p className="text-xs text-green-600 mt-2">+34% YoY</p>
            </div>
          </GlassCard>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 1.25 }}
        >
          <GlassCard>
            <div className="text-center">
              <div className="flex justify-center mb-3">
                <div className="w-10 h-10 rounded-full bg-yellow-100 flex items-center justify-center">
                  <Award className="w-5 h-5 text-yellow-600" />
                </div>
              </div>
              <h3 className="text-sm font-medium text-gray-600 mb-1">Brand Awareness</h3>
              <div className="text-2xl font-bold text-gray-900">{formatPercentage(marketMetricsData.brandAwareness)}</div>
              <p className="text-xs text-green-600 mt-2">+5% pts</p>
            </div>
          </GlassCard>
        </motion.div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        {/* Competitive Landscape */}
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 1.3 }}
        >
          <GlassCard>
            <div className="mb-4">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Competitive Landscape</h3>
              <p className="text-sm text-gray-600">Market position vs key competitors</p>
            </div>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={competitiveAnalysis} margin={{ top: 20, right: 30, left: 20, bottom: 60 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                <XAxis
                  dataKey="competitor"
                  stroke="#6b7280"
                  angle={-45}
                  textAnchor="end"
                  height={80}
                  interval={0}
                  tick={{ fontSize: 10 }}
                />
                <YAxis stroke="#6b7280" />
                <Tooltip content={<CompetitorTooltip />} />
                <Bar dataKey="marketShare" fill="#6366f1" radius={[8, 8, 0, 0]} name="Market Share %" />
              </BarChart>
            </ResponsiveContainer>
          </GlassCard>
        </motion.div>

        {/* Market Growth Trends */}
        <motion.div
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 1.4 }}
        >
          <GlassCard>
            <div className="mb-4">
              <h3 className="text-lg font-semibold text-gray-900 mb-2 flex items-center">
                <TrendingUp className="w-5 h-5 mr-2" />
                Market Growth Trends
              </h3>
              <p className="text-sm text-gray-600">Our growth vs total market growth</p>
            </div>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={marketGrowthTrends}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                <XAxis dataKey="quarter" stroke="#6b7280" />
                <YAxis stroke="#6b7280" yAxisId="left" />
                <YAxis stroke="#6b7280" yAxisId="right" orientation="right" />
                <Tooltip content={<MarketTooltip />} />
                <Legend />
                <Line
                  yAxisId="left"
                  type="monotone"
                  dataKey="marketShare"
                  stroke="#6366f1"
                  strokeWidth={3}
                  name="Our Market Share %"
                />
                <Line
                  yAxisId="right"
                  type="monotone"
                  dataKey="growthRate"
                  stroke="#10b981"
                  strokeWidth={3}
                  name="Our Growth Rate %"
                />
              </LineChart>
            </ResponsiveContainer>
          </GlassCard>
        </motion.div>
      </div>

      {/* Market Opportunities */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 1.5 }}
      >
        <GlassCard>
          <div className="mb-4">
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Market Opportunity Analysis</h3>
            <p className="text-sm text-gray-600">Potential expansion segments and penetration rates</p>
          </div>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={marketOpportunities} dataKey="currentRevenue">
              <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
              <XAxis dataKey="segment" stroke="#6b7280" />
              <YAxis stroke="#6b7280" />
              <Tooltip content={<OpportunityTooltip />} />
              <Bar dataKey="currentRevenue" fill="#6366f1" />
            </BarChart>
          </ResponsiveContainer>

          {/* Opportunity Summary */}
          <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center p-4 bg-blue-50 rounded-xl">
              <div className="text-2xl font-bold text-blue-600">$795M</div>
              <div className="text-sm text-gray-600">Total Addressable Market</div>
              <div className="text-xs text-gray-500 mt-1">Current + opportunity segments</div>
            </div>
            <div className="text-center p-4 bg-green-50 rounded-xl">
              <div className="text-2xl font-bold text-green-600">15.2%</div>
              <div className="text-sm text-gray-600">Average Penetration</div>
              <div className="text-xs text-gray-500 mt-1">Significant room for growth</div>
            </div>
            <div className="text-center p-4 bg-purple-50 rounded-xl">
              <div className="text-2xl font-bold text-purple-600">167.8%</div>
              <div className="text-sm text-gray-600">Avg Opportunity Growth</div>
              <div className="text-xs text-gray-500 mt-1">High-growth market segments</div>
            </div>
          </div>
        </GlassCard>
      </motion.div>
    </section>
  )
}