import type { Package, Destination, Testimonial, BlogPost } from './types'

// ---------------------------------------------------------------------------
// SAMPLE / DEMONSTRATION DATA
// All content below is original placeholder copy for demonstration only.
// Replace with real records from Supabase in production.
// ---------------------------------------------------------------------------

export const destinations: Destination[] = [
  {
    slug: 'kedarnath',
    name: 'Kedarnath',
    state: 'Uttarakhand',
    region: 'Garhwal Himalayas',
    tagline: 'The abode of Lord Shiva amid snow peaks',
    description:
      'One of the twelve Jyotirlingas, Kedarnath sits at 3,583 m in the Garhwal Himalayas. The ancient stone shrine, framed by the Kedarnath range, is reached by a scenic trek from Gaurikund and rewards pilgrims with an unforgettable sense of stillness.',
    image: '/images/kedarnath.png',
    bestTime: 'May – June, Sep – Oct',
    featured: true,
  },
  {
    slug: 'badrinath',
    name: 'Badrinath',
    state: 'Uttarakhand',
    region: 'Garhwal Himalayas',
    tagline: 'Vishnu’s Himalayan seat by the Alaknanda',
    description:
      'Badrinath, dedicated to Lord Vishnu, is one of the Char Dham and the Chota Char Dham. Its brightly painted facade stands against the Neelkanth peak, with the hot springs of Tapt Kund at its base.',
    image: '/images/badrinath.png',
    bestTime: 'May – June, Sep – Oct',
    featured: true,
  },
  {
    slug: 'gangotri',
    name: 'Gangotri',
    state: 'Uttarakhand',
    region: 'Garhwal Himalayas',
    tagline: 'Source of the sacred Ganga',
    description:
      'Gangotri marks the origin of the Ganga. The riverside temple beside the turquoise Bhagirathi, surrounded by deodar forests and snow peaks, is a serene stop on the Char Dham circuit.',
    image: '/images/gangotri.png',
    bestTime: 'May – June, Sep – Oct',
    featured: false,
  },
  {
    slug: 'varanasi',
    name: 'Varanasi',
    state: 'Uttar Pradesh',
    region: 'Ganga Plains',
    tagline: 'The eternal city of light on the Ganga',
    description:
      'Among the world’s oldest living cities, Varanasi’s ghats come alive at dawn and during the evening Ganga Aarti. A place of profound ritual, learning and devotion.',
    image: '/images/varanasi.png',
    bestTime: 'Oct – March',
    featured: true,
  },
  {
    slug: 'ayodhya',
    name: 'Ayodhya',
    state: 'Uttar Pradesh',
    region: 'Ganga Plains',
    tagline: 'Birthplace of Lord Rama',
    description:
      'A city steeped in the Ramayana, Ayodhya draws pilgrims to its grand new temple and the ghats along the Sarayu river.',
    image: '/images/ayodhya.png',
    bestTime: 'Oct – March',
    featured: true,
  },
  {
    slug: 'amarnath',
    name: 'Amarnath',
    state: 'Jammu & Kashmir',
    region: 'Himalayan Pilgrimage',
    tagline: 'A high-altitude pilgrimage to the Amarnath cave shrine',
    description:
      'Amarnath is a seasonal pilgrimage destination in the Himalayas of Jammu & Kashmir. The annual yatra is subject to official registration, health requirements, weather and route conditions.',
    image: '/images/amarnath.png',
    bestTime: 'July – August',
    featured: false,
  },
  {
    slug: 'vaishno-devi',
    name: 'Vaishno Devi',
    state: 'Jammu & Kashmir',
    region: 'Trikuta Hills',
    tagline: 'The mother goddess of the Trikuta hills',
    description:
      'The cave shrine of Mata Vaishno Devi is reached by a well-maintained trek from Katra. One of the most visited pilgrimages in India, welcoming to families and first-time yatris.',
    image: '/images/vaishno-devi.png',
    bestTime: 'March – Oct',
    featured: true,
  },
  {
    slug: 'haridwar-rishikesh',
    name: 'Haridwar & Rishikesh',
    state: 'Uttarakhand',
    region: 'Ganga Foothills',
    tagline: 'Where the Ganga meets the plains',
    description:
      'Twin spiritual towns on the Ganga — Haridwar for its grand Har Ki Pauri aarti, Rishikesh for its ashrams, yoga and gentle riverside calm.',
    image: '/images/haridwar.png',
    bestTime: 'Sep – April',
    featured: false,
  },
  {
    slug: 'vrindavan',
    name: 'Mathura & Vrindavan',
    state: 'Uttar Pradesh',
    region: 'Braj',
    tagline: 'The land of Krishna’s childhood',
    description:
      'The twin towns of Braj celebrate Lord Krishna through countless temples, kirtans and the joyous colours of festival season.',
    image: '/images/vrindavan.png',
    bestTime: 'Oct – March',
    featured: false,
  },
]

