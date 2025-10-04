import { saveAs } from 'file-saver'
import jsPDF from 'jspdf'
import * as XLSX from 'xlsx'
import type {
  MetricCard,
  RevenueData,
  GeographicRevenue,
  ProductPerformance,
  OperationalMetrics,
  SalesMetrics,
  FinancialHealth,
  UnitEconomics
} from '@/types/finance'

export type ExportFormat = 'csv' | 'json' | 'pdf' | 'excel'
export type MetricCategory = 'executive' | 'revenue' | 'operational' | 'sales' | 'customer' | 'financial' | 'all'

export interface ExportOptions {
  format: ExportFormat
  category: MetricCategory
  dateRange?: {
    start: Date
    end: Date
  }
  includeCharts?: boolean
  filename?: string
}

export interface ExportableData {
  executive: MetricCard[]
  revenue: {
    trends: RevenueData[]
    geographic: GeographicRevenue[]
    products: ProductPerformance[]
  }
  operational: OperationalMetrics
  sales: SalesMetrics
  customer: any
  financial: {
    health: FinancialHealth[]
    unitEconomics: UnitEconomics
  }
}

class ExportService {
  /**
   * Main export function that routes to appropriate format handlers
   */
  async exportData(data: ExportableData, options: ExportOptions): Promise<void> {
    const { format, category, filename } = options
    const timestamp = new Date().toISOString().split('T')[0]
    const defaultFilename = `metrics-${category}-${timestamp}`
    const finalFilename = filename || defaultFilename

    try {
      switch (format) {
        case 'csv':
          await this.exportToCSV(data, category, finalFilename)
          break
        case 'json':
          await this.exportToJSON(data, category, finalFilename)
          break
        case 'pdf':
          await this.exportToPDF(data, category, finalFilename, options)
          break
        case 'excel':
          await this.exportToExcel(data, category, finalFilename, options)
          break
        default:
          throw new Error(`Unsupported export format: ${format}`)
      }
    } catch (error) {
      console.error('Export failed:', error)
      throw new Error(`Failed to export data: ${error instanceof Error ? error.message : 'Unknown error'}`)
    }
  }

  /**
   * Export to CSV format
   */
  private async exportToCSV(data: ExportableData, category: MetricCategory, filename: string): Promise<void> {
    let csvContent = ''

    switch (category) {
      case 'executive':
        csvContent = this.generateExecutiveCSV(data.executive)
        break
      case 'revenue':
        csvContent = this.generateRevenueCSV(data.revenue)
        break
      case 'operational':
        csvContent = this.generateOperationalCSV(data.operational)
        break
      case 'sales':
        csvContent = this.generateSalesCSV(data.sales)
        break
      case 'customer':
        csvContent = this.generateCustomerCSV(data.customer)
        break
      case 'financial':
        csvContent = this.generateFinancialCSV(data.financial)
        break
      case 'all':
        csvContent = this.generateAllDataCSV(data)
        break
      default:
        throw new Error(`Unknown category: ${category}`)
    }

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8' })
    saveAs(blob, `${filename}.csv`)
  }

  /**
   * Export to JSON format
   */
  private async exportToJSON(data: ExportableData, category: MetricCategory, filename: string): Promise<void> {
    let exportData: any = {}

    switch (category) {
      case 'executive':
        exportData = { executive: data.executive }
        break
      case 'revenue':
        exportData = { revenue: data.revenue }
        break
      case 'operational':
        exportData = { operational: data.operational }
        break
      case 'sales':
        exportData = { sales: data.sales }
        break
      case 'customer':
        exportData = { customer: data.customer }
        break
      case 'financial':
        exportData = { financial: data.financial }
        break
      case 'all':
        exportData = data
        break
    }

    const jsonString = JSON.stringify(exportData, null, 2)
    const blob = new Blob([jsonString], { type: 'application/json;charset=utf-8' })
    saveAs(blob, `${filename}.json`)
  }

  /**
   * Export to PDF format
   */
  private async exportToPDF(data: ExportableData, category: MetricCategory, filename: string, options: ExportOptions): Promise<void> {
    const pdf = new jsPDF('portrait', 'mm', 'a4')
    const pageWidth = pdf.internal.pageSize.getWidth()
    let yPosition = 20

    // Title
    pdf.setFontSize(20)
    pdf.setFont('helvetica', 'bold')
    pdf.text(`${category.charAt(0).toUpperCase() + category.slice(1)} Metrics Report`, pageWidth / 2, yPosition, { align: 'center' })
    yPosition += 15

    // Date
    pdf.setFontSize(12)
    pdf.setFont('helvetica', 'normal')
    pdf.text(`Generated on: ${new Date().toLocaleDateString()}`, pageWidth / 2, yPosition, { align: 'center' })
    yPosition += 20

    // Content based on category
    switch (category) {
      case 'executive':
        yPosition = this.addExecutiveToPDF(pdf, data.executive, yPosition)
        break
      case 'operational':
        yPosition = this.addOperationalToPDF(pdf, data.operational, yPosition)
        break
      default:
        pdf.setFontSize(12)
        pdf.text('Detailed metrics data available in CSV/JSON export formats', 20, yPosition)
    }

    pdf.save(`${filename}.pdf`)
  }

