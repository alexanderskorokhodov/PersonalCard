import { useSiteContent } from '@/content/site-data'
import { cn } from '@/lib/cn'

type SiteFooterProps = {
  caseWidth?: boolean
}

export function SiteFooter({ caseWidth = false }: SiteFooterProps) {
  const { profile } = useSiteContent()

  return (
    <footer
      className={cn(
        'mt-14 border-t border-[var(--border-subtle)] py-8 text-[13px] text-[var(--text-muted)]',
        caseWidth ? 'page-column-case' : 'page-column',
      )}
    >
      <div className="flex flex-col items-start gap-2">
        <span>{profile.footerLabel}</span>
        {profile.email ? (
          <a href={`mailto:${profile.email}`} className="hover:text-[var(--text-strong)]">
            {profile.email}
          </a>
        ) : (
          <span>{profile.footerNote}</span>
        )}
      </div>
      <div className="mt-6 w-full text-left text-[var(--text-soft)]">
        <p className="leading-relaxed">
          <span>{profile.footerCreditLabel} · </span>
          <a
            href={profile.footerSourceHref}
            target="_blank"
            rel="noreferrer"
            className="underline-offset-4 transition hover:text-[var(--text-default)] hover:underline"
          >
            {profile.footerSourceLabel}
          </a>
        </p>
      </div>
    </footer>
  )
}
