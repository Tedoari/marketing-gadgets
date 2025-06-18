import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function GET(
  req: NextRequest,
  context: { params: { productId: string } }
) {
  const productId = parseInt(context.params.productId, 10);

  if (isNaN(productId)) {
    return NextResponse.json(
      { message: "Invalid productId" },
      { status: 400 }
    );
  }

  try {
    const bookings = await prisma.booking.findMany({
      where: {
        productId,
      },
      select: {
        startDate: true,
        endDate: true,
      },
    });

    return NextResponse.json(bookings);
  } catch (error) {
    return NextResponse.json(
      { message: "Server error", error: (error as Error).message },
      { status: 500 }
    );
  }
}
