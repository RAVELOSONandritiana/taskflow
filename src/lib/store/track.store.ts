import { derived, writable } from "svelte/store";

export interface Track {
    url: string;
    isPlay: boolean;
}

export const currentTrack = writable<Track | null>(null);

export const urlAudio = derived(currentTrack, $currentTrack => $currentTrack?.url);

export const isPlayAudio = derived(currentTrack, $currentTrack => $currentTrack?.isPlay);

