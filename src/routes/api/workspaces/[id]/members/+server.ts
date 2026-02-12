import { prisma } from '$lib/server/prisma';
import { successResponse, errorResponse, parseBody, validateRequired, handleApiError } from '$lib/server/utils';
import type { RequestHandler } from './$types';

// Add member to workspace
export const POST: RequestHandler = async (event) => {
    const { locals, params } = event;
    if (!locals.user) {
        return errorResponse('Not authenticated', 401);
    }

    try {
        const { id } = params;
        const body = await parseBody(event);
        validateRequired(body, ['email']);

        const { email, role = 'member' } = body;

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
            return errorResponse('Insufficient permissions', 403);
        }

        // Find user to add
        const userToAdd = await prisma.user.findUnique({
            where: { email }
        });

        if (!userToAdd) {
            return errorResponse('User not found', 404);
        }

        // Check if already member
        const existingMember = await prisma.workspaceMember.findUnique({
            where: {
                workspaceId_userId: {
                    workspaceId: id,
                    userId: userToAdd.id
                }
            }
        });

        if (existingMember) {
            return errorResponse('User is already a member of this workspace', 400);
        }

        const newMember = await prisma.workspaceMember.create({
            data: {
                workspaceId: id,
                userId: userToAdd.id,
                role
            },
            include: {
                user: {
                    select: { id: true, name: true, email: true, avatar: true }
                }
            }
        });

        return successResponse(newMember, 'Member added successfully');
    } catch (error) {
        return handleApiError(error);
    }
};
