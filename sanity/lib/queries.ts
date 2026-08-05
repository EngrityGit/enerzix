import { groq } from 'next-sanity';

const POST_CARD_FIELDS = /* groq */ `
  _id,
  title,
  "slug": slug.current, 
  excerpt,
  coverImage,
  publishedAt,
  author,
  "categories": categories[]->title 
`;

export const ALL_POSTS_QUERY = groq`
  *[_type == "post" && defined(slug.current) && !(_id in path("drafts.**"))]
    | order(publishedAt desc) {
      ${POST_CARD_FIELDS}
    }
`;

export const POST_BY_SLUG_QUERY = groq`
  *[_type == "post" && slug.current == $slug && !(_id in path("drafts.**"))][0]{
    ${POST_CARD_FIELDS},
    body,
    seo {
      metaTitle,
      metaDescription,
      keywords,
      ogImage
    }
  }
`;

export const ALL_POST_SLUGS_QUERY = groq`
  *[_type == "post" && defined(slug.current) && !(_id in path("drafts.**"))]{
    "slug": slug.current,
    "lastModified": coalesce(_updatedAt, publishedAt)
  }
`;