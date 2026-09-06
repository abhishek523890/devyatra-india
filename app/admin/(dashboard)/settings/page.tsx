import { getSiteSettings } from '@/lib/settings'
import { SettingsForm } from '@/components/admin/settings-form'

export const metadata = { title: 'Site Details' }

export default async function AdminSettingsPage() {
  const settings = await getSiteSettings()

  return (
    <div>
      <h1 className="font-serif text-2xl font-semibold text-secondary">Site Details</h1>
      <p className="mt-1 mb-6 text-sm text-muted-foreground">
        Edit the company details shown across your website — header, footer, contact page and WhatsApp button.
      </p>
      <SettingsForm initial={settings} />
    </div>
  )
}