function upcomingDates(count: number, startOffsetDays = 30, gapDays = 14) {
  const arr = []
  for (let i = 0; i < count; i++) {
    const d = new Date()
    d.setDate(d.getDate() + startOffsetDays + i * gapDays)
    arr.push(d.toISOString().slice(0, 10))
  }
  return arr
}

const [d1, d2, d3] = upcomingDates(3)
const [d4, d5, d6] = upcomingDates(3, 45)

export const packages: Package[] = [
  {
    id: 'pkg-chardham',
    slug: 'char-dham-yatra',
    name: 'Char Dham Yatra — Complete Circuit',
    shortDescription:
      'Yamunotri, Gangotri, Kedarnath and Badrinath in one guided 11-day Himalayan pilgrimage.',
    detailedDescription:
      'Complete the revered Chota Char Dham circuit across the Garhwal Himalayas. This carefully paced journey balances darshan at all four dhams with rest, acclimatisation and comfortable stays, supported by experienced mountain guides and a dedicated medical kit.',
    destinationSlug: 'kedarnath',
    category: 'Char Dham',
    days: 11,
    nights: 10,
    startLocation: 'Haridwar',
    endLocation: 'Haridwar',
    basePrice: 42000,
    discountedPrice: 37500,
    childPrice: 26000,
    singleSupplement: 12000,
    taxPercent: 5,
    maxGroupSize: 24,
    difficulty: 'Challenging',
    bestSeason: 'May – June, Sep – Oct',
    coverImage: '/images/kedarnath.png',
    gallery: ['/images/kedarnath.png', '/images/badrinath.png', '/images/gangotri.png', '/images/haridwar.png'],
    highlights: [
      'Darshan at all four dhams — Yamunotri, Gangotri, Kedarnath, Badrinath',
      'Guided Kedarnath trek with pony/palki assistance available',
      'Evening Ganga Aarti at Haridwar',
      'Acclimatisation day built into the schedule',
      'Experienced Garhwali guides and on-call medical support',
    ],
    itinerary: [
      { day: 1, title: 'Arrive Haridwar', description: 'Welcome, briefing and evening Ganga Aarti at Har Ki Pauri.' },
      { day: 2, title: 'Haridwar → Barkot', description: 'Scenic drive through the foothills to Barkot.' },
      { day: 3, title: 'Yamunotri darshan', description: 'Trek to Yamunotri and return to Barkot.' },
      { day: 4, title: 'Barkot → Uttarkashi', description: 'Drive to Uttarkashi, visit Kashi Vishwanath temple.' },
      { day: 5, title: 'Gangotri darshan', description: 'Day trip to Gangotri for darshan and aarti.' },
      { day: 6, title: 'Uttarkashi → Guptkashi', description: 'Long scenic drive; rest and acclimatise.' },
      { day: 7, title: 'Kedarnath trek', description: 'Drive to Gaurikund and trek to Kedarnath.' },
      { day: 8, title: 'Kedarnath → Guptkashi', description: 'Morning darshan and return trek.' },
      { day: 9, title: 'Guptkashi → Badrinath', description: 'Drive to Badrinath via Joshimath.' },
      { day: 10, title: 'Badrinath darshan', description: 'Darshan, Tapt Kund and Mana village visit.' },
      { day: 11, title: 'Return to Haridwar', description: 'Drive back; tour concludes.' },
    ],
    inclusions: [
      'Accommodation on twin-sharing basis',
      'Daily breakfast and dinner',
      'All transfers by private vehicle',
      'Experienced tour guide',
      'All applicable permits',
    ],
    exclusions: [
      'Airfare / train fare to Haridwar',
      'Pony, palki and porter charges',
      'Lunch and personal expenses',
      'Travel insurance',
    ],
    accommodation: 'Comfortable 3-star hotels and clean mountain guesthouses (twin-sharing).',
    transportation: 'Air-conditioned private vehicles (AC not operational at high altitude).',
    mealsIncluded: 'Breakfast and dinner daily',
    requiredDocuments: ['Government photo ID', 'Passport-size photographs', 'Medical fitness self-declaration'],
    healthInfo:
      'High-altitude route reaching ~3,583 m. A basic level of fitness is required. Consult your physician if you have cardiac or respiratory conditions.',
    status: 'published',
    featured: true,
    departures: [
      { id: 'dep-cd-1', date: d1, totalSeats: 24, availableSeats: 6 },
      { id: 'dep-cd-2', date: d2, totalSeats: 24, availableSeats: 14 },
      { id: 'dep-cd-3', date: d3, totalSeats: 24, availableSeats: 22 },
    ],
    faqs: [
      { question: 'Is the Kedarnath trek mandatory?', answer: 'The 16 km trek can be done on foot, by pony, palki or (subject to availability) helicopter at additional cost.' },
      { question: 'What is the group size?', answer: 'Groups are capped at 24 travellers for a comfortable, well-supported experience.' },
    ],
  },
  {
    id: 'pkg-dodham',
    slug: 'do-dham-yatra',
    name: 'Do Dham Yatra — Kedarnath & Badrinath',
    shortDescription: 'The two most revered Himalayan dhams in a focused 7-day journey.',
    detailedDescription:
      'A shorter alternative to the full circuit, the Do Dham Yatra covers Kedarnath and Badrinath with a comfortable pace and expert guidance — ideal for those with limited time.',
    destinationSlug: 'badrinath',
    category: 'Do Dham',
    days: 7,
    nights: 6,
    startLocation: 'Haridwar',
    endLocation: 'Haridwar',
    basePrice: 28000,
    discountedPrice: 24900,
    childPrice: 17000,
    singleSupplement: 8000,
    taxPercent: 5,
    maxGroupSize: 24,
    difficulty: 'Moderate',
    bestSeason: 'May – June, Sep – Oct',
    coverImage: '/images/badrinath.png',
    gallery: ['/images/badrinath.png', '/images/kedarnath.png', '/images/haridwar.png'],
    highlights: [
      'Darshan at Kedarnath and Badrinath',
      'Guided Kedarnath trek',
      'Visit to Mana, the last village before Tibet',
      'Evening aarti at Haridwar',
    ],
    itinerary: [
      { day: 1, title: 'Arrive Haridwar', description: 'Briefing and Ganga Aarti.' },
      { day: 2, title: 'Haridwar → Guptkashi', description: 'Scenic drive to Guptkashi.' },
      { day: 3, title: 'Kedarnath trek', description: 'Drive to Gaurikund and trek up.' },
      { day: 4, title: 'Return to Guptkashi', description: 'Morning darshan and descent.' },
      { day: 5, title: 'Guptkashi → Badrinath', description: 'Drive via Joshimath.' },
      { day: 6, title: 'Badrinath darshan', description: 'Darshan and Mana village.' },
      { day: 7, title: 'Return to Haridwar', description: 'Drive back; tour concludes.' },
    ],
    inclusions: ['Twin-sharing accommodation', 'Breakfast and dinner', 'Private vehicle transfers', 'Tour guide', 'Permits'],
    exclusions: ['Travel to Haridwar', 'Pony/palki charges', 'Lunch', 'Personal expenses'],
    accommodation: 'Comfortable hotels and mountain guesthouses (twin-sharing).',
    transportation: 'Private vehicles suited to hill roads.',
    mealsIncluded: 'Breakfast and dinner daily',
    requiredDocuments: ['Government photo ID', 'Passport-size photographs'],
    healthInfo: 'Involves a 16 km Kedarnath trek. Basic fitness recommended.',
    status: 'published',
    featured: true,
    departures: [
      { id: 'dep-dd-1', date: d1, totalSeats: 24, availableSeats: 3 },
      { id: 'dep-dd-2', date: d2, totalSeats: 24, availableSeats: 11 },
      { id: 'dep-dd-3', date: d4, totalSeats: 24, availableSeats: 20 },
    ],
    faqs: [
      { question: 'Can seniors join?', answer: 'Yes, with pony/palki support for the trek and a doctor’s clearance.' },
    ],
  },
  {
    id: 'pkg-kedarnath',
    slug: 'kedarnath-yatra',
    name: 'Kedarnath Yatra Express',
    shortDescription: 'A focused 5-day darshan of the Kedarnath Jyotirlinga.',
    detailedDescription:
      'A compact pilgrimage to Kedarnath for those short on time, including the trek, darshan and a night in the mountains near the shrine.',
    destinationSlug: 'kedarnath',
    category: 'Single Dham',
    days: 5,
    nights: 4,
    startLocation: 'Haridwar',
    endLocation: 'Haridwar',
    basePrice: 19000,
    discountedPrice: 16500,
    childPrice: 11000,
    singleSupplement: 5000,
    taxPercent: 5,
    maxGroupSize: 20,
    difficulty: 'Moderate',
    bestSeason: 'May – June, Sep – Oct',
    coverImage: '/images/kedarnath.png',
    gallery: ['/images/kedarnath.png', '/images/haridwar.png'],
    highlights: ['Kedarnath Jyotirlinga darshan', 'Guided 16 km trek', 'Overnight near the shrine', 'Small group'],
    itinerary: [
      { day: 1, title: 'Arrive Haridwar', description: 'Briefing and rest.' },
      { day: 2, title: 'Haridwar → Sonprayag', description: 'Drive to base.' },
      { day: 3, title: 'Trek & darshan', description: 'Trek to Kedarnath, evening aarti.' },
      { day: 4, title: 'Return trek', description: 'Descend to Sonprayag, drive to Guptkashi.' },
      { day: 5, title: 'Return to Haridwar', description: 'Drive back; tour concludes.' },
    ],
    inclusions: ['Accommodation', 'Breakfast and dinner', 'Transfers', 'Guide', 'Permits'],
    exclusions: ['Travel to Haridwar', 'Pony/palki', 'Lunch', 'Personal expenses'],
    accommodation: 'Guesthouses and a night near the shrine (twin-sharing).',
    transportation: 'Private vehicle to trek base.',
    mealsIncluded: 'Breakfast and dinner',
    requiredDocuments: ['Government photo ID', 'Photographs'],
    healthInfo: '16 km high-altitude trek. Moderate fitness required.',
    status: 'published',
    featured: false,
    departures: [
      { id: 'dep-kd-1', date: d2, totalSeats: 20, availableSeats: 9 },
      { id: 'dep-kd-2', date: d5, totalSeats: 20, availableSeats: 18 },
    ],
    faqs: [{ question: 'Is helicopter available?', answer: 'Helicopter tickets can be arranged subject to availability and weather at additional cost.' }],
  },
  {
    id: 'pkg-vaishno',
    slug: 'vaishno-devi-yatra',
    name: 'Vaishno Devi Yatra',
    shortDescription: 'A comfortable 3-day darshan of Mata Vaishno Devi from Katra.',
    detailedDescription:
      'Visit the cave shrine of Mata Vaishno Devi in the Trikuta hills. Well suited to families and first-time yatris, with battery-car and helicopter options for the climb.',
    destinationSlug: 'vaishno-devi',
    category: 'Single Dham',
    days: 3,
    nights: 2,
    startLocation: 'Katra',
    endLocation: 'Katra',
    basePrice: 12000,
    discountedPrice: 10500,
    childPrice: 7000,
    singleSupplement: 3500,
    taxPercent: 5,
    maxGroupSize: 30,
    difficulty: 'Easy',
    bestSeason: 'March – Oct',
    coverImage: '/images/vaishno-devi.png',
    gallery: ['/images/vaishno-devi.png'],
    highlights: ['Mata Vaishno Devi darshan', 'Bhairavnath temple visit', 'Battery car / helicopter options', 'Family friendly'],
    itinerary: [
      { day: 1, title: 'Arrive Katra', description: 'Check in and rest; collect yatra slip.' },
      { day: 2, title: 'Darshan', description: 'Climb to the shrine, darshan and Bhairavnath.' },
      { day: 3, title: 'Departure', description: 'Breakfast and departure.' },
    ],
    inclusions: ['Hotel in Katra', 'Breakfast', 'Local transfers', 'Yatra assistance'],
    exclusions: ['Travel to Katra', 'Pony/palki/helicopter', 'Lunch and dinner', 'Personal expenses'],
    accommodation: 'Comfortable hotel in Katra (twin-sharing).',
    transportation: 'Local transfers to Banganga base.',
    mealsIncluded: 'Breakfast',
    requiredDocuments: ['Government photo ID'],
    healthInfo: '~13 km climb; battery car and helicopter reduce the walk. Suitable for most fitness levels.',
    status: 'published',
    featured: true,
    departures: [
      { id: 'dep-vd-1', date: d1, totalSeats: 30, availableSeats: 12 },
      { id: 'dep-vd-2', date: d3, totalSeats: 30, availableSeats: 26 },
    ],
    faqs: [{ question: 'Do we need to book the yatra slip?', answer: 'Our team assists with the yatra registration slip on arrival in Katra.' }],
  },
  {
    id: 'pkg-kashi',
    slug: 'kashi-ayodhya-prayagraj',
    name: 'Kashi · Ayodhya · Prayagraj Tour',
    shortDescription: 'A 6-day spiritual triangle through Varanasi, Ayodhya and Prayagraj.',
    detailedDescription:
      'Experience the Ganga Aarti at Varanasi, the temples of Ayodhya and the sacred Sangam at Prayagraj on this cultural and spiritual journey through the heart of the Ganga plains.',
    destinationSlug: 'varanasi',
    category: 'Cultural',
    days: 6,
    nights: 5,
    startLocation: 'Varanasi',
    endLocation: 'Prayagraj',
    basePrice: 22000,
    discountedPrice: 19500,
    childPrice: 13000,
    singleSupplement: 6000,
    taxPercent: 5,
    maxGroupSize: 26,
    difficulty: 'Easy',
    bestSeason: 'Oct – March',
    coverImage: '/images/varanasi.png',
    gallery: ['/images/varanasi.png', '/images/ayodhya.png'],
    highlights: ['Ganga Aarti at Dashashwamedh Ghat', 'Sunrise boat ride', 'Ram Mandir darshan at Ayodhya', 'Triveni Sangam at Prayagraj'],
    itinerary: [
      { day: 1, title: 'Arrive Varanasi', description: 'Evening Ganga Aarti.' },
      { day: 2, title: 'Varanasi', description: 'Sunrise boat ride and Kashi Vishwanath.' },
      { day: 3, title: 'Varanasi → Ayodhya', description: 'Drive to Ayodhya.' },
      { day: 4, title: 'Ayodhya', description: 'Ram Mandir and Sarayu ghats.' },
      { day: 5, title: 'Ayodhya → Prayagraj', description: 'Drive to Prayagraj.' },
      { day: 6, title: 'Prayagraj', description: 'Triveni Sangam and departure.' },
    ],
    inclusions: ['Hotels', 'Breakfast', 'Boat ride', 'Transfers', 'Guide'],
    exclusions: ['Travel to Varanasi', 'Lunch and dinner', 'Personal expenses'],
    accommodation: 'Comfortable 3-star hotels (twin-sharing).',
    transportation: 'Air-conditioned private vehicle.',
    mealsIncluded: 'Breakfast',
    requiredDocuments: ['Government photo ID'],
    healthInfo: 'Easy, low-altitude itinerary suitable for all ages.',
    status: 'published',
    featured: true,
    departures: [
      { id: 'dep-ka-1', date: d2, totalSeats: 26, availableSeats: 15 },
      { id: 'dep-ka-2', date: d6, totalSeats: 26, availableSeats: 24 },
    ],
    faqs: [{ question: 'Is the boat ride included?', answer: 'Yes, a shared sunrise boat ride on the Ganga is included.' }],
  },
  {
    id: 'pkg-braj',
    slug: 'mathura-vrindavan-tour',
    name: 'Mathura & Vrindavan Braj Darshan',
    shortDescription: 'A joyful 3-day journey through the land of Krishna.',
    detailedDescription:
      'Explore the temples, kirtans and colours of Braj — Krishna Janmabhoomi in Mathura, Banke Bihari in Vrindavan and the surrounding sacred sites.',
    destinationSlug: 'vrindavan',
    category: 'Cultural',
    days: 3,
    nights: 2,
    startLocation: 'Mathura',
    endLocation: 'Mathura',
    basePrice: 11000,
    discountedPrice: 9500,
    childPrice: 6000,
    singleSupplement: 3000,
    taxPercent: 5,
    maxGroupSize: 28,
    difficulty: 'Easy',
    bestSeason: 'Oct – March',
    coverImage: '/images/vrindavan.png',
    gallery: ['/images/vrindavan.png'],
    highlights: ['Krishna Janmabhoomi', 'Banke Bihari temple', 'Prem Mandir at night', 'Yamuna aarti'],
    itinerary: [
      { day: 1, title: 'Arrive Mathura', description: 'Krishna Janmabhoomi and Dwarkadhish.' },
      { day: 2, title: 'Vrindavan', description: 'Banke Bihari, ISKCON and Prem Mandir.' },
      { day: 3, title: 'Departure', description: 'Govardhan visit and departure.' },
    ],
    inclusions: ['Hotel', 'Breakfast', 'Transfers', 'Guide'],
    exclusions: ['Travel to Mathura', 'Lunch and dinner', 'Personal expenses'],
    accommodation: 'Comfortable hotel (twin-sharing).',
    transportation: 'Private vehicle.',
    mealsIncluded: 'Breakfast',
    requiredDocuments: ['Government photo ID'],
    healthInfo: 'Easy itinerary suitable for all ages.',
    status: 'published',
    featured: false,
    departures: [
      { id: 'dep-br-1', date: d1, totalSeats: 28, availableSeats: 20 },
      { id: 'dep-br-2', date: d4, totalSeats: 28, availableSeats: 27 },
    ],
    faqs: [{ question: 'Is this good for families?', answer: 'Yes, it is an easy, family-friendly cultural tour.' }],
  },
  {
    id: 'pkg-haridwar',
    slug: 'haridwar-rishikesh-tour',
    name: 'Haridwar & Rishikesh Retreat',
    shortDescription: 'A restful 4-day riverside retreat with aarti, yoga and temples.',
    detailedDescription:
      'Balance devotion and calm with the grand Har Ki Pauri aarti at Haridwar and the ashrams, yoga and gentle river life of Rishikesh.',
    destinationSlug: 'haridwar-rishikesh',
    category: 'Retreat',
    days: 4,
    nights: 3,
    startLocation: 'Haridwar',
    endLocation: 'Rishikesh',
    basePrice: 14000,
    discountedPrice: 12500,
    childPrice: 8000,
    singleSupplement: 4000,
    taxPercent: 5,
    maxGroupSize: 26,
    difficulty: 'Easy',
    bestSeason: 'Sep – April',
    coverImage: '/images/haridwar.png',
    gallery: ['/images/haridwar.png'],
    highlights: ['Har Ki Pauri Ganga Aarti', 'Mansa Devi ropeway', 'Rishikesh ashrams and ghats', 'Optional yoga session'],
    itinerary: [
      { day: 1, title: 'Arrive Haridwar', description: 'Evening Ganga Aarti.' },
      { day: 2, title: 'Haridwar temples', description: 'Mansa Devi and Chandi Devi.' },
      { day: 3, title: 'Rishikesh', description: 'Triveni Ghat, Laxman Jhula, optional yoga.' },
      { day: 4, title: 'Departure', description: 'Morning at leisure and departure.' },
    ],
    inclusions: ['Hotels', 'Breakfast', 'Transfers', 'Guide'],
    exclusions: ['Travel to Haridwar', 'Lunch and dinner', 'Personal expenses'],
    accommodation: 'Riverside hotels (twin-sharing).',
    transportation: 'Private vehicle.',
    mealsIncluded: 'Breakfast',
    requiredDocuments: ['Government photo ID'],
    healthInfo: 'Easy, relaxed itinerary suitable for all ages.',
    status: 'published',
    featured: false,
    departures: [
      { id: 'dep-hr-1', date: d3, totalSeats: 26, availableSeats: 18 },
      { id: 'dep-hr-2', date: d5, totalSeats: 26, availableSeats: 25 },
    ],
    faqs: [{ question: 'Is yoga included?', answer: 'An optional group yoga session in Rishikesh can be arranged on request.' }],
  },
  {
    id: 'pkg-amarnath',
    slug: 'amarnath-yatra',
    name: 'Amarnath Yatra',
    shortDescription: 'A guided 6-day high-altitude pilgrimage to the Amarnath cave.',
    detailedDescription:
      'Undertake the revered Amarnath Yatra to the ice-lingam cave shrine. This challenging high-altitude journey is fully supported with acclimatisation, medical checks and experienced guides. Subject to annual yatra permits and weather.',
    destinationSlug: 'amarnath',
    category: 'Himalayan Pilgrimage',
    days: 6,
    nights: 5,
    startLocation: 'Srinagar',
    endLocation: 'Srinagar',
    basePrice: 34000,
    discountedPrice: 30500,
    childPrice: 0,
    singleSupplement: 9000,
    taxPercent: 5,
    maxGroupSize: 20,
    difficulty: 'Strenuous',
    bestSeason: 'July – August',
    coverImage: '/images/amarnath.png',
    gallery: ['/images/amarnath.png'],
    highlights: ['Amarnath cave darshan', 'Pahalgam / Baltal route options', 'Full medical and logistics support', 'Acclimatisation built in'],
    itinerary: [
      { day: 1, title: 'Arrive Srinagar', description: 'Briefing and rest by Dal Lake.' },
      { day: 2, title: 'Srinagar → Pahalgam', description: 'Drive and acclimatise.' },
      { day: 3, title: 'Trek to Sheshnag', description: 'Begin the yatra trek.' },
      { day: 4, title: 'Cave darshan', description: 'Trek to the cave for darshan.' },
      { day: 5, title: 'Return trek', description: 'Descend to base.' },
      { day: 6, title: 'Return to Srinagar', description: 'Drive back; tour concludes.' },
    ],
    inclusions: ['Accommodation', 'Breakfast and dinner', 'Transfers', 'Guide', 'Yatra coordination'],
    exclusions: ['Travel to Srinagar', 'Pony/porter', 'Yatra permit fees', 'Personal expenses'],
    accommodation: 'Hotels and tented camps (twin-sharing).',
    transportation: 'Private vehicle to trek base.',
    mealsIncluded: 'Breakfast and dinner',
    requiredDocuments: ['Government photo ID', 'Compulsory Health Certificate', 'Yatra registration'],
    healthInfo:
      'Strenuous route above 3,800 m requiring a Compulsory Health Certificate. Not recommended for those under 13, over 70, or beyond six weeks pregnant, per yatra board rules.',
    status: 'published',
    featured: false,
    departures: [{ id: 'dep-am-1', date: d6, totalSeats: 20, availableSeats: 8 }],
    faqs: [{ question: 'Is registration required?', answer: 'Yes, the annual Amarnath yatra requires official registration and a health certificate, which our team helps coordinate.' }],
  },
]

