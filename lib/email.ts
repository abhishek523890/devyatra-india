import { Resend } from 'resend'
import { getSiteSettings, type SiteSettings } from '@/lib/settings'

const resend = process.env.RESEND_API_KEY ? new Resend(process.env.RESEND_API_KEY) : null

const SOURCE_LABELS: Record<string, string> = {
  contact: 'Contact form',
  custom_tour: 'Custom tour request',
  char_dham: 'Char Dham enquiry',
}

function esc(v: unknown): string {
  return String(v ?? '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
}

function shell(title: string, bodyRows: string, footerNote?: string): string {
  return `<!doctype html><html><body style="margin:0;background:#f4f1ea;padding:24px;font-family:Arial,Helvetica,sans-serif;color:#2a2118">
    <div style="max-width:560px;margin:0 auto;background:#ffffff;border-radius:14px;overflow:hidden;border:1px solid #e7e0d4">
      <div style="background:#8a2b1f;padding:20px 24px">
        <h1 style="margin:0;font-size:18px;color:#fdf6ec">DevYatra India</h1>
      </div>
      <div style="padding:24px">
        <h2 style="margin:0 0 16px;font-size:18px;color:#8a2b1f">${esc(title)}</h2>
        <table style="width:100%;border-collapse:collapse;font-size:14px">${bodyRows}</table>
        ${footerNote ? `<p style="margin:20px 0 0;font-size:13px;color:#6b5f4f;line-height:1.6">${footerNote}</p>` : ''}
      </div>
      <div style="padding:14px 24px;background:#faf6ef;border-top:1px solid #eee5d6;font-size:12px;color:#8a7d6a">
        Sent automatically by the DevYatra India website.
      </div>
    </div>
  </body></html>`
}

function row(label: string, value: unknown): string {
  if (value === undefined || value === null || value === '') return ''
  return `<tr>
    <td style="padding:6px 12px 6px 0;color:#8a7d6a;vertical-align:top;white-space:nowrap">${esc(label)}</td>
    <td style="padding:6px 0;font-weight:600;color:#2a2118">${esc(value)}</td>
  </tr>`
}

type EnquiryPayload = {
  source: string
  name: string
  phone?: string
  email?: string
  message?: string
  details?: Record<string, unknown>
}

type BookingPayload = {
  reference: string
  packageName: string
  departureLabel?: string
  adults: number
  children: number
  rooms: number
  totalAmount: number
  leadName: string
  leadEmail?: string
  leadPhone?: string
}

async function resolveConfig(): Promise<{ settings: SiteSettings } | null> {
  if (!resend) return null
  const settings = await getSiteSettings()
  if (!settings.emailEnabled || !settings.fromEmail) return null
  return { settings }
}

/** Fire-and-forget: notify the owner and confirm to the customer. Never throws. */
export async function sendEnquiryEmails(payload: EnquiryPayload): Promise<void> {
  try {
    const config = await resolveConfig()
    if (!config) return
    const { settings } = config
    const label = SOURCE_LABELS[payload.source] ?? 'Website enquiry'
    const detailRows = Object.entries(payload.details ?? {})
      .map(([k, v]) => row(k.replace(/_/g, ' '), v))
      .join('')

    // 1) Owner notification
    if (settings.ownerEmail) {
      await resend!.emails.send({
        from: settings.fromEmail,
        to: settings.ownerEmail,
        replyTo: payload.email || undefined,
        subject: `New ${label}: ${payload.name}`,
        html: shell(
          `New ${label.toLowerCase()}`,
          row('Name', payload.name) +
            row('Phone', payload.phone) +
            row('Email', payload.email) +
            detailRows +
            row('Message', payload.message),
          'Open your admin panel to manage this enquiry.',
        ),
      })
    }

    // 2) Customer confirmation
    if (payload.email) {
      await resend!.emails.send({
        from: settings.fromEmail,
        to: payload.email,
        subject: 'We received your enquiry — DevYatra India',
        html: shell(
          `Namaste ${esc(payload.name)},`,
          row('Your request', label) + detailRows + row('Message', payload.message),
          `Thank you for reaching out to ${esc(settings.legalName || settings.brandName)}. Our team will contact you shortly. For anything urgent, call us at ${esc(settings.phones[0]?.display ?? '')}.`,
        ),
      })
    }
  } catch (err) {
    console.log('[v0] sendEnquiryEmails failed:', (err as Error)?.message)
  }
}

/** Fire-and-forget: notify the owner and confirm the booking to the customer. Never throws. */
export async function sendBookingEmails(payload: BookingPayload): Promise<void> {
  try {
    const config = await resolveConfig()
    if (!config) return
    const { settings } = config
    const money = `₹${Number(payload.totalAmount).toLocaleString('en-IN')}`
    const pax = `${payload.adults} adult(s), ${payload.children} child(ren), ${payload.rooms} room(s)`

    if (settings.ownerEmail) {
      await resend!.emails.send({
        from: settings.fromEmail,
        to: settings.ownerEmail,
        replyTo: payload.leadEmail || undefined,
        subject: `New booking ${payload.reference}: ${payload.packageName}`,
        html: shell(
          'New booking request',
          row('Reference', payload.reference) +
            row('Package', payload.packageName) +
            row('Departure', payload.departureLabel) +
            row('Travellers', pax) +
            row('Estimated total', money) +
            row('Lead name', payload.leadName) +
            row('Phone', payload.leadPhone) +
            row('Email', payload.leadEmail),
          'Open your admin panel to confirm this booking.',
        ),
      })
    }

    if (payload.leadEmail) {
      await resend!.emails.send({
        from: settings.fromEmail,
        to: payload.leadEmail,
        subject: `Your booking ${payload.reference} — DevYatra India`,
        html: shell(
          `Namaste ${esc(payload.leadName)},`,
          row('Reference', payload.reference) +
            row('Package', payload.packageName) +
            row('Departure', payload.departureLabel) +
            row('Travellers', pax) +
            row('Estimated total', money),
          `Thank you for booking with ${esc(settings.legalName || settings.brandName)}. Our team will call you to confirm the details and payment. Keep your reference number handy: <strong>${esc(payload.reference)}</strong>.`,
        ),
      })
    }
  } catch (err) {
    console.log('[v0] sendBookingEmails failed:', (err as Error)?.message)
  }
}
