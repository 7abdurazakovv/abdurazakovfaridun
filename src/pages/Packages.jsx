import { useLanguage } from '../context/LanguageContext'
import { useOrder } from '../context/OrderContext'
import SectionHead from '../components/SectionHead'
import Reveal from '../components/Reveal'
import { IconCheck } from '../components/Icons'

export default function Packages() {
  const { t } = useLanguage()
  const { openOrder } = useOrder()
  const p = t.packages

  return (
    <section id="packages" className="section">
      <div className="container">
        <SectionHead eyebrow={p.eyebrow} titleA={p.titleA} titleB={p.titleB} sub={p.sub} />

        <div className="pkg-grid">
          {p.items.map((pkg, i) => {
            const featured = pkg.id === 'normal'
            return (
              <Reveal key={pkg.id} className={`pkg ${featured ? 'featured' : ''}`} delay={i * 100}>
                {featured && <span className="pkg-badge">✦ {p.badge}</span>}
                <span className="pkg-name">{pkg.name}</span>
                <div className="pkg-price">
                  <strong>{pkg.price}</strong>
                  <small>{p.from}</small>
                </div>
                <p className="pkg-desc">{pkg.desc}</p>

                <ul className="pkg-list">
                  {pkg.features.map((f) => (
                    <li key={f}>
                      <span className="pkg-check">
                        <IconCheck width={11} height={11} strokeWidth={2.6} />
                      </span>
                      {f}
                    </li>
                  ))}
                </ul>

                <button
                  type="button"
                  className={`btn ${featured ? 'btn-dark' : 'btn-light'} pkg-btn`}
                  onClick={() => openOrder(pkg.id)}
                >
                  {p.button}
                </button>
              </Reveal>
            )
          })}
        </div>

        <Reveal className="pkg-note">
          <b>{p.noteLabel}</b> {p.note}
        </Reveal>
      </div>
    </section>
  )
}
