import { prisma } from '$lib/server/prisma';
import { successResponse, errorResponse, parseBody, handleApiError } from '$lib/server/utils';
import type { RequestHandler } from './$types';

export const GET: RequestHandler = async ({ params, locals }) => {
    if (!locals.user) {
        return errorResponse('Not authenticated', 401);
    }

    try {
        const { id } = params;

        const workspace = await prisma.workspace.findUnique({
            where: { id },
            include: {
                members: {
                    include: {
                        user: {
                            select: { id: true, name: true, email: true, avatar: true }
                        }
                    }
                },
                projects: true
            }
        });

        if (!workspace) {
            return errorResponse('Workspace not found', 404);
        }

        // Check if user is member
        const isMember = workspace.members.some(m => m.user.id === locals.user?.id);
        if (!isMember) {
            return errorResponse('Unauthorized access to workspace', 403);
        }

        return successResponse(workspace);
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

        // Check permissions (only owner/admin can update)
        const member = await prisma.workspaceMember.findUnique({
            where: {
                workspaceId_userId: {
                    workspaceId: id,
                    userId: locals.user.id
                }
            }
        });

        if (!member || !['owner', 'admin'].includes(member.role)) {
            return errorResponse('Insufficient permissions', 403);
        }

        const updatedWorkspace = await prisma.workspace.update({
            where: { id },
            data: {
                name: body.name,
                description: body.description,
                avatar: body.avatar
            }
        });

        return successResponse(updatedWorkspace, 'Workspace updated successfully');
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
        const member = await prisma.workspaceMember.findUnique({
            where: {
                workspaceId_userId: {
                    workspaceId: id,
                    userId: locals.user.id
                }
            }
        });

        if (!member || member.role !== 'owner') {
            return errorResponse('Only workspace owner can delete workspace', 403);
        }

        await prisma.workspace.delete({
            where: { id }
        });

        return successResponse(null, 'Workspace deleted successfully');
    } catch (error) {
        return handleApiError(error);
    }
};
