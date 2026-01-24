import fs from 'fs/promises';
import path from 'path';
import type { PageServerLoad, Actions } from './$types';
import { fail } from '@sveltejs/kit';

export const load: PageServerLoad = async ({ locals, fetch, depends }) => {
    depends('app:music');
    const user_id = locals.user?.id || '1';
    try {
        const data = await fetch(`/api/music/${user_id}`);
        const files = await data.json();
        return { files: Array.isArray(files) ? files : [] }
    } catch (e) {
        console.error('Error loading music list:', e);
        return { files: [] }
    }
};

export const actions: Actions = {
    uploadfile: async ({ request, locals }) => {
        const user_id = locals.user?.id || '1';
        const data = await request.formData();
        const file = data.get('file') as File;

        if (!file || file.size === 0) {
            return fail(400, { error: 'Aucun fichier valide envoyé' });
        }

        const filedir = path.join('uploads', `${user_id}/music`);
        try {
            await fs.mkdir(filedir, { recursive: true });
            const filename = `${Date.now()}-${file.name}`;
            const filepath = path.join(filedir, filename);
            const buffer = Buffer.from(await file.arrayBuffer());
            await fs.writeFile(filepath, buffer);
            return {
                success: true,
                url: `${import.meta.env.VITE_SERVER_FILES}/${user_id}/music/${encodeURIComponent(filename)}`,
                title: filename
            };
        } catch (err) {
            console.error('File system error during upload:', err);
            return fail(500, { error: 'Erreur lors de la sauvegarde du fichier' });
        }
    }
};
