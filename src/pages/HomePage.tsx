import { Helmet } from 'react-helmet-async'
import { Link } from 'react-router-dom'
import { Reveal } from '@/components/motion/Reveal'
import { ContentCard } from '@/components/ui/ContentCard'
import { TrustedOrganizationsSection } from '@/components/ui/TrustedOrganizationsSection'
import { preloadRoute } from '@/app/routes'
import { usePortfolioContent } from '@/content/portfolio'

function HomePage() {
  const { homePage } = usePortfolioContent()

  return (
    <>
      <Helmet>
        <title>{homePage.metaTitle}</title>
        <meta name="description" content={homePage.metaDescription} />
      </Helmet>

      <div className="space-y-[var(--space-stack-md)]">
        <Reveal className="grid gap-6 lg:grid-cols-[minmax(0,1.3fr)_minmax(0,0.95fr)] lg:items-end">
          <div className="space-y-5">
            <div className="space-y-3">
              <p className="eyebrow">{homePage.heroEyebrow}</p>
              <h2 className="headline-lg max-w-[13ch] text-balance">{homePage.heroTitle}</h2>
              <p className="max-w-[62ch] text-[15px] leading-7 text-[var(--text-muted)]">
                {homePage.heroLead}
              </p>
            </div>

            <div className="flex flex-wrap gap-3">
              {[homePage.heroPrimaryLink, homePage.heroSecondaryLink].map((link, index) => (
                <Link
                  key={link.href}
                  to={link.href}
                  onMouseEnter={() => preloadRoute(link.href)}
                  onFocus={() => preloadRoute(link.href)}
                  className={
                    index === 0
                      ? 'rounded-full border border-black/10 bg-[var(--text-strong)] px-4 py-2 text-[14px] font-medium text-white transition-transform duration-200 hover:-translate-y-0.5'
                      : 'rounded-full border border-black/10 bg-white px-4 py-2 text-[14px] font-medium text-[var(--text-strong)] shadow-[var(--shadow-tab)] transition-transform duration-200 hover:-translate-y-0.5'
                  }
                >
                  {link.label}
                </Link>
              ))}
            </div>

            <p className="max-w-[54ch] text-[13px] leading-6 text-[var(--text-soft)] sm:text-[14px]">
              {homePage.heroFootnote}
            </p>
          </div>

          <div className="grid gap-3 sm:grid-cols-3 lg:grid-cols-1">
            {homePage.heroHighlights.map((highlight) => (
              <div key={highlight} className="surface-card rounded-[22px] px-5 py-5">
                <p className="text-[14px] leading-6 text-[var(--text-muted)] sm:text-[15px] sm:leading-7">
                  {highlight}
                </p>
              </div>
            ))}
          </div>
        </Reveal>

        <Reveal className="space-y-3">
          <p className="eyebrow">{homePage.proofTitle}</p>
          {homePage.proofLead ? (
            <p className="max-w-[56ch] text-[15px] leading-7 text-[var(--text-muted)]">
              {homePage.proofLead}
            </p>
          ) : null}
          <div className="grid gap-4 sm:grid-cols-2">
            {homePage.proofItems.map((item, index) => (
              <ContentCard key={item.title} item={item} delay={index * 0.04} />
            ))}
          </div>
        </Reveal>

        <Reveal className="space-y-3">
          <p className="eyebrow">{homePage.fitTitle}</p>
          <p className="max-w-[56ch] text-[15px] leading-7 text-[var(--text-muted)]">
            {homePage.fitLead}
          </p>
          <div className="grid gap-4 lg:grid-cols-3">
            {homePage.fitItems.map((area) => (
              <div key={area.title} className="surface-card rounded-[24px] px-5 py-5">
                <p className="text-[16px] font-semibold tracking-[-0.02em] text-[var(--text-strong)]">
                  {area.title}
                </p>
                <p className="mt-2 text-[14px] leading-6 text-[var(--text-muted)] sm:text-[15px] sm:leading-7">
                  {area.description}
                </p>
              </div>
            ))}
          </div>
        </Reveal>

        <Reveal className="space-y-3">
          <p className="eyebrow">{homePage.workTitle}</p>
          <p className="max-w-[56ch] text-[15px] leading-7 text-[var(--text-muted)]">
            {homePage.workLead}
          </p>
          <div className="grid gap-4 sm:grid-cols-2">
            {homePage.workItems.map((item, index) => (
              <ContentCard key={item.title} item={item} delay={index * 0.04} />
            ))}
          </div>
        </Reveal>

        <Reveal className="space-y-3">
          <p className="eyebrow">{homePage.processTitle}</p>
          <p className="max-w-[56ch] text-[15px] leading-7 text-[var(--text-muted)]">
            {homePage.processLead}
          </p>
          <div className="grid gap-4 sm:grid-cols-2">
            {homePage.processSteps.map((step) => (
              <div key={step.title} className="surface-card rounded-[24px] px-5 py-5">
                <p className="text-[15px] font-semibold tracking-[-0.02em] text-[var(--text-strong)]">
                  {step.title}
                </p>
                <p className="mt-2 text-[14px] leading-6 text-[var(--text-muted)] sm:text-[15px] sm:leading-7">
                  {step.description}
                </p>
              </div>
            ))}
          </div>
        </Reveal>

        <TrustedOrganizationsSection
          title={homePage.trustTitle}
          lead={homePage.trustLead}
          groups={homePage.trustGroups}
          footnote={homePage.trustFootnote}
        />

        <Reveal className="surface-card rounded-[28px] px-6 py-6">
          <div className="space-y-4">
            <div className="space-y-2">
              {homePage.ctaEyebrow ? (
                <p className="eyebrow">{homePage.ctaEyebrow}</p>
              ) : null}
              <h2 className="headline-md max-w-[20ch]">{homePage.ctaTitle}</h2>
              <p className="max-w-[52ch] text-[15px] leading-7 text-[var(--text-muted)]">
                {homePage.ctaBody}
              </p>
            </div>
            <div className="flex flex-wrap gap-3">
              {homePage.ctaLinks.map((link) => (
                <Link
                  key={link.href}
                  to={link.href}
                  onMouseEnter={() => preloadRoute(link.href)}
                  onFocus={() => preloadRoute(link.href)}
                  className="rounded-full border border-black/10 bg-white px-4 py-2 text-[14px] font-medium text-[var(--text-strong)] shadow-[var(--shadow-tab)] transition-transform duration-200 hover:-translate-y-0.5"
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </div>
        </Reveal>
      </div>
    </>
  )
}

export default HomePage
