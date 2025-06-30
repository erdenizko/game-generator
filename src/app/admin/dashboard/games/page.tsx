import { Button } from "@/components/ui/button";
import { prisma } from "@/lib/prisma";
import Link from "next/link";
import type { GameConfig, Partner } from "@/generated/prisma";

export default async function GamesPage() {
    const games = await prisma.gameConfig.findMany({
        include: {
            Partner: true,
        },
    });

    return (
        <div className="container mx-auto py-10">
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-3xl font-bold">Games</h1>
                <Button asChild>
                    <Link href="/admin/dashboard/games/new">Create New Game</Link>
                </Button>
            </div>
            <div className="bg-white shadow-md rounded-lg">
                <ul className="divide-y divide-gray-200">
                    {games.map((game: GameConfig & { Partner: Partner | null }) => (
                        <li key={game.id} className="p-4 hover:bg-gray-50 flex justify-between items-center">
                            <div>
                                <Link href={`/admin/dashboard/games/${game.id}`} className="font-semibold text-lg text-blue-600 hover:underline">
                                    {game.name}
                                </Link>
                                <p className="text-sm text-gray-500">
                                    {game.Partner ? `Partner: ${game.Partner.name}` : "No partner associated"}
                                </p>
                            </div>
                            <Button variant="outline" asChild>
                                <Link href={`/admin/dashboard/games/${game.id}`}>Edit</Link>
                            </Button>
                        </li>
                    ))}
                </ul>
                {games.length === 0 && (
                    <p className="text-center py-10 text-gray-500">No games found. Create one!</p>
                )}
            </div>
        </div>
    );
} 