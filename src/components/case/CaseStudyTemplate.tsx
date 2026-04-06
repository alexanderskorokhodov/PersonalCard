import { useRef } from 'react'
import { Helmet } from 'react-helmet-async'
import { Link } from 'react-router-dom'
import { ArrowLeftIcon, ArrowUpRightIcon } from '@/components/icons'
import { LocaleToggle } from '@/components/layout/LocaleToggle'
import { SiteFooter } from '@/components/layout/SiteFooter'
import { MediaAsset } from '@/components/media/MediaAsset'
import { Reveal } from '@/components/motion/Reveal'
import type { CaseStudy } from '@/content/types'
import { useSiteContent } from '@/content/site-data'
import { preloadRoute } from '@/app/routes'
import { cn } from '@/lib/cn'

type CaseStudyTemplateProps = {
  study: CaseStudy
  caseLayout?: boolean
}

function MediaGrid({ media }: { media: CaseStudy['blocks'][number]['media'] }) {
  if (!media?.length) {
    return null
  }

  const gridClass =
    media.length === 1
      ? 'grid-cols-1'
      : media.length === 2
        ? 'grid-cols-1 md:grid-cols-2'
        : 'grid-cols-1 md:grid-cols-2'

  return (
    <div className={`grid gap-4 ${gridClass}`}>
      {media.map((asset) => (
        <MediaAsset key={asset.src} asset={asset} />
      ))}
    </div>
  )
}

function MediaScrollRow({
  media,
  previousLabel,
  nextLabel,
}: {
  media: CaseStudy['blocks'][number]['media']
  previousLabel: string
  nextLabel: string
}) {
  const scrollerRef = useRef<HTMLDivElement | null>(null)

  if (!media?.length) {
    return null
  }

  const scrollSlides = (direction: -1 | 1) => {
    const node = scrollerRef.current
    if (!node) {
      return
    }

    const firstSlide = node.querySelector<HTMLElement>('[data-media-slide]')
    const slideWidth = firstSlide?.getBoundingClientRect().width ?? node.clientWidth
    node.scrollBy({
      left: direction * (slideWidth + 16),
      behavior: 'smooth',
    })
  }

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-end gap-2">
        <button
          type="button"
          onClick={() => scrollSlides(-1)}
          aria-label={previousLabel}
          className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-[var(--surface-muted)] text-[var(--text-strong)] shadow-[var(--shadow-soft)] transition hover:-translate-x-0.5 hover:bg-white"
        >
          <ArrowLeftIcon className="h-5 w-5" />
        </button>
        <button
          type="button"
          onClick={() => scrollSlides(1)}
          aria-label={nextLabel}
          className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-[var(--surface-muted)] text-[var(--text-strong)] shadow-[var(--shadow-soft)] transition hover:translate-x-0.5 hover:bg-white"
        >
          <ArrowLeftIcon className="h-5 w-5 rotate-180" />
        </button>
      </div>

      <div ref={scrollerRef} className="media-scroll-row" tabIndex={0}>
        {media.map((asset) => (
          <div key={asset.src} data-media-slide className="media-scroll-slide">
            <MediaAsset asset={asset} />
          </div>
        ))}
      </div>
    </div>
  )
}

function MediaCollection({
  media,
  layout = 'grid',
  previousLabel,
  nextLabel,
}: {
  media: CaseStudy['blocks'][number]['media']
  layout?: CaseStudy['blocks'][number]['mediaLayout']
  previousLabel: string
  nextLabel: string
}) {
  if (layout === 'scroll-row') {
    return (
      <MediaScrollRow media={media} previousLabel={previousLabel} nextLabel={nextLabel} />
    )
  }

  return <MediaGrid media={media} />
}

