import { NextRequestWithAuth, withAuth } from 'next-auth/middleware';
import { NextResponse } from 'next/server';
import { baseUrl } from './lib/server';
import { NEXTAUTH_SECRET } from './lib/utils';

export default withAuth(
  function middleware(req: NextRequestWithAuth) {
    const { pathname } = req.nextUrl || {};
    const { token } = req.nextauth || {};

    if (token?.role !== 'OWNER' && pathname.startsWith('/private')) {
      return NextResponse.redirect(`${baseUrl}/admin/`);
    }

    if (token?.role !== 'ADMIN' && pathname.startsWith('/admin')) {
      return NextResponse.redirect(`${baseUrl}/private/`);
    }
    if (token?.role === 'OWNER' && !token.companyId) {
      return !!token.companyId
        ? NextResponse.redirect(`${baseUrl}/private/`)
        : NextResponse.redirect(`${baseUrl}/onboard/`);
    }

    return;
  },
  {
    callbacks: {
      authorized: ({ token }) => !!token,
    },
    secret: NEXTAUTH_SECRET,
  },
);
export const config = {
  matcher: ['/private(.*)', '/admin(.*)'],
};
