import { NextApiRequest, NextApiResponse } from "next";
import prisma from "@/lib/prisma"; // adjust this import to your prisma client

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { id } = req.query;

  if (!id || Array.isArray(id)) {
    return res.status(400).json({ error: "Invalid user id" });
  }

  try {
    const user = await prisma.user.findUnique({
      where: { id: Number(id) },
      select: { companyName: true },
    });

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    return res.status(200).json({ companyName: user.companyName });
  } catch (error) {
    console.error("Failed to fetch company name:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
}
