"use client";

import { useState } from 'react';
import { LoginForm } from './login-form';
import { RegisterForm } from './register-form';
import { useAuth } from '@/contexts/auth-context';
import { type LoginFormData, type RegisterFormData } from '@/lib/validation/auth';
import { type ApiResponse, type User } from '@/lib/types';

interface AuthFormsProps {
  onAuthSuccess: () => void;
  initialMode?: 'login' | 'register';
}

export function AuthForms({ onAuthSuccess, initialMode = 'login' }: AuthFormsProps) {
  const { login } = useAuth();
  const [mode, setMode] = useState<'login' | 'register'>(initialMode);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string>('');

  const handleLogin = async (data: LoginFormData) => {
    setIsLoading(true);
    setError('');

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
        setError(result.error?.message || 'Login failed');
        return;
      }

      if (result.data) {
        login(result.data.user, result.data.token);
        onAuthSuccess();
      }
    } catch (error) {
      console.error('Login error:', error);
      setError('An unexpected error occurred. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleRegister = async (data: RegisterFormData) => {
    setIsLoading(true);
    setError('');

    try {
      const response = await fetch('/api/auth/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: data.email,
          password: data.password,
        }),
      });

      const result: ApiResponse<{ user: User; token: string }> = await response.json();

      if (!result.success) {
        setError(result.error?.message || 'Registration failed');
        return;
      }

      if (result.data) {
        login(result.data.user, result.data.token);
        onAuthSuccess();
      }
    } catch (error) {
      console.error('Registration error:', error);
      setError('An unexpected error occurred. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const switchToRegister = () => {
    setMode('register');
    setError('');
  };

  const switchToLogin = () => {
    setMode('login');
    setError('');
  };

  if (mode === 'register') {
    return (
      <RegisterForm
        onSubmit={handleRegister}
        onSwitchToLogin={switchToLogin}
        isLoading={isLoading}
        error={error}
      />
    );
  }

  return (
    <LoginForm
      onSubmit={handleLogin}
      onSwitchToRegister={switchToRegister}
      isLoading={isLoading}
      error={error}
    />
  );
}