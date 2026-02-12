import { prisma } from '$lib/server/prisma';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ locals }) => {
    if (!locals.user) {
        return { settings: null, user: null };
    }

    let settings = await prisma.userSettings.findUnique({
        where: { userId: locals.user.id }
    });

    if (!settings) {
        settings = await prisma.userSettings.create({
            data: { userId: locals.user.id }
        });
    }

    return {
        settings,
        user: locals.user
    };
};
