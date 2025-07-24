"use client";

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/contexts/auth-context';
import { SimpleAuthForm } from '@/components/auth/simple-auth-form';
import Link from 'next/link';
import Image from 'next/image';
import { type LoginFormData } from '@/lib/validation/auth';
import { type ApiResponse, type User } from '@/lib/types';

export default function AuthPage() {
  const { isAuthenticated, isLoading, login } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!isLoading && isAuthenticated) {
      router.push('/games');
    }
  }, [isAuthenticated, isLoading, router]);

  const handleAuth = async (data: LoginFormData) => {
    try {
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      const result: ApiResponse<{ user: User; token: string }> = await response.json();

      if (!result.success) {
        throw new Error(result.error?.message || 'Login failed');
      }

      if (result.data) {
        login(result.data.user, result.data.token);
        router.push('/games');
      }
    } catch (error) {
      console.error('Login error:', error);
      throw error;
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="w-8 h-8 border-4 border-gray-300 border-t-gray-600 rounded-full animate-spin"></div>
      </div>
    );
  }

  if (isAuthenticated) {
    return null;
  }

  return (
    <div className="min-h-screen relative flex items-center justify-center">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/images/bg-3.jpg"
          alt="Background"
          fill
          className="object-cover"
          priority
        />
      </div>

      {/* Content */}
      <div className="relative z-10 w-full max-w-md mx-auto px-4">
        {/* Auth Card */}
        <div className="bg-white rounded-2xl shadow-xl p-8">
          {/* Logo */}
          <div className="flex justify-center mb-6">
            <div className="w-16 h-16 bg-black rounded-2xl flex items-center justify-center">
              <span className="text-white text-2xl font-bold">R</span>
            </div>
          </div>

          {/* Title */}
          <h1 className="text-2xl font-semibold text-center text-gray-900 mb-8">
            Sign in or create your account
          </h1>

          {/* Auth Form */}
          <SimpleAuthForm onSubmit={handleAuth} />

          {/* Terms and Privacy */}
          <div className="mt-8 text-center">
            <p className="text-sm text-gray-600">
              By continuing, you agree to our{' '}
              <Link href="/terms" className="underline hover:text-gray-900">
                Terms of service
              </Link>
              , and{' '}
              <Link href="/privacy" className="underline hover:text-gray-900">
                Privacy policy
              </Link>
              .
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}