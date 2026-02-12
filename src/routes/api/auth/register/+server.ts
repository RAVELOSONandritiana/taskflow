import { prisma } from '$lib/server/prisma';
import { hashPassword, generateToken } from '$lib/server/auth';
import { successResponse, errorResponse, parseBody, validateRequired, isValidEmail, handleApiError } from '$lib/server/utils';
import type { RequestHandler } from './$types';

export const POST: RequestHandler = async (event) => {
    try {
        const body = await parseBody(event);
        validateRequired(body, ['email', 'password', 'name']);

        const { email, password, name } = body;

        if (!isValidEmail(email)) {
            return errorResponse('Invalid email format');
        }

        if (password.length < 8) {
            return errorResponse('Password must be at least 8 characters long');
        }

        // Check if user exists
        const existingUser = await prisma.user.findUnique({
            where: { email }
        });

        if (existingUser) {
            return errorResponse('Email already registered');
        }

        // Create user
        const hashedPassword = await hashPassword(password);
        const user = await prisma.user.create({
            data: {
                email,
                password: hashedPassword,
                name
            }
        });

        // Generate token
        const token = generateToken(user.id);

        // Set cookie
        event.cookies.set('auth_token', token, {
            path: '/',
            httpOnly: true,
            sameSite: 'lax',
            secure: process.env.NODE_ENV === 'production',
            maxAge: 60 * 60 * 24 * 7 // 7 days
        });

        return successResponse({ user: { id: user.id, email: user.email, name: user.name } }, 'User registered successfully');
    } catch (error) {
        return handleApiError(error);
    }
};
