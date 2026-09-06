import { createClient } from '@/lib/supabase/server'
import { siteConfig } from '@/lib/site-config'

export type Phone = { display: string; tel: string; wa: string }

export type SiteSettings = {
  brandName: string
  legalName: string
  tagline: string
  phones: Phone[]
  email: string
  address: { lines: string[]; short: string }
  hours: string
  registrations: string[]
  whatsappMessage: string
  // Email (Resend) — all editable from the admin portal.
  emailEnabled: boolean
  fromEmail: string
  ownerEmail: string
}

/** The static config acts as the default/fallback for every field. */
export const defaultSettings: SiteSettings = {
  brandName: siteConfig.brandName,
  legalName: siteConfig.legalName,
  tagline: siteConfig.tagline,
  phones: siteConfig.phones.map((p) => ({ ...p })),
  email: siteConfig.email,
  address: { lines: [...siteConfig.address.lines], short: siteConfig.address.short },
  hours: siteConfig.hours,
  registrations: [...siteConfig.registrations],
  whatsappMessage: siteConfig.whatsappMessage,
  emailEnabled: true,
  fromEmail: 'DevYatra India <onboarding@resend.dev>',
  ownerEmail: '',
}

/**
 * Resolved site settings: admin-edited values from the DB merged over the
 * static defaults. Falls back to defaults if the DB is unreachable/empty.
 */
export async function getSiteSettings(): Promise<SiteSettings> {
  try {
    const supabase = await createClient()
    const { data, error } = await supabase.from('site_settings').select('data').eq('id', 1).maybeSingle()
    if (error || !data?.data) return defaultSettings
    const stored = data.data as Partial<SiteSettings>
    return {
      ...defaultSettings,
      ...stored,
      address: { ...defaultSettings.address, ...(stored.address ?? {}) },
      phones:
        stored.phones && stored.phones.length > 0 ? stored.phones : defaultSettings.phones,
      registrations:
        stored.registrations && stored.registrations.length > 0
          ? stored.registrations
          : defaultSettings.registrations,
    }
  } catch {
    return defaultSettings
  }
}

export function primaryPhoneOf(s: SiteSettings): Phone {
  return s.phones[0] ?? defaultSettings.phones[0]
}
export function secondaryPhoneOf(s: SiteSettings): Phone {
  return s.phones[1] ?? s.phones[0] ?? defaultSettings.phones[0]
}
export function addressOneLineOf(s: SiteSettings): string {
  return s.address.lines.join(', ')
}
