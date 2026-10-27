// @ts-check
import {defineConfig} from 'astro/config'
import {loadEnv} from 'vite'
import sanity from '@sanity/astro'
import react from '@astrojs/react'
import vercel from '@astrojs/vercel'

const env = loadEnv(process.env.NODE_ENV || 'production', process.cwd(), '')
const projectId = env.PUBLIC_SANITY_PROJECT_ID
const dataset = env.PUBLIC_SANITY_DATASET || 'production'

export default defineConfig({
  site: env.PUBLIC_SITE_URL || 'https://souzabjj.com',
  // Static site: Vercel rebuilds it whenever content is published in Sanity (see SETUP.md).
  output: 'static',
  adapter: vercel(),
  trailingSlash: 'never',
  build: {format: 'file'},
  integrations: [
    sanity({
      // A placeholder keeps the build working before Sanity is set up (content then comes from /seed).
      projectId: projectId || 'placeholder',
      dataset,
      useCdn: false,
      apiVersion: '2025-01-01',
      // Sanity Studio lives at /studio on the same site
      studioBasePath: '/studio',
    }),
    react(),
  ],
})
