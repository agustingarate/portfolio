import type { IconName } from '@/content/portfolio.types';

type IconProps = {
  name: IconName;
  size?: number;
  className?: string;
  decorative?: boolean;
};

const paths: Record<IconName, React.ReactNode> = {
  'arrow-right': (
    <>
      <path d="M5 12h14" />
      <path d="m13 6 6 6-6 6" />
    </>
  ),
  automation: (
    <>
      <path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83" />
      <circle cx="12" cy="12" r="3" />
    </>
  ),
  backend: (
    <>
      <ellipse cx="12" cy="5" rx="8" ry="3" />
      <path d="M4 5v7c0 1.7 3.6 3 8 3s8-1.3 8-3V5M4 12v7c0 1.7 3.6 3 8 3s8-1.3 8-3v-7" />
    </>
  ),
  check: <path d="m5 12 4.5 4.5L19 7" />,
  cloud: (
    <path d="M17.5 19H6a4 4 0 0 1-.5-7.97A6.5 6.5 0 0 1 18 9.5h.5a4.75 4.75 0 0 1-1 9.5Z" />
  ),
  code: (
    <>
      <path d="m8 9-3 3 3 3M16 9l3 3-3 3M14 5l-4 14" />
    </>
  ),
  copy: (
    <>
      <rect x="8" y="8" width="12" height="12" rx="2" />
      <path d="M16 8V6a2 2 0 0 0-2-2H6a2 2 0 0 0-2 2v8a2 2 0 0 0 2 2h2" />
    </>
  ),
  download: (
    <>
      <path d="M12 3v12M7 10l5 5 5-5" />
      <path d="M5 21h14" />
    </>
  ),
  'external-link': (
    <>
      <path d="M14 4h6v6" />
      <path d="m20 4-9 9" />
      <path d="M18 13v5a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h5" />
    </>
  ),
  frontend: (
    <>
      <rect x="3" y="4" width="18" height="16" rx="2" />
      <path d="M3 9h18M8 9v11" />
    </>
  ),
  figma: (
    <>
      <path d="M8.5 2H12v7H8.5a3.5 3.5 0 1 1 0-7Z" />
      <path d="M12 2h3.5a3.5 3.5 0 1 1 0 7H12V2Z" />
      <path d="M8.5 9H12v7H8.5a3.5 3.5 0 1 1 0-7Z" />
      <circle cx="15.5" cy="12.5" r="3.5" />
      <path d="M8.5 16H12v3.5A3.5 3.5 0 1 1 8.5 16Z" />
    </>
  ),
  flutter: (
    <>
      <path
        d="M14.5 2H21L8.15 14.85 4.9 11.6 14.5 2Z"
        fill="currentColor"
        stroke="none"
      />
      <path
        d="m11.35 15.15 3.25-3.25H21l-6.4 6.4-3.25-3.15Z"
        fill="currentColor"
        stroke="none"
      />
      <path
        d="m8.15 18.35 3.2-3.2 6.5 6.45h-6.5l-3.2-3.25Z"
        fill="currentColor"
        stroke="none"
        opacity=".68"
      />
    </>
  ),
  github: (
    <>
      <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3.3-.4 6.8-1.6 6.8-7A5.5 5.5 0 0 0 19.3 4 5.1 5.1 0 0 0 19.1.5S17.9.1 15 2a13.4 13.4 0 0 0-7 0C5.1.1 3.9.5 3.9.5A5.1 5.1 0 0 0 3.7 4a5.5 5.5 0 0 0-1.5 3.8c0 5.4 3.5 6.6 6.8 7A4.8 4.8 0 0 0 8 18v4" />
      <path d="M8 19c-3 .9-3-1.5-4-2" />
    </>
  ),
  home: (
    <>
      <path d="m3 11 9-8 9 8" />
      <path d="M5 10v11h14V10M9 21v-7h6v7" />
    </>
  ),
  layers: (
    <>
      <path d="m12 2 9 5-9 5-9-5 9-5Z" />
      <path d="m3 12 9 5 9-5M3 17l9 5 9-5" />
    </>
  ),
  linkedin: (
    <>
      <rect x="3" y="9" width="4" height="12" />
      <path d="M5 3.5a2 2 0 1 0 0 4 2 2 0 0 0 0-4ZM11 21V9h4v2c1-3 6-3 6 2v8h-4v-7c0-2-2-2-2 0v7Z" />
    </>
  ),
  location: (
    <>
      <path d="M20 10c0 5-8 12-8 12S4 15 4 10a8 8 0 1 1 16 0Z" />
      <circle cx="12" cy="10" r="2.5" />
    </>
  ),
  mail: (
    <>
      <rect x="3" y="5" width="18" height="14" rx="2" />
      <path d="m3 7 9 6 9-6" />
    </>
  ),
  mobile: (
    <>
      <rect x="7" y="2" width="10" height="20" rx="2" />
      <path d="M11 18h2" />
    </>
  ),
  nodejs: (
    <>
      <path d="m12 2 8.5 5v10L12 22l-8.5-5V7L12 2Z" />
      <path d="M8 16V8l8 8V8" />
    </>
  ),
  python: (
    <>
      <path d="M12 3H8.5A3.5 3.5 0 0 0 5 6.5V10h7a2 2 0 0 1 2 2v1" />
      <path d="M12 21h3.5a3.5 3.5 0 0 0 3.5-3.5V14h-7a2 2 0 0 1-2-2v-1" />
      <circle cx="9" cy="6.5" r=".75" fill="currentColor" stroke="none" />
      <circle cx="15" cy="17.5" r=".75" fill="currentColor" stroke="none" />
    </>
  ),
  react: (
    <>
      <ellipse cx="12" cy="12" rx="10" ry="4" />
      <ellipse cx="12" cy="12" rx="10" ry="4" transform="rotate(60 12 12)" />
      <ellipse cx="12" cy="12" rx="10" ry="4" transform="rotate(120 12 12)" />
      <circle cx="12" cy="12" r="1.5" fill="currentColor" stroke="none" />
    </>
  ),
  'react-native': (
    <>
      <rect x="6.5" y="1.5" width="11" height="21" rx="2.5" />
      <g fill="currentColor" stroke="none">
        <ellipse cx="12" cy="12" rx="4.15" ry="1.15" />
        <ellipse
          cx="12"
          cy="12"
          rx="4.15"
          ry="1.15"
          transform="rotate(60 12 12)"
        />
        <ellipse
          cx="12"
          cy="12"
          rx="4.15"
          ry="1.15"
          transform="rotate(120 12 12)"
        />
      </g>
    </>
  ),
  expo: (
    <>
      <circle cx="12" cy="12" r="9.5" />
      <path d="M6.5 16.5 10.7 8c.6-1.2 2-1.2 2.6 0l4.2 8.5" />
      <path d="m9 13 3-5 3 5" />
    </>
  ),
  person: (
    <>
      <circle cx="10" cy="8" r="4" />
      <path d="M3 21a7 7 0 0 1 14 0M18 11l4 4M22 11l-4 4" />
    </>
  ),
  rocket: (
    <>
      <path d="M14 4c3-2 5-2 7-2 0 2 0 4-2 7l-5 5-4-4 4-6Z" />
      <path d="m9 11-4 1-3 3 6 1M13 15l-1 4-3 3-1-6M5 19l-2 2" />
      <circle cx="17" cy="6" r="1" />
    </>
  ),
  services: (
    <>
      <path d="M14.7 6.3a4 4 0 0 0-5 5L3 18l3 3 6.7-6.7a4 4 0 0 0 5-5l-3 3-3-3 3-3Z" />
    </>
  ),
  school: (
    <>
      <path d="m2 9 10-5 10 5-10 5L2 9Z" />
      <path d="M6 11.2V16c2.8 2.7 9.2 2.7 12 0v-4.8M22 9v6" />
    </>
  ),
  sparkles: (
    <>
      <path d="m12 3-1.2 3.8L7 8l3.8 1.2L12 13l1.2-3.8L17 8l-3.8-1.2L12 3ZM5 14l-.8 2.2L2 17l2.2.8L5 20l.8-2.2L8 17l-2.2-.8L5 14ZM19 13l-.6 1.4L17 15l1.4.6L19 17l.6-1.4L21 15l-1.4-.6L19 13Z" />
    </>
  ),
  swift: (
    <>
      <path d="M4 4c4.5 5 8.5 7.3 12 8-2.4-1.7-4.5-4-6-7 4 3.4 7.5 5.3 10 6.2" />
      <path d="M20 11.2c1.3 2.7.5 6.2-1.6 7.6-2.2 1.5-4.8-.3-6.8-.3-2.3 0-3.9 1.3-7.6-.5 3.8.3 6.3-1.2 8-2.5-3.4-.3-6.5-2.1-8.5-4.6 3.6 2.3 7.3 3.5 10.4 3.3" />
    </>
  ),
  tailwind: (
    <>
      <path d="M3 10c2.4-3.2 4.8-4.8 7.2-4.8 3.6 0 4.1 2.7 5.9 3.2 1.2.3 2.3-.5 3.4-2.4-2.4 3.2-4.8 4.8-7.2 4.8-3.6 0-4.1-2.7-5.9-3.2C5.2 7.3 4.1 8.1 3 10Z" />
      <path d="M3 18c2.4-3.2 4.8-4.8 7.2-4.8 3.6 0 4.1 2.7 5.9 3.2 1.2.3 2.3-.5 3.4-2.4-2.4 3.2-4.8 4.8-7.2 4.8-3.6 0-4.1-2.7-5.9-3.2-1.2-.3-2.3.5-3.4 2.4Z" />
    </>
  ),
  twitter: (
    <path
      d="M18.901 1.153h3.68l-8.037 9.185L24 22.846h-7.406l-5.8-7.584-6.638 7.584H.474l8.6-9.83L0 1.154h7.594l5.243 6.932 6.064-6.933Zm-1.29 19.461h2.039L6.486 3.241H4.298L17.61 20.614Z"
      fill="currentColor"
      stroke="none"
    />
  ),
  utn: (
    <path
      d="m246.6 0h102v190.8c80.8-22.4 140.4-96.7 140.4-184.4h106.3c0 146.5-106.8 268.9-246.6 293.2v4.4h233.9v104.2h-214.4c130 31.8 227 149.5 227 289.1h-106.2c0-87.7-59.6-162-140.3-184.4v186.5h-102v-186.5c-80.7 22.4-140.3 96.7-140.3 184.4h-106.4c0-139.6 97-257.3 227-289.1h-214.2v-104.2h233.9v-4.4c-139.9-24.3-246.7-146.7-246.7-293.2h106.3c0 87.7 59.6 162 140.3 184.4z"
      fill="currentColor"
      stroke="none"
      transform="matrix(.0343 0 0 .0343 1.79 0)"
    />
  ),
  web: (
    <>
      <circle cx="12" cy="12" r="9" />
      <path d="M3 12h18M12 3a14 14 0 0 1 0 18M12 3a14 14 0 0 0 0 18" />
    </>
  ),
  work: (
    <>
      <rect x="3" y="7" width="18" height="13" rx="2" />
      <path d="M9 7V4h6v3M3 12h18M10 12v2h4v-2" />
    </>
  ),
};

export function Icon({
  name,
  size = 24,
  className,
  decorative = true,
}: IconProps) {
  return (
    <svg
      className={className}
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.75"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden={decorative || undefined}
      role={decorative ? undefined : 'img'}
    >
      {paths[name]}
    </svg>
  );
}
