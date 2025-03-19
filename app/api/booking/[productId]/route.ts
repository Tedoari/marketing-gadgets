import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma'; // Adjust the import path based on your setup

export async function GET({ params }: { params: { productId: string } }) {
  const productId = parseInt(params.productId, 10);

  if (isNaN(productId)) {
    return NextResponse.error();
  }

  // Fetch the reserved dates from the database
  const bookings = await prisma.booking.findMany({
    where: {
      productId,
    },
    select: {
      reservedDate: true,
    },
  });

  // Return the dates as JSON
  return NextResponse.json(bookings.map((booking) => booking.reservedDate));
}