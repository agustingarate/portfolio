import { PortfolioPage } from '@/app/_components/PortfolioPage';
import { createLocaleMetadata } from '@/lib/metadata';

export const metadata = createLocaleMetadata('es');

export default function SpanishHomePage() {
  return <PortfolioPage locale="es" />;
}
