import { useLanguage } from '../context/LanguageContext'
import SectionHead from '../components/SectionHead'
import Reveal from '../components/Reveal'
import { IconFolder, IconArrow } from '../components/Icons'
import { useOrder } from '../context/OrderContext'

// Hozircha loyihalar yo'q. Tayyor sayt bo'lganda `projects` massiviga qo'shing:
// { title, tag, description, url, image }
const projects = []

export default function Projects() {
  const { t } = useLanguage()
  const { openOrder } = useOrder()
  const p = t.projects

  return (
    <section id="projects" className="section">
      <div className="container">
        <SectionHead eyebrow={p.eyebrow} titleA={p.titleA} titleB={p.titleB} sub={p.sub} />

        {projects.length === 0 ? (
          <Reveal className="empty-card" delay={100}>
            <div className="empty-browser" aria-hidden="true">
              <div className="mock-bar">
                <span className="mock-dots">
                  <i />
                  <i />
                  <i />
                </span>
                <span className="mock-url">—</span>
              </div>
              <div className="empty-browser-body">
                <IconFolder width={34} height={34} />
              </div>
            </div>

            <div className="empty-copy">
              <span className="tag">
                <i className="dot" /> {p.soon}
              </span>
              <h3>{p.emptyTitle}</h3>
              <p>{p.emptyText}</p>
              <button type="button" className="link-arrow" onClick={openOrder}>
                <span>{p.emptyBtn}</span>
                <span className="link-arrow-ico">
                  <IconArrow width={16} height={16} />
                </span>
              </button>
            </div>
          </Reveal>
        ) : null}
      </div>
    </section>
  )
}
