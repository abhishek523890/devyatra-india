import { Analytics } from '@vercel/analytics/next'
import type { Metadata, Viewport } from 'next'
import { Inter, Fraunces } from 'next/font/google'
import { SiteHeader } from '@/components/site/site-header'
import { SiteFooter } from '@/components/site/site-footer'
import { WhatsAppButton } from '@/components/site/whatsapp-button'
import { ChromeGate } from '@/components/site/chrome-gate'
import { getSiteSettings, primaryPhoneOf } from '@/lib/settings'
import './globals.css'

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
})

const fraunces = Fraunces({
  subsets: ['latin'],
  variable: '--font-fraunces',
  display: 'swap',
})

const SITE_URL = 'https://sureshtourandtravel.com'
const SITE_NAME = 'Suresh Tour and Travel'
const SITE_DESCRIPTION =
  'Pilgrimage and spiritual travel packages across India, including Char Dham, Kedarnath, Badrinath, Vaishno Devi, Varanasi, Ayodhya and custom journeys.'

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: `${SITE_NAME} — Sacred Pilgrimage & Spiritual Journeys`,
    template: `%s | ${SITE_NAME}`,
  },
  description: SITE_DESCRIPTION,
  keywords: [
    'Char Dham Yatra',
    'Kedarnath tour',
    'Badrinath package',
    'Vaishno Devi',
    'pilgrimage India',
    'spiritual travel',
    SITE_NAME,
  ],
  generator: 'Next.js',
  verification: {
    google: 'DUMx6bkF7aD-E7KP68g4iZ5iHIivC6lB7hTJyqIZenw',
  },
  alternates: {
    canonical: SITE_URL,
  },
  openGraph: {
    type: 'website',
    url: SITE_URL,
    title: `${SITE_NAME} — Sacred Pilgrimage & Spiritual Journeys`,
    description: SITE_DESCRIPTION,
    siteName: SITE_NAME,
    locale: 'en_IN',
  },
  twitter: {
    card: 'summary_large_image',
    title: `${SITE_NAME} — Sacred Pilgrimage & Spiritual Journeys`,
    description: SITE_DESCRIPTION,
  },
  robots: {
    index: true,
    follow: true,
  },
}

export const viewport: Viewport = {
  themeColor: '#6B1E28',
  colorScheme: 'light',
}

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  const settings = await getSiteSettings()
  const phone = primaryPhoneOf(settings)

  return (
    <html lang="en" className={`${inter.variable} ${fraunces.variable} bg-background`}>
      <body className="font-sans antialiased">
        <div className="flex min-h-screen flex-col">
          <SiteHeader phone={phone} />
          <main className="flex-1">{children}</main>
          <ChromeGate>
            <SiteFooter settings={settings} />
          </ChromeGate>
        </div>
        <WhatsAppButton phone={phone} message={settings.whatsappMessage} />
        {process.env.NODE_ENV === 'production' && <Analytics />}
      </body>
    </html>
  )
}