export function CaseStudyTemplate({ study, caseLayout = false }: CaseStudyTemplateProps) {
  const { shared } = useSiteContent()
  const backHref = study.backHref ?? '/'

  return (
    <div className="page-shell relative">
      <Helmet>
        <title>{study.title}</title>
        <meta name="description" content={study.description} />
      </Helmet>

      <LocaleToggle />

      <Link
        to={backHref}
        onMouseEnter={() => preloadRoute(backHref)}
        onFocus={() => preloadRoute(backHref)}
        className="fixed left-4 top-4 z-30 inline-flex h-12 w-12 items-center justify-center rounded-full bg-[var(--surface-muted)] text-[var(--text-strong)] shadow-[var(--shadow-soft)] transition hover:-translate-x-0.5 hover:bg-white md:left-8 md:top-8"
        aria-label={shared.backLabel}
      >
        <ArrowLeftIcon className="h-6 w-6" />
      </Link>

      <div className="page-column-case space-y-[var(--space-stack-md)]">
        <Reveal className="auto-section space-y-6 pt-14 md:pt-0">
          <header className="space-y-5">
            {study.eyebrow ? <p className="eyebrow">{study.eyebrow}</p> : null}
            <h1 className="headline-xl max-w-[14ch] text-balance">{study.title}</h1>

            {study.meta?.length ? (
              <div className="flex flex-wrap gap-2">
                {study.meta.map((metaItem) => (
                  <span
                    key={metaItem}
                    className="rounded-full bg-[var(--surface-muted)] px-3 py-1 text-[12px] font-medium text-[var(--text-soft)]"
                  >
                    {metaItem}
                  </span>
                ))}
              </div>
            ) : null}

            {study.heroLinks ? (
              <div className="flex flex-wrap gap-x-5 gap-y-2 text-[15px] font-medium text-[var(--text-link)]">
                {study.heroLinks.map((link) => (
                  <a
                    key={link.href}
                    href={link.href}
                    target={link.external ? '_blank' : undefined}
                    rel={link.external ? 'noreferrer' : undefined}
                    className="inline-flex items-center gap-1 transition hover:text-[var(--text-link-hover)]"
                  >
                    <span>{link.label}</span>
                    <ArrowUpRightIcon className="h-4 w-4" />
                  </a>
                ))}
              </div>
            ) : null}

            <div className="copy-stack max-w-[62ch] text-[15px] leading-7 text-[var(--text-muted)]">
              {study.summary.map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
            </div>
          </header>

          <MediaAsset asset={study.heroMedia} />
        </Reveal>

        {study.blocks.map((block, index) => {
          const inlineLink = block.link

          return (
            <Reveal
              key={`${block.title}-${index}`}
              delay={index * 0.02}
              className="auto-section space-y-5"
            >
              <section className="space-y-5">
                {block.hideText ? null : (
                  <div className="space-y-2">
                    <div className="flex flex-wrap items-end justify-between gap-2">
                      <h2 className="headline-md min-w-0 break-words text-balance">{block.title}</h2>
                      {block.kicker ? (
                        <span className="text-[13px] font-medium text-[var(--text-soft)]">
                          {block.kicker}
                        </span>
                      ) : null}
                    </div>

                    <div className="copy-stack max-w-[64ch] text-[15px] leading-7 text-[var(--text-muted)]">
                      {block.paragraphs.map((paragraph) => (
                        <p key={paragraph}>{paragraph}</p>
                      ))}
                    </div>

                    {inlineLink ? (
                      <Link
                        to={inlineLink.href}
                        onMouseEnter={() => preloadRoute(inlineLink.href)}
                        onFocus={() => preloadRoute(inlineLink.href)}
                        className="inline-flex items-center gap-1 text-[15px] font-medium text-[var(--text-link)] transition hover:text-[var(--text-link-hover)]"
                      >
                        <span>{inlineLink.label}</span>
                        <ArrowUpRightIcon className="h-4 w-4" />
                      </Link>
                    ) : null}
                  </div>
                )}

                <MediaCollection
                  media={block.media}
                  layout={block.mediaLayout}
                  previousLabel={shared.previousSlideLabel}
                  nextLabel={shared.nextSlideLabel}
                />
              </section>
            </Reveal>
          )
        })}

        {study.metrics?.length ? (
          <Reveal
            className={cn('auto-section space-y-5', caseLayout && 'case-metrics-section-wide')}
          >
            <h2 className="headline-md break-words text-balance">{shared.resultsTitle}</h2>
            <div className="case-metrics-row">
              {study.metrics.map((metric) => (
                <div
                  key={metric.value + metric.label}
                  className="case-metric-card surface-card rounded-[24px] px-5 py-5"
                >
                  <p className="font-[var(--font-display)] text-[36px] font-semibold tracking-[-0.05em] break-words text-[var(--text-strong)]">
                    {metric.value}
                  </p>
                  <p className="mt-2 text-[14px] leading-6 text-[var(--text-muted)]">
                    {metric.label}
                  </p>
                </div>
              ))}
            </div>
          </Reveal>
        ) : null}

        <Reveal className="auto-section space-y-4">
          <h2 className="headline-md break-words text-balance">{study.closingTitle}</h2>
          {study.closing.length ? (
            <div className="copy-stack max-w-[64ch] text-[15px] leading-7 text-[var(--text-muted)]">
              {study.closing.map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
            </div>
          ) : null}
          {study.nextLinks?.length ? (
            <div className="flex flex-wrap gap-x-5 gap-y-2 pt-1 text-[15px] font-medium text-[var(--text-link)]">
              {study.nextLinks.map((link) =>
                link.external ? (
                  <a
                    key={link.href}
                    href={link.href}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-2 transition hover:text-[var(--text-link-hover)]"
                  >
                    <span>{link.label}</span>
                    <ArrowUpRightIcon className="h-4 w-4" />
                  </a>
                ) : (
                  <Link
                    key={link.href}
                    to={link.href}
                    onMouseEnter={() => preloadRoute(link.href)}
                    onFocus={() => preloadRoute(link.href)}
                    className="inline-flex items-center gap-2 transition hover:text-[var(--text-link-hover)]"
                  >
                    <span>{link.label}</span>
                    <ArrowUpRightIcon className="h-4 w-4" />
                  </Link>
                ),
              )}
            </div>
          ) : null}
        </Reveal>
      </div>

      <SiteFooter caseWidth />
    </div>
  )
}
