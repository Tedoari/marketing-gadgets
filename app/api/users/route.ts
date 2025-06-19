/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";

// POST - Create User
export async function POST(req: NextRequest) {
  const { name, email, password, role, image, companyName, addressId } =
    await req.json();

  try {
    const newUser = await prisma.user.create({
      data: {
        name,
        email,
        password,
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

// GET - Fetch all users with companyName and nested address
export async function GET() {
  try {
    const users = await prisma.user.findMany({
      select: {
        id: true,
        name: true,
        email: true,
        role: true,
        image: true,
        companyName: true,
        addressId: true,
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

    return NextResponse.json(users);
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Error fetching users" },
      { status: 500 }
    );
  }
}

// PUT - Update User by ID
export async function PUT(req: NextRequest, context: any) {
  const { id } = await context.params;

  if (!id) {
    return NextResponse.json({ error: "Missing user ID" }, { status: 400 });
  }

  const { name, email, password, role, image, companyName, addressId } =
    await req.json();

  try {
    const updatedUser = await prisma.user.update({
      where: { id: Number(id) },
      data: {
        name,
        email,
        password,
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
  const { id } = await context.params;

  if (!id) {
    return NextResponse.json({ error: "Missing user ID" }, { status: 400 });
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
