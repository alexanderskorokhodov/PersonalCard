import { Suspense, lazy } from 'react'
import { Helmet } from 'react-helmet-async'
import { Reveal } from '@/components/motion/Reveal'
import { ContactForm } from '@/components/ui/ContactForm'
import { usePortfolioContent } from '@/content/portfolio'
import { useSiteContent } from '@/content/site-data'

const ProjectLocationsMap = lazy(async () => {
  const module = await import('@/components/map/ProjectLocationsMap')

  return { default: module.ProjectLocationsMap }
})

function ProjectLocationsMapFallback() {
  return (
    <div className="surface-card relative aspect-[2/1] overflow-hidden rounded-[24px] border border-black/5 bg-[var(--surface-soft)] shadow-[var(--shadow-soft)]">
      <div className="absolute inset-x-4 top-4 h-8 w-28 rounded-full bg-white/80" />
      <div className="absolute inset-x-4 bottom-4 flex items-end justify-between gap-3">
        <div className="h-20 w-full max-w-[16rem] rounded-[20px] bg-white/85" />
        <div className="h-10 w-36 rounded-full bg-[var(--text-strong)]/16" />
      </div>
    </div>
  )
}

function AboutPage() {
  const { aboutPage } = usePortfolioContent()
  const { aboutLinks } = useSiteContent()

  return (
    <>
      <Helmet>
        <title>{aboutPage.metaTitle}</title>
        <meta name="description" content={aboutPage.metaDescription} />
      </Helmet>

      <div className="space-y-[var(--space-stack-md)]">
        <Reveal className="space-y-3">
          <div className="copy-stack max-w-[60ch] text-[15px] leading-7 text-[var(--text-muted)]">
            {aboutPage.introBody.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </div>
        </Reveal>

        {aboutPage.backgroundBody.length > 0 ? (
          <Reveal className="space-y-3">
            <p className="eyebrow">{aboutPage.backgroundTitle}</p>
            <div className="copy-stack max-w-[60ch] text-[15px] leading-7 text-[var(--text-muted)]">
              {aboutPage.backgroundBody.map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
            </div>
          </Reveal>
        ) : null}

        <Reveal className="space-y-3">
          <p className="eyebrow">{aboutPage.achievementsTitle}</p>
          <div className="grid gap-3 sm:grid-cols-2">
            {aboutPage.achievements.map((achievement) => (
              <div key={achievement.text} className="surface-card rounded-[22px] px-5 py-5">
                <p className="text-[15px] leading-7 text-[var(--text-strong)]">{achievement.text}</p>
                {achievement.links?.length ? (
                  <div className="mt-3 flex flex-wrap gap-x-4 gap-y-2 text-[14px] font-medium text-[var(--text-link)]">
                    {achievement.links.map((link) => (
                      <a
                        key={link.href}
                        href={link.href}
                        target={link.external ? '_blank' : undefined}
                        rel={link.external ? 'noreferrer' : undefined}
                        className="transition hover:text-[var(--text-link-hover)]"
                      >
                        {link.label}
                      </a>
                    ))}
                  </div>
                ) : null}
              </div>
            ))}
          </div>
        </Reveal>

        <Reveal className="w-full">
          <Suspense fallback={<ProjectLocationsMapFallback />}>
            <ProjectLocationsMap />
          </Suspense>
        </Reveal>

        <Reveal className="space-y-3">
          <p className="eyebrow">{aboutPage.domainsTitle}</p>
          <div className="flex flex-wrap gap-2">
            {aboutPage.domains.map((domain) => (
              <span
                key={domain}
                className="rounded-full bg-[var(--surface-muted)] px-4 py-2 text-[13px] font-medium text-[var(--text-muted)]"
              >
                {domain}
              </span>
            ))}
          </div>
        </Reveal>

        <Reveal className="space-y-3">
          <p className="eyebrow">{aboutPage.workflowTitle}</p>
          <div className="grid gap-4">
            {aboutPage.workflowSteps.map((step) => (
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

        <Reveal className="space-y-3">
          <p className="eyebrow">{aboutPage.teamTitle}</p>
          <div className="surface-card rounded-[24px] px-5 py-5">
            <div className="copy-stack max-w-[60ch] text-[15px] leading-7 text-[var(--text-muted)]">
              {aboutPage.teamBody.map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
            </div>
          </div>
        </Reveal>

        <Reveal id="contact" className="space-y-4">
          <div className="space-y-2">
            <p className="eyebrow">{aboutPage.contactsTitle}</p>
            {aboutPage.contactsBody ? (
              <p className="max-w-[52ch] text-[15px] leading-7 text-[var(--text-muted)]">
                {aboutPage.contactsBody}
              </p>
            ) : null}
            {aboutPage.contactsPrompt ? (
              <p className="text-[14px] font-medium text-[var(--text-strong)]">
                {aboutPage.contactsPrompt}
              </p>
            ) : null}
          </div>

          <div className="grid gap-5">
            <ContactForm
              nameLabel={aboutPage.formNameLabel}
              namePlaceholder={aboutPage.formNamePlaceholder}
              contactLabel={aboutPage.formContactLabel}
              contactPlaceholder={aboutPage.formContactPlaceholder}
              contextLabel={aboutPage.formContextLabel}
              contextPlaceholder={aboutPage.formContextPlaceholder}
              timelineLabel={aboutPage.formTimelineLabel}
              timelinePlaceholder={aboutPage.formTimelinePlaceholder}
              submitLabel={aboutPage.formSubmitLabel}
              successLabel={aboutPage.formSuccessLabel}
            />

            <div className="surface-card rounded-[24px] px-5 py-5">
              <p className="eyebrow">{aboutPage.formTelegramLabel}</p>
              <ul className="mt-4 grid gap-3 sm:grid-cols-2">
                {aboutLinks.map((link) => (
                  <li key={link.href}>
                    <a
                      href={link.href}
                      target="_blank"
                      rel="noreferrer"
                      className="focus-ring group flex items-center gap-3 rounded-[18px] border border-black/8 bg-white px-4 py-3 hover:border-black/12"
                    >
                      {link.iconSrc ? (
                        <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-[var(--surface-muted)] ring-1 ring-black/5">
                          <img
                            src={link.iconSrc}
                            alt=""
                            aria-hidden="true"
                            className="h-5 w-5 object-contain"
                            loading="lazy"
                          />
                        </span>
                      ) : null}
                      <span className="text-[15px] font-medium text-[var(--text-strong)] transition-colors group-hover:text-[var(--text-link-hover)]">
                        {link.label}
                      </span>
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </Reveal>
      </div>
    </>
  )
}

export default AboutPage
