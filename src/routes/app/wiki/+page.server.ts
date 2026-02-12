import { prisma } from '$lib/server/prisma';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ locals }) => {
    if (!locals.user) {
        return { articles: [] };
    }

    const articles = await prisma.wikiPage.findMany({
        orderBy: { updatedAt: 'desc' },
        include: {
            author: { select: { id: true, name: true } }
        }
    });

    return {
        articles: articles.map(a => ({
            id: a.id,
            title: a.title,
            category: 'Product', // Default, schema doesn't have category yet
            author: a.author.name,
            date: a.updatedAt.toLocaleDateString(),
            content: a.content,
            tags: [] // Schema doesn't have tags yet
        }))
    };
};
