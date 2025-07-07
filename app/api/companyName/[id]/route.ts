// app/api/companyName/[id]/route.ts
import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function GET(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  const userId = Number(params.id);

  if (isNaN(userId)) {
    return NextResponse.json({ error: "Invalid user ID" }, { status: 400 });
  }

  try {
    const user = await prisma.user.findUnique({
      where: { id: userId },
      select: { companyName: true },
    });

    if (!user?.companyName) {
      return NextResponse.json({ companyName: "" }, { status: 404 });
    }

    return NextResponse.json({ companyName: user.companyName });
  } catch (error) {
    console.error("[COMPANY_NAME_API]", error);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
