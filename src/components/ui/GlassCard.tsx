import { ReactNode } from 'react'
import { cn } from '@/lib/utils'

interface GlassCardProps {
  children: ReactNode
  className?: string
  isExpanded?: boolean
  onClick?: () => void
}

export function GlassCard({ children, className, isExpanded, onClick }: GlassCardProps) {
  return (
    <div
      className={cn(
        'relative bg-white/70 backdrop-blur-md backdrop-filter backdrop-saturate-150',
        'border border-white/20 rounded-2xl shadow-xl',
        'transition-all duration-300 ease-in-out',
        'hover:shadow-2xl hover:bg-white/80 hover:scale-[1.02]',
        'cursor-pointer',
        isExpanded && 'col-span-2 row-span-2',
        onClick && 'hover:shadow-lg',
        className
      )}
      onClick={onClick}
    >
      <div className="absolute inset-0 bg-gradient-to-br from-white/20 to-transparent rounded-2xl" />
      <div className="relative p-6">
        {children}
      </div>
    </div>
  )
}