import { prisma } from '$lib/server/prisma';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ locals }) => {
    if (!locals.user) {
        return { meetings: [] };
    }

    const meetings = await prisma.meeting.findMany({
        where: {
            participants: { some: { userId: locals.user.id } }
        },
        orderBy: { startTime: 'asc' }
    });

    return {
        meetings: meetings.map(m => ({
            id: m.id,
            title: m.title,
            startTime: m.startTime,
            endTime: m.endTime,
            date: m.startTime.getDate(),
            month: m.startTime.getMonth(),
            year: m.startTime.getFullYear(),
            type: 'meeting', // Default type
            time: m.startTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        }))
    };
};
