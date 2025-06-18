// import { NextResponse } from 'next/server';
// import prisma from '@/lib/prisma';

// export async function POST(req: Request, { params }: { params: { productId: string } }) {
//   const productId = parseInt(params.productId, 10);
//   const { selectedDate } = await req.json();

//   if (isNaN(productId)) {
//     return NextResponse.json({ message: 'Invalid product ID.' }, { status: 400 });
//   }

//   try {
//     const existingBooking = await prisma.booking.findFirst({
//       where: {
//         productId,
//         reservedDate: new Date(selectedDate),
//       },
//     });

//     if (existingBooking) {
//       return NextResponse.json({ message: 'This date is already reserved.' }, { status: 400 });
//     }

//     await prisma.booking.create({
//       data: {
//         productId,
//         reservedDate: new Date(selectedDate),
//       },
//     });

//     return NextResponse.json({ message: 'Reservation successful!' });

//   } catch (error) {
//     console.error(error);
//     return NextResponse.json({ message: 'Something went wrong.' }, { status: 500 });
//   }
// }
