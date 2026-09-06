'use server'

import { revalidatePath } from 'next/cache'
import { createClient } from '@/lib/supabase/server'
import { sendEnquiryEmails, sendBookingEmails } from '@/lib/email'

export type SubmitResult = { ok: boolean; error?: string }

export async function submitEnquiry(input: {
  source: 'contact' | 'custom_tour' | 'char_dham'
  name: string
  phone?: string
  email?: string
  message?: string
  details?: Record<string, unknown>
}): Promise<SubmitResult> {
  if (!input.name?.trim()) return { ok: false, error: 'Name is required.' }

  try {
    const supabase = await createClient()
    const { error } = await supabase.from('enquiries').insert({
      source: input.source,
      name: input.name.trim(),
      phone: input.phone?.trim() || null,
      email: input.email?.trim() || null,
      message: input.message?.trim() || null,
      details: input.details ?? {},
    })
    if (error) return { ok: false, error: 'We could not submit your enquiry right now. Please call or WhatsApp us.' }
    // Email notifications are best-effort — they never block a successful submission.
    await sendEnquiryEmails({
      source: input.source,
      name: input.name.trim(),
      phone: input.phone?.trim(),
      email: input.email?.trim(),
      message: input.message?.trim(),
      details: input.details,
    })
    revalidatePath('/admin/enquiries')
    return { ok: true }
  } catch {
    return { ok: false, error: 'Something went wrong. Please try again.' }
  }
}

export async function submitBooking(input: {
  reference: string
  packageSlug: string
  packageName: string
  departureLabel?: string
  adults: number
  children: number
  rooms: number
  totalAmount: number
  leadName: string
  leadEmail?: string
  leadPhone?: string
  travellers?: unknown[]
}): Promise<SubmitResult> {
  try {
    const supabase = await createClient()
    const { error } = await supabase.from('bookings').insert({
      reference: input.reference,
      package_slug: input.packageSlug,
      package_name: input.packageName,
      departure_label: input.departureLabel ?? null,
      adults: input.adults,
      children: input.children,
      rooms: input.rooms,
      total_amount: input.totalAmount,
      lead_name: input.leadName,
      lead_email: input.leadEmail ?? null,
      lead_phone: input.leadPhone ?? null,
      travellers: input.travellers ?? [],
    })
    if (error) return { ok: false, error: 'We could not record your booking. Please contact us to confirm.' }
    await sendBookingEmails({
      reference: input.reference,
      packageName: input.packageName,
      departureLabel: input.departureLabel,
      adults: input.adults,
      children: input.children,
      rooms: input.rooms,
      totalAmount: input.totalAmount,
      leadName: input.leadName,
      leadEmail: input.leadEmail,
      leadPhone: input.leadPhone,
    })
    revalidatePath('/admin/bookings')
    return { ok: true }
  } catch {
    return { ok: false, error: 'Something went wrong. Please try again.' }
  }
}
