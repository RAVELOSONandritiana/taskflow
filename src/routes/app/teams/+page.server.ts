import type { PageServerLoad } from './$types';
import { prisma } from '$lib/server/prisma';

export const load: PageServerLoad = async ({ locals }) => {
    if (!locals.user) {
        return { teams: [], workspaces: [] as any[] };
    }

    const teams = await prisma.team.findMany({
        where: {
            members: {
                some: {
                    userId: locals.user.id
                }
            }
        },
        include: {
            _count: {
                select: { members: true }
            },
            members: {
                take: 3,
                include: {
                    user: {
                        select: { name: true, avatar: true }
                    }
                }
            }
        }
    });

    return {
        teams: teams.map(t => ({
            id: t.id,
            name: t.name,
            description: t.description || '',
            members: t._count.members,
            active: true, // Needs logic
            messages: [], // will be fetched by component
            memberList: t.members.map(m => ({
                name: m.user.name || 'Unknown',
                role: 'Member', // role from TeamMember if selected
                avatar: m.user.avatar
            }))
        }))
    };
};