  /**
   * Export to Excel format
   */
  private async exportToExcel(data: ExportableData, category: MetricCategory, filename: string, options: ExportOptions): Promise<void> {
    const workbook = XLSX.utils.book_new()

    switch (category) {
      case 'executive':
        const executiveSheet = XLSX.utils.json_to_sheet(this.executiveToWorksheetData(data.executive))
        XLSX.utils.book_append_sheet(workbook, executiveSheet, 'Executive Metrics')
        break

      case 'revenue':
        if (data.revenue.trends.length > 0) {
          const trendsSheet = XLSX.utils.json_to_sheet(data.revenue.trends)
          XLSX.utils.book_append_sheet(workbook, trendsSheet, 'Revenue Trends')
        }
        if (data.revenue.geographic.length > 0) {
          const geographicSheet = XLSX.utils.json_to_sheet(data.revenue.geographic)
          XLSX.utils.book_append_sheet(workbook, geographicSheet, 'Geographic Revenue')
        }
        if (data.revenue.products.length > 0) {
          const productsSheet = XLSX.utils.json_to_sheet(data.revenue.products)
          XLSX.utils.book_append_sheet(workbook, productsSheet, 'Product Performance')
        }
        break

      case 'operational':
        const operationalSheet = XLSX.utils.json_to_sheet([data.operational])
        XLSX.utils.book_append_sheet(workbook, operationalSheet, 'Operational Metrics')
        break

      case 'all':
        // Create multiple sheets for complete data
        const execSheet = XLSX.utils.json_to_sheet(this.executiveToWorksheetData(data.executive))
        XLSX.utils.book_append_sheet(workbook, execSheet, 'Executive Metrics')

        if (data.revenue.trends.length > 0) {
          const trendsSheet = XLSX.utils.json_to_sheet(data.revenue.trends)
          XLSX.utils.book_append_sheet(workbook, trendsSheet, 'Revenue Trends')
        }

        const operationalSheetAll = XLSX.utils.json_to_sheet([data.operational])
        XLSX.utils.book_append_sheet(workbook, operationalSheetAll, 'Operational Metrics')
        break
    }

    XLSX.writeFile(workbook, `${filename}.xlsx`)
  }

  // CSV generation methods
  private generateExecutiveCSV(metrics: MetricCard[]): string {
    const headers = ['ID', 'Title', 'Value', 'Change', 'Change Type', 'Unit', 'Format', 'Color']
    const rows = metrics.map(metric => [
      metric.id,
      metric.title,
      metric.value.toString(),
      metric.change.toString(),
      metric.changeType,
      metric.unit || '',
      metric.format || '',
      metric.color || ''
    ])
    return this.createCSVContent(headers, rows)
  }

  private generateRevenueCSV(revenue: any): string {
    let csvContent = ''

    // Revenue trends
    if (revenue.trends.length > 0) {
      csvContent += 'Revenue Trends\n'
      const headers = ['Date', 'Enterprise', 'Startup', 'SMB', 'Total']
      const rows = revenue.trends.map((trend: any) => [
        trend.date,
        trend.enterprise.toString(),
        trend.startup.toString(),
        trend.smb.toString(),
        trend.total.toString()
      ])
      csvContent += this.createCSVContent(headers, rows) + '\n\n'
    }

    // Geographic revenue
    if (revenue.geographic.length > 0) {
      csvContent += 'Geographic Revenue\n'
      const headers = ['Country', 'Revenue', 'Percentage', 'Growth']
      const rows = revenue.geographic.map((geo: any) => [
        geo.country,
        geo.revenue.toString(),
        geo.percentage.toString(),
        geo.growth.toString()
      ])
      csvContent += this.createCSVContent(headers, rows) + '\n\n'
    }

    return csvContent
  }

  private generateOperationalCSV(operational: OperationalMetrics): string {
    const headers = ['Metric', 'Value']
    const rows = Object.entries(operational).map(([key, value]) => [
      this.formatKeyName(key),
      value.toString()
    ])
    return this.createCSVContent(headers, rows)
  }

  private generateSalesCSV(sales: SalesMetrics): string {
    const headers = ['Metric', 'Value']
    const rows = Object.entries(sales).map(([key, value]) => [
      this.formatKeyName(key),
      value.toString()
    ])
    return this.createCSVContent(headers, rows)
  }

  private generateCustomerCSV(customer: any): string {
    const headers = ['Metric', 'Value']
    const rows = Object.entries(customer).map(([key, value]) => [
      this.formatKeyName(key),
      value.toString()
    ])
    return this.createCSVContent(headers, rows)
  }

