import { prisma } from "@/lib/prisma";
import crypto from "crypto";
import nodemailer from "nodemailer";
import { NextResponse } from "next/server";

export async function POST(req: Request) {

  const { email } = await req.json();

  const user = await prisma.user.findUnique({
    where: { email }
  });

  if (!user) {
    return NextResponse.json({ message: "If email exists, link sent" });
  }

  const token = crypto.randomBytes(32).toString("hex");

  const expires = new Date(Date.now() + 3600000);

  await prisma.verificationToken.create({
    data: {
      identifier: email,
      token,
      expires,
    },
  });

  const resetLink =
    `${process.env.NEXTAUTH_URL}/reset-password?token=${token}`;

  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  await transporter.sendMail({
    to: email,
    subject: "Reset Password",
    html: `<a href="${resetLink}">Reset Password</a>`,
  });

  return NextResponse.json({ message: "Reset link sent" });
}
