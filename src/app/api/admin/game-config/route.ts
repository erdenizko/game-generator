import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "../../auth/[...nextauth]/route";

export async function POST(req: Request) {
    const session = await getServerSession(authOptions);
    if (!session?.user) {
        return NextResponse.json({ error: "Not authenticated" }, { status: 401 });
    }

    try {
        const body = await req.json();
        const { name, ...configData } = body;

        if (!name) {
            return NextResponse.json({ error: "Name is required" }, { status: 400 });
        }

        const gameConfig = await prisma.gameConfig.create({
            data: {
                name,
                ...configData,
            },
        });

        return NextResponse.json(gameConfig);
    } catch (error) {
        console.error("Failed to create game config:", error);
        return NextResponse.json({ error: "Failed to create game config" }, { status: 500 });
    }
} 