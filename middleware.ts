import { getToken } from "next-auth/jwt";
import { NextRequest, NextResponse } from "next/server";

export async function middleware(req: NextRequest) {
  const path = req.nextUrl.pathname;
  const token = await getToken({ req });

  const publicPaths =
    path === "/" || path === "/login" || path === "/protected";

  if (publicPaths && token) {
    return NextResponse.redirect(new URL("/rooms", req.nextUrl));
  }

  if (path === "/rooms" && !token) {
    return NextResponse.redirect(new URL("/login", req.nextUrl));
  }

  if (!publicPaths && !token) {
    return NextResponse.redirect(new URL("/protected", req.nextUrl));
  }
}

export const config = {
  matcher: ["/login", "/rooms", "/protected", "/"],
};
