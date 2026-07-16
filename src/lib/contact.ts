export type ContactPayload = {
  name: string
  phone: string
  email: string
  message: string
  service: string
  facadeMaterial: string
  homeMode: string
  consent: boolean
}

export async function sendContactRequest(payload: ContactPayload, attachment?: File) {
  const endpoint = import.meta.env.VITE_CONTACT_ENDPOINT
  if (!endpoint) throw new Error('Contact endpoint is not configured. Add VITE_CONTACT_ENDPOINT to enable sending.')
  const body = new FormData()
  Object.entries(payload).forEach(([key, value]) => body.append(key, String(value)))
  if (attachment) body.append('file', attachment, attachment.name)
  const response = await fetch(endpoint, { method: 'POST', headers: { Accept: 'application/json' }, body })
  if (!response.ok) throw new Error(`The server returned ${response.status}. Please try again.`)
  return response
}

export function formatPhone(value: string) {
  const digits = value.replace(/\D/g, '').slice(0, 15)
  if (!digits) return ''
  if (digits.length <= 3) return `+${digits}`
  if (digits.length <= 6) return `+${digits.slice(0, 3)} ${digits.slice(3)}`
  if (digits.length <= 9) return `+${digits.slice(0, 3)} ${digits.slice(3, 6)} ${digits.slice(6)}`
  return `+${digits.slice(0, 3)} ${digits.slice(3, 6)} ${digits.slice(6, 9)} ${digits.slice(9)}`
}
