// Indian currency + date formatting helpers.

export function formatINR(amount: number): string {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0,
  }).format(amount)
}

export function formatDate(iso: string): string {
  return new Intl.DateTimeFormat('en-IN', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  }).format(new Date(iso))
}

export interface PriceBreakdown {
  adults: number
  children: number
  rooms: number
  perAdult: number
  perChild: number
  adultTotal: number
  childTotal: number
  roomSupplement: number
  subtotal: number
  taxPercent: number
  tax: number
  discount: number
  total: number
  advance: number
  remaining: number
}

// Deterministic price calculation shared by the UI and (later) the server.
// NOTE: In production the authoritative version of this runs server-side using
// current database prices — never trust totals computed in the browser.
export function calculatePrice(opts: {
  perAdult: number
  perChild: number
  singleSupplement: number
  taxPercent: number
  adults: number
  children: number
  singleRooms: number
  couponDiscount?: number
}): PriceBreakdown {
  const { perAdult, perChild, singleSupplement, taxPercent, adults, children, singleRooms } = opts
  const adultTotal = perAdult * adults
  const childTotal = perChild * children
  const roomSupplement = singleSupplement * singleRooms
  const discount = opts.couponDiscount ?? 0
  const subtotal = Math.max(0, adultTotal + childTotal + roomSupplement - discount)
  const tax = Math.round((subtotal * taxPercent) / 100)
  const total = subtotal + tax
  const advance = Math.round(total * 0.25)
  return {
    adults,
    children,
    rooms: singleRooms,
    perAdult,
    perChild,
    adultTotal,
    childTotal,
    roomSupplement,
    subtotal,
    taxPercent,
    tax,
    discount,
    total,
    advance,
    remaining: total - advance,
  }
}

// Human-readable booking reference, e.g. DYI-2026-000123
export function generateBookingRef(seq = Math.floor(Math.random() * 999999)): string {
  const year = new Date().getFullYear()
  return `DYI-${year}-${String(seq).padStart(6, '0')}`
}
