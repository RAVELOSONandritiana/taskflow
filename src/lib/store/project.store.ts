import { writable } from "svelte/store";

export interface ProjectI {
    id: string;
    src: string | undefined;
    title: string;
    description: string | undefined;
}

export const projects = writable<ProjectI[]>([]);