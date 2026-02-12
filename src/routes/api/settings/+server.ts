import { prisma } from '$lib/server/prisma';
import { successResponse, errorResponse, parseBody, handleApiError } from '$lib/server/utils';
import type { RequestHandler } from './$types';

export const GET: RequestHandler = async ({ locals }) => {
    if (!locals.user) {
        return errorResponse('Not authenticated', 401);
    }

    try {
        let settings = await prisma.userSettings.findUnique({
            where: { userId: locals.user.id }
        });

        if (!settings) {
            // Create default settings if not exist
            settings = await prisma.userSettings.create({
                data: { userId: locals.user.id }
            });
        }

        return successResponse(settings);
    } catch (error) {
        return handleApiError(error);
    }
};

export const PATCH: RequestHandler = async (event) => {
    const { locals } = event;
    if (!locals.user) {
        return errorResponse('Not authenticated', 401);
    }

    try {
        const body = await parseBody(event);

        // Remove id and userId from body to prevent overwrite
        const { id, userId, createdAt, updatedAt, ...updateData } = body;

        const settings = await prisma.userSettings.upsert({
            where: { userId: locals.user.id },
            update: updateData,
            create: {
                userId: locals.user.id,
                ...updateData
            }
        });

        return successResponse(settings, 'Settings updated successfully');
    } catch (error) {
        return handleApiError(error);
    }
};
