import path from 'path'
import { json } from '@sveltejs/kit';
import fs from 'fs/promises';

export const GET = async ({ params }) => {
    const user_id = params.id_user;

    const pathdir = path.resolve(`uploads/${user_id}/music`);

    try {
        await fs.mkdir(pathdir, { recursive: true });

        const fichiers = await fs.readdir(pathdir);
        const files = fichiers.map((f) => ({
            url: `${import.meta.env.VITE_SERVER_FILES}/${user_id}/music/${encodeURIComponent(f)}`,
            title: f
        }));

        return json(files);
    } catch (e) {
        console.error(e);
        return json(e);
    }
} 