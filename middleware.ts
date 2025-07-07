import { NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";
import type { NextRequest } from "next/server";

export async function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  console.log("Middleware triggered for:", pathname);

  const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });
  console.log("JWT token:", token);

  // Allow unauthenticated access to the login page (/)
  if (pathname === "/") {
    if (token) {
      console.log("User is logged in, redirecting to /products");
      return NextResponse.redirect(new URL("/products", req.url));
    } else {
      console.log("User is not logged in, staying on /");
      return NextResponse.next();
    }
  }

  // If there's no token at all, redirect to login
  if (!token) {
    console.log("No token found. Redirecting to login.");
    return NextResponse.redirect(new URL("/", req.url));
  }

  // If token exists but role is invalid, redirect to /unauthorized
  if (token.role !== "user" && token.role !== "admin") {
    console.log("Token found but role is invalid. Redirecting to /unauthorized.");
    return NextResponse.redirect(new URL("/unauthorized", req.url));
  }

  console.log("Authorized access. Proceeding.");
  return NextResponse.next();
}

export const config = {
  matcher: [
    "/",
    "/products",
    "/contact",
    "/information",
    "/account",
    "/product",
    "/product/:id*",
    "/dashboard",
  ],
};
