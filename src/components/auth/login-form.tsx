"use client";

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Eye, EyeOff, Loader2 } from 'lucide-react';
import { loginSchema, type LoginFormData } from '@/lib/validation/auth';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';

interface LoginFormProps {
  onSubmit: (data: LoginFormData) => Promise<void>;
  onSwitchToRegister: () => void;
  isLoading?: boolean;
  error?: string;
}

export function LoginForm({ onSubmit, onSwitchToRegister, isLoading = false, error }: LoginFormProps) {
  const [showPassword, setShowPassword] = useState(false);

  const form = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const handleSubmit = async (data: LoginFormData) => {
    try {
      await onSubmit(data);
    } catch (error) {
      // Error handling is managed by parent component
      console.error('Login form error:', error);
    }
  };

  return (
    <div 
      className="w-full max-w-md mx-auto backdrop-blur-xl rounded-3xl border shadow-2xl overflow-hidden"
      style={{
        background: `
          linear-gradient(135deg, 
            rgba(255, 255, 255, 0.15) 0%, 
            rgba(14, 165, 233, 0.1) 25%, 
            rgba(6, 182, 212, 0.08) 50%, 
            rgba(139, 92, 246, 0.1) 75%, 
            rgba(255, 255, 255, 0.12) 100%
          ),
          linear-gradient(45deg, 
            rgba(14, 165, 233, 0.05) 0%, 
            rgba(6, 182, 212, 0.05) 50%, 
            rgba(139, 92, 246, 0.05) 100%
          )
        `,
        borderColor: "rgba(255, 255, 255, 0.2)",
        boxShadow: `
          0 25px 50px -12px rgba(0, 0, 0, 0.25),
          0 0 0 1px rgba(255, 255, 255, 0.1),
          inset 0 1px 0 rgba(255, 255, 255, 0.2)
        `
      }}
    >
      {/* Header with gradient */}
      <div className="px-8 pt-8 pb-6 text-center">
        <h2 className="text-3xl font-bold text-white mb-2">
          Welcome Back
        </h2>
        <p className="text-sky-200/80">
          Sign in to continue building amazing games
        </p>
      </div>

      {/* Form Content */}
      <div className="px-8 pb-8">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-6">
            {error && (
              <div 
                className="p-4 text-sm text-red-100 rounded-2xl border"
                style={{
                  background: `
                    linear-gradient(135deg, 
                      rgba(239, 68, 68, 0.15) 0%, 
                      rgba(220, 38, 38, 0.1) 100%
                    )
                  `,
                  borderColor: "rgba(239, 68, 68, 0.3)",
                  backdropFilter: "blur(10px)"
                }}
              >
                {error}
              </div>
            )}

            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-white font-medium">Email</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      type="email"
                      placeholder="Enter your email"
                      disabled={isLoading}
                      autoComplete="email"
                      className="h-12 rounded-md border-0 text-white placeholder:text-sky-200/60 focus:ring-2 focus:ring-sky-400/50 transition-all duration-200"
                      style={{
                        background: `
                          linear-gradient(135deg, 
                            rgba(255, 255, 255, 0.1) 0%, 
                            rgba(14, 165, 233, 0.08) 50%, 
                            rgba(6, 182, 212, 0.06) 100%
                          )
                        `,
                        backdropFilter: "blur(10px)",
                        boxShadow: "inset 0 2px 4px rgba(0, 0, 0, 0.1)"
                      }}
                    />
                  </FormControl>
                  <FormMessage className="text-red-300" />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-white font-medium">Password</FormLabel>
                  <FormControl>
                    <div className="relative">
                      <Input
                        {...field}
                        type={showPassword ? 'text' : 'password'}
                        placeholder="Enter your password"
                        disabled={isLoading}
                        autoComplete="current-password"
                        className="h-12 rounded-md border-0 text-white placeholder:text-sky-200/60 focus:ring-2 focus:ring-sky-400/50 transition-all duration-200 pr-12"
                        style={{
                          background: `
                            linear-gradient(135deg, 
                              rgba(255, 255, 255, 0.1) 0%, 
                              rgba(14, 165, 233, 0.08) 50%, 
                              rgba(6, 182, 212, 0.06) 100%
                            )
                          `,
                          backdropFilter: "blur(10px)",
                          boxShadow: "inset 0 2px 4px rgba(0, 0, 0, 0.1)"
                        }}
                      />
                      <button
                        type="button"
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-sky-200/80 hover:text-white transition-colors duration-200"
                        onClick={() => setShowPassword(!showPassword)}
                        disabled={isLoading}
                      >
                        {showPassword ? (
                          <EyeOff className="h-5 w-5" />
                        ) : (
                          <Eye className="h-5 w-5" />
                        )}
                        <span className="sr-only">
                          {showPassword ? 'Hide password' : 'Show password'}
                        </span>
                      </button>
                    </div>
                  </FormControl>
                  <FormMessage className="text-red-300" />
                </FormItem>
              )}
            />

            <button
              type="submit"
              disabled={isLoading}
              className="w-full h-12 rounded-md font-semibold text-white transition-all duration-300 hover:scale-[1.02] active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
              style={{
                background: `
                  linear-gradient(135deg, 
                    rgba(14, 165, 233, 0.9) 0%, 
                    rgba(6, 182, 212, 0.8) 25%, 
                    rgba(59, 130, 246, 0.8) 50%, 
                    rgba(139, 92, 246, 0.8) 75%, 
                    rgba(14, 165, 233, 0.9) 100%
                  )
                `,
                boxShadow: `
                  0 10px 25px -5px rgba(14, 165, 233, 0.4),
                  0 0 0 1px rgba(255, 255, 255, 0.1),
                  inset 0 1px 0 rgba(255, 255, 255, 0.2)
                `
              }}
            >
              {isLoading ? (
                <div className="flex items-center justify-center">
                  <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                  Signing in...
                </div>
              ) : (
                'Sign In'
              )}
            </button>

            <div className="text-center">
              <span className="text-sky-200/80">Don&apos;t have an account? </span>
              <button
                type="button"
                className="text-sky-300 hover:text-white font-medium transition-colors duration-200 underline underline-offset-2"
                onClick={onSwitchToRegister}
                disabled={isLoading}
              >
                Sign up
              </button>
            </div>
          </form>
        </Form>
      </div>
    </div>
  );
}