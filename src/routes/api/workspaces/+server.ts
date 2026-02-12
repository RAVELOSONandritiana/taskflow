import { prisma } from '$lib/server/prisma';
import { successResponse, errorResponse, parseBody, validateRequired, handleApiError } from '$lib/server/utils';
import type { RequestHandler } from './$types';

export const GET: RequestHandler = async ({ locals }) => {
    if (!locals.user) {
        return errorResponse('Not authenticated', 401);
    }

    try {
        const workspaces = await prisma.workspace.findMany({
            where: {
                members: {
                    some: {
                        userId: locals.user.id
                    }
                }
            },
            include: {
                _count: {
                    select: { members: true, projects: true }
                }
            },
            orderBy: { createdAt: 'desc' }
        });

        return successResponse(workspaces);
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
        validateRequired(body, ['name']);

        const { name, description, avatar } = body;

        // Create workspace and add creator as owner
        const workspace = await prisma.workspace.create({
            data: {
                name,
                description,
                avatar,
                members: {
                    create: {
                        userId: locals.user.id,
                        role: 'owner'
                    }
                }
            }
        });

        return successResponse(workspace, 'Workspace created successfully');
    } catch (error) {
        return handleApiError(error);
    }
};
