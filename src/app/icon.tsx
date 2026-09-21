import { ImageResponse } from 'next/og';

// Google Search recommends a square favicon whose dimensions are a multiple of
// 48px. Rendering the actual mark also avoids the generic text-only fallback.
export const size = { width: 48, height: 48 };
export const contentType = 'image/png';

export default function Icon() {
  return new ImageResponse(
    <svg
      height="48"
      viewBox="0 0 64 64"
      width="48"
      xmlns="http://www.w3.org/2000/svg"
    >
      <rect fill="#3300e0" height="60" rx="18" width="60" x="2" y="2" />
      <path
        d="M7.5 45 17.8 18h4.8l10.3 27h-5.5l-2.1-6H15.1L13 45H7.5Zm9.2-10.7h7l-3.5-10.2-3.5 10.2Z"
        fill="#fbfaee"
      />
      <path
        d="M55 25c-1.8-4-5.1-6.2-9.5-6.2-6.8 0-11.8 5.4-11.8 12.8s5 12.9 12.1 12.9c3.8 0 6.7-1.1 9.2-3.4v-9h-9.2"
        fill="none"
        stroke="#fbfaee"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="5"
      />
    </svg>,
    size,
  );
}
