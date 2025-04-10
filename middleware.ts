import { NextResponse } from 'next/server';
import { getToken } from 'next-auth/jwt';  
import { NextRequest } from 'next/server';

export async function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  console.log('Middleware triggered for:', pathname);

  // Check if there is a session 
  const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });

  console.log('JWT token:', token);

  if (pathname === '/' && token) {
    console.log('User is logged in, redirecting to /products');
    const redirectUrl = new URL('/products', req.url);
    return NextResponse.redirect(redirectUrl);
  }

  if (pathname === '/' && !token) {
    console.log('User is not logged in, allowing access to /');
    return NextResponse.next(); 
  }

  if (!token) {
    console.log('No token and redirecting to login page');
    const loginUrl = new URL('/', req.url); 
    return NextResponse.redirect(loginUrl);
  }

  console.log('There is a token and now going to the page');
  return NextResponse.next(); 
}

export const config = {
  matcher: ['/products', '/contact', '/information', '/account', '/product', '/product/:id*', '/'], // These are all pages you will get redirected from to login
};
