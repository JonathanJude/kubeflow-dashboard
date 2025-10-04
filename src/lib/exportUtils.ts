import { formatCurrency, formatPercentage, formatNumber } from './utils'

/**
 * Utility functions for data formatting and transformation for exports
 */

export interface FormattedExportData {
  raw: any
  formatted: string
  type: 'currency' | 'percentage' | 'number' | 'text'
}

/**
 * Format value for export based on type
 */
export function formatValueForExport(value: number, format?: string): FormattedExportData {
  switch (format) {
    case 'currency':
      return {
        raw: value,
        formatted: formatCurrency(value),
        type: 'currency'
      }
    case 'percentage':
      return {
        raw: value,
        formatted: formatPercentage(value),
        type: 'percentage'
      }
    case 'number':
      return {
        raw: value,
        formatted: formatNumber(value),
        type: 'number'
      }
    default:
      return {
        raw: value,
        formatted: value.toString(),
        type: 'number'
      }
  }
}

/**
 * Convert array of objects to CSV with proper escaping
 */
export function arrayToCSV(data: any[], headers?: string[]): string {
  if (data.length === 0) return ''

  const actualHeaders = headers || Object.keys(data[0])
  const csvRows: string[] = []

  // Add headers
  csvRows.push(actualHeaders.map(header => `"${header}"`).join(','))

  // Add data rows
  data.forEach(row => {
    const values = actualHeaders.map(header => {
      const value = row[header]
      if (value === null || value === undefined) return '""'
      if (typeof value === 'string') return `"${value.replace(/"/g, '""')}"`
      if (typeof value === 'number') return `"${value}"`
      if (typeof value === 'boolean') return `"${value}"`
      if (typeof value === 'object') return `"${JSON.stringify(value).replace(/"/g, '""')}"`
      return `""`
    })
    csvRows.push(values.join(','))
  })

  return csvRows.join('\n')
}

/**
 * Generate a unique filename with timestamp
 */
export function generateFilename(baseName: string, extension: string): string {
  const timestamp = new Date().toISOString().replace(/[:.]/g, '-')
  const dateOnly = timestamp.split('T')[0]
  return `${baseName}-${dateOnly}.${extension}`
}

/**
 * Convert data to worksheet format for Excel exports
 */
export function dataToWorksheet(data: any[], headers?: { key: string; label: string }[]): any[] {
  if (data.length === 0) return []

  const actualHeaders = headers || Object.keys(data[0]).map(key => ({ key, label: key }))

  return data.map(row => {
    const worksheetRow: any = {}
    actualHeaders.forEach(({ key, label }) => {
      worksheetRow[label] = row[key]
    })
    return worksheetRow
  })
}

/**
 * Create multi-sheet workbook data structure
 */
export interface WorkbookData {
  [sheetName: string]: any[]
}

export function createWorkbook(data: WorkbookData): WorkbookData {
  const workbook: WorkbookData = {}

  Object.entries(data).forEach(([sheetName, sheetData]) => {
    if (Array.isArray(sheetData) && sheetData.length > 0) {
      workbook[sheetName] = sheetData
    }
  })

  return workbook
}

/**
 * Sanitize data for export (remove circular references, etc.)
 */
export function sanitizeData(data: any): any {
  if (data === null || data === undefined) return null
  if (typeof data !== 'object') return data
  if (data instanceof Date) return data.toISOString()
  if (Array.isArray(data)) return data.map(sanitizeData)

  const sanitized: any = {}
  Object.keys(data).forEach(key => {
    if (typeof data[key] === 'function') return
    if (key.startsWith('_')) return // Skip private properties

    try {
      sanitized[key] = sanitizeData(data[key])
    } catch (error) {
      // Handle circular references or other serialization issues
      sanitized[key] = '[Unserializable]'
    }
  })

  return sanitized
}

/**
 * Calculate summary statistics for export data
 */
export interface DataSummary {
  count: number
  sum?: number
  average?: number
  min?: number
  max?: number
  latest?: any
  oldest?: any
}

