import { prisma } from '$lib/server/prisma';
import { successResponse, errorResponse, parseBody, validateRequired, handleApiError } from '$lib/server/utils';
import type { RequestHandler } from './$types';

export const GET: RequestHandler = async ({ locals }) => {
    if (!locals.user) {
        return errorResponse('Not authenticated', 401);
    }

    try {
        const conversations = await prisma.aIConversation.findMany({
            where: {
                userId: locals.user.id
            },
            orderBy: { updatedAt: 'desc' }
        });

        return successResponse(conversations);
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
        const { title } = body || { title: 'New Conversation' };

        const conversation = await prisma.aIConversation.create({
            data: {
                userId: locals.user.id,
                title,
                messages: {
                    create: {
                        role: 'system',
                        content: 'You are a helpful assistant.'
                    }
                }
            }
        });

        return successResponse(conversation, 'Conversation created successfully');
    } catch (error) {
        return handleApiError(error);
    }
};
