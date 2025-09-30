import {
  MetricCard,
  RevenueData,
  GeographicRevenue,
  ProductPerformance,
  FinancialHealth,
  UnitEconomics,
  CohortData,
  Anomaly,
  Scenario,
  ExecutiveBriefing
} from '@/types/finance';

// Executive Summary Metrics
export const executiveMetrics: MetricCard[] = [
  {
    id: 'mrr-growth',
    title: 'MRR Growth Rate',
    value: 23.5,
    change: 5.2,
    changeType: 'increase',
    unit: '%',
    format: 'percentage',
    color: 'success',
    icon: 'trending-up'
  },
  {
    id: 'cash-runway',
    title: 'Cash Runway',
    value: 18.5,
    change: -2.1,
    changeType: 'decrease',
    unit: 'months',
    format: 'number',
    color: 'warning',
    icon: 'clock'
  },
  {
    id: 'yoy-revenue',
    title: 'YoY Revenue Change',
    value: 145000,
    change: 89.2,
    changeType: 'increase',
    unit: '$',
    format: 'currency',
    color: 'success',
    icon: 'dollar-sign'
  },
  {
    id: 'enterprise-ar',
    title: 'Enterprise ARR',
    value: 2840000,
    change: 156.3,
    changeType: 'increase',
    unit: '$',
    format: 'currency',
    color: 'primary',
    icon: 'briefcase'
  }
];

// Revenue Analytics Data
export const revenueTrends: RevenueData[] = [
  { date: '2024-01', enterprise: 45000, startup: 28000, smb: 15000, total: 88000 },
  { date: '2024-02', enterprise: 52000, startup: 31000, smb: 17000, total: 100000 },
  { date: '2024-03', enterprise: 58000, startup: 35000, smb: 19000, total: 112000 },
  { date: '2024-04', enterprise: 65000, startup: 38000, smb: 21000, total: 124000 },
  { date: '2024-05', enterprise: 72000, startup: 42000, smb: 24000, total: 138000 },
  { date: '2024-06', enterprise: 78000, startup: 46000, smb: 26000, total: 150000 },
  { date: '2024-07', enterprise: 85000, startup: 51000, smb: 29000, total: 165000 },
  { date: '2024-08', enterprise: 92000, startup: 55000, smb: 32000, total: 179000 },
  { date: '2024-09', enterprise: 98000, startup: 59000, smb: 35000, total: 192000 },
  { date: '2024-10', enterprise: 105000, startup: 63000, smb: 38000, total: 206000 },
  { date: '2024-11', enterprise: 112000, startup: 67000, smb: 41000, total: 220000 },
  { date: '2024-12', enterprise: 118000, startup: 71000, smb: 44000, total: 233000 }
];

export const geographicRevenue: GeographicRevenue[] = [
  { country: 'United States', revenue: 185000, percentage: 82.1, growth: 94.5 },
  { country: 'United Kingdom', revenue: 18000, percentage: 8.0, growth: 67.3 },
  { country: 'Germany', revenue: 9500, percentage: 4.2, growth: 89.1 },
  { country: 'Canada', revenue: 6200, percentage: 2.8, growth: 123.4 },
  { country: 'Australia', revenue: 3800, percentage: 1.7, growth: 45.6 },
  { country: 'Netherlands', revenue: 2500, percentage: 1.1, growth: 78.9 },
  { country: 'France', revenue: 2000, percentage: 0.9, growth: 56.2 },
  { country: 'Japan', revenue: 1500, percentage: 0.7, growth: 234.5 }
];

export const productPerformance: ProductPerformance[] = [
  { product: 'Premium Kubernetes Suite', revenue: 145000, units: 145, growth: 167.8, margin: 78.5 },
  { product: 'DevOps Automation Kit', revenue: 58000, units: 290, growth: 89.3, margin: 65.2 },
  { product: 'Basic Monitoring Tools', revenue: 22000, units: 2200, growth: 23.5, margin: 45.8 },
  { product: 'Enterprise Security Bundle', revenue: 185000, units: 37, growth: 245.6, margin: 85.3 },
  { product: 'Professional Services', revenue: 42000, units: 28, growth: 156.7, margin: 55.4 },
  { product: 'Training & Certification', revenue: 18000, units: 120, growth: 89.1, margin: 72.6 }
];

