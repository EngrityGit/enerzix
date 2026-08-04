import { sanityFetch } from '@/sanity/lib/fetch';
import { ALL_POSTS_QUERY } from '@/sanity/lib/queries';
import { Post } from '@/sanity/lib/types';
import Container from '@/components/ui/Container';
import BlogHero from './sections/BlogHero';
import BlogViewManager from './sections/BlogViewManager';

export const metadata = {
  title: 'Journal — Enerzix Hydration Insights',
  description: 'Explore our latest articles on hydration science, logistics, and sustainability from the Enerzix team.',
};

export default async function BlogIndexPage() {
  const posts = await sanityFetch<Post[]>({ query: ALL_POSTS_QUERY });

  return (
    <main className="bg-white min-h-screen">
      <BlogHero />
        <BlogViewManager posts={posts} />
    </main>
  );
}