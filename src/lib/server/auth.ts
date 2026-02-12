import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import type { User } from '@prisma/client';
import type { RequestEvent } from '@sveltejs/kit';

const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key-change-in-production';
const SALT_ROUNDS = 10;

// Password hashing
export async function hashPassword(password: string): Promise<string> {
    return bcrypt.hash(password, SALT_ROUNDS);
}

export async function verifyPassword(password: string, hash: string): Promise<boolean> {
    return bcrypt.compare(password, hash);
}

// JWT token generation
export function generateToken(userId: string): string {
    return jwt.sign({ userId }, JWT_SECRET, { expiresIn: '7d' });
}

export function verifyToken(token: string): { userId: string } | null {
    try {
        return jwt.verify(token, JWT_SECRET) as { userId: string };
    } catch {
        return null;
    }
}

// Get user from request
export async function getUserFromRequest(event: RequestEvent): Promise<User | null> {
    const token = event.cookies.get('auth_token');

    if (!token) {
        return null;
    }

    const payload = verifyToken(token);
    if (!payload) {
        return null;
    }

    const { prisma } = await import('./prisma');
    const user = await prisma.user.findUnique({
        where: { id: payload.userId }
    });

    return user;
}

// Require authentication middleware
export async function requireAuth(event: RequestEvent): Promise<User> {
    const user = await getUserFromRequest(event);

    if (!user) {
        throw new Error('Unauthorized');
    }

    return user;
}
