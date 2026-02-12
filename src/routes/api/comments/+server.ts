import { prisma } from '$lib/server/prisma';
import { successResponse, errorResponse, parseBody, validateRequired, handleApiError } from '$lib/server/utils';
import type { RequestHandler } from './$types';

export const POST: RequestHandler = async (event) => {
    const { locals } = event;
    if (!locals.user) {
        return errorResponse('Not authenticated', 401);
    }

    try {
        const body = await parseBody(event);
        validateRequired(body, ['content']);

        const { content, projectId, taskId } = body;

        if (!projectId && !taskId) {
            return errorResponse('Either projectId or taskId is required', 400);
        }

        const comment = await prisma.comment.create({
            data: {
                content,
                projectId,
                taskId,
                userId: locals.user.id
            },
            include: {
                user: { select: { id: true, name: true, avatar: true } }
            }
        });

        return successResponse(comment, 'Comment added successfully');
    } catch (error) {
        return handleApiError(error);
    }
};
