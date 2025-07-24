import bcrypt from 'bcryptjs';
import jwt, { SignOptions } from 'jsonwebtoken';
import { z } from 'zod';
import prisma from './database';
import { AuthTokenPayload, User } from './types';

// Validation schemas
export const registerSchema = z.object({
  email: z.string().email('Invalid email format').toLowerCase(),
  password: z.string().min(8, 'Password must be at least 8 characters long')
    .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/, 'Password must contain at least one lowercase letter, one uppercase letter, and one number'),
});

export const loginSchema = z.object({
  email: z.string().email('Invalid email format').toLowerCase(),
  password: z.string().min(1, 'Password is required'),
});

// JWT configuration
const JWT_SECRET: string = process.env.JWT_SECRET || 'fallback-secret-key';
const JWT_EXPIRES_IN: string = process.env.JWT_EXPIRES_IN || '1h';

export class AuthService {
  // Hash password using bcrypt
  static async hashPassword(password: string): Promise<string> {
    const saltRounds = 12;
    return bcrypt.hash(password, saltRounds);
  }

  // Verify password against hash
  static async verifyPassword(password: string, hash: string): Promise<boolean> {
    return bcrypt.compare(password, hash);
  }

  // Generate JWT token
  static generateToken(user: User): string {
    const payload = {
      userId: user.id,
      email: user.email,
      role: user.role,
    };

    return jwt.sign(payload, JWT_SECRET, {
      expiresIn: JWT_EXPIRES_IN,
      issuer: 'slot-game-builder',
      audience: 'slot-game-builder-users',
    } as SignOptions);
  }

  // Verify and decode JWT token
  static verifyToken(token: string): AuthTokenPayload {
    console.log(token)
    console.log(JWT_SECRET)
    try {
      return jwt.verify(token, JWT_SECRET, {
        issuer: 'slot-game-builder',
        audience: 'slot-game-builder-users',
      }) as AuthTokenPayload;
    } catch (error) {
      console.log(error)

      if (error instanceof jwt.TokenExpiredError) {
        throw new Error('Token has expired');
      }
      if (error instanceof jwt.JsonWebTokenError) {
        throw new Error('Invalid token');
      }
      throw new Error('Token verification failed');
    }
  }

  // Register new user
  static async register(email: string, password: string): Promise<{ user: User; token: string }> {
    // Validate input
    const validatedData = registerSchema.parse({ email, password });

    // Check if user already exists
    const existingUser = await prisma.user.findUnique({
      where: { email: validatedData.email },
    });

    if (existingUser) {
      throw new Error('User with this email already exists');
    }

    // Hash password
    const passwordHash = await this.hashPassword(validatedData.password);

    // Create user
    const user = await prisma.user.create({
      data: {
        email: validatedData.email,
        passwordHash,
        role: 'owner',
      },
    });

    // Convert to User type
    const userObj: User = {
      id: user.id,
      email: user.email,
      role: user.role,
      stripeCustomerId: user.stripeCustomerId || undefined,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt,
    };

    // Generate token
    const token = this.generateToken(userObj);

    return {
      user: userObj,
      token,
    };
  }

  // Login user
  static async login(email: string, password: string): Promise<{ user: User; token: string }> {
    // Validate input
    const validatedData = loginSchema.parse({ email, password });

    // Find user by email
    const user = await prisma.user.findUnique({
      where: { email: validatedData.email },
    });

    if (!user) {
      throw new Error('Invalid email or password');
    }

    // Verify password
    const isPasswordValid = await this.verifyPassword(validatedData.password, user.passwordHash);

    if (!isPasswordValid) {
      throw new Error('Invalid email or password');
    }

    // Convert to User type
    const userObj: User = {
      id: user.id,
      email: user.email,
      role: user.role,
      stripeCustomerId: user.stripeCustomerId || undefined,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt,
    };

    // Generate token
    const token = this.generateToken(userObj);

    return {
      user: userObj,
      token,
    };
  }

  // Get user by ID
  static async getUserById(userId: string): Promise<User | null> {
    const user = await prisma.user.findUnique({
      where: { id: userId },
    });

    if (!user) {
      return null;
    }

    return {
      id: user.id,
      email: user.email,
      role: user.role,
      stripeCustomerId: user.stripeCustomerId || undefined,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt,
    };
  }

  // Refresh token (generate new token for existing user)
  static async refreshToken(token: string): Promise<{ user: User; token: string }> {
    // Verify current token
    const payload = this.verifyToken(token);

    // Get fresh user data
    const user = await this.getUserById(payload.userId);

    if (!user) {
      throw new Error('User not found');
    }

    // Generate new token
    const newToken = this.generateToken(user);

    return {
      user,
      token: newToken,
    };
  }

  // Extract token from Authorization header
  static extractTokenFromHeader(authHeader: string | null): string | null {
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return null;
    }
    return authHeader.substring(7); // Remove 'Bearer ' prefix
  }

  // Validate password strength
  static validatePasswordStrength(password: string): { isValid: boolean; errors: string[] } {
    const errors: string[] = [];

    if (password.length < 8) {
      errors.push('Password must be at least 8 characters long');
    }

    if (!/[a-z]/.test(password)) {
      errors.push('Password must contain at least one lowercase letter');
    }

    if (!/[A-Z]/.test(password)) {
      errors.push('Password must contain at least one uppercase letter');
    }

    if (!/\d/.test(password)) {
      errors.push('Password must contain at least one number');
    }

    if (!/[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(password)) {
      errors.push('Password must contain at least one special character');
    }

    return {
      isValid: errors.length === 0,
      errors,
    };
  }

  // Check if token is expired (without throwing error)
  static isTokenExpired(token: string): boolean {
    try {
      this.verifyToken(token);
      return false;
    } catch (error) {
      if (error instanceof Error && error.message === 'Token has expired') {
        return true;
      }
      return true; // Consider invalid tokens as expired
    }
  }

  // Get token expiration time
  static getTokenExpiration(token: string): Date | null {
    try {
      const payload = this.verifyToken(token);
      return new Date(payload.exp * 1000);
    } catch {
      return null;
    }
  }

  // Generate a secure random password (for password reset)
  static generateSecurePassword(length: number = 12): string {
    const lowercase = 'abcdefghijklmnopqrstuvwxyz';
    const uppercase = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    const numbers = '0123456789';
    const symbols = '!@#$%^&*()_+-=[]{}|;:,.<>?';
    const allChars = lowercase + uppercase + numbers + symbols;

    let password = '';
    
    // Ensure at least one character from each category
    password += lowercase[Math.floor(Math.random() * lowercase.length)];
    password += uppercase[Math.floor(Math.random() * uppercase.length)];
    password += numbers[Math.floor(Math.random() * numbers.length)];
    password += symbols[Math.floor(Math.random() * symbols.length)];

    // Fill the rest randomly
    for (let i = 4; i < length; i++) {
      password += allChars[Math.floor(Math.random() * allChars.length)];
    }

    // Shuffle the password
    return password.split('').sort(() => Math.random() - 0.5).join('');
  }
}

// Helper function for API routes to verify JWT and get user
export async function verifyJWT(token: string): Promise<User | null> {
  try {
    const payload = AuthService.verifyToken(token);
    const user = await AuthService.getUserById(payload.userId);
    return user;
  } catch (error) {
    console.error('JWT verification failed:', error);
    return null;
  }
}