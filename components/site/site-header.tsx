'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useEffect, useState } from 'react'
import { Menu, X, Phone, Mountain } from 'lucide-react'
import { cn } from '@/lib/utils'
import { primaryPhone } from '@/lib/site-config'

type PhoneProp = { display: string; tel: string }

const navLinks = [
  { href: '/packages', label: 'Packages' },
  { href: '/destinations', label: 'Destinations' },
  { href: '/custom-tour', label: 'Custom Tour' },
  { href: '/guides', label: 'Travel Guides' },
  { href: '/about', label: 'About' },
  { href: '/contact', label: 'Contact' },
]

export function SiteHeader({ phone }: { phone?: PhoneProp }) {
  const pathname = usePathname()
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    setOpen(false)
  }, [pathname])

  // Public chrome only — the admin area has its own shell.
  if (pathname?.startsWith('/admin')) return null

  const tel = phone ?? primaryPhone

  return (
    <header
      className={cn(
        'sticky top-0 z-50 w-full transition-colors',
        scrolled
          ? 'border-b border-border bg-background/90 backdrop-blur supports-[backdrop-filter]:bg-background/75'
          : 'bg-transparent',
      )}
    >
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between gap-4 px-4 sm:px-6 lg:px-8">
        <Link href="/" className="flex items-center gap-2" aria-label="Suresh Tour and Travel home">
          <span className="flex size-9 items-center justify-center rounded-full bg-secondary text-secondary-foreground">
            <Mountain className="size-5" aria-hidden />
          </span>
          <span className="flex flex-col leading-none">
            <span className="font-serif text-lg font-semibold text-secondary">Suresh Tour and Travel</span>
            <span className="text-[0.65rem] font-medium tracking-[0.2em] text-primary uppercase">India</span>
          </span>
        </Link>

        <nav className="hidden items-center gap-1 lg:flex" aria-label="Primary">
          {navLinks.map((link) => {
            const active = pathname === link.href || pathname.startsWith(link.href + '/')
            return (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  'rounded-full px-3 py-2 text-sm font-medium transition-colors hover:bg-muted hover:text-secondary',
                  active ? 'text-secondary' : 'text-muted-foreground',
                )}
              >
                {link.label}
              </Link>
            )
          })}
        </nav>

        <div className="hidden items-center gap-2 lg:flex">
          <a
            href={`tel:${tel.tel}`}
            className="inline-flex items-center gap-1.5 rounded-full px-3 py-2 text-sm font-medium text-secondary hover:bg-muted"
          >
            <Phone className="size-4" aria-hidden />
            {tel.display}
          </a>
          <Link
            href="/packages"
            className="inline-flex items-center rounded-full bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground transition-colors hover:bg-primary/90"
          >
            Book a Yatra
          </Link>
        </div>

        <button
          type="button"
          className="inline-flex size-10 items-center justify-center rounded-full text-secondary hover:bg-muted lg:hidden"
          aria-label={open ? 'Close menu' : 'Open menu'}
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
        >
          {open ? <X className="size-5" /> : <Menu className="size-5" />}
        </button>
      </div>

      {open && (
        <div className="border-t border-border bg-background lg:hidden">
          <nav className="mx-auto flex max-w-7xl flex-col gap-1 px-4 py-4" aria-label="Mobile">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="rounded-lg px-3 py-2.5 text-sm font-medium text-secondary hover:bg-muted"
              >
                {link.label}
              </Link>
            ))}
            <div className="mt-2 flex flex-col gap-2 border-t border-border pt-3">
              <Link
                href="/contact"
                className="rounded-lg px-3 py-2.5 text-sm font-medium text-secondary hover:bg-muted"
              >
                Contact us
              </Link>
              <Link
                href="/packages"
                className="inline-flex items-center justify-center rounded-full bg-primary px-4 py-2.5 text-sm font-semibold text-primary-foreground"
              >
                Book a Yatra
              </Link>
            </div>
          </nav>
        </div>
      )}
    </header>
  )
}
