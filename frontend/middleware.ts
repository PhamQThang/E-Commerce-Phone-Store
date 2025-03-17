import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken";

export function middleware(req: NextRequest) {
  console.log("Middleware running for:", req.nextUrl.pathname);
  const token = req.cookies.get("authToken")?.value;
  const url = req.nextUrl.pathname;

  if (url.startsWith("/client")) {
    return NextResponse.next();
  }

  if (url.startsWith("/auth/login") || url.startsWith("/auth/register")) {
    return NextResponse.next();
  }

  if (url.startsWith("/admin")) {
    if (!token) {
      return NextResponse.redirect(new URL("/auth/login", req.url));
    }

    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET || "your_jwt_secret") as {
        id: number;
        full_name: string;
        role: string;
        exp: number;
      };
      const role = decoded.role;

      const currentTime = Math.floor(Date.now() / 1000);
      if (decoded.exp < currentTime) {
        return NextResponse.redirect(new URL("/auth/login", req.url));
      }

      if (role !== "admin") {
        const redirectUrl = role === "client" ? "/client" : "/client"; 
        return NextResponse.redirect(new URL(redirectUrl, req.url));
      }

      return NextResponse.next();
    } catch (err) {
      return NextResponse.redirect(new URL("/auth/login", req.url));
    }
  }

  return NextResponse.redirect(new URL("/client", req.url));
}

export const config = {
  matcher: ["/admin/:path*", "/client/:path*", "/auth/:path*"],
};