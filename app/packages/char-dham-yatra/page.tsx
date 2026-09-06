import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import {
  Phone,
  MessageCircle,
  Clock,
  MapPin,
  Route,
  Car,
  BedDouble,
  UtensilsCrossed,
  Check,
  X,
  Footprints,
  ShieldCheck,
  HeartHandshake,
  Sparkles,
  Users,
  BadgeCheck,
  CalendarDays,
  Send,
} from 'lucide-react'
import { PageHero } from '@/components/site/page-hero'
import { SectionHeading } from '@/components/site/section-heading'
import { Badge } from '@/components/ui/badge'
import { FaqAccordion } from '@/components/site/faq-accordion'
import { CharDhamEnquiryForm, PHONE_PRIMARY, PHONE_SECONDARY } from '@/components/packages/char-dham-enquiry-form'
import { siteConfig, primaryPhone, secondaryPhone, addressOneLine } from '@/lib/site-config'

export const metadata: Metadata = {
  title: 'Char Dham Yatra 10 Days from Haridwar | Parth Sarthi Holidays',
  description:
    'Char Dham Yatra – Haridwar to Haridwar, 10 Days / 9 Nights covering Yamunotri, Gangotri, Kedarnath and Badrinath. Transport, accommodation and all meals included. Enquire with Parth Sarthi Holidays.',
  keywords: [
    'Char Dham Yatra',
    'Char Dham package from Haridwar',
    'Yamunotri Gangotri Kedarnath Badrinath',
    'Char Dham 10 days',
    'Parth Sarthi Holidays',
    'Uttarakhand pilgrimage',
  ],
  openGraph: {
    title: 'Char Dham Yatra – Haridwar to Haridwar | 10 Days / 9 Nights',
    description:
      'A divine journey to the abode of gods covering Yamunotri, Gangotri, Kedarnath and Badrinath. Transport, stays and all meals included.',
    images: ['/images/char-dham-hero.png'],
    type: 'website',
  },
}

const overview = [
  { icon: Clock, label: 'Duration', value: '10 Days / 9 Nights' },
  { icon: MapPin, label: 'Start & End', value: 'Haridwar to Haridwar' },
  { icon: Route, label: 'Destinations', value: 'Yamunotri · Gangotri · Kedarnath · Badrinath' },
  { icon: Car, label: 'Vehicle', value: 'Maruti commercial vehicle as per group size' },
  { icon: BedDouble, label: 'Accommodation', value: 'Hotels / guest houses, twin / triple sharing' },
  { icon: UtensilsCrossed, label: 'Meals', value: 'Breakfast, lunch, evening tea & dinner' },
]

type Day = {
  day: number
  title: string
  meta: { icon: typeof MapPin; text: string }[]
  activities: string[]
  stay?: string
  image?: { src: string; alt: string }
}