// Financial Health Data
export const financialHealth: FinancialHealth[] = [
  { month: '2024-07', burnRate: 285000, cashRunway: 24.5, grossMargin: 68.5, netMargin: -15.2, operatingCashFlow: -125000, investingCashFlow: -45000, financingCashFlow: 2000000 },
  { month: '2024-08', burnRate: 295000, cashRunway: 23.2, grossMargin: 69.1, netMargin: -12.8, operatingCashFlow: -118000, investingCashFlow: -52000, financingCashFlow: 0 },
  { month: '2024-09', burnRate: 305000, cashRunway: 21.8, grossMargin: 70.2, netMargin: -10.5, operatingCashFlow: -105000, investingCashFlow: -38000, financingCashFlow: 0 },
  { month: '2024-10', burnRate: 315000, cashRunway: 20.4, grossMargin: 71.5, netMargin: -8.2, operatingCashFlow: -98000, investingCashFlow: -41000, financingCashFlow: 0 },
  { month: '2024-11', burnRate: 325000, cashRunway: 19.1, grossMargin: 72.3, netMargin: -5.9, operatingCashFlow: -92000, investingCashFlow: -35000, financingCashFlow: 0 },
  { month: '2024-12', burnRate: 335000, cashRunway: 18.5, grossMargin: 73.1, netMargin: -3.8, operatingCashFlow: -85000, investingCashFlow: -42000, financingCashFlow: 0 }
];

// Unit Economics Data
export const unitEconomics: UnitEconomics = {
  ltv: 48500,
  cac: 8900,
  ltvCacRatio: 5.45,
  cacPaybackMonths: 8.2,
  monthlyActiveCustomers: 342,
  averageRevenuePerCustomer: 2890
};

export const cohortData: CohortData[] = [
  { cohort: 'Q1 2024', size: 45, retentionRates: [100, 92, 88, 85, 82, 79] },
  { cohort: 'Q2 2024', size: 67, retentionRates: [100, 94, 91, 87, 84, 81] },
  { cohort: 'Q3 2024', size: 89, retentionRates: [100, 95, 92, 89, 86, 84] },
  { cohort: 'Q4 2024', size: 141, retentionRates: [100, 96, 93, 91, 88, 0] }
];

// Anomalies and Insights
export const anomalies: Anomaly[] = [
  {
    id: '1',
    type: 'expense',
    severity: 'high',
    title: 'Cloud Infrastructure Spike',
    description: 'AWS costs increased 45% due to unexpected data transfer charges',
    value: 28500,
    expectedValue: 19600,
    date: '2024-12-15'
  },
  {
    id: '2',
    type: 'revenue',
    severity: 'medium',
    title: 'Enterprise Deal Acceleration',
    description: 'Fortune 500 deal closed 2 months ahead of schedule',
    value: 185000,
    expectedValue: 92500,
    date: '2024-12-10'
  },
  {
    id: '3',
    type: 'metric',
    severity: 'low',
    title: 'Support Ticket Volume',
    description: '20% increase in support tickets from new enterprise customers',
    value: 156,
    expectedValue: 130,
    date: '2024-12-08'
  }
];

export const scenarios: Scenario[] = [
  {
    name: 'Current Burn Rate',
    runwayMonths: 18.5,
    fundingAmount: 0,
    description: 'Maintaining current spending patterns with no additional funding'
  },
  {
    name: 'Optimistic Growth',
    runwayMonths: 24.2,
    fundingAmount: 1500000,
    description: 'Series B funding with increased investment in sales and marketing'
  },
  {
    name: 'Conservative Scenario',
    runwayMonths: 14.8,
    fundingAmount: 0,
    description: 'Reducing burn rate by 20% through operational efficiencies'
  },
  {
    name: 'Aggressive Expansion',
    runwayMonths: 12.3,
    fundingAmount: 3000000,
    description: 'Rapid team expansion and market penetration strategy'
  }
];

export const executiveBriefings: ExecutiveBriefing[] = [
  {
    title: 'Q4 2024 Executive Summary',
    points: [
      'Revenue increased 89% YoY to $2.28M ARR',
      'Enterprise customer base grew 156% to 37 customers',
      'Cash runway at 18.5 months with current burn rate',
      'LTV:CAC ratio improved to 5.45x, well above SaaS benchmark',
      'Geographic expansion showing strong results in UK market'
    ],
    priority: 'high',
    timestamp: '2024-12-20T09:00:00Z'
  },
  {
    title: 'Strategic Recommendations',
    points: [
      'Consider Series B fundraising in Q1 2025 to extend runway',
      'Invest in customer success to improve retention for enterprise accounts',
      'Explore pricing optimization for SMB segment',
      'Monitor cloud infrastructure costs for optimization opportunities',
      'Plan geographic expansion to Germany and France in 2025'
    ],
    priority: 'medium',
    timestamp: '2024-12-20T08:30:00Z'
  },
  {
    title: 'Risk Mitigation Priorities',
    points: [
      'Address cloud infrastructure cost anomalies immediately',
      'Develop contingency plan for key customer dependencies',
      'Implement automated anomaly detection for all financial metrics',
      'Establish customer advisory board for enterprise segment feedback',
      'Create competitive analysis framework for market positioning'
    ],
    priority: 'low',
    timestamp: '2024-12-20T08:15:00Z'
  }
];

