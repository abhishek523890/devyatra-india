import type { Metadata } from 'next'
import { LegalPage } from '@/components/site/legal-page'

export const metadata: Metadata = {
  title: 'Cancellation & Refund Policy',
  description: 'Suresh Tour and Travels cancellation and refund terms for pilgrimage bookings.',
}

export default function CancellationPolicyPage() {
  return (
    <LegalPage
      title="Cancellation & Refund Policy"
      updated="1 September 2026"
      sections={[
        {
          heading: 'Cancellation by the traveller',
          paragraphs: ['If you need to cancel a confirmed booking, the following charges apply based on the number of days before departure:'],
          bullets: [
            '30 days or more before departure: 90% refund of the amount paid.',
            '15–29 days before departure: 50% refund of the amount paid.',
            '7–14 days before departure: 25% refund of the amount paid.',
            'Less than 7 days before departure: no refund.',
          ],
        },
        {
          heading: 'Refund processing',
          paragraphs: [
            'Approved refunds are processed to the original payment method within 7–10 working days. Certain third-party costs — such as non-refundable helicopter tickets or special permits — may be deducted where already incurred.',
          ],
        },
        {
          heading: 'Cancellation by Suresh Tour and Travels',
          paragraphs: [
            'If we cancel a departure for reasons within our control, you will be offered an alternative date or a full refund. For cancellations due to weather, natural events or government advisories, we will offer a rescheduling option or a refund net of unrecoverable costs.',
          ],
        },
        {
          heading: 'No-shows',
          paragraphs: [
            'Failure to join the tour at the scheduled time and place without prior notice is treated as a cancellation with less than 7 days notice, and no refund is due.',
          ],
        },
      ]}
    />
  )
}
