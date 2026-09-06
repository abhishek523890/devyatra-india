import { SectionHeading } from '@/components/site/section-heading'

const steps = [
  { n: '1', title: 'Choose your yatra', text: 'Browse packages or request a custom itinerary and pick a departure date.' },
  { n: '2', title: 'Share traveller details', text: 'Complete the guided booking form with traveller and contact information.' },
  { n: '3', title: 'We confirm availability', text: 'Our team verifies seats and sends you a booking acknowledgement by email.' },
  { n: '4', title: 'Travel with us', text: 'Pay the balance, receive your travel kit and begin your journey.' },
]

export function ProcessSteps() {
  return (
    <section className="bg-secondary text-secondary-foreground">
      <div className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="Simple process"
          title="Booking your journey in four steps"
          description="A clear, guided flow from choosing a package to setting off — with our team beside you throughout."
          className="[&_h2]:text-secondary-foreground [&_p]:text-secondary-foreground/75"
        />
        <ol className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {steps.map((s, i) => (
            <li key={s.n} className="relative flex flex-col gap-3 rounded-2xl bg-white/5 p-6">
              <span className="flex size-12 items-center justify-center rounded-full bg-primary font-serif text-xl font-semibold text-primary-foreground">
                {s.n}
              </span>
              <h3 className="font-serif text-lg font-semibold">{s.title}</h3>
              <p className="text-sm leading-relaxed text-secondary-foreground/75">{s.text}</p>
              {i < steps.length - 1 && (
                <span className="absolute top-11 -right-3 hidden h-px w-6 bg-primary/40 lg:block" aria-hidden />
              )}
            </li>
          ))}
        </ol>
      </div>
    </section>
  )
}
