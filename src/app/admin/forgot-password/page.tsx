"use client";

import { useState } from "react";
import Link from "next/link";
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

export default function ForgotPasswordPage() {
    const [email, setEmail] = useState("");
    const [message, setMessage] = useState("");
    const [error, setError] = useState("");

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError("");
        setMessage("");

        const response = await fetch("/api/admin/forgot-password", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ email }),
        });

        const data = await response.json();

        if (response.ok) {
            setMessage(data.message);
        } else {
            setError(data.error || "An error occurred");
        }
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
            <Card className="w-full max-w-sm">
                <CardHeader>
                    <CardTitle className="text-2xl">Forgot Password</CardTitle>
                    <CardDescription>
                        Enter your email to receive a password reset link.
                    </CardDescription>
                </CardHeader>
                <form onSubmit={handleSubmit}>
                    <CardContent className="grid gap-4">
                        <div className="grid gap-2">
                            <Label htmlFor="email">Email</Label>
                            <Input
                                id="email"
                                type="email"
                                placeholder="m@example.com"
                                required
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                        </div>
                        {message && <p className="text-green-500 text-sm">{message}</p>}
                        {error && <p className="text-red-500 text-sm">{error}</p>}
                    </CardContent>
                    <CardFooter className="flex flex-col">
                        <Button type="submit" className="w-full">
                            Send Reset Link
                        </Button>
                        <div className="mt-4 text-center text-sm">
                            Remember your password?{" "}
                            <Link href="/admin/login" className="underline">
                                Sign in
                            </Link>
                        </div>
                    </CardFooter>
                </form>
            </Card>
        </div>
    );
} 