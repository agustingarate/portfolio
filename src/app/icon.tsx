import { ImageResponse } from 'next/og';

export const size = { width: 32, height: 32 };
export const contentType = 'image/png';

export default function Icon() {
  return new ImageResponse(
    <div
      style={{
        alignItems: 'center',
        background: '#3300e0',
        borderRadius: '9px',
        color: '#fbfaee',
        display: 'flex',
        fontFamily: 'sans-serif',
        fontSize: 14,
        fontWeight: 800,
        height: '100%',
        justifyContent: 'center',
        letterSpacing: -1.5,
        width: '100%',
      }}
    >
      AG
    </div>,
    size,
  );
}
