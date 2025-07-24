"use client";

import React, { createContext, useContext, useEffect, useState, useCallback } from 'react';
import { type User, type ApiResponse } from '@/lib/types';

interface AuthContextType {
  user: User | null;
  token: string | null;
  isLoading: boolean;
  isAuthenticated: boolean;
  login: (user: User, token: string) => void;
  logout: () => void;
  refreshToken: () => Promise<boolean>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const TOKEN_KEY = 'auth_token';
const USER_KEY = 'auth_user';
const TOKEN_REFRESH_THRESHOLD = 5 * 60 * 1000; // 5 minutes before expiration

interface AuthProviderProps {
  children: React.ReactNode;
}

export function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Check if token is expired or about to expire
  const isTokenExpired = useCallback((token: string): boolean => {
    try {
      const payload = JSON.parse(atob(token.split('.')[1]));
      const currentTime = Date.now() / 1000;
      return payload.exp <= currentTime;
    } catch {
      return true;
    }
  }, []);

  // Check if token needs refresh (within 5 minutes of expiration)
  const shouldRefreshToken = useCallback((token: string): boolean => {
    try {
      const payload = JSON.parse(atob(token.split('.')[1]));
      const currentTime = Date.now() / 1000;
      const timeUntilExpiry = (payload.exp - currentTime) * 1000;
      return timeUntilExpiry <= TOKEN_REFRESH_THRESHOLD;
    } catch {
      return false;
    }
  }, []);

  // Refresh token function
  const refreshToken = useCallback(async (): Promise<boolean> => {
    const currentToken = localStorage.getItem(TOKEN_KEY);
    if (!currentToken || isTokenExpired(currentToken)) {
      return false;
    }

    try {
      const response = await fetch('/api/auth/refresh', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${currentToken}`,
        },
      });

      const result: ApiResponse<{ user: User; token: string }> = await response.json();

      if (result.success && result.data) {
        const { user: refreshedUser, token: newToken } = result.data;
        
        // Update localStorage
        localStorage.setItem(TOKEN_KEY, newToken);
        localStorage.setItem(USER_KEY, JSON.stringify(refreshedUser));
        
        // Update state
        setToken(newToken);
        setUser(refreshedUser);
        
        return true;
      }
      
      return false;
    } catch (error) {
      console.error('Token refresh failed:', error);
      return false;
    }
  }, [isTokenExpired]);

  // Login function
  const login = useCallback((user: User, token: string) => {
    localStorage.setItem(TOKEN_KEY, token);
    localStorage.setItem(USER_KEY, JSON.stringify(user));
    setToken(token);
    setUser(user);
  }, []);

  // Logout function
  const logout = useCallback(() => {
    localStorage.removeItem(TOKEN_KEY);
    localStorage.removeItem(USER_KEY);
    setToken(null);
    setUser(null);
  }, []);

  // Initialize auth state from localStorage
  useEffect(() => {
    const initializeAuth = async () => {
      try {
        const storedToken = localStorage.getItem(TOKEN_KEY);
        const storedUser = localStorage.getItem(USER_KEY);

        if (!storedToken || !storedUser) {
          setIsLoading(false);
          return;
        }

        // Check if token is expired
        if (isTokenExpired(storedToken)) {
          logout();
          setIsLoading(false);
          return;
        }

        // Parse stored user
        const parsedUser: User = JSON.parse(storedUser);

        // Check if token needs refresh
        if (shouldRefreshToken(storedToken)) {
          const refreshSuccess = await refreshToken();
          if (!refreshSuccess) {
            logout();
            setIsLoading(false);
            return;
          }
        } else {
          // Token is still valid, set auth state
          setToken(storedToken);
          setUser(parsedUser);
        }
      } catch (error) {
        console.error('Auth initialization error:', error);
        logout();
      } finally {
        setIsLoading(false);
      }
    };

    initializeAuth();
  }, [isTokenExpired, shouldRefreshToken, refreshToken, logout]);

  // Set up automatic token refresh
  useEffect(() => {
    if (!token || !user) return;

    const checkTokenRefresh = async () => {
      if (shouldRefreshToken(token)) {
        const refreshSuccess = await refreshToken();
        if (!refreshSuccess) {
          logout();
        }
      }
    };

    // Check every minute
    const interval = setInterval(checkTokenRefresh, 60 * 1000);

    return () => clearInterval(interval);
  }, [token, user, shouldRefreshToken, refreshToken, logout]);

  const value: AuthContextType = {
    user,
    token,
    isLoading,
    isAuthenticated: !!user && !!token,
    login,
    logout,
    refreshToken,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth(): AuthContextType {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}