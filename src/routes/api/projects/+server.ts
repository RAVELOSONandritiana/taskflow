import { prisma } from '$lib/server/prisma';
import { successResponse, errorResponse, parseBody, validateRequired, handleApiError } from '$lib/server/utils';
import type { RequestHandler } from './$types';

export const GET: RequestHandler = async ({ locals, url }) => {
    if (!locals.user) {
        return errorResponse('Not authenticated', 401);
    }

    try {
        const workspaceId = url.searchParams.get('workspaceId');

        const projects = await prisma.project.findMany({
            where: {
                ...(workspaceId ? { workspaceId } : {}),
                members: {
                    some: {
                        userId: locals.user.id
                    }
                }
            },
            include: {
                _count: {
                    select: { tasks: true, members: true }
                },
                workspace: {
                    select: { name: true }
                }
            },
            orderBy: { updatedAt: 'desc' }
        });

        return successResponse(projects);
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

        const { name, description, color, workspaceId, startDate, endDate, status } = body;

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

        const project = await prisma.project.create({
            data: {
                name,
                description,
                color,
                startDate: startDate ? new Date(startDate) : null,
                endDate: endDate ? new Date(endDate) : null,
                status: status || 'active',
                workspaceId,
                creatorId: locals.user.id,
                members: {
                    create: {
                        userId: locals.user.id,
                        role: 'owner'
                    }
                }
            }
        });

        return successResponse(project, 'Project created successfully');
    } catch (error) {
        return handleApiError(error);
    }
};
