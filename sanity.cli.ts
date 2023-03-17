import {loadEnvConfig} from '@next/env'
import {env} from './src/env.mjs'

import {defineCliConfig} from 'sanity/cli'


const projectId = env.NEXT_PUBLIC_SANITY_PROJECT_ID!
const dataset = env.NEXT_PUBLIC_SANITY_DATASET!
export default defineCliConfig({
  api: {
    projectId,
    dataset,
  },
})
