import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma'; 

export async function GET(request: Request, { params }: { params: { productId: string } }) {
  const productId = parseInt(params.productId, 10); 

  // If productId is not correct return a 400 error
  if (isNaN(productId)) {
    return NextResponse.json({ message: 'Incorrect productId' }, { status: 400 });
  }

  try {
    console.log('getting bookings for productId:', productId);

    const bookings = await prisma.booking.findMany({
      where: {
        productId: productId,
      },
      select: {
        reservedDate: true,
      },
    });

    console.log('Bookings:', bookings);

    return NextResponse.json(bookings.map((booking) => booking.reservedDate));

  } catch (error) {
    console.log('Error fetching bookings:', error);
    return NextResponse.json({ message: 'Something went wrong', error:(error as Error).message }, { status: 500 });
  }
}
