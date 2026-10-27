/**
 * Builds seed/esa-seed.tar.gz for:  npx sanity dataset import seed/esa-seed.tar.gz production
 * Contains data.ndjson + every image referenced by the seed content.
 */
import {documents} from '../seed/content.mjs'
import {mkdirSync, rmSync, writeFileSync, copyFileSync, existsSync} from 'node:fs'
import {execFileSync} from 'node:child_process'
import {createHash} from 'node:crypto'

const OUT = 'seed/.build'
rmSync(OUT, {recursive: true, force: true})
mkdirSync(`${OUT}/images`, {recursive: true})

const images = new Set()
const missing = new Set()
const key = (path) => createHash('md5').update(path).digest('hex').slice(0, 12)

function walk(v, path) {
  if (Array.isArray(v)) {
    return v.map((item, i) => {
      const x = walk(item, `${path}[${i}]`)
      return x && typeof x === 'object' && !Array.isArray(x) ? {_key: key(`${path}[${i}]`), ...x} : x
    })
  }
  if (v && typeof v === 'object') {
    const o = {}
    for (const [k, val] of Object.entries(v)) {
      if (k === '_sanityAsset') {
        const file = val.replace('image@file://./images/', '')
        if (existsSync(`public/images/${file}`)) images.add(file)
        else { missing.add(file); continue }
      }
      o[k] = walk(val, `${path}.${k}`)
    }
    // drop image objects whose file is missing
    if (o._type === 'imageAlt' && !o._sanityAsset) return undefined
    return o
  }
  return v
}

const lines = documents.map((d) => JSON.stringify(walk(d, d._id)))
writeFileSync(`${OUT}/data.ndjson`, lines.join('\n') + '\n')
for (const f of images) copyFileSync(`public/images/${f}`, `${OUT}/images/${f}`)
execFileSync('tar', ['-czf', 'seed/esa-seed.tar.gz', '-C', OUT, 'data.ndjson', 'images'])
console.log(`✓ ${lines.length} documents, ${images.size} images → seed/esa-seed.tar.gz`)
if (missing.size) console.log(`! Skipped missing images (not in the Webflow export): ${[...missing].join(', ')}`)
