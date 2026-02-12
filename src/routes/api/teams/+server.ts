import { prisma } from '$lib/server/prisma';
import { successResponse, errorResponse, parseBody, validateRequired, handleApiError } from '$lib/server/utils';
import type { RequestHandler } from './$types';

export const GET: RequestHandler = async ({ locals }) => {
    if (!locals.user) {
        return errorResponse('Not authenticated', 401);
    }

    try {
        // Get teams user is a member of
        const teams = await prisma.team.findMany({
            where: {
                members: {
                    some: {
                        userId: locals.user.id
                    }
                }
            },
            include: {
                _count: {
                    select: { members: true }
                },
                members: {
                    take: 3,
                    include: {
                        user: {
                            select: { name: true, avatar: true }
                        }
                    }
                }
            }
        });

        return successResponse(teams);
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
        validateRequired(body, ['name', 'workspaceId']);

        const { name, description, workspaceId } = body;

        // Check workspace membership
        const workspaceMember = await prisma.workspaceMember.findUnique({
            where: {
                workspaceId_userId: {
                    workspaceId,
                    userId: locals.user.id
                }
            }
        });

        if (!workspaceMember) {
            return errorResponse('You are not a member of this workspace', 403);
        }

        const team = await prisma.team.create({
            data: {
                name,
                description,
                workspaceId,
                members: {
                    create: {
                        userId: locals.user.id,
                        role: 'admin'
                    }
                }
            }
        });

        return successResponse(team, 'Team created successfully');
    } catch (error) {
        return handleApiError(error);
    }
};
