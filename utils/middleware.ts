import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const PRIVATE_PATHS = ["/recommended", "/library", "/reading"];
const AUTH_PAGES = ["/login", "/register"];

export function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  const hasToken = Boolean(req.cookies.get("accessToken")?.value);

  if (PRIVATE_PATHS.some((p) => pathname.startsWith(p))) {
    if (!hasToken) {
      const url = req.nextUrl.clone();
      url.pathname = "/";
      url.search = "";
      return NextResponse.redirect(url);
    }
    return NextResponse.next();
  }

  if (AUTH_PAGES.some((p) => pathname.startsWith(p))) {
    if (hasToken) {
      const url = req.nextUrl.clone();
      url.pathname = "/recommended";
      url.search = "";
      return NextResponse.redirect(url);
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/recommended/:path*",
    "/library/:path*",
    "/reading/:path*",
    "/login",
    "/register",
  ],
};
