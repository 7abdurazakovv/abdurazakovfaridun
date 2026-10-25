import { useLanguage } from '../context/LanguageContext'
import { links } from '../data/config'
import Reveal from '../components/Reveal'
import { IconTelegram, IconGithub, IconMail, IconArrow } from '../components/Icons'
import { useOrder } from '../context/OrderContext'

export default function Contact() {
  const { t } = useLanguage()
  const { openOrder } = useOrder()
  const c = t.contact

  const cards = [
    { key: 'telegram', href: links.telegram, label: links.telegramLabel, Icon: IconTelegram, ext: true },
    { key: 'github', href: links.github, label: links.githubLabel, Icon: IconGithub, ext: true },
    { key: 'email', href: links.email, label: links.emailLabel, Icon: IconMail, ext: false },
  ]

  return (
    <section id="contact" className="section contact-section">
      <div className="container">
        <Reveal className="cta-card">
          <div className="eyebrow">
            <span className="eyebrow-line" />
            <span>{c.eyebrow}</span>
            <span className="eyebrow-line" />
          </div>

          <h2 className="section-title">
            {c.titleA} <em className="serif">{c.titleB}</em>
            {c.titleC ? <> {c.titleC}</> : null}
          </h2>
          <p className="section-sub">{c.text}</p>

          <div className="cta-actions">
            <button type="button" className="btn btn-dark btn-lg" onClick={openOrder}>
              <IconTelegram width={17} height={17} /> {t.order.cta}
            </button>
            <a href={links.email} className="btn btn-light btn-lg">
              {c.btnEmail} <IconArrow width={16} height={16} />
            </a>
          </div>

          <div className="contact-cards">
            {cards.map(({ key, href, label, Icon, ext }) => (
              <a
                key={key}
                href={href}
                className="contact-card"
                {...(ext ? { target: '_blank', rel: 'noreferrer' } : {})}
              >
                <span className="card-ico sm">
                  <Icon width={18} height={18} />
                </span>
                <span className="contact-card-text">
                  <strong>{c.cards[key]}</strong>
                  <small>{label}</small>
                  <em>{c.cardHint[key]}</em>
                </span>
                <IconArrow width={16} height={16} className="contact-card-arrow" />
              </a>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  )
}
