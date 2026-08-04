import type { MetadataRoute } from 'next';
import { sanityFetch } from '@/sanity/lib/fetch';
import { ALL_POST_SLUGS_QUERY } from '@/sanity/lib/queries';
import type { PostSlug } from '@/sanity/lib/types';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const base = 'https://www.enerzix.ca';

  const staticRoutes: { path: string; priority: number; changeFrequency: MetadataRoute.Sitemap[number]['changeFrequency'] }[] = [
    { path: '', priority: 1, changeFrequency: 'weekly' },
    { path: '/products', priority: 0.9, changeFrequency: 'weekly' },
    { path: '/products/500ml', priority: 0.9, changeFrequency: 'weekly' },
    { path: '/about', priority: 0.7, changeFrequency: 'monthly' },
    { path: '/wholesale', priority: 0.8, changeFrequency: 'monthly' },
    { path: '/contact', priority: 0.7, changeFrequency: 'monthly' },
    { path: '/blog', priority: 0.8, changeFrequency: 'weekly' },
    { path: '/privacy', priority: 0.3, changeFrequency: 'yearly' },
    { path: '/terms', priority: 0.3, changeFrequency: 'yearly' },
  ];

  const staticEntries: MetadataRoute.Sitemap = staticRoutes.map(({ path, priority, changeFrequency }) => ({
    url: `${base}${path}`,
    lastModified: new Date(),
    changeFrequency,
    priority,
  }));

  let postEntries: MetadataRoute.Sitemap = [];
  try {
    const posts = await sanityFetch<PostSlug[]>({ query: ALL_POST_SLUGS_QUERY });
    postEntries = posts.map(({ slug, lastModified }) => ({
      url: `${base}/blog/${slug}`,
      lastModified: new Date(lastModified),
      changeFrequency: 'monthly',
      priority: 0.6,
    }));
  } catch {
    postEntries = [];
  }

  return [...staticEntries, ...postEntries];
}