export const testimonials: Testimonial[] = [
  { id: 't1', name: 'Anjali Sharma', location: 'Delhi', rating: 5, packageName: 'Char Dham Yatra', quote: 'Beautifully organised from start to finish. The guides were knowledgeable and the pace let us actually experience each dham.' },
  { id: 't2', name: 'Ramesh Iyer', location: 'Bengaluru', rating: 5, packageName: 'Do Dham Yatra', quote: 'My parents are in their 60s and the team took wonderful care of them on the Kedarnath trek. Highly recommended.' },
  { id: 't3', name: 'Priya Nair', location: 'Mumbai', rating: 4, packageName: 'Kashi Ayodhya Tour', quote: 'The Ganga Aarti at Varanasi was unforgettable. Hotels were clean and comfortable throughout.' },
  { id: 't4', name: 'Suresh Gupta', location: 'Jaipur', rating: 5, packageName: 'Vaishno Devi Yatra', quote: 'Smooth and stress-free. Everything from the yatra slip to the return was handled for us.' },
  { id: 't5', name: 'Meera Joshi', location: 'Pune', rating: 5, packageName: 'Haridwar & Rishikesh', quote: 'A peaceful retreat. The riverside stay and morning yoga in Rishikesh were the highlights.' },
  { id: 't6', name: 'Vikram Singh', location: 'Chandigarh', rating: 4, packageName: 'Char Dham Yatra', quote: 'Well-supported journey with good medical backup. Felt safe at high altitude.' },
]

