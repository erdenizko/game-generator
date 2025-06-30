import { PrismaClient } from "../../../../generated/prisma";
import { NextResponse } from "next/server";
import crypto from "crypto";
// import nodemailer from "nodemailer";

const prisma = new PrismaClient();

export async function POST(req: Request) {
  const { email } = await req.json();

  if (!email) {
    return NextResponse.json({ error: "Email is required" }, { status: 400 });
  }

  try {
    const admin = await prisma.admin.findUnique({
      where: { email },
    });

    if (!admin) {
      // Don't reveal that the user doesn't exist
      return NextResponse.json({ message: "If a user with that email exists, a password reset link has been sent." });
    }

    const resetToken = crypto.randomBytes(32).toString("hex");
    const passwordResetToken = crypto
      .createHash("sha256")
      .update(resetToken)
      .digest("hex");

    const passwordResetExpiry = new Date(Date.now() + 10 * 60 * 1000); // 10 minutes

    await prisma.admin.update({
      where: { email },
      data: {
        passwordResetToken,
        passwordResetExpiry,
      },
    });

    const resetURL = `${req.headers.get("origin")}/admin/reset-password?token=${resetToken}`;

    // In a real application, you would send an email.
    // We will log it to the console for development.
    console.log("Password Reset URL:", resetURL);
    
    // const transporter = nodemailer.createTransport({
    //   // ... your email provider config
    // });
    // await transporter.sendMail({
    //   to: email,
    //   from: "no-reply@yourdomain.com",
    //   subject: "Password Reset",
    //   html: `<p>You requested a password reset. Click <a href="${resetURL}">here</a> to reset it.</p>`,
    // });

    return NextResponse.json({ message: "If a user with that email exists, a password reset link has been sent." });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "An error occurred while processing the request" },
      { status: 500 }
    );
  }
} 