const itinerary: Day[] = [
  {
    day: 1,
    title: 'Haridwar to Barkot',
    meta: [
      { icon: MapPin, text: 'Approx. 180 km' },
      { icon: Clock, text: '7–8 hrs drive' },
    ],
    activities: [
      'Pickup from Haridwar Railway Station / Hotel / Bus Stand',
      'Drive towards Barkot via Mussoorie',
      'Enroute visit Kempty Falls',
      'Yamuna Valley view',
    ],
    stay: 'Overnight stay & dinner at Barkot',
  },
  {
    day: 2,
    title: 'Barkot → Yamunotri → Barkot',
    meta: [
      { icon: MapPin, text: 'Approx. 45 km drive + trek' },
      { icon: Footprints, text: 'Trek 6 km one side' },
    ],
    activities: [
      'Early morning drive to Janki Chatti',
      'Trek to Yamunotri Temple – 6 km one side',
      'Darshan at Yamunotri Temple',
      'Visit Surya Kund',
      'Visit Divya Shila',
      'Return back to Barkot',
    ],
    stay: 'Overnight stay & dinner at Barkot',
    image: { src: '/images/yamunotri.png', alt: 'Yamunotri temple in a Himalayan valley' },
  },
  {
    day: 3,
    title: 'Barkot to Uttarkashi',
    meta: [
      { icon: MapPin, text: 'Approx. 100 km' },
      { icon: Clock, text: '4–5 hrs drive' },
    ],
    activities: [
      'Drive towards Uttarkashi',
      'Enroute scenic Himalayan route',
      'Visit Shiv Gufa',
      'Visit Kashi Vishwanath Temple',
      'Darshan at Kashi Vishwanath Temple',
    ],
    stay: 'Overnight stay & dinner at Uttarkashi',
  },
  {
    day: 4,
    title: 'Uttarkashi → Gangotri → Uttarkashi',
    meta: [
      { icon: MapPin, text: 'Approx. 200 km' },
      { icon: CalendarDays, text: 'Full-day tour' },
    ],
    activities: [
      'Early morning drive to Gangotri',
      'Enroute visit Harsil Valley',
      'Visit Bhairon Ghati',
      'Darshan at Gangotri Temple',
      'Return to Uttarkashi',
    ],
    stay: 'Overnight stay & dinner at Uttarkashi',
    image: { src: '/images/gangotri.png', alt: 'Gangotri temple beside the glacial Bhagirathi river' },
  },
  {
    day: 5,
    title: 'Uttarkashi → Guptkashi / Phata',
    meta: [
      { icon: MapPin, text: 'Approx. 220 km' },
      { icon: Clock, text: '8–9 hrs drive' },
    ],
    activities: [
      'Drive towards Guptkashi via beautiful routes',
      'Enroute visit Tehri Lake view',
      'Visit Srinagar',
      'Visit Rudraprayag Sangam',
      'Visit Ardhanarishwar Temple',
    ],
    stay: 'Overnight stay & dinner at Guptkashi / Phata',
  },
  {
    day: 6,
    title: 'Guptkashi → Kedarnath',
    meta: [
      { icon: Footprints, text: 'Trek 18 km one side' },
    ],
    activities: [
      'Early morning drive to Sonprayag',
      'Local jeep to Gaurikund (at own cost)',
      'Trek to Kedarnath Ji – 18 km',
      'Darshan at Kedarnath Temple',
    ],
    stay: 'Overnight stay & dinner at Kedarnath',
    image: { src: '/images/kedarnath.png', alt: 'Kedarnath temple before a snow-covered Himalayan peak' },
  },
  {
    day: 7,
    title: 'Kedarnath → Guptkashi',
    meta: [
      { icon: Footprints, text: 'Trek back to Gaurikund' },
    ],
    activities: [
      'Morning darshan and explore Kedarnath surroundings',
      'Trek back to Gaurikund',
      'Drive back to Guptkashi / Phata',
    ],
    stay: 'Overnight stay & dinner at Guptkashi / Phata',
  },
  {
    day: 8,
    title: 'Guptkashi → Badrinath',
    meta: [
      { icon: MapPin, text: 'Approx. 210 km' },
      { icon: Clock, text: '8–9 hrs drive' },
    ],
    activities: [
      'Drive towards Badrinath',
      'Enroute visit Nandprayag',
      'Karnprayag',
      'Joshimath',
      'Darshan at Narsingh Temple, Joshimath',
      'Evening darshan at Badrinath Temple',
      'Visit Tapt Kund',
    ],
    stay: 'Overnight stay & dinner at Badrinath',
    image: { src: '/images/badrinath.png', alt: 'Colourful Badrinath temple against towering snow peaks' },
  },
  {
    day: 9,
    title: 'Badrinath → Rudraprayag / Srinagar',
    meta: [
      { icon: MapPin, text: 'Approx. 160 km' },
      { icon: Clock, text: '6–7 hrs drive' },
    ],
    activities: [
      'Early morning Badrinath darshan',
      'Visit Mana Village',
      'Visit Bhim Pul',
      'Visit Vyas Gufa',
      'Visit Saraswati River',
      'Drive towards Rudraprayag / Srinagar',
    ],
    stay: 'Overnight stay & dinner at Rudraprayag / Srinagar',
  },
  {
    day: 10,
    title: 'Rudraprayag → Haridwar Drop',
    meta: [
      { icon: MapPin, text: 'Approx. 165 km' },
      { icon: Clock, text: '6–7 hrs drive' },
    ],
    activities: [
      'Drive back to Haridwar',
      'Enroute visit Panch Prayag',
      'Devprayag',
      'Rudraprayag',
      'Karnprayag',
      'Nandprayag',
      'Vishnuprayag',
      'Final drop at Haridwar',
    ],
  },
]