export const blogPosts: BlogPost[] = [
  {
    slug: 'char-dham-first-timers-guide',
    title: 'Char Dham for First-Timers: What to Expect',
    excerpt: 'A practical primer on routes, fitness, weather and packing for your first Char Dham Yatra.',
    category: 'Travel Guide',
    readTime: '7 min read',
    date: '2026-02-10',
    image: '/images/kedarnath.png',
    content: [
      'The Char Dham circuit covers Yamunotri, Gangotri, Kedarnath and Badrinath across the Garhwal Himalayas. Most journeys begin and end in Haridwar.',
      'Give yourself time to acclimatise. Altitudes rise steadily, and a rest day pays off in comfort and safety.',
      'Pack layered clothing, sturdy shoes, a light raincoat and any personal medication. Nights are cold even in summer.',
    ],
  },
  {
    slug: 'best-time-to-visit-kedarnath',
    title: 'Best Time to Visit Kedarnath',
    excerpt: 'When the portals open, weather windows, and how to avoid the busiest crowds.',
    category: 'Travel Guide',
    readTime: '5 min read',
    date: '2026-01-22',
    image: '/images/kedarnath.png',
    content: [
      'Kedarnath’s portals typically open in late April/May and close around Diwali. The most reliable weather windows are May–June and September–October.',
      'Monsoon months bring landslide risk on mountain roads. Shoulder seasons offer thinner crowds and clearer views.',
    ],
  },
  {
    slug: 'ganga-aarti-varanasi',
    title: 'Experiencing the Ganga Aarti in Varanasi',
    excerpt: 'A first-hand look at the evening ritual on Dashashwamedh Ghat and how to make the most of it.',
    category: 'Culture',
    readTime: '6 min read',
    date: '2026-01-05',
    image: '/images/varanasi.png',
    content: [
      'Each evening, priests perform a synchronised fire ritual on the ghats of Varanasi. Arrive early or take a boat for the best vantage point.',
      'A sunrise boat ride the next morning offers a completely different, quieter perspective on the river.',
    ],
  },
  {
    slug: 'packing-list-himalayan-yatra',
    title: 'The Essential Packing List for a Himalayan Yatra',
    excerpt: 'Everything you need — and a few things you don’t — for high-altitude pilgrimage travel.',
    category: 'Tips',
    readTime: '4 min read',
    date: '2025-12-18',
    image: '/images/badrinath.png',
    content: [
      'Layering is key: a base layer, a fleece and a windproof outer shell handle most conditions.',
      'Carry a refillable water bottle, ORS sachets, sunscreen and a small first-aid kit.',
    ],
  },
  {
    slug: 'vaishno-devi-family-trip',
    title: 'Planning a Vaishno Devi Trip with Family',
    excerpt: 'Battery cars, ponies and helicopters — how to make the climb comfortable for everyone.',
    category: 'Travel Guide',
    readTime: '5 min read',
    date: '2025-12-02',
    image: '/images/vaishno-devi.png',
    content: [
      'The climb from Katra is well paved and dotted with rest points. Battery cars cover much of the route.',
      'Book the yatra slip on arrival and start early to avoid the midday sun.',
    ],
  },
]

