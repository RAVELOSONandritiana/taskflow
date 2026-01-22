<script lang="ts">
	import { onMount } from 'svelte';
	import { fade, fly } from 'svelte/transition';

	let bars = $state([0.4, 0.7, 0.5, 0.9, 0.6, 0.8, 0.4, 0.7, 0.5, 1.0]);

	onMount(() => {
		const interval = setInterval(() => {
			bars = bars.map(() => Math.random() * 0.6 + 0.4);
		}, 800);
		return () => clearInterval(interval);
	});
</script>

<div 
	class="flex items-center gap-4 rounded-3xl border border-white/10 bg-white/5 p-5 backdrop-blur-xl transition-all hover:bg-white/10"
	in:fly={{ y: -10, duration: 800 }}
>
	<!-- Adaptive Visualizer -->
	<div class="flex items-center gap-1 h-8 w-16">
		{#each bars as height, i}
			<div 
				class="w-1 rounded-full bg-gradient-to-t from-indigo-400 to-white transition-all duration-700 ease-in-out" 
				style="height: {height * 100}%; opacity: {0.3 + height * 0.7}"
			></div>
		{/each}
	</div>

	<!-- Information -->
	<div class="flex flex-1 flex-col justify-center border-l border-white/10 pl-4">
		<div class="flex items-center gap-2">
			<span class="flex h-2 w-2 rounded-full bg-green-400 animate-pulse"></span>
			<span class="text-[9px] font-black uppercase tracking-[0.2em] text-indigo-200">System Live Stream</span>
		</div>
		<p class="mt-0.5 text-[11px] font-bold text-indigo-50/90 italic">
			Synchronizing repository metadata and analyzing real-time project velocity...
		</p>
	</div>

	<!-- Status Badge -->
	<div class="hidden md:flex items-center gap-2 rounded-xl bg-indigo-500/20 px-3 py-1.5 ring-1 ring-white/10">
		<span class="text-[9px] font-black uppercase tracking-widest text-white">Active</span>
	</div>
</div>
