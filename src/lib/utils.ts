import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatCurrency(value: number): string {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(value)
}

export function formatCompactCurrency(value: number): string {
  if (value >= 1000000) {
    return `$${(value / 1000000).toFixed(1)}M`
  }
  if (value >= 1000) {
    return `$${(value / 1000).toFixed(0)}K`
  }
  return `$${value.toFixed(0)}`
}

export function formatPercentage(value: number): string {
  if (value === undefined || value === null) return '0%'
  return `${value.toFixed(1)}%`
}

export function formatNumber(value: number): string {
  return new Intl.NumberFormat('en-US').format(value)
}

export function getChangeColor(changeType: 'increase' | 'decrease'): string {
  return changeType === 'increase' ? 'text-green-600' : 'text-red-600'
}

export function getMetricColor(color?: string): string {
  const colorMap: Record<string, string> = {
    success: 'bg-green-500',
    warning: 'bg-yellow-500',
    danger: 'bg-red-500',
    primary: 'bg-blue-500',
    secondary: 'bg-purple-500'
  }
  return colorMap[color || 'primary']
}

export function calculateGrowth(current: number, previous: number): number {
  if (previous === 0) return 0
  return ((current - previous) / previous) * 100
}

export function getDateRangeText(days: number): string {
  return days === 7 ? '7 days' : days === 30 ? '30 days' : '90 days'
}