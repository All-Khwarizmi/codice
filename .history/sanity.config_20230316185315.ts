import {defineConfig, isDev} from 'sanity'
import {visionTool} from '@sanity/vision'
import {deskTool} from 'sanity/desk'
import {schemaTypes} from './orchid-hedgehog/schemas'
import {getStartedPlugin} from './orchid-hedgehog/plugins/sanity-plugin-tutorial'
import {env} from './src/env.mjs'
const devOnlyPlugins = [getStartedPlugin()]
const projectId = env.NEXT_PUBLIC_SANITY_PROJECT_ID!
const dataset = env.NEXT_PUBLIC_SANITY_DATASET!


export default defineConfig({
  name: 'default',
  title: 'orchid-hedgehog',

  projectId,
  dataset,

  plugins: [deskTool(), visionTool(), ...(isDev ? devOnlyPlugins : [])],

  schema: {
    types: schemaTypes,
  },
})

