import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";

export default function AdminStatsPage() {
    return (
        <Card className="w-full max-w-4xl">
            <CardHeader>
                <CardTitle>Admin Stats</CardTitle>
                <CardDescription>
                    View stats per partner. Filter by time range, material, user.
                </CardDescription>
            </CardHeader>
            <CardContent>
                <p>Coming soon...</p>
            </CardContent>
        </Card>
    );
} 