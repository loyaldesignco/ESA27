import {defineField, defineType, defineArrayMember} from 'sanity'

/**
 * Small helpers so every page schema reads the same way.
 * Headlines: one line per row. Start a line with * to make it red.
 */
export const HEADLINE_HELP =
  'One line per row — each row animates in on its own. Start a row with * to make it red.'

export const headline = (name: string, title: string, group?: string) =>
  defineField({name, title, type: 'text', rows: 3, description: HEADLINE_HELP, group})

export const str = (name: string, title: string, opts: Record<string, unknown> = {}) =>
  defineField({name, title, type: 'string', ...opts})

export const txt = (name: string, title: string, opts: Record<string, unknown> = {}) =>
  defineField({name, title, type: 'text', rows: 3, ...opts})

export const img = (name: string, title: string, opts: Record<string, unknown> = {}) =>
  defineField({name, title, type: 'imageAlt', ...opts})

export const list = (name: string, title: string, of: string, opts: Record<string, unknown> = {}) =>
  defineField({name, title, type: 'array', of: [defineArrayMember({type: of})], ...opts})

export const seoField = defineField({name: 'seo', title: 'SEO', type: 'seo', group: 'seo'})

export const pageGroups = [
  {name: 'hero', title: 'Hero', default: true},
  {name: 'content', title: 'Sections'},
  {name: 'cta', title: 'Bottom CTA'},
  {name: 'seo', title: 'SEO'},
]

export const singleton = (name: string, title: string, fields: any[]) =>
  defineType({
    name,
    title,
    type: 'document',
    groups: pageGroups,
    fields: [...fields, seoField],
    preview: {prepare: () => ({title})},
  })
