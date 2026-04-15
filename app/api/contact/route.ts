import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const { name, email, phone, message } = await req.json();

    if (!name || !email || !message) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    // If you have Nodemailer configured, use this block:
    // const nodemailer = require("nodemailer");
    // const transporter = nodemailer.createTransport({ ... });
    // await transporter.sendMail({ from: email, to: process.env.ADMIN_EMAIL, subject: `New enquiry from ${name}`, text: message });

    // Log to console as fallback (for development)
    console.log("📬 New contact form submission:", { name, email, phone, message });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Contact API error:", error);
    return NextResponse.json({ error: "Failed to send message" }, { status: 500 });
  }
}
