import { prisma } from '$lib/server/prisma';
import { successResponse, errorResponse, parseBody, validateRequired, handleApiError } from '$lib/server/utils';
import type { RequestHandler } from './$types';

export const POST: RequestHandler = async (event) => {
    const { locals } = event;
    if (!locals.user) {
        return errorResponse('Not authenticated', 401);
    }

    try {
        const body = await parseBody(event);
        validateRequired(body, ['filename', 'url', 'size', 'mimeType']);

        const { filename, url, size, mimeType, projectId, taskId } = body;

        // In a real app, this endpoint might handle file upload (multipart/form-data) 
        // or just receive metadata after client-side upload (e.g. S3 presigned URL).
        // Here we assume metadata only for simplicity.

        const attachment = await prisma.attachment.create({
            data: {
                filename,
                url,
                size,
                mimeType,
                projectId,
                taskId,
                userId: locals.user.id
            }
        });

        return successResponse(attachment, 'Attachment added successfully');
    } catch (error) {
        return handleApiError(error);
    }
};
