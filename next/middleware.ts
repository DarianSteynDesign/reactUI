import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { jwtVerify } from "jose";

export async function middleware(request: NextRequest) {
  const token = request.cookies.get("auth-token")?.value;

  const publicRoutes = ["/login", "/signup"];

  if (publicRoutes.includes(request.nextUrl.pathname)) {
    return NextResponse.next();
  }

  if (!token) {
    const loginUrl = new URL("/signup", request.url);
    return NextResponse.redirect(loginUrl);
  }

  // Verify token
  try {
    const secret = new TextEncoder().encode(process.env.JWT_SECRET || "my-secret-key");
    await jwtVerify(token, secret);
    return NextResponse.next();
  } catch (error) {
    console.error("Invalid token:", error.message);
    const loginUrl = new URL("/login", request.url);
    return NextResponse.redirect(loginUrl);
  }
}

export const config = {
  matcher: ["/dashboard/:path*", "/products/:path*"],
};