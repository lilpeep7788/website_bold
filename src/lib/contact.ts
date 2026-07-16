export type ContactPayload = { name: string; phone: string; email: string; message: string }

export async function sendContactRequest(payload: ContactPayload) {
  const endpoint = import.meta.env.VITE_CONTACT_ENDPOINT
  if (!endpoint) throw new Error('Set VITE_CONTACT_ENDPOINT to connect this form to a contact API.')
  const response = await fetch(endpoint, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(payload) })
  if (!response.ok) throw new Error('The request could not be sent. Please try again.')
}

export function formatPhone(value: string) {
  const digits = value.replace(/\D/g, '').slice(0, 11)
  if (!digits) return ''
  const normalized = digits.startsWith('8') ? `7${digits.slice(1)}` : digits
  const match = normalized.match(/^(\d)(\d{0,3})(\d{0,3})(\d{0,2})(\d{0,2})$/)
  if (!match) return `+${normalized}`
  const [, country, area, prefix, firstPair, secondPair] = match
  return `+${country}${area ? ` (${area}` : ''}${area.length === 3 ? ')' : ''}${prefix ? ` ${prefix}` : ''}${firstPair ? `-${firstPair}` : ''}${secondPair ? `-${secondPair}` : ''}`
}
