import { MessageCircle } from 'lucide-react'

export function WhatsAppButton() {
  const message = encodeURIComponent('Namaste! I would like to enquire about a DevYatra India pilgrimage package.')
  return (
    <a
      href={`https://wa.me/919000000000?text=${message}`}
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
