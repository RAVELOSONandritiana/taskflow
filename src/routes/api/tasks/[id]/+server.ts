import { prisma } from '$lib/server/prisma';
import { successResponse, errorResponse, parseBody, handleApiError } from '$lib/server/utils';
import type { RequestHandler } from './$types';

export const GET: RequestHandler = async ({ params, locals }) => {
    if (!locals.user) {
        return errorResponse('Not authenticated', 401);
    }

    try {
        const { id } = params;

        const task = await prisma.task.findUnique({
            where: { id },
            include: {
                assignees: {
                    include: {
                        user: {
                            select: { id: true, name: true, avatar: true }
                        }
                    }
                },
                project: true
            }
        });

        if (!task) {
            return errorResponse('Task not found', 404);
        }

        // Check access via project
        const projectMember = await prisma.projectMember.findUnique({
            where: {
                projectId_userId: {
                    projectId: task.projectId,
                    userId: locals.user.id
                }
            }
        });

        if (!projectMember) {
            return errorResponse('Unauthorized access to task', 403);
        }

        return successResponse(task);
    } catch (error) {
        return handleApiError(error);
    }
};

export const PATCH: RequestHandler = async (event) => {
    const { locals, params } = event;
    if (!locals.user) {
        return errorResponse('Not authenticated', 401);
    }

    try {
        const { id } = params;
        const body = await parseBody(event);

        // Find task to check permissions
        const task = await prisma.task.findUnique({
            where: { id }
        });

        if (!task) {
            return errorResponse('Task not found', 404);
        }

        // Check permissions
        const member = await prisma.projectMember.findUnique({
            where: {
                projectId_userId: {
                    projectId: task.projectId,
                    userId: locals.user.id
                }
            }
        });

        if (!member) {
            return errorResponse('Insufficient permissions', 403);
        }

        const updateData: any = {};
        if (body.title) updateData.title = body.title;
        if (body.description !== undefined) updateData.description = body.description;
        if (body.status) updateData.status = body.status; // Used for column move
        if (body.priority) updateData.priority = body.priority;
        if (body.position !== undefined) updateData.position = body.position;
        if (body.colId) updateData.status = body.colId; // Frontend might send colId on drag drop

        const updatedTask = await prisma.task.update({
            where: { id },
            data: updateData
        });

        return successResponse(updatedTask, 'Task updated successfully');
    } catch (error) {
        return handleApiError(error);
    }
};

export const DELETE: RequestHandler = async ({ locals, params }) => {
    if (!locals.user) {
        return errorResponse('Not authenticated', 401);
    }

    try {
        const { id } = params;

        const task = await prisma.task.findUnique({
            where: { id },
            select: { projectId: true }
        });

        if (!task) {
            return errorResponse('Task not found', 404);
        }

        // Check permissions
        const member = await prisma.projectMember.findUnique({
            where: {
                projectId_userId: {
                    projectId: task.projectId,
                    userId: locals.user.id
                }
            }
        });

        if (!member) {
            return errorResponse('Unauthorized', 403);
        }

        await prisma.task.delete({
            where: { id }
        });

        return successResponse(null, 'Task deleted successfully');
    } catch (error) {
        return handleApiError(error);
    }
};
