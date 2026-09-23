import type { Metadata } from 'next'
import { LegalPage } from '@/components/site/legal-page'

export const metadata: Metadata = {
  title: 'Terms & Conditions',
  description: 'The terms and conditions governing bookings and travel with Suresh Tour and Travel.',
  alternates: { canonical: '/terms' },
}

export default function TermsPage() {
  return (
    <LegalPage
      title="Terms & Conditions"
      updated="1 September 2026"
      sections={[
        {
          heading: 'Bookings',
          paragraphs: [
            'A booking is confirmed once the advance payment is received and you receive a booking reference by email. All travellers must provide accurate details as per a valid government-issued photo ID.',
          ],
        },
        {
          heading: 'Payments',
          paragraphs: [
            'An advance of 25% of the total tour cost is payable to confirm a booking. The balance is due before the departure date as communicated in your confirmation. Prices are per person on a twin-sharing basis unless stated otherwise.',
          ],
        },
        {
          heading: 'Traveller responsibilities',
          bullets: [
            'Carry valid identification and any documents specified for your package.',
            'Disclose relevant medical conditions, especially for high-altitude routes.',
            'Follow the guidance of tour guides and local authorities at all times.',
            'Respect the customs and sanctity of religious sites.',
          ],
        },
        {
          heading: 'Changes to itineraries',
          paragraphs: [
            'Himalayan travel is weather-dependent. We reserve the right to modify itineraries for safety reasons, including weather, road conditions or government advisories, without prior notice. We will always act in the best interest of travellers.',
          ],
        },
        {
          heading: 'Liability',
          paragraphs: [
            'Suresh Tour and Travel acts as a facilitator of travel services. We are not liable for delays, losses or damages arising from circumstances beyond our reasonable control. Travel insurance is strongly recommended.',
          ],
        },
      ]}
    />
  )
}
