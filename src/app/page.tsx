import { portfolioContent as content } from '@/content/portfolio';
import { PointerGlow } from '@/components/organisms/PointerGlow';
import { SiteNavigation } from '@/components/organisms/SiteNavigation';
import { HeroSection } from '@/components/organisms/HeroSection';
import { AboutSection } from '@/components/organisms/AboutSection';
import { ExperienceSection } from '@/components/organisms/ExperienceSection';
import { ServicesSection } from '@/components/organisms/ServicesSection';
import { ProjectLifecycle } from '@/components/organisms/ProjectLifecycle';
import { StackSection } from '@/components/organisms/StackSection';
import { ContactSection } from '@/components/organisms/ContactSection';
import { SiteFooter } from '@/components/organisms/SiteFooter';

export default function HomePage() {
  return (
    <>
      <PointerGlow />
      <SiteNavigation name={content.identity.name} items={content.navigation} />
      <main className="page-shell">
        <HeroSection {...content.hero} />
        <AboutSection {...content.about} />
        <ExperienceSection {...content.experience} />
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
