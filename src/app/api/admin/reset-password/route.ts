import { PrismaClient } from "../../../../generated/prisma";
import { NextResponse } from "next/server";
import crypto from "crypto";
import bcrypt from "bcrypt";

const prisma = new PrismaClient();

export async function POST(req: Request) {
  const { token, password } = await req.json();

  if (!token || !password) {
    return NextResponse.json(
      { error: "Token and password are required" },
      { status: 400 }
    );
  }

  try {
    const passwordResetToken = crypto
      .createHash("sha256")
      .update(token)
      .digest("hex");

    const admin = await prisma.admin.findFirst({
      where: {
        passwordResetToken,
        passwordResetExpiry: {
          gt: new Date(),
        },
      },
    });

    if (!admin) {
      return NextResponse.json(
        { error: "Invalid or expired token" },
        { status: 400 }
      );
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    await prisma.admin.update({
      where: { id: admin.id },
      data: {
        password: hashedPassword,
        passwordResetToken: null,
        passwordResetExpiry: null,
      },
    });

    return NextResponse.json({ message: "Password has been reset successfully." });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "An error occurred while resetting the password" },
      { status: 500 }
    );
  }
} 