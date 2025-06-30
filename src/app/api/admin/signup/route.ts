import { PrismaClient } from "../../../../generated/prisma";
import bcrypt from "bcrypt";
import { NextResponse } from "next/server";

const prisma = new PrismaClient();

export async function POST(req: Request) {
  const { email, password } = await req.json();

  if (!email || !password) {
    return NextResponse.json(
      { error: "Email and password are required" },
      { status: 400 }
    );
  }

  try {
    const existingAdmin = await prisma.admin.findUnique({
      where: { email },
    });

    if (existingAdmin) {
      return NextResponse.json(
        { error: "Admin with this email already exists" },
        { status: 409 }
      );
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const admin = await prisma.admin.create({
      data: {
        email,
        password: hashedPassword,
      },
    });

    return NextResponse.json({
      id: admin.id,
      email: admin.email,
    });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "An error occurred while creating the admin" },
      { status: 500 }
    );
  }
} 