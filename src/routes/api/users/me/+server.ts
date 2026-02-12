import { prisma } from '$lib/server/prisma';
import { hashPassword } from '$lib/server/auth';
import { successResponse, errorResponse, parseBody, handleApiError } from '$lib/server/utils';
import type { RequestHandler } from './$types';

export const GET: RequestHandler = async ({ locals }) => {
    if (!locals.user) {
        return errorResponse('Not authenticated', 401);
    }

    const user = await prisma.user.findUnique({
        where: { id: locals.user.id }
    });

    if (!user) {
        return errorResponse('User not found', 404);
    }

    const { password, ...userWithoutPassword } = user;
    return successResponse(userWithoutPassword);
};

export const PATCH: RequestHandler = async (event) => {
    try {
        const { locals } = event;
        if (!locals.user) {
            return errorResponse('Not authenticated', 401);
        }

        const body = await parseBody(event);
        const { name, email, password, avatar, bio, role, phone } = body;

        const updateData: any = {};
        if (name) updateData.name = name;
        if (email) updateData.email = email;
        if (avatar) updateData.avatar = avatar;
        if (bio) updateData.bio = bio;
        if (role) updateData.role = role;
        if (phone) updateData.phone = phone;

        if (password) {
            if (password.length < 8) {
                return errorResponse('Password must be at least 8 characters long');
            }
            updateData.password = await hashPassword(password);
        }

        const updatedUser = await prisma.user.update({
            where: { id: locals.user.id },
            data: updateData
        });

        const { password: _, ...userWithoutPassword } = updatedUser;
        return successResponse(userWithoutPassword, 'Profile updated successfully');
    } catch (error) {
        return handleApiError(error);
    }
};
