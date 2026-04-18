import { withAuth } from "next-auth/middleware";
import { NextResponse } from "next/server";

const proxyHandler = withAuth(
  function proxy(req) {
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

export { proxyHandler as proxy };
export default proxyHandler;

export const config = {
  matcher: [
    "/dashboard/:path*",
  ],
};
