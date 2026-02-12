import { prisma } from '$lib/server/prisma';
import { successResponse, errorResponse, parseBody, handleApiError } from '$lib/server/utils';
import type { RequestHandler } from './$types';

export const GET: RequestHandler = async ({ params, locals }) => {
    if (!locals.user) {
        return errorResponse('Not authenticated', 401);
    }

    try {
        const { id } = params;

        const project = await prisma.project.findUnique({
            where: { id },
            include: {
                members: {
                    include: {
                        user: {
                            select: { id: true, name: true, email: true, avatar: true }
                        }
                    }
                },
                workspace: true,
                // Include basic task stats or recent tasks?
                // Keeping it light for now
            }
        });

        if (!project) {
            return errorResponse('Project not found', 404);
        }

        // Check access
        const isMember = project.members.some(m => m.user.id === locals.user?.id);
        if (!isMember) {
            return errorResponse('Unauthorized access to project', 403);
        }

        return successResponse(project);
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

        // Check permissions
        const member = await prisma.projectMember.findUnique({
            where: {
                projectId_userId: {
                    projectId: id,
                    userId: locals.user.id
                }
            }
        });

        if (!member || !['owner', 'admin'].includes(member.role)) {
            return errorResponse('Insufficient permissions', 403);
        }

        const updateData: any = {};
        if (body.name) updateData.name = body.name;
        if (body.description !== undefined) updateData.description = body.description;
        if (body.status) updateData.status = body.status;
        if (body.color) updateData.color = body.color;
        if (body.startDate) updateData.startDate = new Date(body.startDate);
        if (body.endDate) updateData.endDate = new Date(body.endDate);

        const updatedProject = await prisma.project.update({
            where: { id },
            data: updateData
        });

        return successResponse(updatedProject, 'Project updated successfully');
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

        // Check permissions (only owner can delete)
        const member = await prisma.projectMember.findUnique({
            where: {
                projectId_userId: {
                    projectId: id,
                    userId: locals.user.id
                }
            }
        });

        if (!member || member.role !== 'owner') {
            return errorResponse('Only project owner can delete project', 403);
        }

        await prisma.project.delete({
            where: { id }
        });

        return successResponse(null, 'Project deleted successfully');
    } catch (error) {
        return handleApiError(error);
    }
};
