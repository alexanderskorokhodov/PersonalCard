import { Link } from 'react-router-dom'
import { ArrowUpRightIcon } from '@/components/icons'
import { preloadRoute } from '@/app/routes'
import type { ShowcaseItem } from '@/content/types'
import { MediaAsset } from '@/components/media/MediaAsset'
import { Reveal } from '@/components/motion/Reveal'
import { cn } from '@/lib/cn'

type ShowcaseCardProps = {
  item: ShowcaseItem
  delay?: number
  frameClassName?: string
}

export function ShowcaseCard({
  item,
  delay = 0,
  frameClassName,
}: ShowcaseCardProps) {
  const media = item.href ? (
    <Link
      to={item.href}
      onMouseEnter={() => preloadRoute(item.href!)}
      onFocus={() => preloadRoute(item.href!)}
      className={cn(
        'block overflow-hidden rounded-[var(--radius-frame)] focus-ring',
        frameClassName,
      )}
    >
      <MediaAsset asset={item.media} />
    </Link>
  ) : (
    <div
      className={cn(
        'block overflow-hidden rounded-[var(--radius-frame)]',
        frameClassName,
      )}
    >
      <MediaAsset asset={item.media} />
    </div>
  )

  return (
    <Reveal delay={delay} className="auto-section">
      <div className="space-y-4">
        {media}

        <div className="space-y-1 px-0.5">
          {item.eyebrow ? <p className="eyebrow">{item.eyebrow}</p> : null}
          <h2 className="text-[16px] font-semibold tracking-[-0.02em] text-[var(--text-strong)]">
            {item.title}
          </h2>
          <p className="max-w-[52ch] text-[14px] leading-6 text-[var(--text-muted)] sm:text-[15px] sm:leading-7">
            {item.description}
          </p>
          {item.meta?.length ? (
            <div className="flex flex-wrap gap-2 pt-2">
              {item.meta.map((metaItem) => (
                <span
                  key={metaItem}
                  className="rounded-full bg-[var(--surface-muted)] px-3 py-1 text-[12px] font-medium text-[var(--text-soft)]"
                >
                  {metaItem}
                </span>
              ))}
            </div>
          ) : null}
          {item.href && item.ctaLabel ? (
            <Link
              to={item.href}
              onMouseEnter={() => preloadRoute(item.href!)}
              onFocus={() => preloadRoute(item.href!)}
              className="inline-flex items-center gap-1 pt-3 text-[14px] font-medium text-[var(--text-link)] transition hover:text-[var(--text-link-hover)]"
            >
              <span>{item.ctaLabel}</span>
              <ArrowUpRightIcon className="h-4 w-4" />
            </Link>
          ) : null}
        </div>
      </div>
    </Reveal>
  )
}
