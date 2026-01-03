import fs from 'fs/promises';
import path from 'path';
import type { PageServerLoad, Actions } from './$types';

export const load: PageServerLoad = async ({ locals }) => {
    const user_id = locals.user?.id;
    if (!user_id) return { files: [] };

    const pathdir = path.join('uploads', `${user_id}/music`);
    await fs.mkdir(pathdir, { recursive: true });

    const fichiers = await fs.readdir(pathdir);
    const files = fichiers.map((f) => ({
        url: `${import.meta.env.VITE_SERVER_FILES}/${user_id}/music/${encodeURIComponent(f)}`,
        title: f
    }));

    return { files };
};

export const actions: Actions = {
    uploadfile: async ({ request }) => {
        const data = await request.formData();
        const file = data.get('file') as File;
        const id_user = data.get('id_user') as string;
        if (!file) {
            return { error: 'Aucun fichier envoyé' };
        }
        const filedir = path.join('uploads', `${id_user}/music`);
        await fs.mkdir(filedir, { recursive: true });
        const filename = `${Date.now()}-${file.name}`;
        const filepath = path.join(filedir, filename);
        const buffer = Buffer.from(await file.arrayBuffer());
        await fs.writeFile(filepath, buffer);
        return {
            url: `${import.meta.env.VITE_SERVER_FILES}/${id_user}/music/${encodeURIComponent(filename)}`,
            title: filename
        };
    }
};
