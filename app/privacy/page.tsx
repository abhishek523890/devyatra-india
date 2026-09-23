import type { Metadata } from 'next'
import { LegalPage } from '@/components/site/legal-page'

export const metadata: Metadata = {
  title: 'Privacy Policy',
  description: 'How Suresh Tour and Travels collects, uses and protects your personal information.',
}

export default function PrivacyPage() {
  return (
    <LegalPage
      title="Privacy Policy"
      updated="1 September 2026"
      sections={[
        {
          heading: 'Information we collect',
          bullets: [
            'Contact details such as name, email and phone number.',
            'Traveller details required for bookings, including age and ID information.',
            'Booking and payment records.',
            'Website usage data to improve our services.',
          ],
        },
        {
          heading: 'How we use your information',
          paragraphs: [
            'We use your information to process bookings, communicate about your trip, provide support and comply with legal obligations. We do not sell your personal data to third parties.',
          ],
        },
        {
          heading: 'Data sharing',
          paragraphs: [
            'We share information only with the service providers necessary to deliver your trip — such as hotels, transport operators and guides — and with payment processors to complete transactions securely.',
          ],
        },
        {
          heading: 'Data security',
          paragraphs: [
            'We apply reasonable technical and organisational measures to protect your data. No method of transmission over the internet is completely secure, and we cannot guarantee absolute security.',
          ],
        },
        {
          heading: 'Your rights',
          paragraphs: [
            'You may request access to, correction of, or deletion of your personal data by contacting us. We will respond in accordance with applicable law.',
          ],
        },
      ]}
    />
  )
}