export const faqs = [
  { question: 'How do I book a pilgrimage package?', answer: 'Choose a package, select a departure date and complete the guided booking form. Submitting a booking sends a request to our team; you will receive an acknowledgement email and we confirm availability before finalising.' },
  { question: 'Does booking guarantee confirmation?', answer: 'No. A submitted booking is a request. Seats are only reserved once your booking reaches Confirmed status after our team verifies availability and any advance payment.' },
  { question: 'What is your cancellation policy?', answer: 'Cancellation charges depend on how far ahead of departure you cancel. Full terms are shown at booking and on our Cancellation & Refund Policy page.' },
  { question: 'Are the treks suitable for senior citizens?', answer: 'Many yatras offer pony, palki and battery-car assistance. We recommend a doctor’s clearance for high-altitude routes and are happy to advise on the right package.' },
  { question: 'What documents do I need?', answer: 'A government photo ID is required for all travellers. High-altitude yatras such as Amarnath require a medical fitness certificate and official registration.' },
  { question: 'How are payments handled?', answer: 'The current version supports Pay Later / Request Confirmation and manual payment recording by our team. Online payment gateways can be enabled later. We never store card details.' },
  { question: 'Can I customise a package?', answer: 'Yes. Use the Custom Tour Request form to tell us your preferred destinations, dates, group size and budget, and we will design an itinerary for you.' },
  { question: 'Is travel insurance included?', answer: 'Travel insurance is not included by default but we strongly recommend it, especially for high-altitude journeys. We can suggest providers on request.' },
]

// Lookup helpers ------------------------------------------------------------

export function getPackageBySlug(slug: string) {
  return packages.find((p) => p.slug === slug)
}

export function getDestinationBySlug(slug: string) {
  return destinations.find((d) => d.slug === slug)
}

export function getPackagesByDestination(slug: string) {
  return packages.filter((p) => p.destinationSlug === slug)
}

export function getRelatedPackages(pkg: Package, limit = 3) {
  return packages
    .filter((p) => p.id !== pkg.id && (p.category === pkg.category || p.destinationSlug === pkg.destinationSlug))
    .slice(0, limit)
}

export function getBlogBySlug(slug: string) {
  return blogPosts.find((b) => b.slug === slug)
}

export const categories = Array.from(new Set(packages.map((p) => p.category)))
export const difficulties = ['Easy', 'Moderate', 'Challenging', 'Strenuous'] as const
