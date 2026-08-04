import imageUrlBuilder from '@sanity/image-url';
import type { Image } from 'sanity';
import { dataset, projectId } from '../env';

// Default import works across every published version of @sanity/image-url
// (the named `createImageUrlBuilder` export only exists in 2.x, and this
// project also pulls in a nested 1.x copy via the `sanity` package itself,
// so default import is the version-safe choice).
const builder = imageUrlBuilder({ projectId, dataset });

export function urlFor(source: Image) {
  return builder.image(source);
}