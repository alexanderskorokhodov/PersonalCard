import { Link } from 'react-router-dom'
import { ArrowUpRightIcon } from '@/components/icons'
import { preloadRoute } from '@/app/routes'
import { cn } from '@/lib/cn'

type ArrowCardProps = {
  eyebrow: string
  title: string
  to: string
  className?: string
}

export function ArrowCard({ eyebrow, title, to, className }: ArrowCardProps) {
  return (
    <Link
      to={to}
      onMouseEnter={() => preloadRoute(to)}
      onFocus={() => preloadRoute(to)}
      className={cn(
        'surface-card focus-ring group flex min-h-[220px] flex-col justify-between rounded-[24px] px-6 py-6',
        className,
      )}
    >
      <div className="space-y-1">
        <p className="text-[13px] text-[var(--text-soft)]">{eyebrow}</p>
        <p className="headline-md max-w-[14ch] text-balance">{title}</p>
      </div>

      <div className="flex justify-end">
        <span className="rounded-full p-1.5 text-[var(--text-strong)] transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5">
          <ArrowUpRightIcon className="h-6 w-6" />
        </span>
      </div>
    </Link>
  )
}
