import { prisma } from '$lib/server/prisma';
import { successResponse, errorResponse, handleApiError } from '$lib/server/utils';
import type { RequestHandler } from './$types';

export const GET: RequestHandler = async ({ locals }) => {
    if (!locals.user) {
        return errorResponse('Not authenticated', 401);
    }

    try {
        const notifications = await prisma.notification.findMany({
            where: {
                userId: locals.user.id
            },
            orderBy: { createdAt: 'desc' },
            take: 50
        });

        return successResponse(notifications);
    } catch (error) {
        return handleApiError(error);
    }
};