export function calculateSummary(data: any[], valueField: string, dateField?: string): DataSummary {
  if (data.length === 0) {
    return { count: 0 }
  }

  const values = data.map(item => item[valueField]).filter(val => typeof val === 'number') as number[]

  const summary: DataSummary = {
    count: data.length
  }

  if (values.length > 0) {
    summary.sum = values.reduce((acc, val) => acc + val, 0)
    summary.average = summary.sum / values.length
    summary.min = Math.min(...values)
    summary.max = Math.max(...values)
  }

  if (dateField) {
    const sortedData = [...data].sort((a, b) =>
      new Date(a[dateField]).getTime() - new Date(b[dateField]).getTime()
    )
    summary.oldest = sortedData[0]
    summary.latest = sortedData[sortedData.length - 1]
  }

  return summary
}

/**
 * Create a summary report section for exports
 */
export function createSummaryReport(summary: DataSummary, title: string): string {
  let report = `${title}\n`
  report += `${'='.repeat(title.length)}\n\n`
  report += `Total Records: ${summary.count}\n`

  if (summary.sum !== undefined) {
    report += `Sum: ${formatCurrency(summary.sum)}\n`
    report += `Average: ${formatCurrency(summary.average || 0)}\n`
    report += `Min: ${formatCurrency(summary.min || 0)}\n`
    report += `Max: ${formatCurrency(summary.max || 0)}\n`
  }

  if (summary.latest && summary.oldest) {
    report += `Date Range: ${summary.oldest.date || 'N/A'} - ${summary.latest.date || 'N/A'}\n`
  }

  return report + '\n'
}

/**
 * Validate export data before processing
 */
export interface ValidationResult {
  isValid: boolean
  errors: string[]
  warnings: string[]
}

export function validateExportData(data: any, category: string): ValidationResult {
  const result: ValidationResult = {
    isValid: true,
    errors: [],
    warnings: []
  }

  if (!data) {
    result.isValid = false
    result.errors.push('No data provided for export')
    return result
  }

  if (typeof data !== 'object') {
    result.isValid = false
    result.errors.push('Data must be an object')
    return result
  }

  // Category-specific validation
  switch (category) {
    case 'executive':
      if (!Array.isArray(data.executive)) {
        result.errors.push('Executive metrics must be an array')
      }
      break
    case 'revenue':
      if (!data.revenue || typeof data.revenue !== 'object') {
        result.errors.push('Revenue data is missing or invalid')
      }
      break
    case 'operational':
      if (!data.operational || typeof data.operational !== 'object') {
        result.errors.push('Operational data is missing or invalid')
      }
      break
  }

  // Check for empty data
  if (Array.isArray(data) && data.length === 0) {
    result.warnings.push('Data array is empty')
  }

  result.isValid = result.errors.length === 0
  return result
}

/**
 * Format file size for display
 */
export function formatFileSize(bytes: number): string {
  if (bytes === 0) return '0 Bytes'

  const k = 1024
  const sizes = ['Bytes', 'KB', 'MB', 'GB']
  const i = Math.floor(Math.log(bytes) / Math.log(k))

  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i]
}

/**
 * Debounce function for preventing multiple export requests
 */
export function debounce<T extends (...args: any[]) => any>(
  func: T,
  wait: number
): (...args: Parameters<T>) => void {
  let timeout: NodeJS.Timeout | null = null

  return (...args: Parameters<T>) => {
    if (timeout) {
      clearTimeout(timeout)
    }

    timeout = setTimeout(() => {
      func(...args)
    }, wait)
  }
}

/**
 * Create download progress callback
 */
export interface ExportProgress {
  stage: string
  progress: number
  total?: number
  message?: string
}

export type ProgressCallback = (progress: ExportProgress) => void

export function createProgressTracker(
  onProgress: ProgressCallback,
  stages: string[]
) {
  let currentStage = 0

  return {
    nextStage: (message?: string) => {
      if (currentStage < stages.length) {
        onProgress({
          stage: stages[currentStage],
          progress: (currentStage / stages.length) * 100,
          total: stages.length,
          message
        })
        currentStage++
      }
    },

    complete: (message?: string) => {
      onProgress({
        stage: 'Complete',
        progress: 100,
        total: stages.length,
        message: message || 'Export completed successfully'
      })
    },

    error: (error: string) => {
      onProgress({
        stage: 'Error',
        progress: 0,
        message: error
      })
    }
  }
}