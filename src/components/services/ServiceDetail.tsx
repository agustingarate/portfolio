import { Suspense } from 'react';
import { Container } from '@/components/atoms/Container';
import { Icon } from '@/components/atoms/Icon';
import { SiteNavigation } from '@/components/organisms/SiteNavigation';
import { SiteFooter } from '@/components/organisms/SiteFooter';
import { getLocaleContent, localePath, type Locale } from '@/lib/i18n';
import {
  servicePages,
  servicePath,
  serviceSlugs,
  type ServiceSlug,
} from '@/content/service-pages';
import styles from './ServiceDetail.module.css';

export function ServiceDetail({
  locale,
  slug,
}: {
  locale: Locale;
  slug: ServiceSlug;
}) {
  const content = getLocaleContent(locale);
  const service = servicePages[locale][slug];
  const index = serviceSlugs.indexOf(slug);
  const nextSlug = serviceSlugs[(index + 1) % serviceSlugs.length];
  const next = servicePages[locale][nextSlug];
  const isEn = locale === 'en';
  const base = localePath(locale);
  const url = `${content.metadata.siteUrl}${servicePath(locale, slug)}`;
  const data = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'WebPage',
        '@id': `${url}#webpage`,
        url,
        name: service.seoTitle,
        description: service.description,
        inLanguage: locale,
        isPartOf: { '@id': `${content.metadata.siteUrl}/#website` },
        about: { '@id': `${url}#service` },
        breadcrumb: { '@id': `${url}#breadcrumb` },
      },
      {
        '@type': 'Service',
        '@id': `${url}#service`,
        name: service.title,
        serviceType: service.title,
        description: service.description,
        url,
        provider: { '@id': `${content.metadata.siteUrl}/#person` },
        availableLanguage: locale,
        mainEntityOfPage: { '@id': `${url}#webpage` },
      },
      {
        '@type': 'BreadcrumbList',
        '@id': `${url}#breadcrumb`,
        itemListElement: [
          {
            '@type': 'ListItem',
            position: 1,
            name: isEn ? 'Home' : 'Inicio',
            item: `${content.metadata.siteUrl}${base}`,
          },
          {
            '@type': 'ListItem',
            position: 2,
            name: isEn ? 'Services' : 'Servicios',
            item: `${content.metadata.siteUrl}${base}#servicios`,
          },
          { '@type': 'ListItem', position: 3, name: service.title, item: url },
        ],
      },
      {
        '@type': 'FAQPage',
        '@id': `${url}#faq`,
        mainEntity: service.faqs.map(({ question, answer }) => ({
          '@type': 'Question',
          name: question,
          acceptedAnswer: { '@type': 'Answer', text: answer },
        })),
      },
    ],
  };

  return (
    <div className={styles.page} data-service={slug}>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(data).replace(/</g, '\\u003c'),
        }}
      />
      <a className={styles.skip} href="#contenido-principal">
        {isEn ? 'Skip to content' : 'Saltar al contenido'}
      </a>
      <Suspense fallback={null}>
        <SiteNavigation
          name={content.identity.name}
          items={content.navigation}
          locale={locale}
          labels={content.ui.navigation}
          enableImmersive={false}
        />
      </Suspense>
      <main id="contenido-principal">
        <Container>
          <nav
            className={styles.breadcrumb}
            aria-label={isEn ? 'Breadcrumb' : 'Ruta de navegación'}
          >
            <a href={base}>{isEn ? 'Home' : 'Inicio'}</a>
            <span aria-hidden="true">/</span>
            <a href={`${base}#servicios`}>{isEn ? 'Services' : 'Servicios'}</a>
            <span aria-hidden="true">/</span>
            <span aria-current="page">{service.title}</span>
          </nav>
          <header className={styles.hero}>
            <div className={styles.heroCopy}>
              <h1>{service.title}</h1>
              <p className={styles.lead}>{service.lead}</p>
              <p className={styles.intro}>{service.outcome}</p>
              <a className={styles.primaryLink} href={`${base}#contacto`}>
                {isEn
                  ? 'Let’s discuss your project'
                  : 'Hablemos de tu proyecto'}{' '}
                <Icon name="arrow-right" size={19} />
              </a>
            </div>
            <ServiceIllustration labels={service.visual} slug={slug} />
          </header>
          <div className={styles.audience}>
            <span>{isEn ? 'A good fit for' : 'Pensado para'}</span>
            <p>{service.audience}</p>
          </div>
          <section className={styles.capabilities} aria-labelledby="incluye">
            <h2 id="incluye">
              {isEn ? 'What this work includes' : 'Qué incluye este trabajo'}
            </h2>
            <div className={styles.capabilityList}>
              {service.capabilities.map((item) => (
                <article key={item.title} className={styles.capability}>
                  <h3>{item.title}</h3>
                  <p>{item.text}</p>
                </article>
              ))}
            </div>
          </section>
          <section className={styles.approach} aria-labelledby="proceso">
            <div>
              <h2 id="proceso">
                {isEn
                  ? 'From idea to useful product'
                  : 'De la idea a una solución útil'}
              </h2>
              <p>
                {isEn
                  ? 'I adapt the scope and pace to each project. I first identify who will use the product and what they need to do, then design, build, and test around those needs.'
                  : 'Adapto el alcance y el ritmo a cada proyecto. Primero identifico quiénes usarán el producto y qué necesitan hacer; después diseño, desarrollo y pruebo en función de esas necesidades.'}
              </p>
            </div>
            <ol>
              {service.approach.map((item) => (
                <li key={item.title}>
                  <h3>{item.title}</h3>
                  <p>{item.text}</p>
                </li>
              ))}
            </ol>
          </section>
          <section className={styles.faq} aria-labelledby="preguntas">
            <h2 id="preguntas">
              {isEn ? 'Common questions' : 'Preguntas frecuentes'}
            </h2>
            <div>
              {service.faqs.map((item) => (
                <article key={item.question}>
                  <h3>{item.question}</h3>
                  <p>{item.answer}</p>
                </article>
              ))}
            </div>
          </section>
          <div className={styles.bottomNav}>
            <a href={`${base}#contacto`} className={styles.contactLink}>
              {isEn ? 'Tell me about your idea' : 'Contame tu idea'}{' '}
              <Icon name="arrow-right" size={22} />
            </a>
            <a href={servicePath(locale, nextSlug)} className={styles.nextLink}>
              <span>
                {isEn ? 'Explore another service' : 'Explorá otro servicio'}
              </span>
              <strong>{next.title}</strong>
            </a>
          </div>
        </Container>
      </main>
      <SiteFooter
        name={content.identity.name}
        socials={content.socials}
        copyright={content.footer.copyright}
        shareLabels={content.ui.share}
        homeHref={base}
        locale={locale}
      />
    </div>
  );
}

