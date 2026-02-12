import { prisma } from '$lib/server/prisma';
import { verifyPassword, generateToken } from '$lib/server/auth';
import { successResponse, errorResponse, parseBody, validateRequired, handleApiError } from '$lib/server/utils';
import type { RequestHandler } from './$types';

export const POST: RequestHandler = async (event) => {
    try {
        const body = await parseBody(event);
        validateRequired(body, ['email', 'password']);

        const { email, password } = body;

        // Find user
        const user = await prisma.user.findUnique({
            where: { email }
        });

        if (!user) {
            return errorResponse('Invalid credentials', 401);
        }

        // Verify password
        const validPassword = await verifyPassword(password, user.password);
        if (!validPassword) {
            return errorResponse('Invalid credentials', 401);
        }

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

        return successResponse({ user: { id: user.id, email: user.email, name: user.name } }, 'Login successful');
    } catch (error) {
        return handleApiError(error);
    }
};
