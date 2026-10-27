import {defineField, defineType, defineArrayMember} from 'sanity'
import {headline, str, txt, img, list, singleton} from './helpers'

/* ------------------------------------------------------------------ */
/*  Site settings — everything shared across pages                     */
/* ------------------------------------------------------------------ */
export const siteSettings = defineType({
  name: 'siteSettings',
  title: 'Site settings',
  type: 'document',
  groups: [
    {name: 'contact', title: 'Contact', default: true},
    {name: 'towns', title: 'Towns'},
    {name: 'form', title: 'Booking form'},
    {name: 'footer', title: 'Footer & social'},
    {name: 'seo', title: 'SEO defaults'},
  ],
  fields: [
    str('siteName', 'Business name', {group: 'contact'}),
    str('phone', 'Phone (as shown)', {group: 'contact', description: 'e.g. 516-868-5000'}),
    str('phoneDial', 'Phone (for dialing)', {group: 'contact', description: 'Digits only with country code, e.g. 15168685000'}),
    str('email', 'Email', {group: 'contact'}),
    str('street', 'Street address', {group: 'contact'}),
    str('city', 'City', {group: 'contact'}),
    str('region', 'State', {group: 'contact'}),
    str('zip', 'ZIP', {group: 'contact'}),
    str('entranceNote', 'Entrance note', {group: 'contact', description: 'e.g. Entrance and parking in the rear'}),
    str('directionsUrl', 'Google Maps directions link', {group: 'contact'}),
    str('mapQuery', 'Map embed search', {group: 'contact', description: 'What the embedded map searches for, e.g. 2420 Grand Ave, Baldwin, NY 11510'}),
    list('hours', 'Opening hours', 'spec', {group: 'contact'}),
    list('towns', 'Nearby towns', 'town', {group: 'towns'}),

    defineField({
      name: 'googleForm',
      title: 'Google Form',
      type: 'object',
      group: 'form',
      description: 'Where "Book a free class" submissions go. See SETUP.md → "Connect the Google Form" for how to find these values.',
      fields: [
        str('actionUrl', 'Form response URL', {description: 'Ends in /formResponse'}),
        str('emailField', 'Email field', {description: '"emailAddress" if the form collects emails automatically, otherwise an entry.123… id', initialValue: 'emailAddress'}),
        str('nameField', 'Name field id', {description: 'e.g. entry.701788627'}),
        str('phoneField', 'Phone field id'),
        str('classField', 'Class field id'),
        list('options', 'Class options', 'formOption'),
        str('successMessage', 'Success message'),
        str('errorMessage', 'Error message'),
      ],
    }),

    str('footerTitle', 'Footer headline', {group: 'footer'}),
    str('footerNote', 'Footer note', {group: 'footer'}),
    str('instagram', 'Instagram URL', {group: 'footer'}),
    str('facebook', 'Facebook URL', {group: 'footer'}),
    str('youtube', 'YouTube URL', {group: 'footer'}),
    list('marquee', 'Scrolling marquee words', 'string', {group: 'footer', description: 'The red/black ticker under the home page hero.'}),

    str('siteUrl', 'Live site URL', {group: 'seo', description: 'e.g. https://souzabjj.com'}),
    img('shareImage', 'Default social share image', {group: 'seo'}),
  ],
  preview: {prepare: () => ({title: 'Site settings'})},
})

/* ------------------------------------------------------------------ */
/*  Class schedule — drives every live "Up next" widget and week grid  */
/* ------------------------------------------------------------------ */
const day = (name: string, title: string) =>
  defineField({name, title, type: 'array', of: [defineArrayMember({type: 'classItem'})]})

export const classSchedule = defineType({
  name: 'classSchedule',
  title: 'Class schedule',
  type: 'document',
  description: 'Every "Up next" widget and weekly grid on the site reads from here.',
  fields: [
    day('monday', 'Monday'),
    day('tuesday', 'Tuesday'),
    day('wednesday', 'Wednesday'),
    day('thursday', 'Thursday'),
    day('friday', 'Friday'),
    day('saturday', 'Saturday'),
    day('sunday', 'Sunday'),
  ],
  preview: {prepare: () => ({title: 'Class schedule'})},
})

