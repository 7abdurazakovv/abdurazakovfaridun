import { useLanguage } from '../context/LanguageContext'
import SectionHead from '../components/SectionHead'
import Reveal from '../components/Reveal'
import { IconPhone, IconCode, IconLayout, IconGlobe, IconContrast, IconBolt } from '../components/Icons'

const ICONS = [IconPhone, IconCode, IconLayout, IconGlobe, IconContrast, IconBolt]

export default function Skills() {
  const { t } = useLanguage()
  const s = t.skills

  return (
    <section id="skills" className="section">
      <div className="container">
        <SectionHead eyebrow={s.eyebrow} titleA={s.titleA} titleB={s.titleB} sub={s.sub} />

        <div className="card-grid">
          {s.cards.map((c, i) => {
            const Icon = ICONS[i]
            return (
              <Reveal key={c.t} className="card skill-card" delay={(i % 3) * 90}>
                <span className="card-ico">
                  <Icon width={20} height={20} />
                </span>
                <h3>{c.t}</h3>
                <p>{c.d}</p>
              </Reveal>
            )
          })}
        </div>

        <div className="process">
          <SectionHead
            eyebrow={s.processEyebrow}
            titleA={s.processTitleA}
            titleB={s.processTitleB}
            sub={s.processSub}
          />
          <div className="steps">
            {s.steps.map((st, i) => (
              <Reveal key={st.t} className="step" delay={i * 100}>
                <span className="step-num">0{i + 1}</span>
                <h3>{st.t}</h3>
                <p>{st.d}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
