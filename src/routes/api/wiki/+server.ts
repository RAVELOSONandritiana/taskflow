import { prisma } from '$lib/server/prisma';
import { successResponse, errorResponse, parseBody, validateRequired, handleApiError } from '$lib/server/utils';
import type { RequestHandler } from './$types';

export const GET: RequestHandler = async ({ locals }) => {
    if (!locals.user) {
        return errorResponse('Not authenticated', 401);
    }

    try {
        const pages = await prisma.wikiPage.findMany({
            orderBy: { updatedAt: 'desc' },
            include: {
                author: { select: { id: true, name: true } }
            }
        });

        return successResponse(pages);
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
        validateRequired(body, ['title', 'content']);

        const { title, content, projectId } = body;

        const page = await prisma.wikiPage.create({
            data: {
                title,
                content,
                projectId,
                authorId: locals.user.id
            }
        });

        return successResponse(page, 'Wiki page created successfully');
    } catch (error) {
        return handleApiError(error);
    }
};
