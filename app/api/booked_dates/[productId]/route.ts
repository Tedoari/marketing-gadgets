import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function GET(
  req: NextRequest,
  context: { params: { productId: string } }
) {
  const { productId } = context.params;
  const parsedProductId = parseInt(productId, 10);

  if (isNaN(parsedProductId)) {
    return NextResponse.json(
      { message: "Incorrect productId" },
      { status: 400 }
    );
  }

  try {
    console.log("getting bookings for productId:", parsedProductId);

    const bookings = await prisma.booking.findMany({
      where: {
        productId: parsedProductId,
      },
      select: {
        startDate: true,
        endDate: true,
      },
    });

    console.log("Bookings:", bookings);

    return NextResponse.json(bookings);
  } catch (error) {
    console.error("Error fetching bookings:", error);
    return NextResponse.json(
      { message: "Something went wrong", error: (error as Error).message },
      { status: 500 }
    );
  }
}
