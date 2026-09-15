import { ImageResponse } from 'next/og';

export const size = { width: 180, height: 180 };
export const contentType = 'image/png';

export default function AppleIcon() {
  return new ImageResponse(
    <div
      style={{
        alignItems: 'center',
        background: '#fbfaee',
        color: '#1c1c1a',
        display: 'flex',
        fontSize: 76,
        fontWeight: 800,
        height: '100%',
        justifyContent: 'center',
        letterSpacing: -8,
        width: '100%',
      }}
    >
      AG
    </div>,
    size,
  );
}
