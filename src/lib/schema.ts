/** JSON-LD builders, all fed from Sanity data. */
import {scheduleForScript} from './format'

const DAY_NAMES = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']
const hhmm = (h: number) => `${String(Math.floor(h)).padStart(2, '0')}:${String(Math.round((h % 1) * 60)).padStart(2, '0')}`

export function address(s: any) {
  return {
    '@type': 'PostalAddress',
    streetAddress: s.street,
    addressLocality: s.city,
    addressRegion: s.region,
    postalCode: s.zip,
    addressCountry: 'US',
  }
}

/** Opening hours from the class schedule: first class start → last class start + 1h, grouped by identical days. */
export function openingHours(schedule: any) {
  const S = scheduleForScript(schedule)
  const spans: Record<string, string[]> = {}
  for (let d = 0; d < 7; d++) {
    const list = S[d]
    if (!list.length) continue
    const key = `${hhmm(list[0][0])}|${hhmm(Math.min(23.99, list[list.length - 1][0] + 1))}`
    ;(spans[key] ||= []).push(DAY_NAMES[d])
  }
  return Object.entries(spans).map(([k, days]) => {
    const [opens, closes] = k.split('|')
    return {'@type': 'OpeningHoursSpecification', dayOfWeek: days.length === 1 ? days[0] : days, opens, closes}
  })
}

export function business(s: any, schedule: any) {
  return {
    '@type': ['SportsActivityLocation', 'LocalBusiness'],
    name: s.siteName,
    url: s.siteUrl,
    telephone: s.phoneDial ? `+${String(s.phoneDial).replace(/\D/g, '')}` : undefined,
    email: s.email,
    address: address(s),
    areaServed: [...(s.towns || []).map((t: any) => t.name), 'Nassau County'],
    openingHoursSpecification: openingHours(schedule),
    sameAs: [s.instagram, s.facebook, s.youtube].filter(Boolean),
  }
}

export const faqPage = (faqs: any[] = []) => ({
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: faqs.map((f) => ({'@type': 'Question', name: f.question, acceptedAnswer: {'@type': 'Answer', text: f.answer}})),
})

export const withContext = (o: any) => ({'@context': 'https://schema.org', ...o})
