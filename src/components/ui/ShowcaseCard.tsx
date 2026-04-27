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
  variant?: 'default' | 'row'
}

export function ShowcaseCard({
  item,
  delay = 0,
  frameClassName,
  variant = 'default',
}: ShowcaseCardProps) {
  if (variant === 'row') {
    const rowBody = (
      <div
        className={cn(
          'surface-card group flex items-center gap-4 rounded-[22px] px-3 py-3',
          item.href ? 'focus-ring' : '',
        )}
      >
        <MediaAsset
          asset={item.media}
          className={cn('h-[72px] w-[100px] shrink-0 rounded-[16px]', frameClassName)}
          roundedClassName="rounded-[16px]"
          priority={false}
        />

        <div className="min-w-0 flex-1 space-y-1">
          {item.eyebrow ? <p className="eyebrow">{item.eyebrow}</p> : null}
          <h2 className="text-[15px] font-semibold tracking-[-0.02em] text-[var(--text-strong)] sm:text-[16px]">
            {item.title}
          </h2>
          <p className="text-[13px] leading-5 text-[var(--text-muted)] sm:text-[14px] sm:leading-6">
            {item.description}
          </p>
        </div>

        {item.href ? (
          <span
            aria-hidden="true"
            className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-black/8 bg-white text-[var(--text-strong)] transition group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
          >
            <ArrowUpRightIcon className="h-4 w-4" />
          </span>
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
            className="block"
          >
            {rowBody}
          </Link>
        ) : (
          rowBody
        )}
      </Reveal>
    )
  }

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
