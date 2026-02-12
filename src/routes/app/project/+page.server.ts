import type { PageServerLoad } from "./$types";
import { prisma } from '$lib/server/prisma';
import type { Actions } from "@sveltejs/kit";
import { fail } from "@sveltejs/kit";

export const load: PageServerLoad = async ({ locals }) => {
    if (!locals.user) {
        return { projects: [] };
    }

    const projects = await prisma.project.findMany({
        where: {
            members: {
                some: {
                    userId: locals.user.id
                }
            }
        },
        orderBy: { updatedAt: 'desc' }
    });

    // Map to frontend interface if needed, or update frontend to use DB model
    // Mapping for now to match Store interface temporarily, but better to update Store
    return {
        projects: projects.map(p => ({
            id: p.id,
            title: p.name,
            description: p.description || '',
            src: undefined // Add avatar support later
        }))
    };
}

export const actions: Actions = {
    create: async ({ request, locals }) => {
        if (!locals.user) {
            return fail(401, { error: 'Unauthorized' });
        }

        const formData = await request.formData();
        const title = formData.get('title')?.toString();
        const description = formData.get('description')?.toString();

        if (!title) {
            return fail(400, { error: 'Title is required', title, description });
        }

        // We need a workspace to create a project. 
        // For now, let's find the user's personal workspace or create one if none exists.
        // In a real app, user should select workspace.
        let workspace = await prisma.workspace.findFirst({
            where: {
                members: {
                    some: {
                        userId: locals.user.id,
                        role: 'owner'
                    }
                }
            }
        });

        if (!workspace) {
            workspace = await prisma.workspace.create({
                data: {
                    name: 'My Workspace',
                    members: {
                        create: {
                            userId: locals.user.id,
                            role: 'owner'
                        }
                    }
                }
            });
        }

        try {
            await prisma.project.create({
                data: {
                    name: title,
                    description,
                    workspaceId: workspace.id,
                    creatorId: locals.user.id,
                    members: {
                        create: {
                            userId: locals.user.id,
                            role: 'owner'
                        }
                    }
                }
            });

            return { success: true };
        } catch (error) {
            console.error(error);
            return fail(500, { error: 'Failed to create project' });
        }
    }
}