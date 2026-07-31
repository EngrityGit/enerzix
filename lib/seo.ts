export const SITE_URL = 'https://www.enerzix.ca';

export function buildFaqJsonLd(faqs: { question: string; answer: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((f) => ({
      '@type': 'Question',
      name: f.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: f.answer,
      },
    })),
  };
}

export function buildProductJsonLd(product: {
  name: string;
  description: string;
  image?: string;
  price: string;
  sku: string;
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: product.name,
    description: product.description,
    sku: product.sku,
    brand: { '@type': 'Brand', name: 'Enerzix' },
    offers: {
      '@type': 'Offer',
      priceCurrency: 'CAD',
      price: product.price,
      availability: 'https://schema.org/InStock',
      url: SITE_URL,
    },
  };
}

export function JsonLd({ data }: { data: Record<string, unknown> }) {
  return {
    __html: JSON.stringify(data),
  };
}
