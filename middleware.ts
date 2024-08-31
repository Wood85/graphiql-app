import acceptLanguage from 'accept-language';
import { NextResponse, type NextRequest } from 'next/server';
import { cookieName, fallbackLng, languages } from './src/app/i18n/settings';

acceptLanguage.languages(languages);

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|assets|favicon.ico|sw.js|site.webmanifest).*)'],
};

export function middleware(req: NextRequest): NextResponse<unknown> {
  let lng: string | undefined | null;
  if (req.cookies.has(cookieName)) lng = acceptLanguage.get(req.cookies.get(cookieName)?.value);
  if (lng == null) lng = acceptLanguage.get(req.headers.get('Accept-Language'));
  if (lng == null) lng = fallbackLng;

  if (
    !languages.some((loc) => req.nextUrl.pathname.startsWith(`/${loc}`)) &&
    !req.nextUrl.pathname.startsWith('/_next')
  ) {
    return NextResponse.redirect(new URL(`/${lng}${req.nextUrl.pathname}`, req.url));
  }

  if (req.headers.has('referer')) {
    const refererUrl = new URL(req.headers.get('referer') as string | URL);
    const lngInReferer = languages.find((l) => refererUrl.pathname.startsWith(`/${l}`));
    const response = NextResponse.next();
    if (lngInReferer != null) response.cookies.set(cookieName, lngInReferer);
    return response;
  }

  return NextResponse.next();
}
