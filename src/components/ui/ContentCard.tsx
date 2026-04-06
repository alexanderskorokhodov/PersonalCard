import { Link } from 'react-router-dom'
import { ArrowUpRightIcon } from '@/components/icons'
import { preloadRoute } from '@/app/routes'
import { Reveal } from '@/components/motion/Reveal'
import { cn } from '@/lib/cn'
import type { PortfolioCard } from '@/content/portfolio'

type ContentCardProps = {
  item: PortfolioCard
  delay?: number
  className?: string
}

export function ContentCard({ item, delay = 0, className }: ContentCardProps) {
  const cardBody = (
    <div
      className={cn(
        'surface-card flex min-h-[220px] flex-col justify-between rounded-[24px] px-6 py-6',
        item.href ? 'focus-ring' : '',
        className,
      )}
    >
      <div className="space-y-3">
        {item.eyebrow ? <p className="eyebrow">{item.eyebrow}</p> : null}
        <div className="space-y-2">
          <h2 className="text-[16px] font-semibold tracking-[-0.02em] text-[var(--text-strong)]">
            {item.title}
          </h2>
          <p className="text-[14px] leading-6 text-[var(--text-muted)] sm:text-[15px] sm:leading-7">
            {item.description}
          </p>
        </div>
        {item.meta?.length ? (
          <div className="flex flex-wrap gap-2">
            {item.meta.map((metaItem) => (
              <span
                key={metaItem}
                className="rounded-full bg-white/70 px-3 py-1 text-[12px] font-medium text-[var(--text-soft)]"
              >
                {metaItem}
              </span>
            ))}
          </div>
        ) : null}
      </div>

      {item.href && item.ctaLabel ? (
        <div className="pt-5">
          <span className="inline-flex items-center gap-1 text-[14px] font-medium text-[var(--text-link)] transition group-hover:text-[var(--text-link-hover)]">
            <span>{item.ctaLabel}</span>
            <ArrowUpRightIcon className="h-4 w-4" />
          </span>
        </div>
      ) : null}
    </div>
  )

  return (
    <Reveal delay={delay} className="auto-section">
      {item.href ? (
        <Link
          to={item.href}
          onMouseEnter={() => preloadRoute(item.href!)}
          onFocus={() => preloadRoute(item.href!)}
          className="group block"
        >
          {cardBody}
        </Link>
      ) : (
        cardBody
      )}
    </Reveal>
  )
}
