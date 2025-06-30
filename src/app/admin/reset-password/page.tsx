"use client";

import { useState, useEffect, Suspense } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { Button } from "../../../components/ui/button";
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "../../../components/ui/card";
import { Input } from "../../../components/ui/input";
import { Label } from "../../../components/ui/label";

function ResetPasswordForm() {
    const searchParams = useSearchParams();
    const router = useRouter();
    const [token, setToken] = useState<string | null>(null);
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [error, setError] = useState("");
    const [message, setMessage] = useState("");

    useEffect(() => {
        setToken(searchParams.get("token"));
    }, [searchParams]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (password !== confirmPassword) {
            setError("Passwords do not match");
            return;
        }
        setError("");
        setMessage("");

        if (!token) {
            setError("No reset token found.");
            return;
        }

        const response = await fetch("/api/admin/reset-password", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ token, password }),
        });

        const data = await response.json();

        if (response.ok) {
            setMessage(data.message);
            setTimeout(() => {
                router.push("/admin/login");
            }, 2000);
        } else {
            setError(data.error || "An error occurred");
        }
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
            <Card className="w-full max-w-sm">
                <CardHeader>
                    <CardTitle className="text-2xl">Reset Password</CardTitle>
                    <CardDescription>Enter your new password below.</CardDescription>
                </CardHeader>
                <form onSubmit={handleSubmit}>
                    <CardContent className="grid gap-4">
                        <div className="grid gap-2">
                            <Label htmlFor="password">New Password</Label>
                            <Input
                                id="password"
                                type="password"
                                required
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                        </div>
                        <div className="grid gap-2">
                            <Label htmlFor="confirm-password">Confirm New Password</Label>
                            <Input
                                id="confirm-password"
                                type="password"
                                required
                                value={confirmPassword}
                                onChange={(e) => setConfirmPassword(e.target.value)}
                            />
                        </div>
                        {message && <p className="text-green-500 text-sm">{message}</p>}
                        {error && <p className="text-red-500 text-sm">{error}</p>}
                    </CardContent>
                    <CardFooter>
                        <Button type="submit" className="w-full">
                            Reset Password
                        </Button>
                    </CardFooter>
                </form>
            </Card>
        </div>
    );
}

export default function ResetPasswordPage() {
    return (
        <Suspense fallback={<div>Loading...</div>}>
            <ResetPasswordForm />
        </Suspense>
    )
} 