/* ------------------------------------------------------------------ */
/*  Black belts — roster with automatic degrees                         */
/* ------------------------------------------------------------------ */
export const blackBelt = defineType({
  name: 'blackBelt',
  title: 'Black belt',
  type: 'document',
  fields: [
    str('name', 'Name', {validation: (r: any) => r.required()}),
    str('promoted', 'Black belt date', {
      description:
        'YYYY-MM-DD, YYYY-MM or YYYY. Degrees are added automatically on each anniversary (IBJJF: 3, 3, 3, 5, 5, 5 years). Leave empty if unknown — they show as "Black belt".',
      validation: (r: any) => r.regex(/^\d{4}(-\d{2}(-\d{2})?)?$/, {name: 'date'}),
    }),
    defineField({
      name: 'degreeOverride',
      title: 'Degree override',
      type: 'number',
      description: 'Only if the date is unknown but the degree is. Leave empty to calculate from the date.',
    }),
    str('role', 'Role', {description: 'e.g. "Coach" or "Professor · Head instructor". Leave empty for none.'}),
  ],
  orderings: [{title: 'Name', name: 'name', by: [{field: 'name', direction: 'asc'}]}],
  preview: {select: {title: 'name', subtitle: 'promoted'}},
})

/* ------------------------------------------------------------------ */
/*  Pages                                                               */
/* ------------------------------------------------------------------ */
const ctaField = defineField({name: 'cta', title: 'Bottom call to action', type: 'cta', group: 'cta'})

export const homePage = singleton('homePage', 'Home', [
  headline('heroHeadline', 'Headline', 'hero'),
  str('heroButton', 'Button label', {group: 'hero'}),
  img('heroImage', 'Hero cut-out image', {group: 'hero'}),
  defineField({name: 'heroCardTitle', title: 'Location card title', type: 'text', rows: 2, group: 'hero'}),
  txt('heroCardCopy', 'Location card copy', {group: 'hero'}),
  defineField({name: 'heroNoteTitle', title: 'Programs note title', type: 'text', rows: 2, group: 'hero'}),
  txt('heroNoteCopy', 'Programs note copy', {group: 'hero'}),
  list('heroNextImages', '"Up next" card images', 'imageAlt', {group: 'hero', validation: (r: any) => r.max(2)}),

  str('programsRail', 'Programs side label', {group: 'content'}),
  headline('programsHeading', 'Programs heading', 'content'),
  defineField({
    name: 'programs',
    title: 'Program rows',
    type: 'array',
    group: 'content',
    of: [
      defineArrayMember({
        type: 'object',
        name: 'programRow',
        fields: [str('title', 'Title'), str('copy', 'Copy'), str('href', 'Link')],
        preview: {select: {title: 'title', subtitle: 'copy'}},
      }),
    ],
  }),
  str('scheduleEyebrow', 'Schedule eyebrow', {group: 'content'}),
  headline('scheduleHeading', 'Schedule heading', 'content'),
  txt('scheduleNote', 'Schedule note', {group: 'content'}),
  str('firstClassLabel', '"Before your first class" label', {group: 'content'}),
  txt('firstClassCopy', '"Before your first class" copy', {group: 'content'}),
  str('firstClassButton', '"Claim a spot" button label', {group: 'content'}),

  str('profEyebrow', 'Professor eyebrow', {group: 'content'}),
  headline('profHeading', 'Professor heading', 'content'),
  txt('profLead', 'Professor intro', {group: 'content'}),
  list('profTitles', 'Professor titles', 'spec', {group: 'content'}),
  str('profLink', 'Professor link label', {group: 'content'}),
  img('profImage', 'Professor portrait', {group: 'content'}),
  str('profBadge', 'Portrait badge', {group: 'content'}),

  str('townsEyebrow', 'Towns eyebrow', {group: 'content'}),
  headline('townsHeading', 'Towns heading', 'content'),
  ctaField,
])

export const adultPage = singleton('adultPage', 'Adult classes', [
  str('kicker', 'Kicker', {group: 'hero'}),
  headline('headline', 'Headline', 'hero'),
  defineField({name: 'primaryButton', title: 'Primary button', type: 'linkButton', group: 'hero'}),
  defineField({name: 'secondaryButton', title: 'Secondary link', type: 'linkButton', group: 'hero'}),
  img('heroImage', 'Hero image', {group: 'hero'}),
  list('points', 'Intro points (2)', 'point', {group: 'hero'}),
  str('timesLabel', 'Class times label', {group: 'hero'}),
  list('times', 'Class times', 'spec', {group: 'hero'}),

  str('programRail', 'Program side label', {group: 'content'}),
  headline('programHeading', 'Program heading', 'content'),
  txt('programCopy', 'Program copy', {group: 'content'}),
  txt('programCopy2', 'Program copy (second paragraph)', {group: 'content'}),
  list('specs', 'Program specs', 'spec', {group: 'content'}),
  headline('cardsHeading', 'Cards heading', 'content'),
  list('cards', 'Program cards', 'programCard', {group: 'content'}),
  str('stripRail', 'Photo strip label', {group: 'content'}),
  list('strip', 'Photo strip', 'photoCell', {group: 'content'}),
  headline('benefitsHeading', 'Benefits heading', 'content'),
  txt('benefitsAside', 'Benefits aside', {group: 'content'}),
  list('benefits', 'Benefits', 'point', {group: 'content'}),
  defineField({name: 'feature', title: 'Feature', type: 'feature', group: 'content'}),
  str('whyKicker', '"Why" kicker', {group: 'content'}),
  headline('whyHeading', '"Why" heading', 'content'),
  txt('whyCopy', '"Why" copy', {group: 'content'}),
  txt('whyCopy2', '"Why" copy (second paragraph)', {group: 'content'}),
  img('whyImage', '"Why" image', {group: 'content'}),
  ctaField,
])

