import Reveal from './Reveal'

export default function SectionHead({ eyebrow, titleA, titleB, titleC, sub, align = 'center' }) {
  return (
    <Reveal className={`section-head ${align}`}>
      <div className="eyebrow">
        <span className="eyebrow-line" />
        <span>{eyebrow}</span>
        <span className="eyebrow-line" />
      </div>
      <h2 className="section-title">
        {titleA} <em className="serif">{titleB}</em>
        {titleC ? <> {titleC}</> : null}
      </h2>
      {sub ? <p className="section-sub">{sub}</p> : null}
    </Reveal>
  )
}
