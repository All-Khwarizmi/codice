import {loadEnvConfig} from '@next/env'
const projectId = env.NEXT_PUBLIC_SANITY_PROJECT_ID!
const dataset = env.NEXT_PUBLIC_SANITY_DATASET!

import {defineCliConfig} from 'sanity/cli'

export default defineCliConfig({
  api: {
    projectId: 'q9zxjw08',
    dataset: 'production',
  },
})
