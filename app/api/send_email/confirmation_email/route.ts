import { NextResponse } from "next/server";
import { resend } from "@/lib/resend";

export async function POST(req: Request) {
  const { user, address, startDate, endDate } = await req.json();

  try {
    const data = await resend.emails.send({
      from: "Contact Form <onboarding@resend.dev>",
      to: ["intern.nld@tele-radio.com"],
      subject: `New message from ${user}`,
      html: `
        <div>
          <p><strong>User:</strong> ${user}</p>
          <p><strong>Adress:</strong> ${address}</p>
          <p><strong>Booking Dates:</strong></p>
          <p>${startDate}</p>
          <p>${endDate}</p>
        </div>
      `,
    });

    return NextResponse.json({ success: true, data });
  } catch (error) {
    console.error("[Email Error]", error);
    return NextResponse.json({ success: false, error });
  }
}
