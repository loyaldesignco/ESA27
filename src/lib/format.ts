/** Escape text for set:html. */
export const esc = (s = '') =>
  String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;')

/** Text with line breaks → HTML with <br>. */
export const br = (s = '') => esc(s).replace(/\r?\n/g, '<br>')

/** Headline text → [{text, red}] lines. A line starting with * is red. */
export const lines = (s = '') =>
  String(s)
    .split(/\r?\n/)
    .map((l) => l.trim())
    .filter(Boolean)
    .map((l) => (l.startsWith('*') ? {text: l.slice(1).trim(), red: true} : {text: l, red: false}))

/** Zero-padded index: 1 → "01" */
export const nn = (i: number) => String(i).padStart(2, '0')

/** Phone link */
export const tel = (dial = '') => `tel:${String(dial).replace(/[^\d+]/g, '')}`

/* ------------------------------------------------------------------ */
/*  Schedule                                                           */
/* ------------------------------------------------------------------ */
const DAY_KEYS = ['sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday']

/** Sanity schedule → {0:[[hours, name, group]], …} as the live scripts expect (0 = Sunday). */
export function scheduleForScript(schedule: any) {
  const out: Record<number, [number, string, string][]> = {}
  DAY_KEYS.forEach((k, i) => {
    out[i] = (schedule?.[k] || [])
      .map((c: any) => {
        const [h, m] = String(c.time || '0:0').split(':').map(Number)
        return [h + (m || 0) / 60, c.name || '', c.group || ''] as [number, string, string]
      })
      .sort((a: any, b: any) => a[0] - b[0])
  })
  return out
}

/* ------------------------------------------------------------------ */
/*  Black belt roster — mirrors the client script so no-JS output matches */
/* ------------------------------------------------------------------ */
const STEPS = [3, 3, 3, 5, 5, 5]
const parse = (s: string) => {
  const p = String(s).split('-')
  return new Date(+p[0], (+p[1] || 1) - 1, +p[2] || 1)
}
const degree = (s: string, now = new Date()) => {
  const a = parse(s)
  let d = 0, t = 0
  for (const step of STEPS) {
    t += step
    if (now >= new Date(a.getFullYear() + t, a.getMonth(), a.getDate())) d++
    else break
  }
  return d
}
export const ord = (n: number) => {
  const s = ['th', 'st', 'nd', 'rd'], v = n % 100
  return n + (s[(v - 20) % 10] || s[v] || s[0])
}

/** Rows for window.SouzaRoster: [name, date|null, role, degreeOverride|null] */
export const rosterForScript = (roster: any[]) =>
  roster.map((r) => [r.name, r.promoted || null, r.role || '', r.degreeOverride ?? null])

export function rankedRoster(roster: any[]) {
  return roster
    .map((r) => {
      const d = r.degreeOverride ?? (r.promoted ? degree(r.promoted) : 0)
      return {
        name: r.name,
        date: r.promoted || null,
        note: r.role || '',
        degree: d,
        short: d ? `${ord(d)} degree` : 'Black belt',
        rank: d ? `${ord(d)} degree black belt` : 'Black belt',
      }
    })
    .sort(
      (a, b) =>
        b.degree - a.degree ||
        (a.date ? +parse(a.date) : 9e15) - (b.date ? +parse(b.date) : 9e15),
    )
}

export function numberWord(n: number) {
  const o = 'zero one two three four five six seven eight nine ten eleven twelve thirteen fourteen fifteen sixteen seventeen eighteen nineteen'.split(' ')
  const t = '  twenty thirty forty fifty sixty seventy eighty ninety'.split(' ')
  const w = n < 20 ? o[n] : n < 100 ? t[Math.floor(n / 10)] + (n % 10 ? '-' + o[n % 10] : '') : String(n)
  return w.charAt(0).toUpperCase() + w.slice(1)
}
