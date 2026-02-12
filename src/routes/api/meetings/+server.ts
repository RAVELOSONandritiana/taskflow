import { prisma } from '$lib/server/prisma';
import { successResponse, errorResponse, parseBody, validateRequired, handleApiError } from '$lib/server/utils';
import type { RequestHandler } from './$types';

export const GET: RequestHandler = async ({ locals }) => {
    if (!locals.user) {
        return errorResponse('Not authenticated', 401);
    }

    try {
        // Get meetings where user is a participant
        const meetings = await prisma.meeting.findMany({
            where: {
                participants: { some: { userId: locals.user.id } }
            },
            include: {
                participants: {
                    include: { user: { select: { id: true, name: true, avatar: true } } }
                }
            },
            orderBy: { startTime: 'asc' }
        });

        return successResponse(meetings);
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
        validateRequired(body, ['title', 'startTime', 'endTime']);

        const { title, startTime, endTime, projectId, description } = body;

        const meeting = await prisma.meeting.create({
            data: {
                title,
                description,
                startTime: new Date(startTime),
                endTime: new Date(endTime),
                projectId,
                participants: {
                    create: {
                        userId: locals.user.id,
                        status: 'accepted'
                    }
                }
            }
        });

        return successResponse(meeting, 'Meeting created successfully');
    } catch (error) {
        return handleApiError(error);
    }
};
