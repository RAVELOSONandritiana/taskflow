import { prisma } from '$lib/server/prisma';
import { successResponse, errorResponse, handleApiError } from '$lib/server/utils';
import type { RequestHandler } from './$types';

// Remove member from workspace
export const DELETE: RequestHandler = async ({ locals, params }) => {
    if (!locals.user) {
        return errorResponse('Not authenticated', 401);
    }

    try {
        const { id, userId } = params;

        // Verify requester permissions
        const requester = await prisma.workspaceMember.findUnique({
            where: {
                workspaceId_userId: {
                    workspaceId: id,
                    userId: locals.user.id
                }
            }
        });

        if (!requester || !['owner', 'admin'].includes(requester.role)) {
            // Allow users to leave themselves
            if (userId !== locals.user.id) {
                return errorResponse('Insufficient permissions', 403);
            }
        }

        // Cannot remove owner if they are the last owner (simplified logic: just check if target is owner)
        const targetMember = await prisma.workspaceMember.findUnique({
            where: {
                workspaceId_userId: {
                    workspaceId: id,
                    userId
                }
            }
        });

        if (!targetMember) {
            return errorResponse('Member not found', 404);
        }

        if (targetMember.role === 'owner' && userId !== locals.user.id) {
            return errorResponse('Cannot remove workspace owner', 403);
        }

        await prisma.workspaceMember.delete({
            where: {
                workspaceId_userId: {
                    workspaceId: id,
                    userId
                }
            }
        });

        return successResponse(null, 'Member removed successfully');
    } catch (error) {
        return handleApiError(error);
    }
};
