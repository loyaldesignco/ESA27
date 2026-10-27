/**
 * Image helpers that work for both Sanity images and seed (local) images.
 *
 * Sanity image: {asset: {_ref: 'image-<id>-<w>x<h>-<ext>'}, alt, hotspot?, crop?}
 * Seed image:   {_sanityAsset: 'image@file://./images/<file>', alt}  → served from /public/images
 */
import {createImageUrlBuilder} from '@sanity/image-url'

const projectId = import.meta.env.PUBLIC_SANITY_PROJECT_ID
const dataset = import.meta.env.PUBLIC_SANITY_DATASET || 'production'
const builder = projectId ? createImageUrlBuilder({projectId, dataset}) : null

const WIDTHS = [500, 800, 1080, 1600, 2000, 2600, 3200]

const localFile = (img: any): string | null => {
  const m = /images\/(.+)$/.exec(img?._sanityAsset || '')
  return m ? m[1] : null
}

const assetWidth = (img: any): number | null => {
  const m = /-(\d+)x(\d+)-\w+$/.exec(img?.asset?._ref || '')
  return m ? +m[1] : null
}

const isSvg = (img: any) => /-svg$/.test(img?.asset?._ref || '') || /\.svg$/i.test(localFile(img) || '')

export function src(img: any, width?: number): string {
  if (!img) return ''
  const file = localFile(img)
  if (file) return `/images/${file}`
  if (builder && img.asset) {
    let b = builder.image(img)
    if (isSvg(img)) return b.url()
    if (width) b = b.width(width)
    return b.auto('format').quality(82).url()
  }
  return ''
}

/** Responsive srcset from the Sanity CDN. */
export function srcset(img: any): string | undefined {
  if (!img || isSvg(img)) return undefined
  if (localFile(img)) return undefined // seed images: originals are served as-is
  if (builder && img.asset) {
    const max = assetWidth(img) || 2000
    const ws = WIDTHS.filter((w) => w < max)
    return [...ws.map((w) => `${src(img, w)} ${w}w`), `${src(img, Math.min(max, 3200))} ${Math.min(max, 3200)}w`].join(', ')
  }
  return undefined
}

export const alt = (img: any, fallback = '') => img?.alt ?? fallback
