import { ImageResponse } from 'next/og';
import { portfolioContent } from '@/content/portfolio';

export const alt = 'Agustin Garate — Software Developer';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

export default function OpenGraphImage() {
  return new ImageResponse(
    <div
      style={{
        background: '#fbfaee',
        color: '#1c1c1a',
        display: 'flex',
        flexDirection: 'column',
        height: '100%',
        justifyContent: 'center',
        overflow: 'hidden',
        padding: '72px 84px',
        position: 'relative',
        width: '100%',
      }}
    >
      <div
        style={{ display: 'flex', flexDirection: 'column', maxWidth: '920px' }}
      >
        <div
          style={{
            color: '#3300e0',
            display: 'flex',
            fontSize: 25,
            fontWeight: 700,
            letterSpacing: '-0.3px',
            marginBottom: '30px',
          }}
        >
          {portfolioContent.identity.name}
        </div>
        <div
          style={{
            display: 'flex',
            fontSize: 78,
            fontWeight: 600,
            letterSpacing: '-3.1px',
            lineHeight: 0.98,
          }}
        >
          Hola, soy Agus.
        </div>
        <div
          style={{
            display: 'flex',
            fontSize: 32,
            lineHeight: 1.24,
            marginTop: '28px',
          }}
        >
          Construyo productos digitales modernos y escalables para las personas.
        </div>
        <div
          style={{
            color: '#464557',
            display: 'flex',
            fontSize: 23,
            marginTop: '38px',
          }}
        >
          Ingeniero de software · Mobile, web e IA
        </div>
      </div>
    </div>,
    size,
  );
}
