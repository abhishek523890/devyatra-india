import { Analytics } from '@vercel/analytics/next'
import type { Metadata, Viewport } from 'next'
import { Inter, Fraunces } from 'next/font/google'
import { SiteHeader } from '@/components/site/site-header'
import { SiteFooter } from '@/components/site/site-footer'
import { WhatsAppButton } from '@/components/site/whatsapp-button'
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

export const metadata: Metadata = {
  metadataBase: new URL('https://devyatra-india.vercel.app'),
  title: {
    default: 'DevYatra India — Sacred Pilgrimage & Spiritual Journeys',
    template: '%s | DevYatra India',
  },
  description:
    'Book curated pilgrimage tours across India — Char Dham, Kedarnath, Badrinath, Vaishno Devi, Varanasi, Ayodhya, Amarnath and custom spiritual journeys with trusted guides and comfortable stays.',
  keywords: [
    'Char Dham Yatra',
    'Kedarnath tour',
    'Badrinath package',
    'Vaishno Devi',
    'pilgrimage India',
    'spiritual travel',
    'DevYatra India',
  ],
  generator: 'v0.app',
  openGraph: {
    type: 'website',
    title: 'DevYatra India — Sacred Pilgrimage & Spiritual Journeys',
    description:
      'Curated pilgrimage tours across India with trusted guides, comfortable stays and secure booking.',
    siteName: 'DevYatra India',
  },
}

export const viewport: Viewport = {
  themeColor: '#6B1E28',
  colorScheme: 'light',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className={`${inter.variable} ${fraunces.variable} bg-background`}>
      <body className="font-sans antialiased">
        <div className="flex min-h-screen flex-col">
          <SiteHeader />
          <main className="flex-1">{children}</main>
          <SiteFooter />
        </div>
        <WhatsAppButton />
        {process.env.NODE_ENV === 'production' && <Analytics />}
      </body>
    </html>
  )
}
