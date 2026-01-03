import type { PageServerLoad } from "./$types";
import type { ProjectI } from "$lib/store/project.store";
import type { Actions } from "@sveltejs/kit";
import fs from 'fs/promises';
import path from "path";

export const load: PageServerLoad = async () => {
    const res: ProjectI[] = [
        {
            id: 1,
            src: undefined,
            title: 'sharingan',
            description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Laborum error debitis sint accusantium placeat voluptatibus voluptas illo quia consectetur nihil reprehenderit itaque iusto rem dolore,fuga nostrum nisi autem impedit"
        },
        {
            id: 2,
            src: undefined,
            title: 'chrema',
            description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Laborum error debitis sint accusantium placeat voluptatibus voluptas illo quia consectetur nihil reprehenderit itaque iusto rem dolore,fuga nostrum nisi autem impedit"
        },
        {
            id: 3,
            src: undefined,
            title: 'Project Title',
            description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Laborum error debitis sint accusantium placeat voluptatibus voluptas illo quia consectetur nihil reprehenderit itaque iusto rem dolore,fuga nostrum nisi autem impedit"
        },
        {
            id: 4,
            src: undefined,
            title: 'Project Title',
            description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Laborum error debitis sint accusantium placeat voluptatibus voluptas illo quia consectetur nihil reprehenderit itaque iusto rem dolore,fuga nostrum nisi autem impedit"
        },
    ]
    return { projects: res };
}

export const actions: Actions = {
    update: async ({ request }) => {
        const formData = await request.formData();
        const title = formData.get('title')?.toString() ?? '';
        const description = formData.get('description')?.toString() ?? '';
        const id_user = formData.get('id_user') as string;
        const id = formData.get('id')?.toString() ?? '';
        const image = formData.get('image') as File;
        if (id != '' && image && image.type.startsWith('image/')) {
            const buffer = Buffer.from(await image.arrayBuffer());
            const uploadDir = `uploads/${id_user}/project`;
            await fs.mkdir(uploadDir, {
                recursive: true
            });
            const filename = `${Date.now()}-${image.name}`;
            const filepath = path.join(uploadDir, filename);
            await fs.writeFile(filepath, buffer);
            return {
                title, description, filepath: `${import.meta.env.VITE_SERVER_FILES}/${id_user}/project/${filename}`
            }
        } else if (id != '') {
            return {
                title, description
            }
        }
        return {
            error: 'upload fail'
        }
    }
}