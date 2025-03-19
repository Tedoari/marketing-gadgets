import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma'; // This is where we get our prisma connection from

// This function gets the reserved dates for a product
export async function GET(request: Request, { params }: { params: { productId: string } }) {
  // Try to turn the productId from the URL into a number
  const productId = parseInt(params.productId, 10); 

  // If productId is not a valid number, return a 400 error
  if (isNaN(productId)) {
    return NextResponse.json({ message: 'Bad product id' }, { status: 400 });
  }

  try {
    // Just checking if we're doing things right
    console.log('Trying to get bookings for productId:', productId);

    // Try to get the bookings from the database for the given productId
    const bookings = await prisma.booking.findMany({
      where: {
        productId: productId,
      },
      select: {
        reservedDate: true,
      },
    });

    // Just printing what we got from the database
    console.log('Bookings:', bookings);

    // Sending the reserved dates back to the client
    return NextResponse.json(bookings.map((booking) => booking.reservedDate));

  } catch (error) {
    // If something goes wrong, print the error and send a message back
    console.log('Error fetching bookings:', error);
    return NextResponse.json({ message: 'Something went wrong', error:(error as Error).message }, { status: 500 });
  }
}
