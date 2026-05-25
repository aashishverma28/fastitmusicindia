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

// Helpers to construct redirection base URLs
const getMainDomain = (currentHost: string) => {
  if (currentHost.includes('localhost')) {
    const hostWithoutSubdomain = currentHost.replace(/^career\./, '');
    return `http://${hostWithoutSubdomain}`;
  }
  return 'https://fastitmusic.in';
};

const getSubdomainDomain = (currentHost: string) => {
  if (currentHost.includes('localhost')) {
    // If it's already got career., keep it
    if (currentHost.startsWith('career.')) {
      return `http://${currentHost}`;
    }
    return `http://career.${currentHost}`;
  }
  return 'https://career.fastitmusic.in';
};

// Our custom proxy function that wraps next-auth and handles subdomain routing
export default function proxy(req: NextRequest, event: any) {
  const url = req.nextUrl.clone();
  const hostname = req.headers.get('host') || '';

  // Detect subdomain for career: career.fastitmusic.in or career.localhost:3000
  const isCareerSubdomain = hostname.startsWith('career.fastitmusic.in') || hostname.startsWith('career.localhost');

  // Static files and internal API requests bypass subdomain checks
  if (
    url.pathname.startsWith('/_next') || 
    url.pathname.startsWith('/api') ||
    url.pathname.includes('.')
  ) {
    return NextResponse.next();
  }

  if (isCareerSubdomain) {
    // Subdomain ONLY hosts the career page.
    if (url.pathname === '/') {
      // Rewrite root to the Careers page
      url.pathname = '/career';
      return NextResponse.rewrite(url);
    }
    
    if (url.pathname === '/career' || url.pathname === '/career/') {
      // Clean URL: redirect career.fastitmusic.in/career to career.fastitmusic.in/
      return NextResponse.redirect(new URL('/', getSubdomainDomain(hostname)));
    }

    if (url.pathname.startsWith('/career/')) {
      // Clean URL: career.fastitmusic.in/career/xyz -> career.fastitmusic.in/xyz (if needed)
      // Otherwise redirect other pages to the main domain
      return NextResponse.redirect(new URL(url.pathname.replace(/^\/career/, ''), getSubdomainDomain(hostname)));
    }

    // Any other page requested on career subdomain (e.g. /about) is redirected to the main domain
    return NextResponse.redirect(new URL(url.pathname, getMainDomain(hostname)));
  } else {
    // Main domain request: redirect /career paths to the subdomain
    if (url.pathname === '/career' || url.pathname === '/career/') {
      return NextResponse.redirect(new URL('/', getSubdomainDomain(hostname)));
    }
    if (url.pathname.startsWith('/career/')) {
      const subPath = url.pathname.replace(/^\/career/, '');
      return NextResponse.redirect(new URL(subPath, getSubdomainDomain(hostname)));
    }
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
