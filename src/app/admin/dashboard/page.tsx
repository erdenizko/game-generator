import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";

export default function AdminPanelPage() {
    return (
        <Card className="w-full max-w-4xl">
            <CardHeader>
                <CardTitle>Admin Panel</CardTitle>
                <CardDescription>
                    Create/edit partner configs, upload assets, and adjust odds,
                    translations, and multipliers.
                </CardDescription>
            </CardHeader>
            <CardContent>
                <p>Coming soon...</p>
            </CardContent>
        </Card>
    );
} 