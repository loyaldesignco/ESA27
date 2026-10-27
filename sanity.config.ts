import {defineConfig} from 'sanity'
import {structureTool, type StructureBuilder} from 'sanity/structure'
import {visionTool} from '@sanity/vision'
import {schemaTypes, SINGLETONS} from './schemas'

// Works both inside Astro (import.meta.env) and in the Sanity CLI (process.env)
const env = (k: string): string | undefined =>
  (import.meta as any).env?.[k] ?? (typeof process !== 'undefined' ? process.env?.[k] : undefined)
const projectId = env('PUBLIC_SANITY_PROJECT_ID') || 'placeholder'
const dataset = env('PUBLIC_SANITY_DATASET') || 'production'

const PAGES: [string, string][] = [
  ['homePage', 'Home'],
  ['adultPage', 'Adult classes'],
  ['kidsPage', 'Kids classes'],
  ['schedulePage', 'Schedule'],
  ['historyPage', 'History'],
  ['instructorsPage', 'Instructors'],
  ['blackBeltsPage', 'Black belts'],
  ['visitPage', 'Visit us'],
]

const one = (S: StructureBuilder, id: string, title: string) =>
  S.listItem().title(title).id(id).child(S.document().schemaType(id).documentId(id).title(title))

export default defineConfig({
  name: 'esa',
  title: 'Emerson Souza BJJ',
  projectId,
  dataset,
  plugins: [
    structureTool({
      structure: (S) =>
        S.list()
          .title('Content')
          .items([
            S.listItem()
              .title('Pages')
              .child(S.list().title('Pages').items(PAGES.map(([id, t]) => one(S, id, t)))),
            one(S, 'classSchedule', 'Class schedule'),
            S.documentTypeListItem('blackBelt').title('Black belts'),
            S.divider(),
            one(S, 'siteSettings', 'Site settings'),
          ]),
    }),
    visionTool(),
  ],
  schema: {
    types: schemaTypes,
    // Pages and settings exist exactly once — hide them from "Create new"
    templates: (templates) => templates.filter(({schemaType}) => !SINGLETONS.includes(schemaType)),
  },
  document: {
    actions: (input, {schemaType}) =>
      SINGLETONS.includes(schemaType)
        ? input.filter(({action}) => action && ['publish', 'discardChanges', 'restore'].includes(action))
        : input,
  },
})
