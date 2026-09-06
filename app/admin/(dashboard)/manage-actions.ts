'use server'

import { revalidatePath } from 'next/cache'
import { createClient } from '@/lib/supabase/server'
import { requireAdmin } from '@/lib/auth'
import { defaultSettings, type SiteSettings } from '@/lib/settings'

// ---------- bookings --------------------------------------------------------
export async function updateBookingStatus(formData: FormData): Promise<void> {
  await requireAdmin()
  const id = String(formData.get('id') ?? '')
  const status = String(formData.get('status') ?? '')
  if (!id || !status) return
  const supabase = await createClient()
  await supabase.from('bookings').update({ status }).eq('id', id)
  revalidatePath('/admin/bookings')
  revalidatePath('/admin')
}

export async function deleteBooking(formData: FormData): Promise<void> {
  await requireAdmin()
  const id = String(formData.get('id') ?? '')
  if (!id) return
  const supabase = await createClient()
  await supabase.from('bookings').delete().eq('id', id)
  revalidatePath('/admin/bookings')
  revalidatePath('/admin')
}

// ---------- enquiries -------------------------------------------------------
export async function updateEnquiryStatus(formData: FormData): Promise<void> {
  await requireAdmin()
  const id = String(formData.get('id') ?? '')
  const status = String(formData.get('status') ?? '')
  if (!id || !status) return
  const supabase = await createClient()
  await supabase.from('enquiries').update({ status }).eq('id', id)
  revalidatePath('/admin/enquiries')
  revalidatePath('/admin')
}

export async function deleteEnquiry(formData: FormData): Promise<void> {
  await requireAdmin()
  const id = String(formData.get('id') ?? '')
  if (!id) return
  const supabase = await createClient()
  await supabase.from('enquiries').delete().eq('id', id)
  revalidatePath('/admin/enquiries')
  revalidatePath('/admin')
}

// ---------- site settings ---------------------------------------------------
export type SettingsState = { error?: string; success?: boolean } | undefined

function lines(v: FormDataEntryValue | null): string[] {
  return String(v ?? '')
    .split('\n')
    .map((l) => l.trim())
    .filter(Boolean)
}

export async function saveSettings(_prev: SettingsState, formData: FormData): Promise<SettingsState> {
  await requireAdmin()

  // Phones come in as parallel arrays.
  const displays = formData.getAll('phone_display').map(String)
  const tels = formData.getAll('phone_tel').map(String)
  const phones = displays
    .map((display, i) => {
      const tel = (tels[i] ?? '').replace(/[^\d+]/g, '')
      const wa = tel.replace(/^\+/, '')
      return { display: display.trim(), tel, wa }
    })
    .filter((p) => p.display && p.tel)

  const settings: SiteSettings = {
    brandName: String(formData.get('brandName') ?? '').trim() || defaultSettings.brandName,
    legalName: String(formData.get('legalName') ?? '').trim() || defaultSettings.legalName,
    tagline: String(formData.get('tagline') ?? '').trim(),
    phones: phones.length > 0 ? phones : defaultSettings.phones,
    email: String(formData.get('email') ?? '').trim(),
    address: {
      lines: lines(formData.get('addressLines')),
      short: String(formData.get('addressShort') ?? '').trim() || defaultSettings.address.short,
    },
    hours: String(formData.get('hours') ?? '').trim(),
    registrations: lines(formData.get('registrations')),
    whatsappMessage: String(formData.get('whatsappMessage') ?? '').trim() || defaultSettings.whatsappMessage,
  }

  const supabase = await createClient()
  const { error } = await supabase.from('site_settings').update({ data: settings }).eq('id', 1)
  if (error) return { error: error.message }

  // These values appear across the whole site.
  revalidatePath('/', 'layout')
  return { success: true }
}
