import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const isDevBypassEnabled =
    process.env.NODE_ENV === "development" && process.env.DEV_AUTH_BYPASS === "1";

  if (isDevBypassEnabled) {
    return NextResponse.next();
  }

  const hasSession =
    request.cookies.has("authjs.session-token") ||
    request.cookies.has("__Secure-authjs.session-token");

  if (!hasSession) {
    const signInUrl = new URL("/connexion", request.url);
    signInUrl.searchParams.set(
      "callbackUrl",
      `${request.nextUrl.pathname}${request.nextUrl.search}`,
    );
    return NextResponse.redirect(signInUrl);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/categories/:path*", "/compte/:path*", "/api/categories/:path*", "/api/profile/:path*"],
};
