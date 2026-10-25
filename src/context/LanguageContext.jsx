import { createContext, useContext, useEffect, useState } from 'react'
import { translations } from '../data/translations'
import { orderText } from '../data/orderText'
import { packagesText } from '../data/packagesText'

const LanguageContext = createContext(null)

function getInitialLang() {
  try {
    const saved = localStorage.getItem('lang')
    if (saved && translations[saved]) return saved
  } catch {
    /* localStorage mavjud emas */
  }
  return 'uz'
}

export function LanguageProvider({ children }) {
  const [lang, setLang] = useState(getInitialLang)

  useEffect(() => {
    document.documentElement.setAttribute('lang', lang)
    document.title = translations[lang].meta.title
    try {
      localStorage.setItem('lang', lang)
    } catch {
      /* ignore */
    }
  }, [lang])

  return (
    <LanguageContext.Provider value={{
        lang,
        setLang,
        t: {
          ...translations[lang],
          nav: { ...translations[lang].nav, packages: packagesText[lang].navLabel },
          order: orderText[lang],
          packages: packagesText[lang],
        },
      }}>
      {children}
    </LanguageContext.Provider>
  )
}

export function useLanguage() {
  const ctx = useContext(LanguageContext)
  if (!ctx) throw new Error('useLanguage LanguageProvider ichida ishlatilishi kerak')
  return ctx
}
