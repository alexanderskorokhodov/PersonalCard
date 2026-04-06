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
      <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
        <span>{profile.footerLabel}</span>
        {profile.email ? (
          <a href={`mailto:${profile.email}`} className="hover:text-[var(--text-strong)]">
            {profile.email}
          </a>
        ) : (
          <span>{profile.footerNote}</span>
        )}
      </div>
    </footer>
  )
}
