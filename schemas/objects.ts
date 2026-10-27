import {defineField, defineType} from 'sanity'
import {str, txt, img} from './helpers'

export const imageAlt = defineType({
  name: 'imageAlt',
  title: 'Image',
  type: 'image',
  options: {hotspot: true},
  fields: [
    defineField({
      name: 'alt',
      title: 'Alt text',
      type: 'string',
      description: 'Describe the photo for screen readers and Google.',
    }),
  ],
})

export const linkButton = defineType({
  name: 'linkButton',
  title: 'Button',
  type: 'object',
  options: {columns: 2},
  fields: [
    str('label', 'Label'),
    str('href', 'Link', {description: 'A page like /visit-us, a phone link like tel:15168685000, or a full URL.'}),
  ],
})

export const seo = defineType({
  name: 'seo',
  title: 'SEO',
  type: 'object',
  fields: [
    str('title', 'Page title', {description: 'Shown in the browser tab and Google results (aim for under 60 characters).'}),
    txt('description', 'Meta description', {description: 'Aim for 140–160 characters.'}),
    img('image', 'Social share image'),
  ],
})

export const cta = defineType({
  name: 'cta',
  title: 'Call to action',
  type: 'object',
  fields: [
    defineField({name: 'heading', title: 'Heading', type: 'text', rows: 2, description: 'One line per row.'}),
    txt('copy', 'Copy'),
    defineField({name: 'primary', title: 'Primary button', type: 'linkButton'}),
    defineField({name: 'secondary', title: 'Secondary button', type: 'linkButton'}),
  ],
})

/** Label + value row (specs, hours, guides, tiles) */
export const spec = defineType({
  name: 'spec',
  title: 'Row',
  type: 'object',
  fields: [str('label', 'Label'), str('value', 'Value')],
  preview: {select: {title: 'label', subtitle: 'value'}},
})

/** Title + copy (feature points, benefit tiles, steps, lineage rows) */
export const point = defineType({
  name: 'point',
  title: 'Point',
  type: 'object',
  fields: [
    defineField({name: 'title', title: 'Title', type: 'text', rows: 2, description: 'Press return for a line break.'}),
    txt('copy', 'Copy'),
  ],
  preview: {select: {title: 'title', subtitle: 'copy'}},
})

export const programCard = defineType({
  name: 'programCard',
  title: 'Program card',
  type: 'object',
  fields: [
    str('kicker', 'Kicker'),
    str('title', 'Title'),
    txt('description', 'Description'),
    str('when', 'Days and times'),
    img('image', 'Image'),
  ],
  preview: {select: {title: 'title', subtitle: 'when', media: 'image'}},
})

export const photoCell = defineType({
  name: 'photoCell',
  title: 'Photo',
  type: 'object',
  fields: [str('label', 'Label / caption'), img('image', 'Image')],
  preview: {select: {title: 'label', media: 'image'}},
})

export const feature = defineType({
  name: 'feature',
  title: 'Feature',
  type: 'object',
  fields: [
    str('kicker', 'Kicker'),
    defineField({name: 'heading', title: 'Heading', type: 'text', rows: 2, description: 'One line per row.'}),
    txt('copy', 'Copy'),
    img('image', 'Image'),
    str('calloutTitle', 'Callout title'),
    str('calloutText', 'Callout text'),
  ],
})

export const faq = defineType({
  name: 'faq',
  title: 'Question',
  type: 'object',
  fields: [str('question', 'Question'), txt('answer', 'Answer')],
  preview: {select: {title: 'question', subtitle: 'answer'}},
})

export const town = defineType({
  name: 'town',
  title: 'Town',
  type: 'object',
  options: {columns: 2},
  fields: [str('name', 'Town'), str('drive', 'Drive time', {description: 'e.g. "6 min" or "Right here"'})],
  preview: {select: {title: 'name', subtitle: 'drive'}},
})

export const classItem = defineType({
  name: 'classItem',
  title: 'Class',
  type: 'object',
  fields: [
    str('time', 'Start time', {
      description: '24-hour clock, e.g. 06:00, 11:15, 18:45',
      validation: (r: any) => r.required().regex(/^([01]\d|2[0-3]):[0-5]\d$/, {name: 'HH:MM'}),
    }),
    str('name', 'Class name', {validation: (r: any) => r.required()}),
    str('group', 'Who / format', {description: 'e.g. "Adults · Gi", "Ages 5-7", "All levels"'}),
  ],
  preview: {select: {time: 'time', name: 'name', group: 'group'}, prepare: ({time, name, group}: any) => ({title: `${time}  ${name}`, subtitle: group})},
})

export const historyEvent = defineType({
  name: 'historyEvent',
  title: 'Timeline event',
  type: 'object',
  fields: [
    str('year', 'Year label', {description: 'Shown on the rolling year reel, e.g. 1914 or "1500s".'}),
    str('place', 'Place'),
    str('title', 'Title'),
    txt('body', 'Body'),
    str('stageName', 'Name on the stage', {description: 'Large label shown above the photo while this event is active.'}),
    img('image', 'Photo', {description: 'The particle hologram is traced from this image. Cut-out PNGs work best.'}),
    defineField({name: 'keyWhite', title: 'Drop white background', type: 'boolean', initialValue: false, description: 'Turn on when the photo sits on a white background, so white pixels are left out of the particles.'}),
  ],
  preview: {select: {title: 'title', subtitle: 'year', media: 'image'}},
})

export const galleryItem = defineType({
  name: 'galleryItem',
  title: 'Photo',
  type: 'object',
  fields: [img('image', 'Image'), txt('caption', 'Caption')],
  preview: {select: {title: 'caption', media: 'image'}},
})

export const beltRecord = defineType({
  name: 'beltRecord',
  title: 'Belt',
  type: 'object',
  fields: [
    defineField({
      name: 'belt',
      title: 'Belt color',
      type: 'string',
      options: {list: ['blue', 'purple', 'brown', 'black'], layout: 'radio', direction: 'horizontal'},
    }),
    str('name', 'Belt name', {description: 'e.g. "Blue belt"'}),
    defineField({name: 'stripes', title: 'Stripes shown', type: 'number', initialValue: 4}),
    defineField({
      name: 'wins',
      title: 'Titles',
      type: 'array',
      of: [{type: 'spec'}],
      description: 'Label = event, Value = result (Champion, Vice champion…). Anything other than "Champion" is shown dimmed.',
    }),
  ],
  preview: {select: {title: 'name'}},
})

export const coach = defineType({
  name: 'coach',
  title: 'Coach',
  type: 'object',
  fields: [
    str('name', 'Name'),
    str('kicker', 'Label', {initialValue: 'Coach'}),
    defineField({
      name: 'blackBelt',
      title: 'Black belt record',
      type: 'reference',
      to: [{type: 'blackBelt'}],
      description: 'Optional. Links the coach to the roster so their rank updates automatically.',
    }),
    txt('bio', 'Bio'),
    img('photo', 'Photo'),
  ],
  preview: {select: {title: 'name', subtitle: 'kicker'}},
})

export const formOption = defineType({
  name: 'formOption',
  title: 'Class option',
  type: 'object',
  fields: [
    str('label', 'Label on the website'),
    str('googleValue', 'Matching Google Form choice', {description: 'Must match the choice text in the Google Form exactly.'}),
  ],
  preview: {select: {title: 'label', subtitle: 'googleValue'}},
})

export const objects = [
  imageAlt, linkButton, seo, cta, spec, point, programCard, photoCell, feature, faq, town,
  classItem, historyEvent, galleryItem, beltRecord, coach, formOption,
]
