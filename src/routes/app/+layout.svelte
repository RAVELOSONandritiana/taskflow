<script lang="ts">
	import {
		urlAudio,
		isPlayAudio,
		currentTrack,
		timeMusic,
		titleStore,
		timeTotal
	} from '$lib/store/track.store';
	import { theme } from '$lib/store/theme.store';
	import Sidemenu from '$lib/components/user/app/Sidemenu.svelte';
	import '../layout.css';
	import { fly } from 'svelte/transition';
	let { children } = $props();

	let mediaElement: HTMLMediaElement | null = $state(null);
	let currentTime = $state(0);
	let duration = $state(0);
	let isPaused = $state(true);

	const isVideo = $derived($currentTrack?.url?.toLowerCase().endsWith('.mp4'));

	function toogleCurrentTrack() {
		if ($currentTrack) {
			currentTrack.update((t) => ({ ...t!, isPlay: !t?.isPlay }));
		}
	}

	function formatTime(seconds: number): string {
		if (!isFinite(seconds) || seconds < 0) return '0:00';
		const mins = Math.floor(seconds / 60);
		const secs = Math.floor(seconds % 60);
		return `${mins}:${secs.toString().padStart(2, '0')}`;
	}

	$effect(() => {
		if ($currentTrack) {
			isPaused = !$currentTrack.isPlay;
			if (mediaElement) {
				if ($currentTrack.isPlay) {
					mediaElement.play().catch(() => {
						currentTrack.update((t) => ({ ...t!, isPlay: false }));
					});
				} else {
					mediaElement.pause();
				}
			}
		}
	});

	$effect(() => {
		timeMusic.set(currentTime);
		timeTotal.set(duration);
	});
</script>

<div class="app" class:dark={$theme}>
	<Sidemenu>
		{@render children()}
	</Sidemenu>
</div>

