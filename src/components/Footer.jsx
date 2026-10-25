import { useLanguage } from '../context/LanguageContext'
import { profile, links } from '../data/config'
import { IconUp } from './Icons'

const NAV = ['home', 'projects', 'skills', 'packages', 'about', 'contact']

export default function Footer() {
  const { t } = useLanguage()

  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-grid">
          <div className="footer-brand">
            <a href="#home" className="logo">
              <span className="logo-mark serif">{profile.logoLetter}</span>
              <span className="logo-text">
                {profile.logoText}
                <span className="logo-accent">{profile.logoAccent}</span>
              </span>
            </a>
            <p>{t.footer.text}</p>
            <a href="#home" className="btn btn-ghost btn-sm">
              <IconUp width={15} height={15} /> {t.footer.top}
            </a>
          </div>

          <div>
            <h4 className="footer-title">{t.footer.navTitle}</h4>
            <ul className="footer-list">
              {NAV.map((id) => (
                <li key={id}>
                  <a href={`#${id}`}>{t.nav[id]}</a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="footer-title">{t.footer.contactTitle}</h4>
            <ul className="footer-list">
              <li>
                <a href={links.telegram} target="_blank" rel="noreferrer">
                  Telegram
                </a>
              </li>
              <li>
                <a href={links.github} target="_blank" rel="noreferrer">
                  GitHub
                </a>
              </li>
              <li>
                <a href={links.email}>{links.emailLabel}</a>
              </li>
            </ul>
          </div>
        </div>

        <div className="footer-bottom">
          <span>
            © {profile.year} {profile.fullName}. {t.footer.rights}
          </span>
          <span className="footer-stack">React • Vite</span>
        </div>
      </div>
    </footer>
  )
}
