import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/authOptions";
import prisma from "@/lib/prisma";

// Create a new booking
export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { productId, startDate, endDate, userId, address, eventName } = body;

    if (!productId || !startDate || !endDate || !userId || !address) {
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
        eventName: eventName?.trim() || null, // Save event if provided
      },
    });

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

// Get bookings for current user, or all if admin
export async function GET() {
  const session = await getServerSession(authOptions);

  if (!session?.user?.id) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  const isAdmin = session.user.role === "admin";

  try {
    const bookings = await prisma.booking.findMany({
      where: isAdmin ? undefined : { userId: Number(session.user.id) },
      include: {
        product: true,
        user: true, // includes companyName, name, email, etc.
      },
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

// Delete booking by ID — admin only
export async function DELETE(req: NextRequest) {
  const session = await getServerSession(authOptions);

  if (!session?.user?.id || session.user.role !== "admin") {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  const url = new URL(req.url);
  const idParam = url.searchParams.get("id");

  if (!idParam) {
    return NextResponse.json(
      { message: "Missing booking ID" },
      { status: 400 }
    );
  }

  const bookingId = Number(idParam);

  try {
    const booking = await prisma.booking.findUnique({
      where: { id: bookingId },
    });

    if (!booking) {
      return NextResponse.json(
        { message: "Booking not found" },
        { status: 404 }
      );
    }

    await prisma.booking.delete({
      where: { id: bookingId },
    });

    return NextResponse.json({ message: "Booking deleted" }, { status: 200 });
  } catch (error) {
    console.error("Error deleting booking:", error);
    return NextResponse.json(
      { message: "Failed to delete booking" },
      { status: 500 }
    );
  }
}
