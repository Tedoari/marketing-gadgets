/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextResponse, NextRequest } from "next/server";
import prisma from "@/lib/prisma";

export async function GET(req: NextRequest, context: any) {
  const { id } = context.params;

  if (!id) {
    return NextResponse.json({ error: "User ID missing" }, { status: 400 });
  }

  try {
    const userAddress = await prisma.user.findUnique({
      where: { id: Number(id) },
      select: {
        address: {
          select: {
            id: true,
            street: true,
            city: true,
            postalCode: true,
            country: true,
          },
        },
      },
    });

    if (!userAddress || !userAddress.address) {
      return NextResponse.json({ error: "Address not found" }, { status: 404 });
    }

    return NextResponse.json(userAddress.address);
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Error fetching address" }, { status: 500 });
  }
}
