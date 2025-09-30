export interface MetricCard {
  id: string;
  title: string;
  value: number;
  change: number;
  changeType: 'increase' | 'decrease';
  unit?: string;
  format?: 'currency' | 'percentage' | 'number';
  color?: string;
  icon?: string;
}

export interface RevenueData {
  date: string;
  enterprise: number;
  startup: number;
  smb: number;
  total: number;
}

export interface GeographicRevenue {
  country: string;
  revenue: number;
  percentage: number;
  growth: number;
}

export interface ProductPerformance {
  product: string;
  revenue: number;
  units: number;
  growth: number;
  margin: number;
}

export interface FinancialHealth {
  month: string;
  burnRate: number;
  cashRunway: number;
  grossMargin: number;
  netMargin: number;
  operatingCashFlow: number;
  investingCashFlow: number;
  financingCashFlow: number;
}

export interface UnitEconomics {
  ltv: number;
  cac: number;
  ltvCacRatio: number;
  cacPaybackMonths: number;
  monthlyActiveCustomers: number;
  averageRevenuePerCustomer: number;
}

export interface CohortData {
  cohort: string;
  size: number;
  retentionRates: number[];
}

export interface Anomaly {
  id: string;
  type: 'expense' | 'revenue' | 'metric';
  severity: 'low' | 'medium' | 'high';
  title: string;
  description: string;
  value: number;
  expectedValue: number;
  date: string;
}

export interface Scenario {
  name: string;
  runwayMonths: number;
  fundingAmount: number;
  description: string;
}

export interface ExecutiveBriefing {
  title: string;
  points: string[];
  priority: 'high' | 'medium' | 'low';
  timestamp: string;
}

export interface DateRange {
  start: Date;
  end: Date;
  label: string;
}

export interface DashboardState {
  dateRange: DateRange;
  expandedCards: string[];
  selectedMetrics: string[];
  isLoading: boolean;
}

// New comprehensive metric types
export interface OperationalMetrics {
  serverUptime: number;
  responseTime: number;
  errorRate: number;
  customerSatisfaction: number;
  supportTickets: number;
  churnRate: number;
  netPromoterScore: number;
  activeUsers: number;
  newSignups: number;
  conversionRate: number;
}

export interface SalesMetrics {
  pipelineValue: number;
  dealsClosed: number;
  averageDealSize: number;
  salesCycleLength: number;
  leadConversionRate: number;
  quotaAttainment: number;
  salesTeamSize: number;
  forecastAccuracy: number;
}

export interface ProductMetrics {
  featureAdoptionRate: number;
  dailyActiveUsers: number;
  sessionDuration: number;
  bounceRate: number;
  pageViews: number;
  apiCalls: number;
  errorRate: number;
  performanceScore: number;
}

export interface CashFlowMetrics {
  operatingCashFlow: number;
  freeCashFlow: number;
  capitalExpenditures: number;
  workingCapital: number;
  debtService: number;
  cashConversionCycle: number;
  receivablesTurnover: number;
  inventoryTurnover: number;
}

export interface MarketMetrics {
  marketShare: number;
  competitorRevenue: number;
  marketGrowthRate: number;
  customerAcquisitionCost: number;
  customerLifetimeValue: number;
  brandAwareness: number;
  marketPenetration: number;
  totalAddressableMarket: number;
}