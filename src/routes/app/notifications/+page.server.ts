import { prisma } from '$lib/server/prisma';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ locals }) => {
    if (!locals.user) {
        return { notifications: [] };
    }

    const notifications = await prisma.notification.findMany({
        where: {
            userId: locals.user.id
        },
        orderBy: { createdAt: 'desc' },
        take: 50
    });

    return {
        notifications: notifications.map(n => ({
            id: n.id,
            title: n.title,
            message: n.message,
            read: n.read,
            type: n.type,
            time: n.createdAt.toLocaleDateString()
        }))
    };
};
