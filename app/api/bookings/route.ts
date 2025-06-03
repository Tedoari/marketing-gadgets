import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";

// Create a new booking
export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { productId, startDate, endDate, userId, address } = body;

    console.log("Received booking:", body);

    if (!productId || !startDate || !endDate || !userId || !address) {
      console.error("Missing fields", {
        productId,
        startDate,
        endDate,
        userId,
        address,
      });
      return NextResponse.json(
        { message: "Missing required fields" },
        { status: 400 }
      );
    }

    const booking = await prisma.booking.create({
      data: {
        productId: Number(productId),
        startDate: new Date(startDate),
        endDate: new Date(endDate),
        userId: Number(userId),
        address,
      },
    });

    console.log("Booking saved:", booking);
    return NextResponse.json(
      { message: "Booking created", booking },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error saving booking:", error);
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
}

// Fetch all bookings for a specific userId
export async function GET(req: NextRequest) {
  const userId = req.nextUrl.searchParams.get("userId");

  if (!userId) {
    return NextResponse.json({ message: "Missing userId" }, { status: 400 });
  }

  try {
    const bookings = await prisma.booking.findMany({
      where: { userId: Number(userId) },
      orderBy: { startDate: "desc" },
    });

    return NextResponse.json({ bookings }, { status: 200 });
  } catch (error) {
    console.error("Error fetching bookings:", error);
    return NextResponse.json(
      { message: "Failed to fetch bookings" },
      { status: 500 }
    );
  }
}
