import { useLanguage } from '../context/LanguageContext'
import { profile, links, techStack } from '../data/config'
import SectionHead from '../components/SectionHead'
import Reveal from '../components/Reveal'
import { IconTelegram, IconGithub, IconMail } from '../components/Icons'

export default function About() {
  const { t } = useLanguage()
  const a = t.about

  const rows = [
    [a.fields.name, profile.fullName],
    [a.fields.role, a.role],
    [a.fields.location, a.location],
    [a.fields.status, a.status],
  ]

  return (
    <section id="about" className="section">
      <div className="container">
        <SectionHead
          eyebrow={a.eyebrow}
          titleA={a.titleA}
          titleB={a.titleB}
          sub={a.sub}
          align="left"
        />

        <div className="about-grid">
          <Reveal className="card about-card">
            <h3 className="card-title">{a.infoTitle}</h3>
            <p className="about-bio">{a.bio}</p>
            <dl className="info-list">
              {rows.map(([k, v]) => (
                <div key={k} className="info-row">
                  <dt>{k}</dt>
                  <dd>{v}</dd>
                </div>
              ))}
            </dl>
            <div className="pill-row">
              <a className="pill-link" href={links.telegram} target="_blank" rel="noreferrer">
                <IconTelegram width={15} height={15} /> Telegram
              </a>
              <a className="pill-link" href={links.github} target="_blank" rel="noreferrer">
                <IconGithub width={15} height={15} /> GitHub
              </a>
              <a className="pill-link" href={links.email}>
                <IconMail width={15} height={15} /> Email
              </a>
            </div>
          </Reveal>

          <Reveal className="card about-card" delay={120}>
            <h3 className="card-title">{a.techTitle}</h3>
            <div className="tag-row">
              {techStack.map((x) => (
                <span key={x} className="tech-tag">
                  {x}
                </span>
              ))}
            </div>

            <div className="mini-code">
              <div className="code-label">{'</>'} profile.js</div>
              <pre>
                <span className="c-key">const</span> developer = {'{'}
                {'\n  '}name: <span className="c-str">"{profile.fullName}"</span>,
                {'\n  '}role: <span className="c-str">"Frontend Developer"</span>,
                {'\n  '}langs: [<span className="c-str">"uz"</span>, <span className="c-str">"ru"</span>,{' '}
                <span className="c-str">"en"</span>],
                {'\n'}
                {'}'};
              </pre>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  )
}
