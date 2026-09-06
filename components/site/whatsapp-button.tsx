'use client'

import { usePathname } from 'next/navigation'
import { MessageCircle } from 'lucide-react'
import { primaryPhone, siteConfig } from '@/lib/site-config'

type Props = {
  phone?: { wa: string }
  message?: string
}

export function WhatsAppButton({ phone, message }: Props) {
  const pathname = usePathname()
  if (pathname?.startsWith('/admin')) return null

  const wa = (phone ?? primaryPhone).wa
  const text = encodeURIComponent(message ?? siteConfig.whatsappMessage)

  return (
    <a
      href={`https://wa.me/${wa}?text=${text}`}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Enquire on WhatsApp"
      className="fixed right-4 bottom-4 z-40 inline-flex items-center gap-2 rounded-full bg-emerald-600 px-4 py-3 text-sm font-semibold text-white shadow-lg shadow-emerald-900/20 transition-transform hover:scale-105 sm:right-6 sm:bottom-6"
    >
      <MessageCircle className="size-5" aria-hidden />
      <span className="hidden sm:inline">WhatsApp Enquiry</span>
    </a>
  )
}
