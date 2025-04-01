import { NextResponse } from 'next/server';
import { getToken } from 'next-auth/jwt';  
import { NextRequest } from 'next/server';

export async function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  console.log('Middleware triggered for:', pathname);

  if (pathname === '/') {
    console.log('Skipping redirect for root page');
    return NextResponse.next();
  }

  // Check if there is a session 
  const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });

  console.log('JWT token:', token);

  // No Session means redirected to login page
  if (!token) {
    console.log('No token and redirecting to login page');
    const loginUrl = new URL('/', req.url); 
    return NextResponse.redirect(loginUrl);
  }

  console.log('There is a token and now going to the page');
  return NextResponse.next(); 
}

export const config = {
  matcher: ['/products', '/contact', '/information', '/account', '/product', '/product/:id*'], // These are all pages you will get redirected from to login
};