// New comprehensive metrics data
export const operationalMetricsData = {
  serverUptime: 99.97,
  responseTime: 145,
  errorRate: 0.02,
  customerSatisfaction: 4.6,
  supportTickets: 89,
  churnRate: 2.1,
  netPromoterScore: 72,
  activeUsers: 12450,
  newSignups: 892,
  conversionRate: 12.5
};

export const salesMetricsData = {
  pipelineValue: 4500000,
  dealsClosed: 23,
  averageDealSize: 125000,
  salesCycleLength: 65,
  leadConversionRate: 18.5,
  quotaAttainment: 124,
  salesTeamSize: 12,
  forecastAccuracy: 89
};

export const productMetricsData = {
  featureAdoptionRate: 67.5,
  dailyActiveUsers: 8934,
  sessionDuration: 28,
  bounceRate: 23.5,
  pageViews: 156000,
  apiCalls: 28900000,
  errorRate: 0.15,
  performanceScore: 94
};

export const cashFlowMetricsData = {
  operatingCashFlow: -85000,
  freeCashFlow: -125000,
  capitalExpenditures: 42000,
  workingCapital: 850000,
  debtService: 15000,
  cashConversionCycle: 45,
  receivablesTurnover: 8.9,
  inventoryTurnover: 156
};

export const marketMetricsData = {
  marketShare: 2.8,
  competitorRevenue: 285000000,
  marketGrowthRate: 34.5,
  customerAcquisitionCost: 8900,
  customerLifetimeValue: 48500,
  brandAwareness: 23.5,
  marketPenetration: 8.9,
  totalAddressableMarket: 850000000
};

// Additional executive metrics for expanded dashboard
export const expandedExecutiveMetrics = [
  ...executiveMetrics,
  {
    id: 'nps-score',
    title: 'Net Promoter Score',
    value: 72,
    change: 8.5,
    changeType: 'increase' as const,
    unit: '',
    format: 'number' as const,
    color: 'success',
    icon: 'trending-up'
  },
  {
    id: 'server-uptime',
    title: 'Server Uptime',
    value: 99.97,
    change: 0.03,
    changeType: 'increase' as const,
    unit: '%',
    format: 'percentage' as const,
    color: 'success',
    icon: 'activity'
  },
  {
    id: 'active-users',
    title: 'Active Users',
    value: 12450,
    change: 23.5,
    changeType: 'increase' as const,
    unit: '',
    format: 'number' as const,
    color: 'primary',
    icon: 'users'
  },
  {
    id: 'pipeline-value',
    title: 'Sales Pipeline',
    value: 4500000,
    change: 67.8,
    changeType: 'increase' as const,
    unit: '$',
    format: 'currency' as const,
    color: 'secondary',
    icon: 'target'
  },
  {
    id: 'churn-rate',
    title: 'Monthly Churn Rate',
    value: 2.1,
    change: -0.5,
    changeType: 'decrease' as const,
    unit: '%',
    format: 'percentage' as const,
    color: 'warning',
    icon: 'trending-down'
  },
  {
    id: 'customer-satisfaction',
    title: 'Customer Satisfaction',
    value: 4.6,
    change: 0.3,
    changeType: 'increase' as const,
    unit: '/5.0',
    format: 'number' as const,
    color: 'success',
    icon: 'smile'
  },
  {
    id: 'market-share',
    title: 'Market Share',
    value: 2.8,
    change: 0.9,
    changeType: 'increase' as const,
    unit: '%',
    format: 'percentage' as const,
    color: 'primary',
    icon: 'globe'
  },
  {
    id: 'response-time',
    title: 'API Response Time',
    value: 145,
    change: -23.5,
    changeType: 'decrease' as const,
    unit: 'ms',
    format: 'number' as const,
    color: 'success',
    icon: 'zap'
  }
];

