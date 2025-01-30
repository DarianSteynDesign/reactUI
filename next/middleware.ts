import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { jwtVerify } from "jose";

export async function middleware(request: NextRequest) {
  const token = request.cookies.get("auth-token")?.value;
  const publicRoutes = ["/login", "/signup"];

  console.log("Token", token);

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
    const { payload } = await jwtVerify(token, secret);
    console.log("Decoded User:", payload);

    const response = NextResponse.next();
    response.headers.set("x-user-id", payload.id as string);
    response.headers.set("x-user-email", payload.email as string);

    return response;
  } catch (error) {
    console.error("Invalid token:", error.message);
    const loginUrl = new URL("/login", request.url);
    return NextResponse.redirect(loginUrl);
  }
}

export const config = {
  matcher: ["/dashboard/:path*", "/products/:path*", "/feed/:path*"],
};