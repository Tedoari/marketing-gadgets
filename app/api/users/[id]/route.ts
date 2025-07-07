/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextResponse, NextRequest } from "next/server";
import prisma from "@/lib/prisma";

// POST - Create User
export async function POST(req: Request) {
  const { name, email, role, image, companyName, addressId } = await req.json();

  try {
    const newUser = await prisma.user.create({
      data: {
        name,
        email,
        role,
        image,
        companyName,
        addressId,
      },
    });
    return NextResponse.json(newUser, { status: 201 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Error creating user" }, { status: 500 });
  }
}

// GET - Fetch user by ID, including companyName and related address object
export async function GET(req: NextRequest, context: any) {
  const { id } = context.params;

  if (!id) {
    return NextResponse.json({ error: "User ID missing" }, { status: 400 });
  }

  try {
    const user = await prisma.user.findUnique({
      where: { id: Number(id) },
      select: {
        id: true,
        name: true,
        email: true,
        role: true,
        image: true,
        companyName: true,
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

    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    return NextResponse.json(user);
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Error fetching user" }, { status: 500 });
  }
}

export async function PUT(req: NextRequest, context: any) {
  const { id } = context.params;

  if (!id) {
    return NextResponse.json({ error: "User ID missing" }, { status: 400 });
  }

  const { name, email, role, image, companyName, addressId } = await req.json();

  try {
    const updatedUser = await prisma.user.update({
      where: { id: Number(id) },
      data: {
        name,
        email,
        role,
        image,
        companyName,
        addressId,
      },
    });

    return NextResponse.json(updatedUser);
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Error updating user" }, { status: 500 });
  }
}

// DELETE - Delete User by ID
export async function DELETE(req: NextRequest, context: any) {
  const { id } = context.params;

  if (!id) {
    return NextResponse.json({ error: "User ID missing" }, { status: 400 });
  }

  try {
    const deletedUser = await prisma.user.delete({
      where: { id: Number(id) },
    });

    return NextResponse.json(deletedUser);
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Error deleting user" }, { status: 500 });
  }
}
