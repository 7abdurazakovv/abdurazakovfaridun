import { useEffect, useRef, useState } from 'react'
import { useLanguage } from '../context/LanguageContext'
import { useOrder } from '../context/OrderContext'
import { links, profile } from '../data/config'
import { IconClose, IconTelegram, IconCheck } from './Icons'

const EMPTY = { first: '', last: '', phone: '', service: '', pkg: '', details: '', consent: false }

// 901234567 -> "90 123 45 67"
const formatPhone = (digits) =>
  digits
    .replace(/^(\d{0,2})(\d{0,3})(\d{0,2})(\d{0,2}).*$/, (_, a, b, c, d) =>
      [a, b, c, d].filter(Boolean).join(' '),
    )

const pad = (n) => String(n).padStart(2, '0')
const nowString = () => {
  const d = new Date()
  return `${pad(d.getDate())}.${pad(d.getMonth() + 1)}.${d.getFullYear()} ${pad(d.getHours())}:${pad(d.getMinutes())}`
}

export default function OrderModal() {
  const { t } = useLanguage()
  const { open, preset, closeOrder } = useOrder()
  const o = t.order
  const pk = t.packages

  const [form, setForm] = useState(EMPTY)
  const [errors, setErrors] = useState({})
  const [tgUrl, setTgUrl] = useState('')
  const firstRef = useRef(null)

  // Ochilganda: formani tozalash, fokus, Esc bilan yopish, scroll qulfi
  useEffect(() => {
    if (!open) return
    setForm({ ...EMPTY, pkg: preset })
    setErrors({})
    setTgUrl('')
    const prev = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    const onKey = (e) => e.key === 'Escape' && closeOrder()
    window.addEventListener('keydown', onKey)
    const id = setTimeout(() => firstRef.current?.focus(), 80)
    return () => {
      document.body.style.overflow = prev
      window.removeEventListener('keydown', onKey)
      clearTimeout(id)
    }
  }, [open, preset, closeOrder])

  if (!open) return null

  const selectedPkg = pk.items.find((x) => x.id === form.pkg)

  const set = (k) => (e) => {
    setForm((f) => ({ ...f, [k]: e.target.value }))
    setErrors((er) => ({ ...er, [k]: undefined }))
  }
  const setPhone = (e) => {
    const digits = e.target.value.replace(/\D/g, '').slice(0, 9)
    setForm((f) => ({ ...f, phone: digits }))
    setErrors((er) => ({ ...er, phone: undefined }))
  }

  const submit = (e) => {
    e.preventDefault()
    const errs = {}
    if (form.first.trim().length < 2) errs.first = o.required
    if (form.last.trim().length < 2) errs.last = o.required
    if (form.phone.length !== 9) errs.phone = o.errPhone
    if (form.service === '') errs.service = o.required
    if (!selectedPkg) errs.pkg = o.required
    if (!form.consent) errs.consent = o.errConsent
    setErrors(errs)
    if (Object.keys(errs).length) return

    const line = '━━━━━━━━━━━━━━━━━'
    const lines = [
      `🛍 ${o.msgTitle}`,
      line,
      '',
      `👤 ${o.msgClient}: ${form.first.trim()} ${form.last.trim()}`,
      `📞 ${o.msgPhone}: +998 ${formatPhone(form.phone)}`,
      '',
      `🌐 ${o.msgService}: ${o.services[Number(form.service)]}`,
      `📦 ${o.msgPackage}: ${selectedPkg.name}`,
      `💰 ${o.msgPrice}: ${selectedPkg.price} ${pk.from}`,
      '',
      `✅ ${o.msgReq}:`,
      ...selectedPkg.features.map((f) => `• ${f}`),
    ]
    if (form.details.trim()) {
      lines.push('', `📝 ${o.msgNotes}:`, form.details.trim())
    }
    lines.push('', `📅 ${o.msgDate}: ${nowString()}`, line, `${profile.fullName} — Frontend Development`)

    // Telegram chatida yozish maydoniga matn tayyor holda tushadi
    const url = `https://t.me/${links.telegramUsername}?text=${encodeURIComponent(lines.join('\n'))}`
    setTgUrl(url)
    const w = window.open(url, '_blank')
    if (w) w.opener = null // brauzer bloklasa, pastdagi tugma orqali qo'lda ochiladi
  }

  const err = (k) => (errors[k] ? <small>{errors[k]}</small> : null)

  return (
    <div
      className="modal-backdrop"
      role="presentation"
      onMouseDown={(e) => e.target === e.currentTarget && closeOrder()}
    >
      <div className="modal" role="dialog" aria-modal="true" aria-labelledby="order-title">
        <div className="modal-top">
          <div>
            <span className="modal-eyebrow">{o.eyebrow}</span>
            <h3 id="order-title">
              {o.title} <em className="serif">{o.titleAccent}</em>
            </h3>
          </div>
          <button type="button" className="modal-close icon-btn" onClick={closeOrder} aria-label={o.close}>
            <IconClose width={18} height={18} />
          </button>
        </div>

        {tgUrl ? (
          <div className="modal-done">
            <span className="done-ico">
              <IconCheck width={22} height={22} />
            </span>
            <strong>{o.doneTitle}</strong>
            <p>{o.doneText}</p>
            <a href={tgUrl} target="_blank" rel="noreferrer" className="btn btn-dark">
              <IconTelegram width={16} height={16} /> {o.manual}
            </a>
          </div>
        ) : (
          <form className="order-form" onSubmit={submit} noValidate>
            <div className="form-row">
              <label className={`field ${errors.first ? 'has-error' : ''}`}>
                <span>
                  {o.firstName} <b>*</b>
                </span>
                <input
                  ref={firstRef}
                  type="text"
                  value={form.first}
                  onChange={set('first')}
                  placeholder={o.firstNamePh}
                  autoComplete="given-name"
                />
                {err('first')}
              </label>
              <label className={`field ${errors.last ? 'has-error' : ''}`}>
                <span>
                  {o.lastName} <b>*</b>
                </span>
                <input
                  type="text"
                  value={form.last}
                  onChange={set('last')}
                  placeholder={o.lastNamePh}
                  autoComplete="family-name"
                />
                {err('last')}
              </label>
            </div>

            <div className="form-row">
              <label className={`field ${errors.phone ? 'has-error' : ''}`}>
                <span>
                  {o.phone} <b>*</b>
                </span>
                <div className="phone-wrap">
                  <i>+998</i>
                  <input
                    type="tel"
                    inputMode="numeric"
                    value={formatPhone(form.phone)}
                    onChange={setPhone}
                    placeholder={o.phonePh}
                    autoComplete="tel-national"
                  />
                </div>
                {err('phone')}
              </label>

              <label className={`field ${errors.service ? 'has-error' : ''}`}>
                <span>
                  {o.service} <b>*</b>
                </span>
                <select value={form.service} onChange={set('service')}>
                  <option value="" disabled>
                    {o.servicePh}
                  </option>
                  {o.services.map((s, i) => (
                    <option key={s} value={i}>
                      {s}
                    </option>
                  ))}
                </select>
                {err('service')}
              </label>
            </div>

            <label className={`field ${errors.pkg ? 'has-error' : ''}`}>
              <span>
                {o.pkg} <b>*</b>
              </span>
              <select value={form.pkg} onChange={set('pkg')}>
                <option value="" disabled>
                  {o.pkgPh}
                </option>
                {pk.items.map((x) => (
                  <option key={x.id} value={x.id}>
                    {x.name} — {x.price} {pk.from}
                  </option>
                ))}
              </select>
              {err('pkg')}
            </label>

            <div className="field">
              <span>{o.reqLabel}</span>
              <div className={`req-box ${selectedPkg ? 'filled' : ''}`}>
                {selectedPkg ? (
                  <ul>
                    {selectedPkg.features.map((f) => (
                      <li key={f}>{f}</li>
                    ))}
                  </ul>
                ) : (
                  <p>{o.reqEmpty}</p>
                )}
              </div>
            </div>

            <label className="field">
              <span>{o.details}</span>
              <textarea rows={3} value={form.details} onChange={set('details')} placeholder={o.detailsPh} />
            </label>

            <div className={`consent-wrap ${errors.consent ? 'has-error' : ''}`}>
              <label className="consent">
                <input
                  type="checkbox"
                  checked={form.consent}
                  onChange={(e) => {
                    setForm((f) => ({ ...f, consent: e.target.checked }))
                    setErrors((er) => ({ ...er, consent: undefined }))
                  }}
                />
                <span>{o.consent}</span>
              </label>
              {err('consent')}
            </div>

            <div className="modal-foot">
              <p>{o.foot}</p>
              <button type="submit" className="btn btn-dark">
                {o.submit}
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  )
}
