import { createClient } from "next-sanity"
import { env } from "~/env.mjs";

export const projectId = env.NEXT_PUBLIC_SANITY_PROJECT_ID;
export const dataset = env.NEXT_PUBLIC_SANITY_DATASET;
const apiVersion = env.NEXT_PUBLIC_SANITY_API_VERSION;

export const client = createClient({
  projectId,
  dataset,
  apiVersion,
  useCdn: false,
});
