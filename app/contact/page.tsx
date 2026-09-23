import type { Metadata } from 'next'
import { PageHero } from '@/components/site/page-hero'
import { ContactForm } from '@/components/site/contact-form'
import { Phone, Mail, MapPin, Clock, MessageCircle } from 'lucide-react'
import { siteConfig, primaryPhone, secondaryPhone, addressOneLine } from '@/lib/site-config'

export const metadata: Metadata = {
  title: 'Contact Us',
  description: 'Get in touch with Suresh Tour and Travels to plan your pilgrimage. Call, WhatsApp or send us a message.',
}

const details = [
  { icon: Phone, label: 'Phone', value: primaryPhone.display, href: `tel:${primaryPhone.tel}` },
  { icon: Phone, label: 'Phone (alternate)', value: secondaryPhone.display, href: `tel:${secondaryPhone.tel}` },
  { icon: MessageCircle, label: 'WhatsApp', value: 'Chat with us', href: `https://wa.me/${primaryPhone.wa}` },
  ...(siteConfig.email
    ? [{ icon: Mail, label: 'Email', value: siteConfig.email, href: `mailto:${siteConfig.email}` }]
    : []),
  { icon: MapPin, label: 'Office', value: addressOneLine },
  { icon: Clock, label: 'Hours', value: siteConfig.hours },
]

export default function ContactPage() {
  return (
    <>
      <PageHero
        title="We're here to help you travel well"
        description="Questions about a route, a departure date or a custom plan? Reach out and our team will respond within one working day."
        breadcrumbs={[{ href: '/', label: 'Home' }, { label: 'Contact' }]}
      />

      <section className="mx-auto max-w-6xl px-4 py-14 md:py-20">
        <div className="grid gap-10 lg:grid-cols-[360px_1fr]">
          <div>
            <h2 className="font-serif text-2xl font-semibold text-foreground">Get in touch</h2>
            <ul className="mt-6 space-y-5">
              {details.map((d) => (
                <li key={d.label} className="flex items-start gap-4">
                  <div className="flex size-11 shrink-0 items-center justify-center rounded-xl bg-primary/10">
                    <d.icon className="size-5 text-primary" aria-hidden />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">{d.label}</p>
                    {d.href ? (
                      <a href={d.href} className="font-medium text-foreground hover:text-primary">
                        {d.value}
                      </a>
                    ) : (
                      <p className="font-medium text-foreground">{d.value}</p>
                    )}
                  </div>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h2 className="mb-6 font-serif text-2xl font-semibold text-foreground">Send a message</h2>
            <ContactForm />
          </div>
        </div>
      </section>
    </>
  )
}
