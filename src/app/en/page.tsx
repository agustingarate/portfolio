import { PortfolioPage } from '@/app/_components/PortfolioPage';
import { createLocaleMetadata } from '@/lib/metadata';

export const metadata = createLocaleMetadata('en');

export default function EnglishHomePage() {
  return <PortfolioPage locale="en" />;
}
