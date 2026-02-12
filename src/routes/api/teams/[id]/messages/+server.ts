import { prisma } from '$lib/server/prisma';
import { successResponse, errorResponse, parseBody, validateRequired, handleApiError } from '$lib/server/utils';
import type { RequestHandler } from './$types';

export const GET: RequestHandler = async ({ locals, params }) => {
    if (!locals.user) {
        return errorResponse('Not authenticated', 401);
    }

    try {
        const { id } = params; // teamId

        // Check membership
        const member = await prisma.teamMember.findUnique({
            where: {
                teamId_userId: {
                    teamId: id,
                    userId: locals.user.id
                }
            }
        });

        if (!member) {
            return errorResponse('Not a member of this team', 403);
        }

        const messages = await prisma.teamMessage.findMany({
            where: {
                teamId: id
            },
            include: {
                sender: {
                    select: { id: true, name: true, avatar: true }
                }
            },
            orderBy: { createdAt: 'asc' },
            take: 100 // Limit for now
        });

        return successResponse(messages);
    } catch (error) {
        return handleApiError(error);
    }
};

export const POST: RequestHandler = async (event) => {
    const { locals, params } = event;
    if (!locals.user) {
        return errorResponse('Not authenticated', 401);
    }

    try {
        const { id } = params; // teamId
        const body = await parseBody(event);
        validateRequired(body, ['content']);

        const { content } = body;

        // Check membership
        const member = await prisma.teamMember.findUnique({
            where: {
                teamId_userId: {
                    teamId: id,
                    userId: locals.user.id
                }
            }
        });

        if (!member) {
            return errorResponse('Not a member of this team', 403);
        }

        const message = await prisma.teamMessage.create({
            data: {
                content,
                teamId: id,
                senderId: locals.user.id
            },
            include: {
                sender: {
                    select: { id: true, name: true, avatar: true }
                }
            }
        });

        return successResponse(message, 'Message sent successfully');
    } catch (error) {
        return handleApiError(error);
    }
};
