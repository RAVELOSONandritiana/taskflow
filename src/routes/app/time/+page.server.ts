import { prisma } from '$lib/server/prisma';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ locals }) => {
    if (!locals.user) {
        return { logs: [] };
    }

    const logs = await prisma.timeEntry.findMany({
        where: {
            userId: locals.user.id
        },
        orderBy: { startTime: 'desc' },
        take: 20
    });

    return {
        logs: logs.map(l => ({
            id: l.id,
            project: l.projectId || 'General',
            task: l.description || 'Focus Session',
            duration: l.endTime
                ? formatDuration(l.endTime.getTime() - l.startTime.getTime())
                : 'Ongoing',
            date: l.startTime.toLocaleDateString(),
            status: l.endTime ? 'completed' : 'active'
        }))
    };
};

function formatDuration(ms: number) {
    const minutes = Math.floor(ms / 60000);
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    return `${hours}h ${mins}m`;
}
