import { prisma } from '$lib/server/prisma';
import { successResponse, errorResponse, parseBody, validateRequired, handleApiError } from '$lib/server/utils';
import type { RequestHandler } from './$types';

export const GET: RequestHandler = async ({ locals }) => {
    if (!locals.user) {
        return errorResponse('Not authenticated', 401);
    }

    try {
        const timeEntries = await prisma.timeEntry.findMany({
            where: {
                userId: locals.user.id
            },
            orderBy: { startTime: 'desc' },
            take: 50
        });

        return successResponse(timeEntries);
    } catch (error) {
        return handleApiError(error);
    }
};

export const POST: RequestHandler = async (event) => {
    const { locals } = event;
    if (!locals.user) {
        return errorResponse('Not authenticated', 401);
    }

    try {
        const body = await parseBody(event);
        // If ID provided, maybe stop timer. If not, start new.

        if (body.action === 'stop') {
            validateRequired(body, ['id']);
            const { id } = body;
            const entry = await prisma.timeEntry.update({
                where: { id, userId: locals.user.id },
                data: { endTime: new Date() }
            });
            return successResponse(entry, 'Timer stopped');
        } else {
            // Start timer
            const { description, projectId, taskId } = body; // Optional
            const entry = await prisma.timeEntry.create({
                data: {
                    userId: locals.user.id,
                    description,
                    projectId,
                    taskId,
                    startTime: new Date()
                }
            });
            return successResponse(entry, 'Timer started');
        }

    } catch (error) {
        return handleApiError(error);
    }
};
