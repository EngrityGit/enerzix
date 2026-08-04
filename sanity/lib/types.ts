import type { Image, PortableTextBlock } from 'sanity';

export interface PostCard {
  _id: string;
  title: string;
  slug: string;
  excerpt?: string;
  coverImage?: Image;
  publishedAt: string;
  author?: string;
  categories?: string[];
}

export interface Post extends PostCard {
  body: PortableTextBlock[];
  seo?: {
    metaTitle?: string;
    metaDescription?: string;
    keywords?: string[];
    ogImage?: Image;
  };
}

export interface PostSlug {
  slug: string;
  lastModified: string;
}