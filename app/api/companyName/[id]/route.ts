/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function GET(req: NextRequest, context: any) {
  const { id } = context.params;

  if (!id) {
    return NextResponse.json({ error: "User ID missing" }, { status: 400 });
  }

  try {
    const user = await prisma.user.findUnique({
      where: { id: Number(id) },
      select: { companyName: true },
    });

    if (!user || !user.companyName) {
      return NextResponse.json({ error: "Company name not found" }, { status: 404 });
    }

    return NextResponse.json({ companyName: user.companyName });
  } catch (error) {
    console.error("[COMPANY_NAME_API]", error);
    return NextResponse.json({ error: "Error fetching company name" }, { status: 500 });
  }
}
