import { NextResponse, NextRequest } from 'next/server';
import acceptLanguage from 'accept-language';
import { fallbackLng, languages, cookieName } from './app/i18n/settings';

acceptLanguage.languages(languages);

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|assets|favicon.ico|sw.js|site.webmanifest).*)'],
};

export function middleware(req: NextRequest) {
  const staticFileRegex = new RegExp(
    `^/(${languages.join('|')})/(.*\\.(png|jpg|jpeg|svg|gif|webp|ico))$`
  );
  const match = req.nextUrl.pathname.match(staticFileRegex);

  if (match) {
    const newPath = `/${match[2]}`;
    return NextResponse.rewrite(new URL(newPath + req.nextUrl.search, req.url));
  }

  if (req.nextUrl.pathname.includes('icon') || req.nextUrl.pathname.includes('chrome')) {
    return NextResponse.next();
  }

  let lng: string | undefined;
  const cookie = req.cookies.get(cookieName);
  if (cookie) {
    const cookieLng = acceptLanguage.get(cookie.value);
    if (cookieLng) {
      lng = cookieLng;
    }
  }
  if (!lng) {
    const acceptLang = req.headers.get('Accept-Language');
    if (acceptLang) {
      lng = acceptLanguage.get(acceptLang) ?? undefined;
    }
  }
  if (!lng) {
    lng = fallbackLng;
  }


  if (
    !languages.some((loc) => req.nextUrl.pathname.startsWith(`/${loc}`)) &&
    !req.nextUrl.pathname.startsWith('/_next')
  ) {
    return NextResponse.redirect(
      new URL(`/${lng}${req.nextUrl.pathname}${req.nextUrl.search}`, req.url)
    );
  }


  if (req.headers.has('referer')) {
    const referer = req.headers.get('referer');
    if (referer) {
      const refererUrl = new URL(referer);
      const lngInReferer = languages.find((l) => refererUrl.pathname.startsWith(`/${l}`));
      const response = NextResponse.next();
      if (lngInReferer) {
        response.cookies.set(cookieName, lngInReferer);
      }
      return response;
    }
  }

  return NextResponse.next();
}
