import { NextResponse, type NextRequest } from 'next/server';

const BOT_PATTERN =
  /bot|crawler|spider|crawling|slurp|facebookexternalhit|lighthouse/i;

function prefersEnglish(request: NextRequest) {
  const preference = request.cookies.get('locale')?.value;
  if (preference === 'en' || preference === 'es') return preference === 'en';
  if (BOT_PATTERN.test(request.headers.get('user-agent') ?? '')) return false;
  return /^en(?:[-_]|,|;|$)/i.test(
    request.headers.get('accept-language') ?? '',
  );
}

export function proxy(request: NextRequest) {
  if (request.nextUrl.pathname === '/' && prefersEnglish(request)) {
    const response = NextResponse.redirect(new URL('/en', request.url));
    response.headers.set('Vary', 'Accept-Language, Cookie');
    return response;
  }
  return NextResponse.next();
}

export const config = { matcher: '/' };
