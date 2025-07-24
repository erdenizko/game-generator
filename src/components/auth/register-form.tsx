"use client";

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Eye, EyeOff, Loader2, Check, X } from 'lucide-react';
import { registerSchema, type RegisterFormData, checkPasswordStrength } from '@/lib/validation/auth';
import { Input } from '@/components/ui/input';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { cn } from '@/lib/utils';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

interface RegisterFormProps {
  onSubmit: (data: RegisterFormData) => Promise<void>;
  onSwitchToLogin: () => void;
  isLoading?: boolean;
  error?: string;
}

export function RegisterForm({ onSubmit, onSwitchToLogin, isLoading = false, error }: RegisterFormProps) {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const form = useForm<RegisterFormData>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      email: '',
      password: '',
      confirmPassword: '',
    },
  });

  const password = form.watch('password');
  const passwordStrength = password ? checkPasswordStrength(password) : { score: 0, feedback: [] };

  const handleSubmit = async (data: RegisterFormData) => {
    try {
      await onSubmit(data);
    } catch (error) {
      // Error handling is managed by parent component
      console.error('Register form error:', error);
    }
  };

  const getStrengthColor = (score: number) => {
    if (score <= 1) return 'bg-red-500';
    if (score <= 2) return 'bg-orange-500';
    if (score <= 3) return 'bg-yellow-500';
    if (score <= 4) return 'bg-blue-500';
    return 'bg-green-500';
  };

  const getStrengthText = (score: number) => {
    if (score <= 1) return 'Very Weak';
    if (score <= 2) return 'Weak';
    if (score <= 3) return 'Fair';
    if (score <= 4) return 'Good';
    return 'Strong';
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
          Create Account
        </h2>
        <p className="text-sky-200/80">
          Sign up to start building your slot games
        </p>
      </div>

      {/* Form Content */}
      <div className="px-8 pb-8">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-6">
            {error && (
              <div 
                className="p-4 text-sm text-red-100 rounded-md border"
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
                        placeholder="Create a password"
                        disabled={isLoading}
                        autoComplete="new-password"
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
                  
                  {password && (
                    <div className="space-y-3 mt-3">
                      <div className="flex items-center space-x-3">
                        <div 
                          className="flex-1 rounded-full h-2 overflow-hidden"
                          style={{
                            background: "rgba(255, 255, 255, 0.1)"
                          }}
                        >
                          <div
                            className={cn(
                              'h-2 rounded-full transition-all duration-300',
                              passwordStrength.score <= 1 ? 'bg-red-400' :
                              passwordStrength.score <= 2 ? 'bg-orange-400' :
                              passwordStrength.score <= 3 ? 'bg-yellow-400' :
                              passwordStrength.score <= 4 ? 'bg-blue-400' : 'bg-green-400'
                            )}
                            style={{ width: `${(passwordStrength.score / 5) * 100}%` }}
                          />
                        </div>
                        <span className="text-xs font-medium text-sky-200">
                          {getStrengthText(passwordStrength.score)}
                        </span>
                      </div>
                      
                      {passwordStrength.feedback.length > 0 && (
                        <div className="space-y-2">
                          <p className="text-xs text-sky-200/80">Password requirements:</p>
                          <div className="grid grid-cols-1 gap-1">
                            {[
                              'At least 8 characters',
                              'One lowercase letter',
                              'One uppercase letter',
                              'One number',
                              'One special character'
                            ].map((requirement) => {
                              const isComplete = !passwordStrength.feedback.includes(requirement);
                              return (
                                <div key={requirement} className="flex items-center space-x-2">
                                  {isComplete ? (
                                    <Check className="h-3 w-3 text-green-400" />
                                  ) : (
                                    <X className="h-3 w-3 text-red-400" />
                                  )}
                                  <span className={cn(
                                    'text-xs',
                                    isComplete ? 'text-green-300' : 'text-red-300'
                                  )}>
                                    {requirement}
                                  </span>
                                </div>
                              );
                            })}
                          </div>
                        </div>
                      )}
                    </div>
                  )}
                  
                  <FormMessage className="text-red-300" />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="confirmPassword"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-white font-medium">Confirm Password</FormLabel>
                  <FormControl>
                    <div className="relative">
                      <Input
                        {...field}
                        type={showConfirmPassword ? 'text' : 'password'}
                        placeholder="Confirm your password"
                        disabled={isLoading}
                        autoComplete="new-password"
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
                        onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                        disabled={isLoading}
                      >
                        {showConfirmPassword ? (
                          <EyeOff className="h-5 w-5" />
                        ) : (
                          <Eye className="h-5 w-5" />
                        )}
                        <span className="sr-only">
                          {showConfirmPassword ? 'Hide password' : 'Show password'}
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
                  Creating account...
                </div>
              ) : (
                'Create Account'
              )}
            </button>

            <div className="text-center">
              <span className="text-sky-200/80">Already have an account? </span>
              <button
                type="button"
                className="text-sky-300 hover:text-white font-medium transition-colors duration-200 underline underline-offset-2"
                onClick={onSwitchToLogin}
                disabled={isLoading}
              >
                Sign in
              </button>
            </div>
          </form>
        </Form>
      </div>
    </div>
  );
}