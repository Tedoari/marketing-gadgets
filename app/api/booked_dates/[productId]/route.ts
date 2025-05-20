import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function GET(
  request: Request,
  { params }: { params: { productId: string } }
) {
  const productId = parseInt(params.productId, 10);

  if (isNaN(productId)) {
    return NextResponse.json(
      { message: "Incorrect productId" },
      { status: 400 }
    );
  }

  try {
    console.log("getting bookings for productId:", productId);

    const bookings = await prisma.booking.findMany({
      where: {
        productId: productId,
      },
      select: {
        startDate: true,
        endDate: true,
      },
    });

    console.log("Bookings:", bookings);

    // Return the raw start and end dates
    return NextResponse.json(bookings);
  } catch (error) {
    console.error("Error fetching bookings:", error);
    return NextResponse.json(
      { message: "Something went wrong", error: (error as Error).message },
      { status: 500 }
    );
  }
}