function ServiceIllustration({
  labels,
  slug,
}: {
  labels: [string, string, string];
  slug: ServiceSlug;
}) {
  const paper = 'var(--background)';
  const ink = 'var(--ink)';
  const accent = 'var(--accent)';
  const muted = 'var(--surface-dim)';
  const line = 'var(--on-surface)';
  const rules = (x: number, y: number, width: number, count: number) =>
    Array.from({ length: count }, (_, i) => (
      <path
        key={i}
        d={`M${x} ${y + i * 14}h${i === count - 1 ? width * 0.65 : width}`}
      />
    ));
  const chrome = (x: number, y: number, width: number) => (
    <g>
      <path d={`M${x} ${y + 30}h${width}`} />
      {[12, 22, 32].map((offset) => (
        <circle
          key={offset}
          cx={x + offset}
          cy={y + 15}
          r="2"
          fill={line}
          stroke="none"
        />
      ))}
      <path d={`M${x + width - 24} ${y + 15}h12`} />
    </g>
  );

  return (
    <div className={styles.illustration} data-visual={slug} aria-hidden="true">
      <svg
        className={styles.serviceDrawing}
        viewBox="0 0 500 470"
        fill="none"
        stroke={line}
        strokeWidth="1.4"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        {slug === 'aplicaciones-moviles' && (
          <>
            <path d="M42 177H458M42 315H458" stroke={muted} />
            <rect
              x="54"
              y="103"
              width="164"
              height="300"
              rx="25"
              fill={paper}
            />
            <rect
              x="64"
              y="113"
              width="144"
              height="280"
              rx="18"
              fill={accent}
              stroke="none"
            />
            <path d="M116 124h40M75 154h38M75 163h62" />
            <rect
              x="78"
              y="185"
              width="116"
              height="105"
              rx="6"
              fill={paper}
              stroke="none"
            />
            <path d="M100 237l19 19 42-42" stroke={ink} strokeWidth="5" />
            {rules(80, 310, 102, 3)}
            <rect
              x="244"
              y="44"
              width="202"
              height="360"
              rx="31"
              fill={ink}
              stroke="none"
            />
            <rect
              x="253"
              y="53"
              width="184"
              height="342"
              rx="23"
              fill={paper}
              stroke="none"
            />
            <rect
              x="316"
              y="62"
              width="58"
              height="7"
              rx="3.5"
              fill={line}
              stroke="none"
            />
            <path d="M273 102h64M273 117h101" strokeWidth="5" />
            <rect
              x="271"
              y="144"
              width="148"
              height="123"
              rx="7"
              fill={ink}
              stroke="none"
            />
            <circle cx="345" cy="205" r="36" stroke={paper} />
            <path d="M327 205h36m-18-18v36" stroke={paper} strokeWidth="2" />
            {[287, 324].map((y) => (
              <g key={y}>
                <circle
                  cx="282"
                  cy={y + 5}
                  r="10"
                  fill={accent}
                  stroke="none"
                />
                <path d={`M305 ${y}h101m-101 10h62`} />
              </g>
            ))}
            <path d="M272 361h146M330 382h30" />
          </>
        )}
        {slug === 'paginas-web' && (
          <>
            <rect x="35" y="70" width="406" height="300" rx="9" fill={paper} />
            {chrome(35, 70, 406)}
            <path d="M58 121h32m190 0h30m15 0h30m15 0h30" />
            <rect
              x="58"
              y="147"
              width="360"
              height="145"
              fill={accent}
              stroke="none"
            />
            <path d="M78 173h112m-112 17h84" strokeWidth="8" />
            {rules(78, 216, 115, 3)}
            <rect
              x="78"
              y="261"
              width="68"
              height="13"
              rx="6.5"
              fill={ink}
              stroke="none"
            />
            <path
              d="M291 168v103m-39-64h78m-78 39h103"
              stroke={ink}
              strokeWidth="19"
            />
            {rules(58, 317, 125, 3)}
            {rules(218, 317, 100, 3)}
            <rect
              x="350"
              y="247"
              width="111"
              height="165"
              rx="13"
              fill={ink}
              stroke="none"
            />
            <rect
              x="357"
              y="254"
              width="97"
              height="151"
              rx="8"
              fill={paper}
              stroke="none"
            />
            <path d="M390 262h30M369 283h70" />
            <rect
              x="369"
              y="297"
              width="73"
              height="47"
              fill={accent}
              stroke="none"
            />
            {rules(369, 358, 70, 2)}
            <rect
              x="369"
              y="385"
              width="35"
              height="7"
              rx="3.5"
              fill={ink}
              stroke="none"
            />
          </>
        )}
        {slug === 'ecommerce' && (
          <>
            <rect x="33" y="60" width="328" height="322" rx="9" fill={paper} />
            {chrome(33, 60, 328)}
            <path d="M54 112h104m115 0h65" strokeWidth="4" />
            {[54, 152, 250].map((x, i) => (
              <g key={x}>
                <rect
                  x={x}
                  y="141"
                  width="87"
                  height="115"
                  fill={i === 1 ? accent : 'var(--surface-container)'}
                  stroke="none"
                />
                <rect
                  x={x + 23}
                  y="180"
                  width="41"
                  height="47"
                  rx="2"
                  fill={paper}
                />
                <path
                  d={`M${x + 33} 180v-10a10 10 0 0 1 20 0v10M${x} 277h64m-64 13h38`}
                />
                <rect
                  x={x}
                  y="309"
                  width="87"
                  height="47"
                  fill={i === 1 ? 'var(--surface-container)' : accent}
                  stroke="none"
                />
              </g>
            ))}
            <rect
              x="268"
              y="222"
              width="197"
              height="187"
              rx="10"
              fill={ink}
              stroke="none"
            />
            <path d="M288 247h86" stroke={paper} strokeWidth="5" />
            <rect
              x="288"
              y="267"
              width="37"
              height="42"
              rx="3"
              fill={accent}
              stroke="none"
            />
            <path d="M339 277h105m-105 14h69M288 330h157" stroke={paper} />
            <rect
              x="288"
              y="348"
              width="157"
              height="39"
              rx="5"
              fill={paper}
              stroke="none"
            />
            <path d="M351 368l9 9 17-19" stroke={ink} strokeWidth="2.5" />
          </>
        )}
        {slug === 'sistemas-internos' && (
          <>
            <rect x="29" y="83" width="442" height="305" rx="9" fill={paper} />
            {chrome(29, 83, 442)}
            <path d="M115 113v275M115 158h356" />
            <rect
              x="40"
              y="137"
              width="63"
              height="22"
              rx="4"
              fill={ink}
              stroke="none"
            />
            <path d="M51 147h41" stroke={paper} />
            {[179, 209, 239, 269].map((y) => (
              <path key={y} d={`M51 ${y}h41`} />
            ))}
            <path d="M135 136h95m134 0h83" strokeWidth="4" />
            {[138, 242, 346].map((x, i) => (
              <g key={x}>
                <rect
                  x={x}
                  y="181"
                  width="94"
                  height="8"
                  rx="4"
                  fill={i === 1 ? ink : muted}
                  stroke="none"
                />
                {[204, 260, ...(i === 0 ? [316] : [])].map((y) => (
                  <g key={y}>
                    <rect
                      x={x}
                      y={y}
                      width="94"
                      height="44"
                      rx="4"
                      fill={i === 1 ? accent : 'var(--surface-low)'}
                      stroke="none"
                    />
                    <path d={`M${x + 10} ${y + 13}h64m-64 11h39`} />
                    <circle
                      cx={x + 79}
                      cy={y + 33}
                      r="4"
                      fill={i === 1 ? ink : muted}
                      stroke="none"
                    />
                  </g>
                ))}
              </g>
            ))}
            <path d="M186 66V48h104m128 356v59H308" stroke={ink} />
            <circle cx="290" cy="48" r="4" fill={ink} stroke="none" />
            <path d="M313 410l-5 5 5 5" stroke={ink} />
          </>
        )}
        {slug === 'automatizaciones' && (
          <>
            <path
              d="M64 90v80q0 20 20 20h82m-102 175v-80q0-20 20-20h82M334 228h75q25 0 25-25v-69M334 228h75q25 0 25 25v70"
              stroke={ink}
              strokeWidth="2"
            />
            <circle cx="64" cy="90" r="22" fill={paper} />
            <path d="M55 85h18m-18 10h13" />
            <circle cx="64" cy="365" r="22" fill={paper} />
            <path d="M55 365h18m-9-9v18" />
            <path
              d="M166 180l10 10-10 10m0 55 10 10-10 10"
              stroke={ink}
              strokeWidth="2"
            />
            <rect
              x="177"
              y="139"
              width="157"
              height="178"
              rx="12"
              fill={ink}
              stroke="none"
            />
            <path d="M208 171h95M208 286h95" stroke={paper} opacity="0.5" />
            <path
              d="M255 190l38 38-38 38-38-38z"
              stroke={paper}
              strokeWidth="2"
            />
            <path d="M244 228l8 8 16-17" stroke={paper} strokeWidth="2" />
            <rect x="404" y="76" width="60" height="58" rx="7" fill={paper} />
            <path d="M420 103l9 9 19-20" stroke={ink} strokeWidth="2" />
            <rect x="404" y="323" width="60" height="58" rx="7" fill={paper} />
            <path d="M421 344h27m-27 9h27m-27 9h17" />
            <path d="M206 355h95m-77 13h59" stroke={muted} strokeWidth="4" />
          </>
        )}
        {slug === 'desarrollo-mvp' && (
          <>
            <path
              d="M67 124h145q20 0 20 20v68M404 280v94q0 20-20 20H197"
              stroke={ink}
              strokeWidth="2"
            />
            <path d="M205 386l-8 8 8 8" stroke={ink} strokeWidth="2" />
            <rect
              x="42"
              y="70"
              width="130"
              height="179"
              rx="6"
              fill={paper}
              strokeDasharray="4 5"
            />
            <path d="M57 89h100M57 108h67M57 127h86" stroke={muted} />
            <rect x="57" y="148" width="100" height="57" stroke={muted} />
            <path d="M57 148l100 57m0-57-100 57M57 226h49" stroke={muted} />
            <rect
              x="211"
              y="148"
              width="247"
              height="180"
              rx="8"
              fill={ink}
              stroke="none"
            />
            <path d="M211 180h247" stroke={paper} opacity="0.5" />
            <circle cx="227" cy="164" r="2" fill={paper} stroke="none" />
            <path d="M229 202h89m-89 14h63" stroke={paper} strokeWidth="4" />
            <rect
              x="229"
              y="239"
              width="75"
              height="69"
              rx="3"
              fill={paper}
              stroke="none"
            />
            <rect
              x="315"
              y="239"
              width="125"
              height="69"
              rx="3"
              fill={accent}
              stroke="none"
            />
            <path d="M332 258h88m-88 13h67m-67 13h78" stroke={ink} />
            <circle cx="126" cy="374" r="43" fill={accent} stroke="none" />
            <path
              d="M107 369a20 20 0 1 1 7 23m-7-23v-13m0 13h13"
              stroke={ink}
              strokeWidth="2"
            />
          </>
        )}
      </svg>
      <div className={styles.visualLegend}>
        {labels.map((label) => (
          <span key={label}>{label}</span>
        ))}
      </div>
    </div>
  );
}
