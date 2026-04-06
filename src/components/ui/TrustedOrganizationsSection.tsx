import type { CSSProperties } from 'react'
import { Reveal } from '@/components/motion/Reveal'
import type { TrustedGroup, TrustedOrganization } from '@/content/portfolio'
import { cn } from '@/lib/cn'

type TrustedOrganizationsSectionProps = {
  title: string
  lead: string
  groups: TrustedGroup[]
  footnote?: string
}

const organizationStyleClassName: Record<
  NonNullable<TrustedOrganization['style']>,
  string
> = {
  default: 'text-[0.95rem] sm:text-[0.98rem]',
  compact: 'text-[0.84rem] sm:text-[0.9rem]',
  wide: 'text-[1rem] sm:text-[1.02rem]',
}

const organizationCardClassName: Record<
  NonNullable<TrustedOrganization['style']>,
  string
> = {
  default:
    'max-w-[min(15rem,calc(100vw-3rem))]',
  compact:
    'max-w-[min(20rem,calc(100vw-3rem))]',
  wide:
    'max-w-[min(16.5rem,calc(100vw-3rem))]',
}

const publicLogoAssetById: Partial<
  Record<
    TrustedOrganization['id'],
    {
      src: string
      variant?: 'badge' | 'wide'
    }
  >
> = {
  sber: { src: '/icons/Sber.svg' },
  moex: { src: '/icons/Moex.svg' },
  tbank: { src: '/icons/TBank.svg' },
  sgh: { src: '/icons/SGH.svg', variant: 'wide' },
  bauman: { src: '/icons/BMSTU.svg' },
  plekhanov: { src: '/icons/plehanov.svg', variant: 'wide' },
  gubkin: { src: '/icons/Gubkin.png' },
}

export function TrustedOrganizationsSection({
  title,
  lead,
  groups,
  footnote,
}: TrustedOrganizationsSectionProps) {
  return (
    <Reveal className="auto-section space-y-6">
      <div className="space-y-4">
        <h2 className="headline-md max-w-[12ch] text-balance">{title}</h2>
        <p className="max-w-[58ch] text-[15px] leading-7 text-[var(--text-muted)]">
          {lead}
        </p>
      </div>

      <div className="space-y-5">
        {groups.map((group, groupIndex) => (
          <div key={group.title} className="space-y-3">
            <p className="text-[11px] font-medium uppercase tracking-[0.18em] text-[var(--text-soft)]">
              {group.title}
            </p>
            <div className="space-y-3">
              {splitOrganizationsIntoRows(
                group.organizations,
                groupIndex === 0 ? 2 : 1,
              ).map((row, rowIndex) => (
                <TrustedOrganizationsMarqueeRow
                  key={`${group.title}-${rowIndex}`}
                  organizations={row}
                  direction={rowIndex % 2 === 0 ? 'left' : 'right'}
                  durationSeconds={Math.max(24, row.length * 7)}
                />
              ))}
            </div>
          </div>
        ))}
      </div>

      {footnote ? (
        <p className="text-[12px] leading-6 text-[var(--text-soft)] sm:text-[13px]">
          {footnote}
        </p>
      ) : null}
    </Reveal>
  )
}

