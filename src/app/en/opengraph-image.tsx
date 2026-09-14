import { ImageResponse } from 'next/og';

export const alt = 'Agustin Garate — Software Developer';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

export default function EnglishOpenGraphImage() {
  return new ImageResponse(
    <div
      style={{
        background: '#fbfaee',
        color: '#1c1c1a',
        display: 'flex',
        flexDirection: 'column',
        height: '100%',
        justifyContent: 'space-between',
        padding: '76px',
        position: 'relative',
        width: '100%',
      }}
    >
      <div
        style={{
          background: '#e4f1d4',
          borderRadius: '999px',
          height: '440px',
          position: 'absolute',
          right: '-120px',
          top: '-145px',
          width: '440px',
        }}
      />
      <div
        style={{
          color: '#4a5c34',
          display: 'flex',
          fontSize: 28,
          fontWeight: 700,
          letterSpacing: 2,
          textTransform: 'uppercase',
        }}
      >
        Software Developer
      </div>
      <div
        style={{ display: 'flex', flexDirection: 'column', maxWidth: '850px' }}
      >
        <div
          style={{
            display: 'flex',
            fontSize: 82,
            fontWeight: 800,
            lineHeight: 1,
          }}
        >
          Agustin Garate
        </div>
        <div
          style={{
            display: 'flex',
            fontSize: 37,
            lineHeight: 1.25,
            marginTop: 28,
          }}
        >
          Modern, scalable digital products designed around people.
        </div>
      </div>
      <div
        style={{
          color: '#4a5c34',
          display: 'flex',
          fontSize: 28,
          fontWeight: 600,
        }}
      >
        Mobile · Web · AI · Automation
      </div>
    </div>,
    size,
  );
}
