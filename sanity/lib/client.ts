import { createClient, type SanityClient } from 'next-sanity';
import { apiVersion, dataset, projectId } from '../env';

let cachedClient: SanityClient | null = null;

export function getClient(): SanityClient | null {
  // 1. IMPROVED CHECK: 
  // We check if the ID exists AND if it matches the pattern Sanity requires (a-z, 0-9, dashes).
  // If it's undefined, empty, or the literal string "undefined", this returns null.
  const isValidId = /^[a-z0-9-]+$/.test(projectId || '');

  if (!isValidId) {
    // This prevents the "createClient" from ever being called, which stops the crash.
    return null;
  }

  if (!cachedClient) {
    try {
      cachedClient = createClient({
        projectId,
        dataset,
        apiVersion,
        useCdn: false,
      });
    } catch (err) {
      // Final safety net
      return null;
    }
  }
  return cachedClient;
}