{#if $currentTrack?.url != null}
	<!-- Hidden but active media element for Audio/Video -->
	{#if isVideo}
		<!-- svelte-ignore a11y_media_has_caption -->
		<video
			src={$currentTrack.url}
			class="hidden"
			bind:this={mediaElement}
			bind:currentTime
			bind:duration
			onended={() => currentTrack.update((t) => ({ ...t!, isPlay: false }))}
		></video>
	{:else}
		<audio
			src={$currentTrack.url}
			class="hidden"
			bind:this={mediaElement}
			bind:currentTime
			bind:duration
			onended={() => currentTrack.update((t) => ({ ...t!, isPlay: false }))}
		></audio>
	{/if}

	<div
		class="fixed right-6 bottom-6 z-50 w-80 overflow-hidden rounded-2xl border border-gray-100 bg-white/90 p-4 shadow-2xl backdrop-blur-xl dark:border-gray-800 dark:bg-gray-900/90"
		transition:fly={{ y: 50, duration: 400 }}
	>
		<div class="flex items-center gap-4">
			<div
				class="relative h-14 w-14 shrink-0 overflow-hidden rounded-xl bg-indigo-500 text-white shadow-lg"
			>
				{#if isVideo}
					<!-- Mini Video Preview -->
					<video
						src={$currentTrack.url}
						muted
						playsinline
						class="h-full w-full object-cover"
						bind:currentTime
					></video>
				{:else}
					<svg
						xmlns="http://www.w3.org/2000/svg"
						class="h-full w-full p-3 opacity-50"
						fill="none"
						viewBox="0 0 24 24"
						stroke="currentColor"
						><path
							stroke-linecap="round"
							stroke-linejoin="round"
							stroke-width="2"
							d="M9 19V6l12-3v13M9 19c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zm12-3c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zM9 10l12-3"
						/></svg
					>
				{/if}

				{#if $currentTrack?.isPlay && !isVideo}
					<!-- Simple soundwave animation (only for audio) -->
					<div
						class="absolute inset-0 flex items-center justify-center gap-1 bg-indigo-600/20 backdrop-blur-[1px]"
					>
						<div class="sound-bar animate-sound h-4 w-1" style="animation-delay: 0s"></div>
						<div class="sound-bar animate-sound h-6 w-1" style="animation-delay: 0.2s"></div>
						<div class="sound-bar animate-sound h-5 w-1" style="animation-delay: 0.1s"></div>
						<div class="sound-bar animate-sound h-3 w-1" style="animation-delay: 0.3s"></div>
					</div>
				{/if}
			</div>

			<div class="min-w-0 flex-1">
				<h4
					class="truncate text-sm font-black tracking-tight text-gray-900 dark:text-white"
					title={$currentTrack?.url}
				>
					{$titleStore || 'Loading...'}
				</h4>
				<p class="text-[10px] font-bold tracking-wider text-indigo-500 uppercase">
					{isVideo ? 'Video Clip' : 'Audio Track'}
				</p>

				<div class="mt-2 flex items-center gap-4">
					<button aria-label="Previous" class="text-gray-400 hover:text-indigo-500">
						<svg
							xmlns="http://www.w3.org/2000/svg"
							class="h-4 w-4"
							fill="currentColor"
							viewBox="0 0 24 24"><path d="M6 6h2v12H6zm3.5 6L18 6v12z" /></svg
						>
					</button>

					<button
						onclick={toogleCurrentTrack}
						aria-label={$currentTrack?.isPlay ? 'Pause' : 'Play'}
						class="flex h-8 w-8 items-center justify-center rounded-full bg-indigo-500 text-white shadow-lg transition-transform hover:scale-105 active:scale-95"
					>
						{#if $currentTrack?.isPlay}
							<svg
								xmlns="http://www.w3.org/2000/svg"
								class="h-4 w-4"
								fill="currentColor"
								viewBox="0 0 24 24"><path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z" /></svg
							>
						{:else}
							<svg
								xmlns="http://www.w3.org/2000/svg"
								class="ml-0.5 h-4 w-4"
								fill="currentColor"
								viewBox="0 0 24 24"><path d="M8 5v14l11-7z" /></svg
							>
						{/if}
					</button>
					<button aria-label="Next" class="text-gray-400 hover:text-indigo-500">
						<svg
							xmlns="http://www.w3.org/2000/svg"
							class="h-4 w-4"
							fill="currentColor"
							viewBox="0 0 24 24"><path d="M6 18l8.5-6L6 6zM16 6v12h2V6z" /></svg
						>
					</button>
				</div>
			</div>

			<button
				onclick={() => {
					currentTrack.set(null);
				}}
				aria-label="Close Player"
				class="p-1 text-gray-300 hover:text-red-500"
			>
				<svg
					xmlns="http://www.w3.org/2000/svg"
					class="h-4 w-4"
					fill="none"
					viewBox="0 0 24 24"
					stroke="currentColor"
					><path
						stroke-linecap="round"
						stroke-linejoin="round"
						stroke-width="2"
						d="M6 18L18 6M6 6l12 12"
					/></svg
				>
			</button>
		</div>

		<!-- Dynamic Progress Bar -->
		<div class="mt-4 h-1 w-full rounded-full bg-gray-100 dark:bg-gray-800">
			<div
				class="h-full rounded-full bg-indigo-500 transition-all duration-300"
				style="width: {duration ? (currentTime / duration) * 100 : 0}%"
			></div>
		</div>

		<!-- Time Display -->
		<div class="mt-1 flex justify-between text-[10px] font-medium text-gray-500 dark:text-gray-400">
			<span>{formatTime(currentTime)}</span>
			<span>{formatTime(duration)}</span>
		</div>
	</div>
{/if}

<style>
	.sound-bar {
		background: white;
		border-radius: 2px;
	}

	@keyframes sound {
		0%,
		100% {
			height: 4px;
		}
		50% {
			height: 16px;
		}
	}

	.animate-sound {
		animation: sound 0.5s ease-in-out infinite;
	}
</style>