export const kidsPage = singleton('kidsPage', 'Kids classes', [
  str('kicker', 'Kicker', {group: 'hero'}),
  headline('headline', 'Headline', 'hero'),
  txt('intro', 'Intro', {group: 'hero'}),
  defineField({name: 'primaryButton', title: 'Primary button', type: 'linkButton', group: 'hero'}),
  defineField({name: 'secondaryButton', title: 'Secondary link', type: 'linkButton', group: 'hero'}),
  img('heroImage', 'Hero image', {group: 'hero'}),
  list('points', 'Intro points (2)', 'point', {group: 'hero'}),
  str('sideLabel', 'Third point label', {group: 'hero'}),
  txt('sideCopy', 'Third point copy', {group: 'hero'}),

  str('agesRail', 'Age groups side label', {group: 'content'}),
  headline('agesHeading', 'Age groups heading', 'content'),
  defineField({
    name: 'ageGroups',
    title: 'Age groups',
    type: 'array',
    group: 'content',
    validation: (r: any) => r.max(2),
    of: [
      defineArrayMember({
        type: 'object',
        name: 'ageGroup',
        fields: [
          str('name', 'Program name'),
          str('ages', 'Ages chip'),
          str('time', 'Time'),
          str('meta', 'Days and length'),
          txt('description', 'Description'),
          defineField({name: 'button', title: 'Button', type: 'linkButton'}),
        ],
        preview: {select: {title: 'name', subtitle: 'ages'}},
      }),
    ],
  }),
  str('stripRail', 'Photo strip label', {group: 'content'}),
  list('strip', 'Photo strip', 'photoCell', {group: 'content'}),
  headline('benefitsHeading', 'Benefits heading', 'content'),
  txt('benefitsAside', 'Benefits aside', {group: 'content'}),
  list('benefits', 'Benefits', 'point', {group: 'content'}),
  defineField({name: 'feature', title: 'Feature', type: 'feature', group: 'content'}),
  txt('quote', 'Quote', {group: 'content'}),
  str('quoteCite', 'Quote attribution', {group: 'content'}),
  img('quoteImage', 'Quote image', {group: 'content'}),
  str('faqKicker', 'FAQ kicker', {group: 'content'}),
  headline('faqHeading', 'FAQ heading', 'content'),
  str('faqSince', 'FAQ badge', {group: 'content'}),
  list('faqs', 'Parent questions', 'faq', {group: 'content'}),
  ctaField,
])

export const schedulePage = singleton('schedulePage', 'Schedule', [
  str('kicker', 'Kicker', {group: 'hero'}),
  headline('headline', 'Headline', 'hero'),
  txt('lead', 'Lead', {group: 'hero'}),
  str('upNextButton', '"Claim a spot" button label', {group: 'hero'}),
  list('boardNotes', 'Notes under the day board', 'string', {group: 'content'}),
  headline('weekHeading', 'Week heading', 'content'),
  str('weekAside', 'Week aside', {group: 'content'}),
  txt('weekNote', 'Week note', {group: 'content'}),
  str('guideRail', 'Guide side label', {group: 'content'}),
  headline('guideHeading', 'Guide heading', 'content'),
  txt('guideCopy', 'Guide copy', {group: 'content'}),
  list('guide', 'Guide rows', 'spec', {group: 'content'}),
  ctaField,
])

export const historyPage = singleton('historyPage', 'History', [
  str('kicker', 'Kicker', {group: 'hero'}),
  headline('headline', 'Headline', 'hero'),
  txt('lead', 'Lead', {group: 'hero'}),
  defineField({
    name: 'kanji',
    title: 'Kanji rows',
    type: 'array',
    group: 'hero',
    of: [
      defineArrayMember({
        type: 'object',
        name: 'kanjiRow',
        fields: [str('glyph', 'Character'), str('title', 'Title'), str('copy', 'Copy')],
        preview: {select: {title: 'glyph', subtitle: 'title'}},
      }),
    ],
  }),
  str('timelineLabel', 'Timeline label', {group: 'content'}),
  list('events', 'Timeline', 'historyEvent', {group: 'content'}),
  str('quoteKicker', 'Quote kicker', {group: 'content'}),
  headline('quote', 'Quote (large)', 'content'),
  txt('quoteCopy', 'Quote copy', {group: 'content'}),
  str('lineageRail', 'Lineage side label', {group: 'content'}),
  headline('lineageHeading', 'Lineage heading', 'content'),
  txt('lineageCopy', 'Lineage copy', {group: 'content'}),
  defineField({name: 'lineageLink', title: 'Lineage link', type: 'linkButton', group: 'content'}),
  list('lineage', 'Lineage', 'spec', {group: 'content', description: 'Label = name, Value = note'}),
  ctaField,
])