function TrustedOrganizationsMarqueeRow({
  organizations,
  direction,
  durationSeconds,
}: {
  organizations: TrustedOrganization[]
  direction: 'left' | 'right'
  durationSeconds: number
}) {
  if (!organizations.length) {
    return null
  }

  const animationStyle = {
    '--trust-marquee-duration': `${durationSeconds}s`,
  } as CSSProperties

  return (
    <div className="overflow-hidden py-1 [-webkit-mask-image:linear-gradient(90deg,transparent,black_7%,black_93%,transparent)] [mask-image:linear-gradient(90deg,transparent,black_7%,black_93%,transparent)]">
      <div
        style={animationStyle}
        className={cn(
          'flex w-max will-change-transform hover:[animation-play-state:paused]',
          direction === 'left'
            ? 'animate-trust-marquee-left'
            : 'animate-trust-marquee-right',
        )}
      >
        <ul className="flex shrink-0 gap-3 pr-3">
          {organizations.map((organization) => (
            <li key={organization.id} className="shrink-0">
              <TrustedOrganizationCard organization={organization} />
            </li>
          ))}
        </ul>
        <ul className="flex shrink-0 gap-3 pr-3" aria-hidden="true">
          {organizations.map((organization) => (
            <li key={`${organization.id}-clone`} className="shrink-0">
              <TrustedOrganizationCard organization={organization} />
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}

function TrustedOrganizationCard({
  organization,
}: {
  organization: TrustedOrganization
}) {
  return (
    <div
      title={organization.ariaLabel ?? organization.label}
      className={cn(
        'group flex min-h-[84px] w-fit items-center gap-3 rounded-[22px] bg-[var(--surface-logo)] px-4 py-3 text-left ring-1 ring-black/4 transition duration-200 ease-[cubic-bezier(0.22,1,0.36,1)] hover:-translate-y-0.5 hover:bg-[var(--surface-logo-hover)]',
        organizationCardClassName[organization.style ?? 'default'],
      )}
    >
      <div
        className={cn(
          'flex h-10 shrink-0 items-center justify-center overflow-hidden rounded-[14px] bg-white/72 text-[var(--text-graphite)] ring-1 ring-black/5 shadow-[inset_0_1px_0_rgba(255,255,255,0.8)] transition-colors duration-200 group-hover:bg-white group-hover:text-[var(--text-graphite-strong)]',
          publicLogoAssetById[organization.id]?.variant === 'wide'
            ? 'w-14 px-1.5'
            : 'w-10 p-1.5',
        )}
      >
        <TrustedOrganizationBadge id={organization.id} />
      </div>
      <span
        className={cn(
          'min-w-0 text-balance font-[var(--font-display)] font-semibold leading-tight text-[var(--text-graphite)] transition-colors duration-200 group-hover:text-[var(--text-graphite-strong)]',
          organizationStyleClassName[organization.style ?? 'default'],
        )}
      >
        {organization.label}
      </span>
    </div>
  )
}

function splitOrganizationsIntoRows(
  organizations: TrustedOrganization[],
  rowsCount: number,
) {
  const rows = Array.from({ length: rowsCount }, () => [] as TrustedOrganization[])

  organizations.forEach((organization, index) => {
    rows[index % rowsCount].push(organization)
  })

  return rows.filter((row) => row.length > 0)
}

function TrustedOrganizationBadge({
  id,
}: {
  id: TrustedOrganization['id']
}) {
  const asset = publicLogoAssetById[id]

  if (asset) {
    return (
      <img
        src={asset.src}
        alt=""
        aria-hidden="true"
        decoding="async"
        className={cn(
          'block max-h-full max-w-full transition duration-200 group-hover:scale-[1.02]',
          asset.variant === 'wide'
            ? 'h-6 w-full object-cover object-left'
            : 'h-full w-full object-contain',
        )}
      />
    )
  }

  return <TrustedOrganizationIcon id={id} />
}

function TrustedOrganizationIcon({
  id,
}: {
  id: TrustedOrganization['id']
}) {
  const commonProps = {
    className: 'h-[18px] w-[18px]',
    viewBox: '0 0 24 24',
    fill: 'none',
    'aria-hidden': true as const,
  }

  switch (id) {
    case 'lukoil':
      return (
        <svg {...commonProps}>
          <path
            d="M12 3.25C9.38 6.7 7.25 9.52 7.25 13a4.75 4.75 0 1 0 9.5 0c0-3.48-2.13-6.3-4.75-9.75Z"
            stroke="currentColor"
            strokeWidth="1.7"
            strokeLinejoin="round"
          />
          <path
            d="M12 8.5v7"
            stroke="currentColor"
            strokeWidth="1.7"
            strokeLinecap="round"
          />
        </svg>
      )
    case 'sber':
      return (
        <svg {...commonProps}>
          <circle
            cx="12"
            cy="12"
            r="7.5"
            stroke="currentColor"
            strokeWidth="1.7"
          />
          <path
            d="m8.75 12.2 2.1 2.1 4.5-5.05"
            stroke="currentColor"
            strokeWidth="1.7"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      )
    case 'moex':
      return (
        <svg {...commonProps}>
          <path
            d="M6.75 16.75v-4.5M12 18V8.25M17.25 14.25v-6"
            stroke="currentColor"
            strokeWidth="1.9"
            strokeLinecap="round"
          />
          <path
            d="M5 18.5h14"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            opacity="0.7"
          />
        </svg>
      )
    case 'rosatom':
      return (
        <svg {...commonProps}>
          <circle cx="12" cy="12" r="1.75" fill="currentColor" />
          <ellipse
            cx="12"
            cy="12"
            rx="7.5"
            ry="3.25"
            stroke="currentColor"
            strokeWidth="1.4"
          />
          <ellipse
            cx="12"
            cy="12"
            rx="7.5"
            ry="3.25"
            stroke="currentColor"
            strokeWidth="1.4"
            transform="rotate(60 12 12)"
          />
          <ellipse
            cx="12"
            cy="12"
            rx="7.5"
            ry="3.25"
            stroke="currentColor"
            strokeWidth="1.4"
            transform="rotate(120 12 12)"
          />
        </svg>
      )
    case 'tbank':
      return (
        <svg {...commonProps}>
          <path
            d="M12 3.75 18.25 6v4.92c0 4.16-2.1 7.56-6.25 9.33-4.15-1.77-6.25-5.17-6.25-9.33V6L12 3.75Z"
            stroke="currentColor"
            strokeWidth="1.6"
            strokeLinejoin="round"
          />
          <path
            d="M8.8 8.2h6.4M12 8.2v7.6"
            stroke="currentColor"
            strokeWidth="1.6"
            strokeLinecap="round"
          />
        </svg>
      )
    case 'sintez':
      return (
        <svg {...commonProps}>
          <path
            d="M8.25 8.5h7.5l2.25 3.5-2.25 3.5h-7.5L6 12l2.25-3.5Z"
            stroke="currentColor"
            strokeWidth="1.6"
            strokeLinejoin="round"
          />
          <circle cx="12" cy="12" r="1.6" fill="currentColor" />
        </svg>
      )
    case 'sgh':
      return (
        <svg {...commonProps}>
          <path
            d="M4.75 18.5h14.5M6.5 18.5V10.75l4 2.25V9l5.5 3.25v6.25M15 8.25V5.5h2v4"
            stroke="currentColor"
            strokeWidth="1.6"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      )
    case 'vst':
      return (
        <svg {...commonProps}>
          <path
            d="M6 8.25h12M6 12h9M6 15.75h12"
            stroke="currentColor"
            strokeWidth="1.8"
            strokeLinecap="round"
          />
          <circle cx="16.75" cy="12" r="1.35" fill="currentColor" />
        </svg>
      )
    case 'bauman':
      return (
        <svg {...commonProps}>
          <path
            d="M8.25 17.75 12 6.25l3.75 11.5M9.75 13.25h4.5"
            stroke="currentColor"
            strokeWidth="1.7"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M6.25 18.5h11.5"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            opacity="0.7"
          />
        </svg>
      )
    case 'plekhanov':
      return (
        <svg {...commonProps}>
          <path
            d="M5.5 9.25 12 5.5l6.5 3.75M7 10.25v7M10.25 10.25v7M13.75 10.25v7M17 10.25v7M5.5 18.25h13"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      )
    case 'gubkin':
      return (
        <svg {...commonProps}>
          <path
            d="M12 4.75c1.65 1.95 2.75 3.48 2.75 5.1A2.74 2.74 0 0 1 12 12.6a2.74 2.74 0 0 1-2.75-2.75c0-1.62 1.1-3.15 2.75-5.1Z"
            stroke="currentColor"
            strokeWidth="1.6"
            strokeLinejoin="round"
          />
          <path
            d="M8 18.25h8M9.25 15.25h5.5"
            stroke="currentColor"
            strokeWidth="1.6"
            strokeLinecap="round"
          />
        </svg>
      )
    case 'sirius':
      return (
        <svg {...commonProps}>
          <path
            d="m12 4.75 1.85 4.35 4.65.4-3.54 2.98 1.08 4.52L12 14.45 7.96 17l1.08-4.52L5.5 9.5l4.65-.4L12 4.75Z"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinejoin="round"
          />
        </svg>
      )
    default:
      return <GenericOrganizationIcon />
  }
}

function GenericOrganizationIcon() {
  return (
    <svg
      className="h-[18px] w-[18px]"
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden="true"
    >
      <circle cx="12" cy="12" r="6.5" stroke="currentColor" strokeWidth="1.6" />
      <path
        d="M9 12h6"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
      />
    </svg>
  )
}
