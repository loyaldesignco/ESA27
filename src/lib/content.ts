/**
 * Content layer.
 *
 * - When PUBLIC_SANITY_PROJECT_ID is set, every page reads from Sanity at build time.
 * - When it isn't (first run, before Sanity is set up), pages read the same content from
 *   seed/content.mjs, so the site always builds and looks identical.
 */
import * as seed from '../../seed/content.mjs'

export const SANITY_ENABLED = Boolean(import.meta.env.PUBLIC_SANITY_PROJECT_ID)

let clientPromise: Promise<any> | null = null
async function client() {
  if (!clientPromise) clientPromise = import('sanity:client').then((m) => m.sanityClient)
  return clientPromise
}

const seedById: Record<string, any> = Object.fromEntries(seed.documents.map((d: any) => [d._id, d]))

async function fetchDoc<T = any>(id: string, projection = '...'): Promise<T> {
  if (!SANITY_ENABLED) return seedById[id] as T
  const c = await client()
  const doc = await c.fetch(`*[_id == $id][0]{${projection}}`, {id}, {perspective: 'published'})
  if (!doc) {
    console.warn(`[content] "${id}" not found in Sanity — falling back to seed content.`)
    return seedById[id] as T
  }
  return doc as T
}

export const getSettings = () => fetchDoc('siteSettings')
export const getSchedule = () => fetchDoc('classSchedule')

export async function getPage(id: string) {
  if (id === 'instructorsPage') {
    const doc = await fetchDoc(id, '..., coaches[]{..., "blackBeltName": blackBelt->name}')
    if (!SANITY_ENABLED) {
      // resolve the seed's references the same way GROQ does
      doc.coaches = doc.coaches?.map((c: any) => ({
        ...c,
        blackBeltName: c.blackBelt ? seedById[c.blackBelt._ref]?.name : undefined,
      }))
    }
    return doc
  }
  return fetchDoc(id)
}

export async function getBlackBelts(): Promise<any[]> {
  if (!SANITY_ENABLED) return seed.blackBelts
  const c = await client()
  return c.fetch(`*[_type == "blackBelt" && !(_id in path("drafts.**"))]{name, promoted, degreeOverride, role}`)
}

/** Everything every page needs, fetched once per page build. */
export async function getShared() {
  const [settings, schedule, roster] = await Promise.all([getSettings(), getSchedule(), getBlackBelts()])
  return {settings, schedule, roster}
}
