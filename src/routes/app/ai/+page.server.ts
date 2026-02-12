import { prisma } from '$lib/server/prisma';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ locals }) => {
    if (!locals.user) {
        return { conversations: [] };
    }

    const conversations = await prisma.aIConversation.findMany({
        where: {
            userId: locals.user.id
        },
        orderBy: { updatedAt: 'desc' },
        include: {
            messages: {
                take: 1,
                orderBy: { createdAt: 'desc' }
            }
        }
    });

    return {
        conversations: conversations.map(c => ({
            id: c.id,
            title: c.title,
            updatedAt: c.updatedAt,
            lastMessage: c.messages[0]?.content || 'No messages'
        }))
    };
};
