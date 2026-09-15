import {
  createImageUrlBuilder,
  type SanityImageSource,
} from '@sanity/image-url';
import { sanityClient } from './client';

export function sanityImageUrl(source: SanityImageSource) {
  return createImageUrlBuilder(sanityClient).image(source).auto('format');
}
