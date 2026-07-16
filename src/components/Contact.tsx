import { type FormEvent, useState } from 'react'
import { ArrowUpRight, LoaderCircle } from 'lucide-react'
import { formatPhone, sendContactRequest, type ContactPayload } from '../lib/contact'

type Errors = Partial<Record<keyof ContactPayload, string>>
const initialForm: ContactPayload = { name: '', phone: '', email: '', message: '' }

function validate(form: ContactPayload): Errors {
  const errors: Errors = {}
  if (!form.name.trim()) errors.name = 'Enter your name.'
  if (form.phone.replace(/\D/g, '').length < 10) errors.phone = 'Enter a complete phone number.'
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) errors.email = 'Enter a valid email address.'
  return errors
}

export function Contact() {
  const [form, setForm] = useState(initialForm)
  const [errors, setErrors] = useState<Errors>({})
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')
  const [message, setMessage] = useState('')
  const update = (key: keyof ContactPayload, value: string) => { setForm((current) => ({ ...current, [key]: key === 'phone' ? formatPhone(value) : value })); setErrors((current) => ({ ...current, [key]: undefined })); if (status !== 'idle') setStatus('idle') }
  const onSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const nextErrors = validate(form)
    if (Object.keys(nextErrors).length) { setErrors(nextErrors); return }
    setStatus('loading'); setMessage('')
    try { await sendContactRequest(form); setStatus('success'); setMessage('REQUEST RECEIVED'); setForm(initialForm) }
    catch (error) { setStatus('error'); setMessage(error instanceof Error ? error.message : 'The request could not be sent.') }
  }
  return <section className="contact-section" id="contact"><div className="section-shell contact-grid"><div className="contact-form-wrap reveal"><p className="section-label">START A CONVERSATION</p><h2>LET’S BUILD<br />SOMETHING <em>LASTING.</em></h2><form onSubmit={onSubmit} noValidate>{([['name', 'NAME'], ['phone', 'PHONE NUMBER'], ['email', 'EMAIL']] as const).map(([key, label]) => <label className="line-field" key={key}>{label}<input value={form[key]} onChange={(event) => update(key, event.target.value)} type={key === 'email' ? 'email' : 'text'} autoComplete={key === 'phone' ? 'tel' : key} aria-invalid={Boolean(errors[key])} />{errors[key] && <span className="field-error">{errors[key]}</span>}</label>)}<label className="line-field line-field-message">TELL US ABOUT YOUR PROJECT<textarea value={form.message} onChange={(event) => update('message', event.target.value)} rows={2} /></label><button className="button button-gold" type="submit" disabled={status === 'loading'}>{status === 'loading' ? <><LoaderCircle className="spin" size={17} /> SENDING</> : 'SEND REQUEST'} <ArrowUpRight size={17} /></button>{message && <p className={`form-message ${status}`}>{message}</p>}</form></div><address className="contact-details reveal"><a href="mailto:hello@northline.studio">HELLO@NORTHLINE.STUDIO</a><a href="tel:+15035550148">+1 503 555 0148</a><p>PORTLAND, OREGON</p><a href="https://instagram.com" target="_blank" rel="noreferrer">INSTAGRAM <ArrowUpRight size={15} /></a><a href="https://t.me" target="_blank" rel="noreferrer">TELEGRAM <ArrowUpRight size={15} /></a></address></div></section>
}
