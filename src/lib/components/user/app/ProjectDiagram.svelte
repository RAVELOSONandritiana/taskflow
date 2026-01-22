<script lang="ts">
	import { v4 } from 'uuid';

	interface Node {
		id: string;
		x: number;
		y: number;
		label: string;
		type: 'action' | 'condition' | 'start' | 'end';
	}

	let nodes = $state<Node[]>([
		{ id: v4(), x: 100, y: 100, label: 'Start Project', type: 'start' },
		{ id: v4(), x: 300, y: 100, label: 'Design Phase', type: 'action' },
		{ id: v4(), x: 500, y: 100, label: 'Success?', type: 'condition' },
		{ id: v4(), x: 700, y: 100, label: 'Launch', type: 'end' }
	]);

	let draggingNodeId = $state<string | null>(null);

	function onMouseDown(id: string) {
		draggingNodeId = id;
	}

	function onMouseMove(e: MouseEvent) {
		if (draggingNodeId) {
			const node = nodes.find(n => n.id === draggingNodeId);
			if (node) {
				const rect = (e.currentTarget as HTMLElement).getBoundingClientRect();
				node.x = e.clientX - rect.left - 60;
				node.y = e.clientY - rect.top - 30;
			}
		}
	}

	function onMouseUp() {
		draggingNodeId = null;
	}
</script>

<div class="relative h-full w-full rounded-2xl border border-gray-100 bg-white shadow-inner dark:border-gray-800 dark:bg-gray-900/50">
	<div class="absolute left-6 top-6 z-10 space-y-2">
		<h3 class="text-sm font-bold uppercase tracking-wider text-gray-400">Diagram Workspace</h3>
		<p class="text-xs text-gray-500">Drag nodes to organize your workflow.</p>
	</div>

	<!-- svelte-ignore a11y_no_static_element_interactions -->
	<div 
		class="h-full w-full overflow-hidden"
		onmousemove={onMouseMove}
		onmouseup={onMouseUp}
		onmouseleave={onMouseUp}
	>
		<svg class="h-full w-full">
			<!-- Grid Pattern -->
			<defs>
				<pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
					<path d="M 40 0 L 0 0 0 40" fill="none" stroke="currentColor" stroke-width="0.5" class="text-gray-100 dark:text-gray-800" />
				</pattern>
			</defs>
			<rect width="100%" height="100%" fill="url(#grid)" />

			<!-- Connections (Simplified) -->
			{#each nodes.slice(0, -1) as node, i}
				{@const next = nodes[i + 1]}
				<line 
					x1={node.x + 60} y1={node.y + 30} 
					x2={next.x + 60} y2={next.y + 30} 
					stroke="currentColor" 
					stroke-width="2" 
					class="text-indigo-200 dark:text-indigo-900/50"
				/>
			{/each}
		</svg>

		{#each nodes as node (node.id)}
			<!-- svelte-ignore a11y_no_static_element_interactions -->
			<div 
				onmousedown={() => onMouseDown(node.id)}
				class="absolute cursor-move select-none rounded-xl border border-gray-100 bg-white p-4 shadow-sm transition-shadow hover:shadow-md dark:border-gray-800 dark:bg-gray-800"
				style="left: {node.x}px; top: {node.y}px; width: 140px;"
			>
				<div class="mb-1 flex items-center gap-2">
					<div class="h-2 w-2 rounded-full {node.type === 'start' ? 'bg-green-500' : node.type === 'end' ? 'bg-red-500' : node.type === 'condition' ? 'bg-orange-500' : 'bg-indigo-500'}"></div>
					<span class="text-[10px] font-bold uppercase tracking-widest text-gray-400">{node.type}</span>
				</div>
				<p class="text-xs font-bold text-gray-700 dark:text-gray-200">{node.label}</p>
			</div>
		{/each}
	</div>
	
	<div class="absolute bottom-6 right-6 flex gap-2">
		<button aria-label="Add Node" class="rounded-lg bg-white p-2 text-gray-500 shadow-sm border border-gray-100 hover:bg-gray-50 dark:bg-gray-800 dark:border-gray-700">
			<svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m6-6H6"/></svg>
		</button>
		<button aria-label="Export Diagram" class="rounded-lg bg-indigo-500 p-2 text-white shadow-lg shadow-indigo-200 hover:bg-indigo-600 dark:shadow-none">
			<svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"/></svg>
		</button>
	</div>
</div>
