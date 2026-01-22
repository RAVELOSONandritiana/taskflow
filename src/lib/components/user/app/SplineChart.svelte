<script lang="ts">
	import { onMount } from 'svelte';
	import { fade } from 'svelte/transition';

	let { data = [30, 40, 35, 50, 49, 60, 70, 91], color = '#6366f1', height = 100 }: { data?: number[], color?: string, height?: number } = $props();

	let path = $state('');
	let areaPath = $state('');

	function generatePath() {
		if (data.length < 2) return;

		const padding = 10;
		const width = 1000;
		const realHeight = height - padding * 2;
		const stepX = width / (data.length - 1);
		const max = Math.max(...data);
		const min = Math.min(...data);
		const range = max - min || 1;

		const points = data.map((val, i) => ({
			x: i * stepX,
			y: height - padding - ((val - min) / range) * realHeight
		}));

		// Generate Cubic Bezier Spline
		let d = `M ${points[0].x} ${points[0].y}`;
		
		for (let i = 0; i < points.length - 1; i++) {
			const curr = points[i];
			const next = points[i + 1];
			const cp1x = curr.x + (next.x - curr.x) / 2;
			const cp2x = next.x - (next.x - curr.x) / 2;
			d += ` C ${cp1x} ${curr.y}, ${cp2x} ${next.y}, ${next.x} ${next.y}`;
		}

		path = d;
		areaPath = d + ` L ${points[points.length - 1].x} ${height} L ${points[0].x} ${height} Z`;
	}

	onMount(() => {
		generatePath();
	});
</script>

<div class="relative w-full" style="height: {height}px;" in:fade={{ duration: 1000 }}>
	<svg viewBox="0 0 1000 {height}" class="h-full w-full overflow-visible" preserveAspectRatio="none">
		<!-- Area fill -->
		<path
			d={areaPath}
			fill="url(#gradient-{color.replace('#', '')})"
			class="opacity-20"
		/>
		
		<!-- Spline line -->
		<path
			d={path}
			fill="none"
			stroke={color}
			stroke-width="4"
			stroke-linecap="round"
			stroke-linejoin="round"
			class="drop-shadow-lg"
		/>

		<!-- Gradient definition -->
		<defs>
			<linearGradient id="gradient-{color.replace('#', '')}" x1="0" y1="0" x2="0" y2="1">
				<stop offset="0%" stop-color={color} />
				<stop offset="100%" stop-color={color} stop-opacity="0" />
			</linearGradient>
		</defs>
	</svg>

	<!-- Data points highlights -->
	<div class="absolute inset-0 flex justify-between px-1">
		{#each data as val}
			<div class="group relative flex h-full flex-col justify-end pb-2">
				<div class="absolute bottom-full left-1/2 mb-2 -translate-x-1/2 scale-0 rounded bg-gray-900 px-2 py-1 text-[10px] text-white transition-transform group-hover:scale-100 dark:bg-gray-100 dark:text-gray-900">
					{val}%
				</div>
			</div>
		{/each}
	</div>
</div>
