import { withAuth } from "next-auth/middleware";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

// Auth handler using next-auth withAuth
const authMiddleware = withAuth(
  function middleware(req) {
    const token = req.nextauth.token;
    const path = req.nextUrl.pathname;

    // First Login Redirection (Onboarding)
    if (token?.isFirstLogin && path !== "/onboarding" && path.startsWith("/dashboard")) {
       return NextResponse.redirect(new URL("/onboarding", req.url));
    }

    // Admin Route Protection
    if (path.startsWith("/dashboard/admin") && token?.role !== "ADMIN") {
      return NextResponse.redirect(new URL("/login", req.url));
    }

    // Artist Route Protection
    if (path.startsWith("/dashboard/artist") && token?.role !== "ARTIST" && token?.role !== "ADMIN") {
      return NextResponse.redirect(new URL("/login", req.url));
    }

    // Label Route Protection
    if (path.startsWith("/dashboard/label") && token?.role !== "LABEL" && token?.role !== "ADMIN") {
      return NextResponse.redirect(new URL("/login", req.url));
    }

    return NextResponse.next();
  },
  {
    callbacks: {
      authorized: ({ token }) => !!token,
    },
  }
);

// Our custom proxy function that wraps next-auth and handles subdomain routing
export default function proxy(req: NextRequest, event: any) {
  const url = req.nextUrl.clone();
  const hostname = req.headers.get('host') || '';

  // Detect subdomain for career: career.fastitmusic.in or career.localhost:3000
  const isCareerSubdomain = hostname.startsWith('career.fastitmusic.in') || hostname.startsWith('career.localhost');

  if (isCareerSubdomain) {
    // If it's a static asset or generic API request, pass it through directly
    if (
      url.pathname.startsWith('/_next') || 
      url.pathname.startsWith('/api') ||
      url.pathname.includes('.')
    ) {
      return NextResponse.next();
    }

    // Rewrite request internally to the /career page
    url.pathname = `/career${url.pathname === '/' ? '' : url.pathname}`;
    return NextResponse.rewrite(url);
  }

  // For non-subdomain requests, check if it's a dashboard path
  if (url.pathname.startsWith("/dashboard")) {
    // Forward to next-auth middleware
    return (authMiddleware as any)(req, event);
  }

  return NextResponse.next();
}

export { proxy };

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    '/((?!_next/static|_next/image|favicon.ico).*)',
  ],
};
