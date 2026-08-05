import type { Metadata } from 'next';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import { PortableText, type PortableTextComponents } from '@portabletext/react';
import Container from '@/components/ui/Container';
import { sanityFetch } from '@/sanity/lib/fetch';
import { POST_BY_SLUG_QUERY, ALL_POST_SLUGS_QUERY } from '@/sanity/lib/queries';
import { urlFor } from '@/sanity/lib/image';
import type { Post, PostSlug } from '@/sanity/lib/types';

export async function generateStaticParams() {
  try {
    const slugs = await sanityFetch<PostSlug[]>({ query: ALL_POST_SLUGS_QUERY });
    return slugs.map(({ slug }) => ({ slug }));
  } catch {
    return [];
  }
}

async function getPost(slug: string): Promise<Post | null> {
  try {
    return await sanityFetch<Post | null>({ query: POST_BY_SLUG_QUERY, params: { slug } });
  } catch {
    return null;
  }
}

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const post = await getPost(params.slug);
  if (!post) return {};

  const title = post.seo?.metaTitle || post.title;
  const description = post.seo?.metaDescription || post.excerpt || '';
  
  // SAFETY CHECK: Only generate URL if asset exists
  const ogImageSource = post.seo?.ogImage || post.coverImage;
  const ogImage = ogImageSource?.asset 
    ? urlFor(ogImageSource).width(1200).height(630).url() 
    : undefined;

  return {
    title,
    description,
    keywords: post.seo?.keywords,
    alternates: { canonical: `https://www.enerzix.ca/blog/${post.slug}` },
    openGraph: {
      title,
      description,
      url: `https://www.enerzix.ca/blog/${post.slug}`,
      type: 'article',
      publishedTime: post.publishedAt,
      authors: post.author ? [post.author] : undefined,
      images: ogImage ? [{ url: ogImage, width: 1200, height: 630, alt: title }] : undefined,
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: ogImage ? [ogImage] : undefined,
    },
  };
}

const portableTextComponents: PortableTextComponents = {
  types: {
    image: ({ value }) => {
      // SAFETY CHECK: If the PortableText image is missing an asset, don't render it
      if (!value?.asset) return null;

      return (
        <span className="relative block my-10 aspect-video w-full overflow-hidden rounded-2xl bg-slate-50">
          <Image
            src={urlFor(value).width(1200).url()}
            alt={value.alt || 'Blog illustration'}
            fill
            sizes="(max-width: 768px) 100vw, 800px"
            className="object-cover"
          />
        </span>
      );
    },
  },
};

export default async function BlogPostPage({ params }: { params: { slug: string } }) {
  const post = await getPost(params.slug);
  if (!post) notFound();

  // SAFETY CHECK for JSON-LD
  const jsonLdImage = post.coverImage?.asset 
    ? urlFor(post.coverImage).width(1200).url() 
    : 'https://www.enerzix.ca/og-fallback.png'; // Provide a static fallback URL

  const articleJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: post.title,
    description: post.seo?.metaDescription || post.excerpt,
    image: jsonLdImage,
    datePublished: post.publishedAt,
    author: { '@type': 'Person', name: post.author || 'Enerzix Team' },
    publisher: {
      '@type': 'Organization',
      name: 'Enerzix',
      logo: { '@type': 'ImageObject', url: 'https://www.enerzix.ca/logo.png' },
    },
    mainEntityOfPage: `https://www.enerzix.ca/blog/${post.slug}`,
  };

  return (
    <main className="bg-white min-h-screen pt-40 pb-32">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd) }} />
      <Container className="max-w-3xl">
        {post.categories && post.categories.length > 0 && (
          <span className="text-[10px] font-black uppercase tracking-[0.5em] text-[#005FFF]">
            {post.categories[0]}
          </span>
        )}
        <h1 className="text-4xl md:text-6xl font-black text-[#0A192F] tracking-tighter mt-4 mb-6 leading-tight">
          {post.title}
        </h1>
        <div className="flex items-center gap-3 text-sm text-slate-500 mb-12">
          {post.author && <span>{post.author}</span>}
          <span>&middot;</span>
          <time dateTime={post.publishedAt}>
            {new Date(post.publishedAt).toLocaleDateString('en-CA', { year: 'numeric', month: 'long', day: 'numeric' })}
          </time>
        </div>

        {/* SAFETY CHECK: Only render cover image if asset exists */}
        {post.coverImage?.asset ? (
          <div className="relative aspect-[16/9] w-full overflow-hidden rounded-2xl bg-slate-100 mb-12">
            <Image
              src={urlFor(post.coverImage).width(1600).height(900).url()}
              alt={(post.coverImage as any).alt || post.title}
              fill
              priority
              sizes="(max-width: 768px) 100vw, 768px"
              className="object-cover"
            />
          </div>
        ) : (
          /* OPTIONAL: Render a spacer or a decorative element if there's no image */
          <div className="h-1 bg-[#005FFF]/10 w-full mb-12 rounded-full" />
        )}

        <div className="prose prose-slate prose-lg max-w-none prose-headings:font-black prose-headings:tracking-tight prose-a:text-[#005FFF]">
          <PortableText value={post.body} components={portableTextComponents} />
        </div>
      </Container>
    </main>
  );
}