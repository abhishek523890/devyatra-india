import type { Metadata } from 'next'
import { LegalPage } from '@/components/site/legal-page'

export const metadata: Metadata = {
  title: 'Disclaimer',
  description: 'Important disclaimers regarding travel, content and third-party services on Suresh Tour and Travel.',
  alternates: { canonical: '/disclaimer' },
}

export default function DisclaimerPage() {
  return (
    <LegalPage
      title="Disclaimer"
      updated="1 September 2026"
      sections={[
        {
          heading: 'General information',
          paragraphs: [
            'The content on this website is provided for general informational purposes only. While we strive for accuracy, itineraries, prices and availability are subject to change without notice.',
          ],
        },
        {
          heading: 'Travel risks',
          paragraphs: [
            'Pilgrimage travel, especially to high-altitude Himalayan regions, carries inherent risks. Travellers participate at their own risk and are responsible for assessing their own fitness and obtaining suitable travel insurance.',
          ],
        },
        {
          heading: 'Third-party services',
          paragraphs: [
            'We coordinate services provided by third parties such as hotels, transport operators and airlines. We are not responsible for acts, errors or omissions of these independent providers.',
          ],
        },
        {
          heading: 'External links',
          paragraphs: [
            'This website may contain links to external sites. We are not responsible for the content or practices of any third-party websites.',
          ],
        },
      ]}
    />
  )
}
