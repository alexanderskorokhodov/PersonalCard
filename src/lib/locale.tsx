import { useEffect, useState, type PropsWithChildren } from 'react'
import { LocaleContext, type Locale } from './locale-context'

const STORAGE_KEY = 'personalcard-locale'

function isLocale(value: string | null): value is Locale {
  return value === 'en' || value === 'ru'
}

function readStoredLocale(): Locale | null {
  if (typeof window === 'undefined') {
    return null
  }

  try {
    const storedLocale = window.localStorage.getItem(STORAGE_KEY)
    return isLocale(storedLocale) ? storedLocale : null
  } catch {
    return null
  }
}

function detectBrowserLocale(): Locale {
  if (typeof navigator === 'undefined') {
    return 'en'
  }

  const languages = navigator.languages?.length ? navigator.languages : [navigator.language]
  return languages.some((language) => language.toLowerCase().startsWith('ru')) ? 'ru' : 'en'
}

function getInitialLocale(): Locale {
  return readStoredLocale() ?? detectBrowserLocale()
}

export function LocaleProvider({ children }: PropsWithChildren) {
  const [locale, setLocale] = useState<Locale>(getInitialLocale)

  useEffect(() => {
    document.documentElement.lang = locale

    try {
      window.localStorage.setItem(STORAGE_KEY, locale)
    } catch {
      // Ignore storage access issues and keep locale in memory.
    }
  }, [locale])

  return (
    <LocaleContext.Provider value={{ locale, setLocale }}>
      {children}
    </LocaleContext.Provider>
  )
}
