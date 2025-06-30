import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "../../../auth/[...nextauth]/route";

export async function PUT(req: Request, { params }: { params: { id: string } }) {
    const session = await getServerSession(authOptions);
    if (!session?.user) {
        return NextResponse.json({ error: "Not authenticated" }, { status: 401 });
    }

    try {
        const body = await req.json();
        const { id } = params;
        
        const updatedGameConfig = await prisma.gameConfig.update({
            where: { id },
            data: body,
        });

        return NextResponse.json(updatedGameConfig);
    } catch (error) {
        console.error("Failed to update game config:", error);
        return NextResponse.json({ error: "Failed to update game config" }, { status: 500 });
    }
} 