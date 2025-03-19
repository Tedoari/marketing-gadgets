import { NextResponse } from 'next/server';
import { getToken } from 'next-auth/jwt';  // To retrieve the JWT token from the request
import { NextRequest } from 'next/server';

export async function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  // Log the pathname of the incoming request
  console.log('Middleware triggered for:', pathname);

  // Skip the middleware for the root page (login page)
  if (pathname === '/') {
    console.log('Skipping redirect for root page');
    return NextResponse.next();
  }

  // Check if there is a session (this can be a JWT token or a session cookie)
  const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });

  // Log token details
  console.log('JWT token:', token);

  // If the token is not present, redirect to the login page
  if (!token) {
    console.log('No token found. Redirecting to login page...');
    const loginUrl = new URL('/', req.url);  // Redirect to the root page (login page)
    return NextResponse.redirect(loginUrl);
  }

  console.log('Token found. Proceeding to the requested page');
  return NextResponse.next();  // If token is found, continue the request
}

// This will apply the middleware to the routes you want to protect
export const config = {
  matcher: ['@app/products', '/contact', '/information', '/account'], // Add all protected routes here
};
