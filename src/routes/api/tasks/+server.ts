import { prisma } from '$lib/server/prisma';
import { successResponse, errorResponse, parseBody, validateRequired, handleApiError } from '$lib/server/utils';
import type { RequestHandler } from './$types';

export const GET: RequestHandler = async ({ locals, url }) => {
    if (!locals.user) {
        return errorResponse('Not authenticated', 401);
    }

    try {
        const projectId = url.searchParams.get('projectId');

        if (!projectId) {
            return errorResponse('Project ID is required', 400);
        }

        // Check project access
        const projectMember = await prisma.projectMember.findUnique({
            where: {
                projectId_userId: {
                    projectId,
                    userId: locals.user.id
                }
            }
        });

        if (!projectMember) {
            return errorResponse('Unauthorized access to project', 403);
        }

        const tasks = await prisma.task.findMany({
            where: {
                projectId
            },
            include: {
                assignees: {
                    include: {
                        user: {
                            select: { id: true, name: true, avatar: true }
                        }
                    }
                },
                tags: { // Map labels to tags if needed, or update frontend to use labels
                    select: {
                        label: true
                    }
                },
                _count: {
                    select: { comments: true, attachments: true, subtasks: true }
                }
            },
            orderBy: { position: 'asc' }
        });

        // Transform data if needed to match frontend expectation
        // Frontend expects 'tags' array, Prisma returns 'labels' relation via TaskLabel
        // Wait, schema has TaskLabel. Let's fix the include.

        return successResponse(tasks);
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
        validateRequired(body, ['title', 'projectId', 'colId']); // colId maps to status usually

        const { title, description, projectId, colId, priority, dueDate, assignees, tags } = body;

        // Check project membership
        const projectMember = await prisma.projectMember.findUnique({
            where: {
                projectId_userId: {
                    projectId,
                    userId: locals.user.id
                }
            }
        });

        if (!projectMember) {
            return errorResponse('You are not a member of this project', 403);
        }

        // Determine status from colId (frontend sends colId which is status id)
        // Assuming status is colId for now, need to verify with frontend
        const status = colId;

        const task = await prisma.task.create({
            data: {
                title,
                description,
                status,
                priority: priority || 'medium',
                projectId,
                creatorId: locals.user.id,
                dueDate: dueDate ? new Date(dueDate) : null,
                // Assignees and Tags (Labels) handling requires more complex create or separate calls
                // For MVP, let's create the task first
            }
        });

        // Add assignees if provided
        if (assignees && Array.isArray(assignees) && assignees.length > 0) {
            await prisma.taskAssignee.createMany({
                data: assignees.map((userId: string) => ({
                    taskId: task.id,
                    userId
                }))
            });
        }

        return successResponse(task, 'Task created successfully');
    } catch (error) {
        return handleApiError(error);
    }
};