// Time series data for operational metrics
export const operationalTrends = [
  { month: '2024-07', uptime: 99.95, responseTime: 189, errorRate: 0.08, satisfaction: 4.2, activeUsers: 8934 },
  { month: '2024-08', uptime: 99.96, responseTime: 167, errorRate: 0.05, satisfaction: 4.3, activeUsers: 9821 },
  { month: '2024-09', uptime: 99.96, responseTime: 156, errorRate: 0.04, satisfaction: 4.4, activeUsers: 10845 },
  { month: '2024-10', uptime: 99.97, responseTime: 152, errorRate: 0.03, satisfaction: 4.5, activeUsers: 11623 },
  { month: '2024-11', uptime: 99.97, responseTime: 148, errorRate: 0.02, satisfaction: 4.5, activeUsers: 12189 },
  { month: '2024-12', uptime: 99.97, responseTime: 145, errorRate: 0.02, satisfaction: 4.6, activeUsers: 12450 }
];

// Sales funnel data
export const salesFunnelData = [
  { stage: 'Awareness', count: 25000, conversionRate: 100, value: 25000000 },
  { stage: 'Interest', count: 8900, conversionRate: 35.6, value: 8900000 },
  { stage: 'Evaluation', count: 3450, conversionRate: 13.8, value: 3450000 },
  { stage: 'Proposal', count: 892, conversionRate: 3.6, value: 892000 },
  { stage: 'Negotiation', count: 234, conversionRate: 0.9, value: 234000 },
  { stage: 'Closed Won', count: 89, conversionRate: 0.4, value: 89000 }
];

// Customer segmentation data
export const customerSegments = [
  { segment: 'Enterprise', customers: 37, revenue: 1450000, growth: 156.7, satisfaction: 4.7, avgContractValue: 39189 },
  { segment: 'Mid-Market', customers: 89, revenue: 585000, growth: 89.3, satisfaction: 4.5, avgContractValue: 6573 },
  { segment: 'Small Business', customers: 156, revenue: 234000, growth: 45.6, satisfaction: 4.3, avgContractValue: 1500 },
  { segment: 'Startup', customers: 60, revenue: 89000, growth: 234.5, satisfaction: 4.6, avgContractValue: 1483 }
];

// Team productivity metrics
export const teamProductivity = [
  { team: 'Engineering', velocity: 89, efficiency: 92, satisfaction: 4.3, headcount: 18, output: 234 },
  { team: 'Sales', quotaAttainment: 124, pipelineGenerated: 4500000, satisfaction: 4.6, headcount: 12, dealsClosed: 23, efficiency: 124 },
  { team: 'Marketing', leadsGenerated: 25000, conversionRate: 12.5, satisfaction: 4.4, headcount: 8, campaigns: 45, efficiency: 89 },
  { team: 'Support', ticketsResolved: 892, satisfactionScore: 4.6, satisfaction: 4.2, headcount: 6, responseTime: 2.5, efficiency: 95 },
  { team: 'Product', featuresShipped: 23, adoptionRate: 67.5, satisfaction: 4.5, headcount: 5, initiatives: 12, efficiency: 88 }
];

// Competitive analysis data
export const competitiveAnalysis = [
  { competitor: 'KubernetesPro', marketShare: 8.5, revenue: 85000000, growth: 45.6, strengths: 'Established brand', weaknesses: 'Higher pricing' },
  { competitor: 'DevFlow Inc', marketShare: 6.2, revenue: 62000000, growth: 67.8, strengths: 'Better features', weaknesses: 'Poor support' },
  { competitor: 'CloudOps Tools', marketShare: 4.1, revenue: 41000000, growth: 23.4, strengths: 'Lower pricing', weaknesses: 'Limited features' },
  { competitor: 'ContainerFlow', marketShare: 2.9, revenue: 29000000, growth: 89.1, strengths: 'Innovative', weaknesses: 'New player' },
  { competitor: 'KubeDash', marketShare: 2.8, revenue: 28000000, growth: 156.3, strengths: 'Great UI', weaknesses: 'Scaling issues' }
];

// Feature adoption data
export const featureAdoption = [
  { feature: 'Auto-scaling', adoptionRate: 89, users: 11234, satisfaction: 4.7, revenueImpact: 450000 },
  { feature: 'Monitoring Dashboard', adoptionRate: 78, users: 9834, satisfaction: 4.5, revenueImpact: 234000 },
  { feature: 'CI/CD Integration', adoptionRate: 67, users: 8456, satisfaction: 4.4, revenueImpact: 189000 },
  { feature: 'Security Scanning', adoptionRate: 56, users: 7067, satisfaction: 4.6, revenueImpact: 156000 },
  { feature: 'Multi-cloud Support', adoptionRate: 45, users: 5678, satisfaction: 4.3, revenueImpact: 123000 },
  { feature: 'Cost Optimization', adoptionRate: 34, users: 4289, satisfaction: 4.5, revenueImpact: 89000 }
];