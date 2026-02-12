import { prisma } from '$lib/server/prisma';
import { successResponse, errorResponse, parseBody, validateRequired, handleApiError } from '$lib/server/utils';
import type { RequestHandler } from './$types';

export const GET: RequestHandler = async ({ locals, params }) => {
    if (!locals.user) {
        return errorResponse('Not authenticated', 401);
    }

    try {
        const { id } = params;
        const messages = await prisma.aIMessage.findMany({
            where: {
                conversationId: id,
                conversation: {
                    userId: locals.user.id
                }
            },
            orderBy: { createdAt: 'asc' }
        });

        return successResponse(messages);
    } catch (error) {
        return handleApiError(error);
    }
}

export const POST: RequestHandler = async (event) => {
    const { locals, params } = event;
    if (!locals.user) {
        return errorResponse('Not authenticated', 401);
    }

    try {
        const { id } = params;
        const body = await parseBody(event);
        validateRequired(body, ['content']);

        const { content } = body;

        // Verify ownership
        const conversation = await prisma.aIConversation.findUnique({
            where: { id, userId: locals.user.id }
        });

        if (!conversation) {
            return errorResponse('Conversation not found', 404);
        }

        // Save user message
        const userMessage = await prisma.aIMessage.create({
            data: {
                content,
                role: 'user',
                conversationId: id
            }
        });

        // Generate AI response
        // For MVP, we'll mock the AI response. 
        // In real app, call OpenAI/Anthropic/Puter.js here.
        // Or if using Puter.js in frontend, we might just store messages here.
        // Assuming we store here and maybe process in background or return mocked.
        // Let's return a mock response for now to complete the flow.

        const aiResponseContent = `I received your message: "${content}". I am a helpful AI assistant.`;

        const aiMessage = await prisma.aIMessage.create({
            data: {
                content: aiResponseContent,
                role: 'assistant',
                conversationId: id
            }
        });

        // Update conversation title if it's the first message and title is default?
        // Skip for now.

        return successResponse({ userMessage, aiMessage });
    } catch (error) {
        return handleApiError(error);
    }
};
