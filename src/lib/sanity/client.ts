import { createClient } from '@sanity/client';

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET;

export const isSanityConfigured = Boolean(projectId && dataset);

/**
 * Public, published-content client. The project ID and dataset are public by
 * design; write tokens and preview tokens must never be added here.
 */
export const sanityClient = createClient({
  apiVersion: '2026-09-14',
  dataset: dataset ?? 'production',
  projectId: projectId ?? 'not-configured',
  useCdn: true,
});