const includes = [
  'Transportation by Maruti commercial vehicle as per group size',
  'All toll tax',
  'Parking',
  'Permit',
  'Driver allowance',
  'Accommodation on twin / triple sharing basis',
  'Hotels / guest houses',
  'All meals: breakfast, lunch, evening tea & dinner',
  'Sightseeing as per itinerary',
  'Pickup & drop from Haridwar',
]

const excludes = [
  'Pony / Palki / Helicopter',
  'VIP Darshan',
  'Personal expenses',
  'Entry tickets (if any)',
  'Travel insurance',
]

const vehicles = [
  { name: 'Maruti Ertiga', seats: '6 + 1 Seater', image: '/images/vehicle-ertiga.png' },
  { name: 'Force Tempo Traveller', seats: null, image: '/images/vehicle-tempo.png' },
  { name: 'Innova Crysta', seats: '6 + 1 Seater', image: '/images/vehicle-innova.png' },
]

const whyChoose = [
  { icon: HeartHandshake, title: 'Comfortable Journey', text: 'Well-maintained vehicles chosen to suit your group size across the mountain routes.' },
  { icon: Users, title: 'Experienced Drivers', text: 'Drivers familiar with the Char Dham circuit and Himalayan road conditions.' },
  { icon: ShieldCheck, title: 'Safe & Reliable', text: 'A registered operator you can plan your pilgrimage with confidence.' },
  { icon: UtensilsCrossed, title: 'Hygienic Meals', text: 'All meals through the journey — breakfast, lunch, evening tea and dinner.' },
  { icon: Sparkles, title: '24x7 Support', text: 'Assistance available around the clock before and during your yatra.' },
]

const faqs = [
  {
    question: 'What is the route of this Char Dham Yatra package?',
    answer:
      'The journey runs Haridwar → Barkot → Yamunotri → Uttarkashi → Gangotri → Guptkashi/Phata → Kedarnath → Guptkashi → Badrinath → Rudraprayag/Srinagar → Haridwar, covering all four dhams over 10 days and 9 nights.',
  },
  {
    question: 'Where does the yatra start and end?',
    answer: 'The package starts and ends at Haridwar, with pickup and drop from the Haridwar Railway Station, hotel or bus stand.',
  },
  {
    question: 'What kind of vehicle is used?',
    answer:
      'Transport is by a Maruti commercial vehicle assigned as per your group size. Vehicle options include the Maruti Ertiga (6 + 1 seater), Force Tempo Traveller and Innova Crysta (6 + 1 seater).',
  },
  {
    question: 'How long are the treks to Yamunotri and Kedarnath?',
    answer:
      'The Yamunotri trek is about 6 km one side from Janki Chatti, and the Kedarnath trek is about 18 km one side from Gaurikund. The local jeep from Sonprayag to Gaurikund is at your own cost.',
  },
  {
    question: 'What is included in the package?',
    answer:
      'The package includes transportation as per group size, all toll tax, parking, permit, driver allowance, accommodation on twin/triple sharing in hotels/guest houses, all meals (breakfast, lunch, evening tea and dinner), sightseeing as per the itinerary, and pickup & drop from Haridwar.',
  },
  {
    question: 'What is not included in the package?',
    answer:
      'Pony / Palki / Helicopter, VIP Darshan, personal expenses, entry tickets (if any) and travel insurance are not included.',
  },
  {
    question: 'How is the accommodation arranged?',
    answer: 'Accommodation is provided in hotels or guest houses on a twin / triple sharing basis along the route.',
  },
]

