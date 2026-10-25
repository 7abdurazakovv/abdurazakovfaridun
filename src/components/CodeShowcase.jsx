import { useRef } from 'react'
import { useLanguage } from '../context/LanguageContext'
import { profile } from '../data/config'

// Hero qismidagi brauzer oynasi maketi (skeleton) + suzuvchi kartochkalar.
export default function CodeShowcase() {
  const { t } = useLanguage()
  const ref = useRef(null)

  // Sichqoncha harakatiga qarab yengil 3D-egilish (qo'shimcha effekt)
  const onMove = (e) => {
    const el = ref.current
    if (!el || window.matchMedia('(pointer: coarse)').matches) return
    const r = el.getBoundingClientRect()
    const x = (e.clientX - r.left) / r.width - 0.5
    const y = (e.clientY - r.top) / r.height - 0.5
    el.style.transform = `perspective(1100px) rotateY(${x * 5}deg) rotateX(${-y * 4}deg)`
  }
  const onLeave = () => {
    if (ref.current) ref.current.style.transform = ''
  }

  return (
    <div className="showcase" onMouseMove={onMove} onMouseLeave={onLeave}>
      <div className="showcase-tilt" ref={ref}>
        <span className="chip chip-float">
          <i className="dot" /> {t.home.chipCountry}
        </span>

        <div className="mock">
          <div className="mock-bar">
            <span className="mock-dots">
              <i />
              <i />
              <i />
            </span>
            <span className="mock-url">faridun.uz</span>
          </div>

          <div className="mock-body">
            <div className="mock-nav">
              <i className="sk sk-sq" />
              <i className="sk sk-xs" />
              <span className="mock-nav-gap" />
              <i className="sk sk-sm" />
              <i className="sk sk-sm" />
              <i className="sk sk-sm" />
              <i className="sk sk-btn" />
            </div>

            <div className="mock-hero">
              <div className="mock-text">
                <span className="mock-badge">{t.home.mockBadge}</span>
                <i className="sk sk-h1" />
                <i className="sk sk-h2" />
                <i className="sk sk-h3 tan" />
                <i className="sk sk-p" />
                <i className="sk sk-p short" />
                <div className="mock-btns">
                  <i className="sk sk-pill dark" />
                  <i className="sk sk-pill" />
                </div>
              </div>
              <div className="mock-visual">
                <i className="sk sk-sq tan" />
                <div className="mock-visual-lines">
                  <i className="sk sk-p" />
                  <i className="sk sk-p short" />
                </div>
              </div>
            </div>

            <div className="mock-cards">
              <div className="mock-card">
                <i className="sk sk-sq tan" />
                <i className="sk sk-p" />
                <i className="sk sk-p short" />
              </div>
              <div className="mock-card">
                <i className="sk sk-sq tan" />
                <i className="sk sk-p" />
                <i className="sk sk-p short" />
              </div>
            </div>
          </div>
        </div>

        <div className="float-card float-score">
          <span className="score">100</span>
          <div>
            <strong>{t.home.floatTitle}</strong>
            <small>{t.home.floatSub}</small>
          </div>
        </div>

        <div className="float-card float-code">
          <div className="code-label">{'</>'} {t.home.codeLabel}</div>
          <pre>
            <span className="c-key">const</span> dev = {'{'}
            {'\n  '}name: <span className="c-str">"{profile.shortName}"</span>,
            {'\n  '}role: <span className="c-str">"frontend"</span>,
            {'\n  '}stack: <span className="c-str">"React"</span>,
            {'\n'}
            {'}'};
          </pre>
        </div>
      </div>
    </div>
  )
}
