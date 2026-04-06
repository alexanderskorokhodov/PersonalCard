import { useTransition } from 'react'
import { useSiteContent } from '@/content/site-data'
import { cn } from '@/lib/cn'
import { useLocale, type Locale } from '@/lib/locale-context'

const localeButtons: Array<{ locale: Locale; flag: string; labelKey: 'englishLabel' | 'russianLabel' }> = [
  { locale: 'en', flag: '🇬🇧', labelKey: 'englishLabel' },
  { locale: 'ru', flag: '🇷🇺', labelKey: 'russianLabel' },
]

type LocaleToggleProps = {
  className?: string
}

export function LocaleToggle({ className }: LocaleToggleProps) {
  const [isPending, startTransition] = useTransition()
  const { locale, setLocale } = useLocale()
  const { localeToggle } = useSiteContent()

  return (
    <div
      className={cn(
        'glass-segmented fixed right-4 top-4 z-40 border border-black/6 bg-[var(--surface-overlay)] p-1 shadow-[var(--shadow-soft)] backdrop-blur md:right-8 md:top-8',
        className,
      )}
      role="group"
      aria-label={localeToggle.ariaLabel}
      aria-busy={isPending}
    >
      {localeButtons.map((button) => {
        const isActive = locale === button.locale
        const label = localeToggle[button.labelKey]

        return (
          <button
            key={button.locale}
            type="button"
            lang={button.locale}
            title={label}
            aria-label={label}
            aria-pressed={isActive}
            onClick={() => {
              if (isActive) {
                return
              }

              startTransition(() => {
                setLocale(button.locale)
              })
            }}
            className={cn(
              'flex h-9 w-9 cursor-pointer items-center justify-center rounded-[12px] text-[18px] leading-none transition-all duration-200',
              isActive
                ? 'border border-black/10 bg-white text-[var(--text-strong)] shadow-[var(--shadow-tab)]'
                : 'text-[var(--text-soft)] hover:text-[var(--text-strong)]',
            )}
          >
            <span aria-hidden="true">{button.flag}</span>
            <span className="sr-only">{label}</span>
          </button>
        )
      })}
    </div>
  )
}
