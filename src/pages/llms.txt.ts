/**
 * /llms.txt — a plain-Markdown summary of the academy for AI assistants and agents
 * (https://llmstxt.org). Built from the same Sanity content as the pages, so it stays in sync
 * whenever content is published.
 */
import type {APIRoute} from 'astro'
import {getShared, getPage} from '../lib/content'
import {scheduleForScript} from '../lib/format'

const PAGES: [string, string, string][] = [
  ['homePage', '/', 'Home'],
  ['adultPage', '/adult-classes', 'Adult classes'],
  ['kidsPage', '/kids-classes', 'Kids classes'],
  ['schedulePage', '/schedule', 'Class schedule'],
  ['visitPage', '/visit-us', 'Visit us and book a free class'],
  ['instructorsPage', '/instructors', 'Instructors'],
  ['blackBeltsPage', '/black-belts', 'Black belts'],
  ['historyPage', '/history', 'History of Brazilian jiu-jitsu'],
]
const DAYS = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']

const time = (h: number) => {
  const hh = Math.floor(h), mm = Math.round((h % 1) * 60)
  return `${((hh + 11) % 12) + 1}:${String(mm).padStart(2, '0')} ${hh < 12 ? 'AM' : 'PM'}`
}

export const GET: APIRoute = async ({site}) => {
  const {settings: s, schedule} = await getShared()
  const pages = await Promise.all(PAGES.map(([id]) => getPage(id)))
  const base = (s.siteUrl || site?.toString() || '').replace(/\/$/, '')
  const S = scheduleForScript(schedule)

  const lines: string[] = [
    `# ${s.siteName}`,
    '',
    `> ${pages[0]?.seo?.description || ''}`,
    '',
    '## Contact',
    '',
    `- Address: ${[s.street, `${s.city}, ${s.region} ${s.zip}`].filter(Boolean).join(', ')}${s.entranceNote ? ` (${s.entranceNote})` : ''}`,
    s.phone && `- Phone: ${s.phone}`,
    s.email && `- Email: ${s.email}`,
    `- First class: free. Book at ${base}/visit-us`,
    '',
    '## Weekly class schedule',
    '',
    ...[1, 2, 3, 4, 5, 6, 0].map((d) =>
      S[d].length
        ? `- ${DAYS[d]}: ${S[d].map(([h, name, group]) => `${time(h)} ${name}${group ? ` (${group})` : ''}`).join('; ')}`
        : `- ${DAYS[d]}: closed`,
    ),
    '',
    '## Pages',
    '',
    ...PAGES.map(([, path, label], i) => `- [${label}](${base}${path === '/' ? '/' : path}): ${pages[i]?.seo?.description || ''}`),
    '',
  ].filter((l) => l !== undefined && l !== false && l !== null) as string[]

  return new Response(lines.join('\n'), {headers: {'Content-Type': 'text/markdown; charset=utf-8'}})
}
