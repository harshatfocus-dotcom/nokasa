import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

export async function POST(req: Request) {
  try {
    const { fullName, whatsapp, goal, city } = await req.json();

    if (!fullName || !whatsapp) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.GMAIL_USER,
        pass: process.env.GMAIL_APP_PASSWORD,
      },
    });

    await transporter.sendMail({
      from: `"NoKasa Website" <${process.env.GMAIL_USER}>`,
      to: process.env.GMAIL_USER,
      subject: `Partner Query: ${fullName}`,
      html: `
        <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #00463C;">New Partner Application</h2>
          <table style="width: 100%; border-collapse: collapse;">
            <tr><td style="padding: 8px; font-weight: bold; width: 160px;">Full Name</td><td style="padding: 8px;">${fullName}</td></tr>
            <tr style="background:#f9f9f9"><td style="padding: 8px; font-weight: bold;">WhatsApp</td><td style="padding: 8px;">${whatsapp}</td></tr>
            <tr><td style="padding: 8px; font-weight: bold;">Goal</td><td style="padding: 8px;">${goal || "Not specified"}</td></tr>
            <tr style="background:#f9f9f9"><td style="padding: 8px; font-weight: bold;">City</td><td style="padding: 8px;">${city || "—"}</td></tr>
          </table>
        </div>
      `,
    });

    return NextResponse.json({ success: true });
  } catch (error: unknown) {
    console.error("Partner email error:", error);
    return NextResponse.json({ error: "Failed to submit application" }, { status: 500 });
  }
}
