import Script from 'next/script';
import { portfolioContent as content } from '@/content/portfolio';
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

const siteUrl = content.metadata.siteUrl;
const personId = `${siteUrl}/#person`;

const structuredData = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'Person',
      '@id': personId,
      name: content.identity.name,
      url: siteUrl,
      image: `${siteUrl}/opengraph-image`,
      jobTitle: 'Ingeniero de software',
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
      inLanguage: 'es',
      publisher: { '@id': personId },
    },
    {
      '@type': 'WebPage',
      '@id': `${siteUrl}/#webpage`,
      url: siteUrl,
      name: content.metadata.title,
      description: content.metadata.description,
      inLanguage: 'es',
      mainEntity: { '@id': personId },
      isPartOf: { '@id': `${siteUrl}/#website` },
    },
    ...content.services.items.map((service, index) => ({
      '@type': 'Service',
      '@id': `${siteUrl}/#service-${index + 1}`,
      name: service.title,
      description: service.description,
      provider: { '@id': personId },
      availableLanguage: 'es',
    })),
  ],
};

export default function HomePage() {
  const linkedIn = content.socials.find((social) => social.icon === 'linkedin');
  // const twitter = content.socials.find((social) => social.icon === 'twitter');

  return (
    <>
      <Script id="structured-data" type="application/ld+json">
        {JSON.stringify(structuredData).replace(/</g, '\\u003c')}
      </Script>
      <PointerGlow />
      <SiteNavigation name={content.identity.name} items={content.navigation} />
      <main className="page-shell">
        <HeroSection {...content.hero} />
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
            // {
            //   label: twitter?.label ?? '@garate__',
            //   value: twitter?.label ?? '@garate__',
            //   href: twitter?.href ?? '#contacto',
            //   icon: 'twitter',
            //   external: true,
            // },
          ]}
        />
        <AboutSection {...content.about} />
        <ExperienceSection {...content.experience} />
        <EducationTimeline {...content.education} />
        <ServicesSection {...content.services}>
          <ProjectLifecycle {...content.lifecycle} />
        </ServicesSection>
        <StackSection {...content.stack} />
        <ContactSection {...content.contact} socials={content.socials} />
      </main>
      <SiteFooter
        name={content.identity.name}
        socials={content.socials}
        copyright={content.footer.copyright}
      />
    </>
  );
}
