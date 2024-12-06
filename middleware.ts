import { NextRequest, NextResponse } from 'next/server';
import { PATH_NAME } from './app/constants/pathName';
import { COOKIES } from './app/constants';

const publicRoutes = [PATH_NAME.LOGIN];
const privateRoutes = [PATH_NAME.HOME];

export function middleware(request: NextRequest) {
  const pathName = request.nextUrl.pathname;

  const isPublicRoute = publicRoutes.includes(pathName);
  const isPrivateRoute = privateRoutes.includes(pathName);

  const token = request.cookies.get(COOKIES.TOKEN);

  if (isPrivateRoute && !token?.value) {
    return NextResponse.redirect(new URL(PATH_NAME.LOGIN, request.nextUrl));
  }

  if (isPublicRoute && token?.value) {
    return NextResponse.redirect(new URL(PATH_NAME.HOME, request.nextUrl));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    '/((?!api|_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt).*)',
  ],
};
