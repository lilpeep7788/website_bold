import { type ChangeEvent, type FormEvent, useEffect, useState } from 'react'
import { ArrowUpRight, LoaderCircle, Paperclip } from 'lucide-react'
import { formatPhone, sendContactRequest, type ContactPayload } from '../lib/contact'
import type { FacadeMaterial, HomeMode } from '../data/content'

type ContactConfig = { service: string; facadeMaterial: FacadeMaterial; mode: HomeMode }
type ErrorKey = 'name' | 'phone' | 'email' | 'message' | 'consent' | 'file'
type Errors = Partial<Record<ErrorKey, string>>
type ContactProps = { config: ContactConfig }

const emptyForm: ContactPayload = { name: '', phone: '', email: '', message: '', service: '', facadeMaterial: 'concrete', homeMode: 'sunset', consent: false }

function validate(form: ContactPayload, file: File | null): Errors {
  const errors: Errors = {}
  if (!form.name.trim()) errors.name = 'Enter your name.'
  if (form.phone.replace(/\D/g, '').length < 10) errors.phone = 'Enter a complete phone number.'
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) errors.email = 'Enter a valid email address.'
  if (!form.message.trim()) errors.message = 'Tell us a little about the project.'
  if (!form.consent) errors.consent = 'Please confirm consent before sending.'
  if (file && file.size > 10 * 1024 * 1024) errors.file = 'The file must be smaller than 10 MB.'
  return errors
}

export function Contact({ config }: ContactProps) {
  const [form, setForm] = useState<ContactPayload>({ ...emptyForm, ...config })
  const [file, setFile] = useState<File | null>(null)
  const [fileInputKey, setFileInputKey] = useState(0)
  const [errors, setErrors] = useState<Errors>({})
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')
  const [feedback, setFeedback] = useState('')

  useEffect(() => { setForm((current) => ({ ...current, ...config })) }, [config])

  const update = (key: keyof ContactPayload, value: string | boolean) => {
    setForm((current) => ({ ...current, [key]: key === 'phone' && typeof value === 'string' ? formatPhone(value) : value }))
    setErrors((current) => ({ ...current, [key as ErrorKey]: undefined }))
    if (status !== 'idle') { setStatus('idle'); setFeedback('') }
  }

  const onFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    const nextFile = event.target.files?.[0] ?? null
    setFile(nextFile)
    setErrors((current) => ({ ...current, file: undefined }))
  }

  const onSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const nextErrors = validate(form, file)
    if (Object.keys(nextErrors).length) { setErrors(nextErrors); setStatus('idle'); return }
    setStatus('loading'); setFeedback('')
    try {
      await sendContactRequest(form, file ?? undefined)
      setStatus('success'); setFeedback('REQUEST RECEIVED — WE WILL BE IN TOUCH.'); setForm({ ...emptyForm, ...config }); setFile(null); setFileInputKey((value) => value + 1)
    } catch (error) {
      setStatus('error'); setFeedback(error instanceof Error ? error.message : 'The request could not be sent. Please try again.')
    }
  }

  return <section className="contact-section" id="contact"><div className="section-shell contact-grid">
    <div className="contact-intro reveal"><p className="section-label">START A CONVERSATION</p><h2>LET’S BUILD<br /><em>SOMETHING LASTING.</em></h2><p className="section-copy">Tell us what you are considering. A short brief is enough to start.</p><div className="contact-links"><a href="mailto:hello@northline.studio">HELLO@NORTHLINE.STUDIO <ArrowUpRight size={17} /></a><a href="tel:+15035550148">+1 503 555 0148 <ArrowUpRight size={17} /></a><a href="https://t.me" target="_blank" rel="noreferrer">TELEGRAM <ArrowUpRight size={17} /></a></div></div>
    <div className="contact-form-wrap reveal"><form onSubmit={onSubmit} noValidate aria-describedby="form-feedback">
      <div className="form-grid"><label className="line-field">NAME<input value={form.name} onChange={(event) => update('name', event.target.value)} autoComplete="name" aria-invalid={Boolean(errors.name)} />{errors.name && <span className="field-error">{errors.name}</span>}</label><label className="line-field">PHONE NUMBER<input value={form.phone} onChange={(event) => update('phone', event.target.value)} type="tel" autoComplete="tel" aria-invalid={Boolean(errors.phone)} />{errors.phone && <span className="field-error">{errors.phone}</span>}</label></div>
      <div className="form-grid"><label className="line-field">EMAIL<input value={form.email} onChange={(event) => update('email', event.target.value)} type="email" autoComplete="email" aria-invalid={Boolean(errors.email)} />{errors.email && <span className="field-error">{errors.email}</span>}</label><label className="line-field">MESSAGE<textarea value={form.message} onChange={(event) => update('message', event.target.value)} rows={3} aria-invalid={Boolean(errors.message)} />{errors.message && <span className="field-error">{errors.message}</span>}</label></div>
      <label className="file-field" htmlFor="project-file"><span><Paperclip size={18} /> FILE</span><input key={fileInputKey} id="project-file" type="file" accept=".pdf,.jpg,.jpeg,.png,.webp" onChange={onFileChange} /> <strong>{file ? file.name : 'Attach a plan, reference or brief'}</strong></label>{errors.file && <p className="field-error field-error-static">{errors.file}</p>}<p className="form-helper">PDF, JPG, PNG or WebP · up to 10 MB</p>
      <label className="consent-field"><input type="checkbox" checked={form.consent} onChange={(event) => update('consent', event.target.checked)} aria-invalid={Boolean(errors.consent)} /><span>I agree to the privacy policy and consent to be contacted about my project.</span></label>{errors.consent && <p className="field-error field-error-static">{errors.consent}</p>}
      <button className="button button-gold form-submit" type="submit" disabled={status === 'loading'}>{status === 'loading' ? <><LoaderCircle className="spin" size={18} /> SENDING</> : 'SEND REQUEST'} <ArrowUpRight size={18} /></button><p id="form-feedback" className={`form-message ${status}`} role={status === 'error' ? 'alert' : 'status'} aria-live="polite">{feedback}</p>
    </form></div>
  </div></section>
}
