import { useEffect, useState } from 'react'
import { useLanguage } from '../context/LanguageContext'
import { useTheme } from '../context/ThemeContext'
import { languages } from '../data/translations'
import { profile } from '../data/config'
import { useOrder } from '../context/OrderContext'
import { IconMoon, IconSun, IconMenu, IconClose } from './Icons'

const SECTIONS = ['home', 'projects', 'skills', 'packages', 'about', 'contact']

export default function Navbar() {
  const { t, lang, setLang } = useLanguage()
  const { theme, toggleTheme } = useTheme()
  const { openOrder } = useOrder()
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)
  const [active, setActive] = useState('home')

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // Qaysi bo'lim ko'rinib turganini aniqlaydi
  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY + window.innerHeight * 0.35
      let current = SECTIONS[0]
      for (const id of SECTIONS) {
        const el = document.getElementById(id)
        if (el && el.offsetTop <= y) current = id
      }
      setActive(current)
    }
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [open])

  const go = () => setOpen(false)

  return (
    <header className={`navbar ${scrolled ? 'scrolled' : ''}`}>
      <div className="container nav-inner">
        <a href="#home" className="logo" onClick={go} aria-label={profile.fullName}>
          <span className="logo-mark serif">{profile.logoLetter}</span>
          <span className="logo-text">
            {profile.logoText}
            <span className="logo-accent">{profile.logoAccent}</span>
          </span>
        </a>

        <nav className="nav-pill" aria-label="Main">
          {SECTIONS.map((id) => (
            <a key={id} href={`#${id}`} className={active === id ? 'active' : ''}>
              {t.nav[id]}
            </a>
          ))}
        </nav>

        <div className="nav-right">
          <div className="lang-switch" role="group" aria-label="Language">
            {languages.map((l) => (
              <button
                key={l.code}
                type="button"
                className={lang === l.code ? 'active' : ''}
                onClick={() => setLang(l.code)}
                aria-pressed={lang === l.code}
              >
                {l.label}
              </button>
            ))}
          </div>

          <button
            type="button"
            className="icon-btn"
            onClick={toggleTheme}
            aria-label={t.nav.theme}
            title={t.nav.theme}
          >
            {theme === 'dark' ? <IconSun /> : <IconMoon />}
          </button>

          <button type="button" className="btn btn-dark nav-cta" onClick={openOrder}>
            {t.order.cta}
          </button>

          <button
            type="button"
            className="icon-btn menu-btn"
            onClick={() => setOpen((o) => !o)}
            aria-label={t.nav.menu}
            aria-expanded={open}
          >
            {open ? <IconClose /> : <IconMenu />}
          </button>
        </div>
      </div>

      <div className={`mobile-panel ${open ? 'open' : ''}`}>
        <nav className="container mobile-links">
          {SECTIONS.map((id) => (
            <a key={id} href={`#${id}`} className={active === id ? 'active' : ''} onClick={go}>
              {t.nav[id]}
            </a>
          ))}
          <button
            type="button"
            className="btn btn-dark"
            onClick={() => {
              go()
              openOrder()
            }}
          >
            {t.order.cta}
          </button>
        </nav>
      </div>
    </header>
  )
}
