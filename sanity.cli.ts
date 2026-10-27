import {readFileSync, existsSync} from 'node:fs'
import {defineCliConfig} from 'sanity/cli'

// Read PUBLIC_SANITY_* from .env so the CLI and the website share one config.
const env: Record<string, string> = {...(process.env as Record<string, string>)}
if (existsSync('.env')) {
  for (const line of readFileSync('.env', 'utf8').split('\n')) {
    const m = line.match(/^\s*([A-Z0-9_]+)\s*=\s*"?([^"\n]*)"?\s*$/)
    if (m && !env[m[1]]) env[m[1]] = m[2]
  }
}

export default defineCliConfig({
  api: {
    projectId: env.PUBLIC_SANITY_PROJECT_ID,
    dataset: env.PUBLIC_SANITY_DATASET || 'production',
  },
})
