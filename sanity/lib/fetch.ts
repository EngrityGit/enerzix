import 'server-only';
import { getClient } from './client';
import type { QueryParams } from 'next-sanity';

export async function sanityFetch<T>({
  query,
  params = {},
  tags = ['post'],
}: {
  query: string;
  params?: QueryParams;
  tags?: string[];
}): Promise<T> {
  const client = getClient();

  // If the client is null (because projectId is missing), 
  // return an empty array immediately without trying to fetch.
  if (!client) {
    return [] as unknown as T;
  }

  try {
    return await client.fetch<T>(query, params, {
      cache: 'force-cache',
      next: { tags, revalidate: 60 },
    });
  } catch (error) {
    return [] as unknown as T;
  }
}