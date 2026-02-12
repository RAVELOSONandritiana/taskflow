import { prisma } from '$lib/server/prisma';
import { successResponse, errorResponse, handleApiError } from '$lib/server/utils';
import type { RequestHandler } from './$types';

export const PATCH: RequestHandler = async ({ locals, params }) => {
    if (!locals.user) {
        return errorResponse('Not authenticated', 401);
    }

    try {
        const { id } = params;
        const notification = await prisma.notification.update({
            where: { id, userId: locals.user.id },
            data: { read: true }
        });

        return successResponse(notification);
    } catch (error) {
        return handleApiError(error);
    }
};