  private generateFinancialCSV(financial: any): string {
    let csvContent = ''

    // Financial health
    if (financial.health && financial.health.length > 0) {
      csvContent += 'Financial Health\n'
      const headers = ['Month', 'Burn Rate', 'Cash Runway', 'Gross Margin', 'Net Margin', 'Operating Cash Flow', 'Investing Cash Flow', 'Financing Cash Flow']
      const rows = financial.health.map((item: any) => [
        item.month,
        item.burnRate.toString(),
        item.cashRunway.toString(),
        item.grossMargin.toString(),
        item.netMargin.toString(),
        item.operatingCashFlow.toString(),
        item.investingCashFlow.toString(),
        item.financingCashFlow.toString()
      ])
      csvContent += this.createCSVContent(headers, rows) + '\n\n'
    }

    return csvContent
  }

  private generateAllDataCSV(data: ExportableData): string {
    let csvContent = 'Executive Metrics\n'
    csvContent += this.generateExecutiveCSV(data.executive) + '\n\n'
    csvContent += 'Revenue Analytics\n'
    csvContent += this.generateRevenueCSV(data.revenue) + '\n\n'
    csvContent += 'Operational Metrics\n'
    csvContent += this.generateOperationalCSV(data.operational) + '\n\n'
    csvContent += 'Sales Metrics\n'
    csvContent += this.generateSalesCSV(data.sales) + '\n\n'
    csvContent += 'Financial Metrics\n'
    csvContent += this.generateFinancialCSV(data.financial)
    return csvContent
  }

  // Helper methods
  private createCSVContent(headers: string[], rows: string[][]): string {
    const csvHeaders = headers.join(',')
    const csvRows = rows.map(row =>
      row.map(cell => `"${cell.replace(/"/g, '""')}"`).join(',')
    )
    return [csvHeaders, ...csvRows].join('\n')
  }

  private formatKeyName(key: string): string {
    return key
      .replace(/([A-Z])/g, ' $1')
      .replace(/^./, str => str.toUpperCase())
      .trim()
  }

  private executiveToWorksheetData(metrics: MetricCard[]): any[] {
    return metrics.map(metric => ({
      ID: metric.id,
      Title: metric.title,
      Value: metric.value,
      Change: metric.change,
      'Change Type': metric.changeType,
      Unit: metric.unit || '',
      Format: metric.format || '',
      Color: metric.color || ''
    }))
  }

  // PDF helper methods
  private addExecutiveToPDF(pdf: jsPDF, metrics: MetricCard[], yPosition: number): number {
    pdf.setFontSize(14)
    pdf.setFont('helvetica', 'bold')
    pdf.text('Executive Summary Metrics', 20, yPosition)
    yPosition += 10

    pdf.setFontSize(10)
    pdf.setFont('helvetica', 'normal')

    metrics.forEach(metric => {
      if (yPosition > 270) {
        pdf.addPage()
        yPosition = 20
      }

      const text = `${metric.title}: ${metric.value}${metric.unit || ''} (${metric.change > 0 ? '+' : ''}${metric.change}${metric.unit === '%' ? '%' : ''})`
      pdf.text(text, 20, yPosition)
      yPosition += 8
    })

    return yPosition
  }

  private addOperationalToPDF(pdf: jsPDF, operational: OperationalMetrics, yPosition: number): number {
    pdf.setFontSize(14)
    pdf.setFont('helvetica', 'bold')
    pdf.text('Operational Metrics', 20, yPosition)
    yPosition += 10

    pdf.setFontSize(10)
    pdf.setFont('helvetica', 'normal')

    Object.entries(operational).forEach(([key, value]) => {
      if (yPosition > 270) {
        pdf.addPage()
        yPosition = 20
      }

      const text = `${this.formatKeyName(key)}: ${value}${this.getUnitForMetric(key)}`
      pdf.text(text, 20, yPosition)
      yPosition += 8
    })

    return yPosition
  }

  private getUnitForMetric(key: string): string {
    const unitMap: Record<string, string> = {
      serverUptime: '%',
      responseTime: 'ms',
      errorRate: '%',
      customerSatisfaction: '/5.0',
      netPromoterScore: '',
      activeUsers: '',
      newSignups: '',
      conversionRate: '%'
    }
    return unitMap[key] || ''
  }
}

// Export singleton instance
export const exportService = new ExportService()

// Export convenience functions
export const exportMetrics = (data: ExportableData, options: ExportOptions) => {
  return exportService.exportData(data, options)
}

export const exportToCSV = (data: ExportableData, category: MetricCategory, filename?: string) => {
  return exportService.exportData(data, { format: 'csv', category, filename })
}

export const exportToJSON = (data: ExportableData, category: MetricCategory, filename?: string) => {
  return exportService.exportData(data, { format: 'json', category, filename })
}

export const exportToPDF = (data: ExportableData, category: MetricCategory, filename?: string) => {
  return exportService.exportData(data, { format: 'pdf', category, filename })
}

export const exportToExcel = (data: ExportableData, category: MetricCategory, filename?: string) => {
  return exportService.exportData(data, { format: 'excel', category, filename })
}