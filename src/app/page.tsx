'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { ExecutiveSummary } from '@/components/dashboard/ExecutiveSummary'
import { RevenueAnalytics } from '@/components/dashboard/RevenueAnalytics'
import { FinancialHealth } from '@/components/dashboard/FinancialHealth'
import { UnitEconomics } from '@/components/dashboard/UnitEconomics'
import { StrategicInsights } from '@/components/dashboard/StrategicInsights'
import { OperationalMetrics } from '@/components/dashboard/OperationalMetrics'
import { SalesPerformance } from '@/components/dashboard/SalesPerformance'
import { CustomerAnalytics } from '@/components/dashboard/CustomerAnalytics'
import { TeamProductivity } from '@/components/dashboard/TeamProductivity'
import { MarketAnalysis } from '@/components/dashboard/MarketAnalysis'
import { ExportControls } from '@/components/ui/ExportControls'
import {
  executiveMetrics,
  revenueTrends,
  geographicRevenue,
  productPerformance,
  financialHealth,
  unitEconomics,
  cohortData,
  anomalies,
  scenarios,
  executiveBriefings,
  operationalMetricsData,
  salesMetricsData,
  customerSegments
} from '@/data/mockData'

export default function Home() {
  const [dateRange, setDateRange] = useState(30)
  const [isLoading, setIsLoading] = useState(false)

  const handleDateRangeChange = (days: number) => {
    setIsLoading(true)
    setDateRange(days)
    // Simulate loading delay
    setTimeout(() => setIsLoading(false), 500)
  }

  // Prepare comprehensive export data
  const allExportData = {
    executive: executiveMetrics,
    revenue: {
      trends: revenueTrends,
      geographic: geographicRevenue,
      products: productPerformance
    },
    operational: operationalMetricsData,
    sales: salesMetricsData,
    customer: {
      segments: customerSegments,
      metrics: {
        totalCustomers: customerSegments.reduce((sum, seg) => sum + seg.customers, 0),
        avgSatisfaction: customerSegments.reduce((sum, seg) => sum + seg.satisfaction, 0) / customerSegments.length
      }
    },
    financial: {
      health: financialHealth,
      unitEconomics: unitEconomics
    }
  }

  return (
    <div className="min-h-screen">
      {/* Background with animated gradient */}
      <div className="fixed inset-0 bg-gradient-to-br from-purple-600 via-blue-600 to-indigo-700 animate-pulse-slow" />
      <div className="fixed inset-0 bg-gradient-to-tr from-blue-500/20 via-purple-500/20 to-pink-500/20 animate-pulse-slow" style={{ animationDelay: '2s' }} />

      {/* Floating background elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-20 w-72 h-72 bg-purple-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-float" />
        <div className="absolute top-40 right-20 w-72 h-72 bg-yellow-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-float" style={{ animationDelay: '1s' }} />
        <div className="absolute bottom-20 left-1/2 w-72 h-72 bg-pink-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-float" style={{ animationDelay: '2s' }} />
      </div>

      {/* Main content */}
      <div className="relative z-10">
        <div className="container mx-auto px-4 py-8 max-w-7xl">
          {isLoading && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center"
            >
              <div className="bg-white rounded-xl p-6 shadow-2xl">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"></div>
                <p className="mt-4 text-gray-600">Updating dashboard...</p>
              </div>
            </motion.div>
          )}

          {/* Global Export Controls */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mb-6 flex justify-end sm:justify-start xs:justify-center"
          >
            <ExportControls
              data={allExportData}
              category="all"
              showDateRange={true}
              className="bg-white/10 backdrop-blur-lg border-white/20"
            />
          </motion.div>

          {/* Dashboard Sections */}
          <ExecutiveSummary
            metrics={executiveMetrics}
            dateRange={dateRange}
            onDateRangeChange={handleDateRangeChange}
          />

          <RevenueAnalytics
            revenueData={revenueTrends}
            geographicData={geographicRevenue}
            productData={productPerformance}
          />

          <FinancialHealth
            financialData={financialHealth}
          />

          <OperationalMetrics />

          <SalesPerformance />

          <CustomerAnalytics />

          <TeamProductivity />

          <MarketAnalysis />

          <UnitEconomics
            unitEconomics={unitEconomics}
            cohortData={cohortData}
          />

          <StrategicInsights
            anomalies={anomalies}
            scenarios={scenarios}
            briefings={executiveBriefings}
          />
        </div>
      </div>

      {/* Footer */}
      <footer className="relative z-10 mt-16 py-8 border-t border-white/20">
        <div className="container mx-auto px-4 max-w-7xl">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="text-white/80 text-sm">
              © 2024 Kubeflow Technologies. Executive Finance Dashboard v1.0
            </div>
            <div className="flex items-center space-x-4 text-white/60 text-sm">
              <span>Last updated: {new Date().toLocaleString()}</span>
              <span>•</span>
              <span>Real-time data</span>
              <span>•</span>
              <span className="text-green-400">● All systems operational</span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
