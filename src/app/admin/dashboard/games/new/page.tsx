import { GameConfigForm } from "@/components/admin/GameConfigForm";

export default function NewGamePage() {
    return (
        <div className="space-y-6">
            <div className="border-b border-gray-200 dark:border-gray-800 pb-6">
                <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Create New Game</h1>
                <p className="text-gray-600 dark:text-gray-400 mt-2">
                    Configure and customize your game experience with our intuitive game builder
                </p>
            </div>
            <GameConfigForm />
        </div>
    );
} 