export default function CharDhamYatraPage() {
  return (
    <>
      <PageHero
        title="Char Dham Yatra – Haridwar to Haridwar"
        description="A divine journey to the abode of gods — Yamunotri, Gangotri, Kedarnath and Badrinath over 10 days and 9 nights."
        breadcrumbs={[
          { href: '/', label: 'Home' },
          { href: '/packages', label: 'Packages' },
          { label: 'Char Dham Yatra' },
        ]}
      />

      {/* Hero visual + primary CTAs */}
      <section className="border-b border-border bg-background">
        <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
          <div className="relative overflow-hidden rounded-3xl">
            <Image
              src="/images/char-dham-hero.png"
              alt="Sunrise over the Garhwal Himalayas on the Char Dham pilgrimage route"
              width={1600}
              height={720}
              priority
              className="h-[280px] w-full object-cover sm:h-[380px] lg:h-[440px]"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/25 to-transparent" />
            <div className="absolute inset-x-0 bottom-0 p-6 sm:p-10">
              <div className="flex flex-wrap gap-2">
                <Badge variant="gold">10 Days / 9 Nights</Badge>
                <Badge variant="outline" className="bg-background/90">Haridwar to Haridwar</Badge>
              </div>
              <h2 className="mt-3 max-w-2xl font-serif text-2xl font-semibold text-balance text-white sm:text-3xl lg:text-4xl">
                A Divine Journey to the Abode of Gods
              </h2>
              <div className="mt-5 flex flex-wrap gap-3">
                <a
                  href="#enquire"
                  className="inline-flex items-center gap-2 rounded-full bg-primary px-6 py-3 font-semibold text-primary-foreground transition-opacity hover:opacity-90"
                >
                  <Send className="size-4" aria-hidden />
                  Enquire Now
                </a>
                <a
                  href={`tel:+${PHONE_PRIMARY}`}
                  className="inline-flex items-center gap-2 rounded-full bg-white px-6 py-3 font-semibold text-secondary transition-colors hover:bg-white/90"
                >
                  <Phone className="size-4" aria-hidden />
                  Call Now
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Quick overview */}
      <section className="bg-background py-12 sm:py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeading
            align="left"
            eyebrow="Package overview"
            title="Everything at a glance"
          />
          <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {overview.map((o) => (
              <div key={o.label} className="flex gap-4 rounded-2xl border border-border bg-card p-5">
                <div className="flex size-11 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary">
                  <o.icon className="size-5" aria-hidden />
                </div>
                <div>
                  <p className="text-xs font-semibold tracking-wide text-muted-foreground uppercase">{o.label}</p>
                  <p className="mt-1 text-sm font-medium text-secondary text-pretty">{o.value}</p>
                </div>
              </div>
            ))}
          </div>
          <p className="mt-6 rounded-xl border border-dashed border-border bg-muted/40 px-4 py-3 text-sm text-muted-foreground">
            Route: Haridwar → Barkot → Yamunotri → Uttarkashi → Gangotri → Guptkashi/Phata → Kedarnath → Guptkashi →
            Badrinath → Rudraprayag/Srinagar → Haridwar
          </p>
        </div>
      </section>

      {/* Itinerary timeline */}
      <section className="bg-muted/30 py-12 sm:py-16">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <SectionHeading
            eyebrow="Day by day"
            title="Your 10-day itinerary"
            description="A vertical journey through the four dhams, from the Yamuna valley to the abode of Badri Vishal."
          />
          <ol className="mt-10 space-y-6">
            {itinerary.map((d) => (
              <li key={d.day} className="relative">
                <div className="rounded-2xl border border-border bg-card p-5 sm:p-6">
                  <div className="flex flex-col gap-4 sm:flex-row sm:gap-6">
                    <div className="flex items-center gap-3 sm:flex-col sm:items-center sm:gap-1">
                      <span className="flex size-12 shrink-0 items-center justify-center rounded-full bg-primary font-serif text-lg font-semibold text-primary-foreground">
                        {d.day}
                      </span>
                      <span className="text-xs font-semibold tracking-wide text-muted-foreground uppercase sm:mt-1">
                        Day {d.day}
                      </span>
                    </div>

                    <div className="min-w-0 flex-1">
                      <h3 className="font-serif text-xl font-semibold text-secondary text-balance">{d.title}</h3>
                      <div className="mt-2 flex flex-wrap gap-2">
                        {d.meta.map((m, i) => (
                          <span
                            key={i}
                            className="inline-flex items-center gap-1.5 rounded-full bg-muted px-3 py-1 text-xs font-medium text-secondary"
                          >
                            <m.icon className="size-3.5 text-primary" aria-hidden />
                            {m.text}
                          </span>
                        ))}
                      </div>

                      <div className="mt-4 grid gap-4 sm:grid-cols-2">
                        <ul className="space-y-2">
                          {d.activities.map((a) => (
                            <li key={a} className="flex gap-2 text-sm text-foreground">
                              <Check className="mt-0.5 size-4 shrink-0 text-primary" aria-hidden />
                              <span className="text-pretty">{a}</span>
                            </li>
                          ))}
                        </ul>
                        {d.image && (
                          <div className="overflow-hidden rounded-xl">
                            <Image
                              src={d.image.src || '/placeholder.svg'}
                              alt={d.image.alt}
                              width={480}
                              height={320}
                              className="h-40 w-full object-cover sm:h-full"
                            />
                          </div>
                        )}
                      </div>

                      {d.stay && (
                        <p className="mt-4 inline-flex items-center gap-2 rounded-lg bg-secondary/8 px-3 py-2 text-sm font-medium text-secondary">
                          <BedDouble className="size-4 text-secondary" aria-hidden />
                          {d.stay}
                        </p>
                      )}
                    </div>
                  </div>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* Inclusions & exclusions */}
      <section className="bg-background py-12 sm:py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-6 lg:grid-cols-2">
            <div className="rounded-2xl border border-border bg-card p-6 sm:p-8">
              <div className="flex items-center gap-3">
                <div className="flex size-10 items-center justify-center rounded-xl bg-emerald-500/12 text-emerald-700">
                  <Check className="size-5" aria-hidden />
                </div>
                <h3 className="font-serif text-2xl font-semibold text-secondary">Package includes</h3>
              </div>
              <ul className="mt-6 space-y-3">
                {includes.map((item) => (
                  <li key={item} className="flex gap-3 text-sm text-foreground">
                    <Check className="mt-0.5 size-4 shrink-0 text-emerald-600" aria-hidden />
                    <span className="text-pretty">{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="rounded-2xl border border-border bg-card p-6 sm:p-8">
              <div className="flex items-center gap-3">
                <div className="flex size-10 items-center justify-center rounded-xl bg-destructive/12 text-destructive">
                  <X className="size-5" aria-hidden />
                </div>
                <h3 className="font-serif text-2xl font-semibold text-secondary">Package excludes</h3>
              </div>
              <ul className="mt-6 space-y-3">
                {excludes.map((item) => (
                  <li key={item} className="flex gap-3 text-sm text-foreground">
                    <X className="mt-0.5 size-4 shrink-0 text-destructive" aria-hidden />
                    <span className="text-pretty">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Vehicle options */}
      <section className="bg-muted/30 py-12 sm:py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeading
            eyebrow="Travel in comfort"
            title="Vehicle options"
            description="Your vehicle is assigned based on group size."
          />
          <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {vehicles.map((v) => (
              <div key={v.name} className="overflow-hidden rounded-2xl border border-border bg-card">
                <Image
                  src={v.image || '/placeholder.svg'}
                  alt={`${v.name} vehicle`}
                  width={480}
                  height={300}
                  className="h-48 w-full object-cover"
                />
                <div className="p-5">
                  <div className="flex items-center justify-between gap-3">
                    <h3 className="font-serif text-lg font-semibold text-secondary">{v.name}</h3>
                    <Badge variant="maroon">Based on Group Size</Badge>
                  </div>
                  {v.seats && (
                    <p className="mt-2 inline-flex items-center gap-1.5 text-sm text-muted-foreground">
                      <Users className="size-4 text-primary" aria-hidden />
                      {v.seats}
                    </p>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why choose us */}
      <section className="bg-background py-12 sm:py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeading
            eyebrow="Why choose us"
            title="Why travel with Parth Sarthi Holidays"
          />
          <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {whyChoose.map((w) => (
              <div key={w.title} className="rounded-2xl border border-border bg-card p-6">
                <div className="flex size-12 items-center justify-center rounded-xl bg-primary/10 text-primary">
                  <w.icon className="size-6" aria-hidden />
                </div>
                <h3 className="mt-4 font-serif text-lg font-semibold text-secondary">{w.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground text-pretty">{w.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Enquiry */}
      <section id="enquire" className="scroll-mt-24 bg-muted/30 py-12 sm:py-16">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
          <SectionHeading
            eyebrow="Plan your yatra"
            title="Enquire about this package"
            description="Pricing is tailored to your group size and travel dates. Share your details and our team will get back to you."
          />
          <div className="mt-4 flex justify-center">
            <Badge variant="gold" className="text-sm">Contact for Price</Badge>
          </div>
          <div className="mt-8">
            <CharDhamEnquiryForm />
          </div>
        </div>
      </section>

      {/* Company information */}
      <section className="bg-background py-12 sm:py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-8 rounded-3xl border border-border bg-card p-6 sm:p-10 lg:grid-cols-2">
            <div>
              <p className="text-sm font-semibold tracking-wide text-primary uppercase">Organised by</p>
              <h2 className="mt-2 font-serif text-2xl font-semibold text-secondary sm:text-3xl">
                {siteConfig.legalName}
              </h2>
              <p className="mt-3 font-serif text-lg text-primary italic">
                &ldquo;{siteConfig.tagline}&rdquo;
              </p>
              <address className="mt-5 not-italic">
                <p className="flex gap-3 text-sm text-foreground">
                  <MapPin className="mt-0.5 size-5 shrink-0 text-primary" aria-hidden />
                  <span className="text-pretty">{addressOneLine}</span>
                </p>
                <div className="mt-4 flex flex-col gap-2">
                  <a href={`tel:${primaryPhone.tel}`} className="inline-flex items-center gap-3 text-sm text-foreground hover:text-primary">
                    <Phone className="size-5 shrink-0 text-primary" aria-hidden />
                    {primaryPhone.display}
                  </a>
                  <a href={`tel:${secondaryPhone.tel}`} className="inline-flex items-center gap-3 text-sm text-foreground hover:text-primary">
                    <Phone className="size-5 shrink-0 text-primary" aria-hidden />
                    {secondaryPhone.display}
                  </a>
                </div>
              </address>
              <div className="mt-6 flex flex-wrap gap-3">
                <a
                  href={`https://wa.me/${PHONE_PRIMARY}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 rounded-full bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground transition-opacity hover:opacity-90"
                >
                  <MessageCircle className="size-4" aria-hidden />
                  Chat on WhatsApp
                </a>
                <a
                  href={`tel:+${PHONE_PRIMARY}`}
                  className="inline-flex items-center gap-2 rounded-full border border-border px-5 py-2.5 text-sm font-semibold text-foreground transition-colors hover:bg-muted"
                >
                  <Phone className="size-4" aria-hidden />
                  Call now
                </a>
              </div>
            </div>

            <div className="flex flex-col justify-center gap-3 rounded-2xl bg-muted/50 p-6">
              <p className="text-sm font-semibold tracking-wide text-muted-foreground uppercase">Registrations</p>
              {siteConfig.registrations.map((r) => (
                <div key={r} className="flex items-center gap-3 rounded-xl border border-border bg-card px-4 py-3">
                  <BadgeCheck className="size-5 shrink-0 text-emerald-600" aria-hidden />
                  <span className="text-sm font-medium text-secondary">{r}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="bg-muted/30 py-12 sm:py-16">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
          <SectionHeading
            eyebrow="Good to know"
            title="Frequently asked questions"
          />
          <FaqAccordion items={faqs} className="mt-8" />
          <div className="mt-8 flex flex-col items-center gap-3 text-center">
            <p className="text-sm text-muted-foreground">Still have a question about the Char Dham Yatra?</p>
            <div className="flex flex-wrap justify-center gap-3">
              <Link
                href="#enquire"
                className="inline-flex items-center gap-2 rounded-full bg-primary px-6 py-3 font-semibold text-primary-foreground transition-opacity hover:opacity-90"
              >
                <Send className="size-4" aria-hidden />
                Enquire Now
              </Link>
              <a
                href={`tel:+${PHONE_PRIMARY}`}
                className="inline-flex items-center gap-2 rounded-full border border-border px-6 py-3 font-semibold text-foreground transition-colors hover:bg-muted"
              >
                <Phone className="size-4" aria-hidden />
                Call Now
              </a>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
