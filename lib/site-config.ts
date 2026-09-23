/**
 * ─────────────────────────────────────────────────────────────
 *  SITE CONFIG — single source of truth for company details.
 *
 *  To change your address, phone numbers, email, hours or
 *  registrations across the WHOLE website, edit ONLY this file.
 *  Everything (header, footer, contact page, WhatsApp button,
 *  Char Dham page) reads its details from here.
 * ─────────────────────────────────────────────────────────────
 */

export const siteConfig = {
  brandName: 'Suresh Tour and Travels',
  legalName: 'Suresh Tour and Travels',
  tagline: 'Hum Safar Nahi... Yaadon Ka Hissa Banate Hain!',

  // Phone numbers. `display` is what users see, `tel` is the dial link,
  // `wa` is the WhatsApp number (country code + number, no + or spaces).
  phones: [
    { display: '+91 70618 87271', tel: '+917061887271', wa: '917061887271' },
    { display: '+91 90844 77271', tel: '+919084477271', wa: '919084477271' },
  ],

  // Add a public email between the quotes to show it on the site.
  // Leave it empty ('') to hide the email everywhere.
  email: '',

  address: {
    lines: [
      '207 Sharvan Nath Nagar',
      'Himalaya Depot Gali No. 1',
      'Shiv Murti, Haridwar',
      'Uttarakhand – 249401',
    ],
    short: 'Haridwar, Uttarakhand, India',
  },

  hours: 'Mon–Sun, 9:00 AM – 8:00 PM IST',

  registrations: [
    'GST Registered',
    'Registered with Uttarakhand Tourism Department',
    'Udyam Registered',
  ],

  // Prefilled message for the floating WhatsApp button.
  whatsappMessage: 'Namaste! I would like to enquire about a Suresh Tour and Travels pilgrimage package.',
} as const

/** Convenience accessor for the main contact number. */
export const primaryPhone = siteConfig.phones[0]
export const secondaryPhone = siteConfig.phones[1]

/** Full address as a single line (e.g. for meta tags). */
export const addressOneLine = siteConfig.address.lines.join(', ')
