import { createContext, useContext } from 'react'

export const localeOptions = ['en', 'ru'] as const

export type Locale = (typeof localeOptions)[number]

export type LocaleContextValue = {
  locale: Locale
  setLocale: (locale: Locale) => void
}

export const LocaleContext = createContext<LocaleContextValue | null>(null)

export function useLocale() {
  const context = useContext(LocaleContext)

  if (!context) {
    throw new Error('useLocale must be used within LocaleProvider')
  }

  return context
}
