import Link from 'next/link'
import { Mountain, Mail, Phone, MapPin } from 'lucide-react'
import { NewsletterForm } from './newsletter-form'
import { addressOneLineOf, type SiteSettings } from '@/lib/settings'

const socials = [
  {
    label: 'Facebook',
    path: 'M22 12a10 10 0 1 0-11.56 9.88v-6.99H7.9V12h2.54V9.8c0-2.5 1.49-3.89 3.77-3.89 1.09 0 2.24.2 2.24.2v2.46h-1.26c-1.24 0-1.63.77-1.63 1.56V12h2.78l-.44 2.89h-2.34v6.99A10 10 0 0 0 22 12Z',
  },
  {
    label: 'Instagram',
    path: 'M12 2c2.72 0 3.06.01 4.12.06 1.07.05 1.79.22 2.43.47.66.26 1.22.6 1.77 1.16.56.55.9 1.11 1.16 1.77.25.64.42 1.36.47 2.43.05 1.06.06 1.4.06 4.12s-.01 3.06-.06 4.12c-.05 1.07-.22 1.79-.47 2.43-.26.66-.6 1.22-1.16 1.77-.55.56-1.11.9-1.77 1.16-.64.25-1.36.42-2.43.47-1.06.05-1.4.06-4.12.06s-3.06-.01-4.12-.06c-1.07-.05-1.79-.22-2.43-.47a4.9 4.9 0 0 1-1.77-1.16 4.9 4.9 0 0 1-1.16-1.77c-.25-.64-.42-1.36-.47-2.43C2.01 15.06 2 14.72 2 12s.01-3.06.06-4.12c.05-1.07.22-1.79.47-2.43.26-.66.6-1.22 1.16-1.77.55-.56 1.11-.9 1.77-1.16.64-.25 1.36-.42 2.43-.47C8.94 2.01 9.28 2 12 2Zm0 5a5 5 0 1 0 0 10 5 5 0 0 0 0-10Zm0 8.25a3.25 3.25 0 1 1 0-6.5 3.25 3.25 0 0 1 0 6.5ZM17.5 5.75a1.25 1.25 0 1 0 0 2.5 1.25 1.25 0 0 0 0-2.5Z',
  },
  {
    label: 'YouTube',
    path: 'M23 12s0-3.2-.41-4.73a2.5 2.5 0 0 0-1.76-1.77C19.3 5.1 12 5.1 12 5.1s-7.3 0-8.83.4A2.5 2.5 0 0 0 1.4 7.27C1 8.8 1 12 1 12s0 3.2.41 4.73c.22.83.87 1.48 1.76 1.77 1.53.4 8.83.4 8.83.4s7.3 0 8.83-.4a2.5 2.5 0 0 0 1.76-1.77C23 15.2 23 12 23 12ZM9.75 15.02V8.98L15 12l-5.25 3.02Z',
  },
]

const columns = [
  {
    title: 'Yatras',
    links: [
      { href: '/packages/char-dham-yatra', label: 'Char Dham Yatra' },
      { href: '/packages/do-dham-yatra', label: 'Do Dham Yatra' },
      { href: '/packages/kedarnath-yatra', label: 'Kedarnath Yatra' },
      { href: '/packages/vaishno-devi-yatra', label: 'Vaishno Devi Yatra' },
      { href: '/packages', label: 'All Packages' },
    ],
  },
  {
    title: 'Company',
    links: [
      { href: '/about', label: 'About Us' },
      { href: '/destinations', label: 'Destinations' },
      { href: '/guides', label: 'Travel Guides' },
      { href: '/custom-tour', label: 'Custom Tour Request' },
      { href: '/contact', label: 'Contact Us' },
    ],
  },
  {
    title: 'Support',
    links: [
      { href: '/faq', label: 'FAQ' },
      { href: '/privacy', label: 'Privacy Policy' },
      { href: '/terms', label: 'Terms & Conditions' },
      { href: '/cancellation', label: 'Cancellation & Refund' },
      { href: '/disclaimer', label: 'Disclaimer' },
    ],
  },
]

export function SiteFooter({ settings }: { settings: SiteSettings }) {
  return (
    <footer className="mt-24 bg-secondary text-secondary-foreground">
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="grid gap-12 lg:grid-cols-[1.4fr_1fr_1fr_1fr]">
          <div className="flex flex-col gap-4">
            <Link href="/" className="flex items-center gap-2">
              <span className="flex size-9 items-center justify-center rounded-full bg-primary text-primary-foreground">
                <Mountain className="size-5" aria-hidden />
              </span>
              <span className="flex flex-col leading-none">
                <span className="font-serif text-lg font-semibold">DevYatra</span>
                <span className="text-[0.65rem] font-medium tracking-[0.2em] text-primary uppercase">India</span>
              </span>
            </Link>
            <p className="max-w-sm text-sm leading-relaxed text-secondary-foreground/75">
              Curated pilgrimage and spiritual journeys across India — thoughtfully paced, expertly guided and
              comfortably arranged for a meaningful yatra.
            </p>
            <div className="flex flex-col gap-2 text-sm text-secondary-foreground/80">
              <span className="flex items-start gap-2">
                <MapPin className="mt-0.5 size-4 shrink-0 text-primary" aria-hidden />
                <span>{addressOneLineOf(settings)}</span>
              </span>
              {settings.phones.map((phone) => (
                <a key={phone.tel} href={`tel:${phone.tel}`} className="inline-flex items-center gap-2 hover:text-primary">
                  <Phone className="size-4 text-primary" aria-hidden /> {phone.display}
                </a>
              ))}
              {settings.email && (
                <a href={`mailto:${settings.email}`} className="inline-flex items-center gap-2 hover:text-primary">
                  <Mail className="size-4 text-primary" aria-hidden /> {settings.email}
                </a>
              )}
            </div>
            <div className="mt-2 flex items-center gap-3">
              {socials.map((s) => (
                <a
                  key={s.label}
                  href="#"
                  aria-label={s.label}
                  className="flex size-9 items-center justify-center rounded-full bg-white/10 text-secondary-foreground transition-colors hover:bg-primary hover:text-primary-foreground"
                >
                  <svg viewBox="0 0 24 24" fill="currentColor" className="size-4" aria-hidden>
                    <path d={s.path} />
                  </svg>
                </a>
              ))}
            </div>
          </div>

          {columns.map((col) => (
            <div key={col.title} className="flex flex-col gap-3">
              <h3 className="text-sm font-semibold tracking-wide text-primary uppercase">{col.title}</h3>
              <ul className="flex flex-col gap-2">
                {col.links.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-sm text-secondary-foreground/75 transition-colors hover:text-secondary-foreground"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-12 grid gap-6 border-t border-white/10 pt-8 md:grid-cols-2 md:items-center">
          <div>
            <h3 className="font-serif text-lg font-semibold">Get yatra updates & fixed-departure alerts</h3>
            <p className="mt-1 text-sm text-secondary-foreground/70">
              Occasional emails on new departures and travel tips. No spam.
            </p>
          </div>
          <NewsletterForm />
        </div>

        <div className="mt-10 flex flex-col gap-2 border-t border-white/10 pt-6 text-xs text-secondary-foreground/60 sm:flex-row sm:items-center sm:justify-between">
          <p>© {new Date().getFullYear()} DevYatra India. All rights reserved. Demonstration site.</p>
          <p>Prices in INR. Itineraries subject to weather and darshan conditions.</p>
        </div>
      </div>
    </footer>
  )
}
