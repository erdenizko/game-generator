import { GameConfigForm } from "@/components/admin/GameConfigForm";
import { prisma } from "@/lib/prisma";
import { notFound } from "next/navigation";

interface EditGamePageProps {
    params: {
        id: string;
    };
}

export default async function EditGamePage({ params }: EditGamePageProps) {
    const game = await prisma.gameConfig.findUnique({
        where: {
            id: params.id,
        },
    });

    if (!game) {
        notFound();
    }

    return (
        <div>
            <h1 className="text-3xl font-bold mb-6">Edit Game: {game.name}</h1>
            <GameConfigForm game={game} />
        </div>
    );
} 