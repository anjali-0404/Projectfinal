import { auth } from "@/auth";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

// extend NextRequest type to include auth
interface AuthRequest extends NextRequest {
  auth?: any;
}

export default auth((req: AuthRequest) => {

  const isLoggedIn = !!req.auth;
  const { pathname } = req.nextUrl;

  // allow nextauth internal APIs
  if (pathname.startsWith("/api/auth")) {
    return NextResponse.next();
  }

  // protect dashboard
  if (pathname.startsWith("/dashboard") && !isLoggedIn) {
    return NextResponse.redirect(new URL("/login", req.url));
  }

  return NextResponse.next();
});

export const config = {
  matcher: ["/((?!_next|favicon.ico).*)"],
};
