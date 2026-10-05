import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { ServiceDetail } from '@/components/services/ServiceDetail';
import { isServiceSlug, serviceSlugs } from '@/content/service-pages';
import { getServiceMetadata } from '@/lib/service-metadata';

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return serviceSlugs.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  return isServiceSlug(slug) ? getServiceMetadata('en', slug) : {};
}

export default async function ServicePage({ params }: Props) {
  const { slug } = await params;
  if (!isServiceSlug(slug)) notFound();
  return <ServiceDetail locale="en" slug={slug} />;
}