export const instructorsPage = singleton('instructorsPage', 'Instructors', [
  str('kicker', 'Kicker', {group: 'hero'}),
  headline('headline', 'Headline', 'hero'),
  str('sub', 'Subhead', {group: 'hero'}),
  img('heroImage', 'Hero image', {group: 'hero'}),
  txt('bio', 'Bio', {group: 'hero'}),
  list('titles', 'Titles', 'spec', {group: 'hero'}),

  str('galleryRail', 'Gallery side label', {group: 'content'}),
  str('galleryKicker', 'Gallery kicker', {group: 'content'}),
  list('gallery', 'Archive gallery', 'galleryItem', {group: 'content'}),

  str('recordKicker', 'Competition record kicker', {group: 'content'}),
  headline('recordHeading', 'Competition record heading', 'content'),
  defineField({name: 'recordCount', title: 'Count-up number', type: 'number', group: 'content'}),
  str('recordCountLabel', 'Count-up label', {group: 'content'}),
  list('belts', 'Belts', 'beltRecord', {group: 'content'}),

  str('staffRail', 'Coaching staff side label', {group: 'content'}),
  headline('staffHeading', 'Coaching staff heading', 'content'),
  list('coaches', 'Coaches', 'coach', {group: 'content'}),
  defineField({name: 'staffLink', title: 'Link under coaches', type: 'linkButton', group: 'content'}),
  txt('quote', 'Quote', {group: 'content'}),
  str('quoteCite', 'Quote attribution', {group: 'content'}),
  img('quoteImage', 'Quote image', {group: 'content'}),
  ctaField,
])

export const blackBeltsPage = singleton('blackBeltsPage', 'Black belts', [
  str('kicker', 'Kicker', {group: 'hero'}),
  headline('headline', 'Headline', 'hero'),
  img('heroImage', 'Hero image', {group: 'hero'}),
  txt('intro', 'Intro', {group: 'hero'}),
  str('lineageLabel', 'Lineage label', {group: 'hero'}),
  str('lineageText', 'Lineage text', {group: 'hero'}),
  headline('gridHeading', 'Roster heading', 'content'),
  str('lineageRail', 'Lineage side label', {group: 'content'}),
  headline('lineageHeading', 'Lineage heading', 'content'),
  txt('lineageCopy', 'Lineage copy', {group: 'content'}),
  list('lineage', 'Lineage', 'spec', {group: 'content', description: 'Label = name, Value = note'}),
  str('rankKicker', 'Rank kicker', {group: 'content'}),
  headline('rankHeading', 'Rank heading', 'content'),
  txt('rankCopy', 'Rank copy', {group: 'content'}),
  img('rankImage', 'Rank image', {group: 'content'}),
  ctaField,
])

export const visitPage = singleton('visitPage', 'Visit us', [
  str('kicker', 'Kicker', {group: 'hero'}),
  headline('headline', 'Headline', 'hero'),
  txt('intro', 'Intro', {group: 'hero'}),
  list('steps', 'Steps', 'point', {group: 'hero'}),
  str('formKicker', 'Form kicker', {group: 'hero'}),
  str('formHeading', 'Form heading', {group: 'hero'}),
  str('formButton', 'Submit button label', {group: 'hero'}),
  str('formNote', 'Note under the form', {group: 'hero', description: 'The phone number is added after this text automatically.'}),
  str('academyKicker', 'Academy kicker', {group: 'content'}),
  headline('academyHeading', 'Academy heading', 'content'),
  str('directionsLabel', 'Directions button label', {group: 'content'}),
  headline('townsHeading', 'Towns heading', 'content'),
  txt('townsAside', 'Towns aside', {group: 'content'}),
  str('faqRail', 'FAQ side label', {group: 'content'}),
  headline('faqHeading', 'FAQ heading', 'content'),
  list('faqs', 'Questions', 'faq', {group: 'content'}),
])

export const documents = [
  siteSettings, classSchedule, blackBelt,
  homePage, adultPage, kidsPage, schedulePage, historyPage, instructorsPage, blackBeltsPage, visitPage,
]

export const SINGLETONS = [
  'siteSettings', 'classSchedule',
  'homePage', 'adultPage', 'kidsPage', 'schedulePage', 'historyPage', 'instructorsPage', 'blackBeltsPage', 'visitPage',
]
