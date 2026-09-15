import Script from 'next/script';
import { Suspense } from 'react';
import { PointerGlow } from '@/components/organisms/PointerGlow';
import { SiteNavigation } from '@/components/organisms/SiteNavigation';
import { HeroSection } from '@/components/organisms/HeroSection';
import { ContactChips } from '@/components/molecules/ContactChips';
import { AboutSection } from '@/components/organisms/AboutSection';
import { ExperienceSection } from '@/components/organisms/ExperienceSection';
import { EducationTimeline } from '@/components/organisms/EducationTimeline';
import { ServicesSection } from '@/components/organisms/ServicesSection';
import { ProjectLifecycle } from '@/components/organisms/ProjectLifecycle';
import { StackSection } from '@/components/organisms/StackSection';
import { ContactSection } from '@/components/organisms/ContactSection';
import { SiteFooter } from '@/components/organisms/SiteFooter';
import { getLocaleContent, localePath, type Locale } from '@/lib/i18n';

export function PortfolioPage({ locale }: { locale: Locale }) {
  const content = getLocaleContent(locale);
  const siteUrl = content.metadata.siteUrl;
  const pageUrl = `${siteUrl}${localePath(locale)}`;
  const personId = `${siteUrl}/#person`;
  const linkedIn = content.socials.find((social) => social.icon === 'linkedin');
  const structuredData = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'Person',
        '@id': personId,
        name: content.identity.name,
        url: siteUrl,
        image: `${siteUrl}/opengraph-image`,
        jobTitle:
          locale === 'en' ? 'Software Engineer' : 'Ingeniero de software',
        description: content.metadata.description,
        sameAs: content.socials
          .filter((social) => social.href.startsWith('https://'))
          .map((social) => social.href),
      },
      {
        '@type': 'WebSite',
        '@id': `${siteUrl}/#website`,
        url: siteUrl,
        name: content.identity.name,
        inLanguage: locale,
        publisher: { '@id': personId },
      },
      {
        '@type': 'WebPage',
        '@id': `${pageUrl}#webpage`,
        url: pageUrl,
        name: content.metadata.title,
        description: content.metadata.description,
        inLanguage: locale,
        mainEntity: { '@id': personId },
        isPartOf: { '@id': `${siteUrl}/#website` },
      },
      ...content.services.items.map((service, index) => ({
        '@type': 'Service',
        '@id': `${pageUrl}#service-${index + 1}`,
        name: service.title,
        description: service.description,
        provider: { '@id': personId },
        availableLanguage: locale,
      })),
    ],
  };

  return (
    <>
      <Script id={`structured-data-${locale}`} type="application/ld+json">
        {JSON.stringify(structuredData).replace(/</g, '\\u003c')}
      </Script>
      <PointerGlow />
      <Suspense fallback={null}>
        <SiteNavigation
          name={content.identity.name}
          items={content.navigation}
          locale={locale}
          labels={content.ui.navigation}
        />
      </Suspense>
      <main className="page-shell">
        <HeroSection {...content.hero} labels={content.ui.hero} />
        <ContactChips
          items={[
            {
              label: content.contact.email,
              value: content.contact.email,
              href: `mailto:${content.contact.email}`,
              icon: 'mail',
            },
            {
              label: 'LinkedIn',
              value: linkedIn?.href ?? '',
              href: linkedIn?.href ?? '#contacto',
              icon: 'linkedin',
              external: true,
            },
          ]}
          labels={content.ui.contactChips}
        />
        <AboutSection {...content.about} />
        <ExperienceSection
          {...content.experience}
          newTabLabel={content.ui.experience.newTab}
        />
        <EducationTimeline {...content.education} />
        <ServicesSection {...content.services}>
          <ProjectLifecycle
            {...content.lifecycle}
            todayLabel={content.ui.lifecycle.today}
          />
        </ServicesSection>
        <StackSection
          {...content.stack}
          ariaLabel={content.ui.stack.featuredTechnologies}
        />
        <ContactSection
          {...content.contact}
          socials={content.socials}
          labels={content.ui.contactForm}
          locale={locale}
        />
      </main>
      <SiteFooter
        name={content.identity.name}
        socials={content.socials}
        copyright={content.footer.copyright}
        shareLabels={content.ui.share}
      />
    </>
  );
}
