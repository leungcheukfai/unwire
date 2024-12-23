// middleware.ts
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export const config = {
  // Update matcher to handle admin routes
  matcher: "/admin/:path*",
};

export function middleware(request: NextRequest) {
  // Check for user cookie
  const userCookie = request.cookies.get("user");
  const isAuthenticated = !!userCookie?.value;

  // If not authenticated, redirect to login
  if (!isAuthenticated) {
    const loginUrl = new URL("/login", request.url);
    // Add the original URL as a redirect parameter
    loginUrl.searchParams.set("redirect", request.nextUrl.pathname);
    return NextResponse.redirect(loginUrl);
  }

  return NextResponse.next();
}
