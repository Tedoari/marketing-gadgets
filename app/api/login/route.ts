import { NextResponse } from 'next/server'; // Next.js specific for responses
import prisma from '@/lib/prisma'; // Prisma Client for DB accessprisma 

// POST request to check if email and password match
export async function POST(req: Request) {
  const { email, password} = await req.json(); // Get data from the request body
  

  try {
    // Query the database to find the user by email
    const user = await prisma.user.findFirst({
      where: { email: email },
    });

    if (!user) {
      // If no user is found, return an error
      return NextResponse.json({ error: 'Invalid email or password' }, { status: 400 });
    }

    // Compare the provided password with the stored password (no hashing)
    if (password !== user.password) {
      // If passwords don't match, return an error
      return NextResponse.json({ error: 'Invalid email or password' }, { status: 400 });
    }

    // If everything matches, return a success response (e.g., user info)
    return NextResponse.json({ message: 'Login successful', user }, { status: 200 });

  } catch (error) {
    // Handle any errors
    console.error(error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}