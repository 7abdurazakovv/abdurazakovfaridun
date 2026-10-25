import { useLanguage } from '../context/LanguageContext'
import { techStack } from '../data/config'
import CodeShowcase from '../components/CodeShowcase'
import Reveal from '../components/Reveal'
import { IconArrow } from '../components/Icons'
import { useOrder } from '../context/OrderContext'

export default function Home() {
  const { t } = useLanguage()
  const { openOrder } = useOrder()
  const marquee = [...techStack, ...techStack, ...techStack]

  return (
    <section id="home" className="hero-section">
      <div className="container hero">
        <div className="hero-copy">
          <Reveal className="badge">
            <i className="dot" />
            <span>{t.home.badge}</span>
          </Reveal>

          <Reveal as="h1" className="hero-title" delay={80}>
            {t.home.titleA} <em className="serif">{t.home.titleB}</em>
          </Reveal>

          <Reveal as="p" className="hero-text" delay={160}>
            {t.home.text}
          </Reveal>

          <Reveal className="hero-actions" delay={240}>
            <a href="#projects" className="btn btn-dark btn-lg">
              {t.home.btnProjects} <IconArrow width={16} height={16} />
            </a>
            <button type="button" className="btn btn-light btn-lg" onClick={openOrder}>
              {t.order.cta}
            </button>
          </Reveal>

          <Reveal className="hero-note" delay={320}>
            <i className="dot pulse" /> {t.home.note}
          </Reveal>
        </div>

        <Reveal className="hero-visual" delay={200}>
          <CodeShowcase />
        </Reveal>
      </div>

      <div className="marquee" aria-hidden="true">
        <div className="marquee-track">
          {marquee.map((item, i) => (
            <span key={i} className="marquee-item">
              {item}
              <i className="marquee-dot" />
            </span>
          ))}
        </div>
      </div>
    </section>
  )
}
