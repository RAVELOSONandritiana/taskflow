<script lang="ts">
	import StatusElement from './StatusElement.svelte';

	let { compact = false }: { compact?: boolean } = $props();

	const stats = [
		{ title: 'In Progress', value: 12, color: 'text-blue-500', icon: '<path stroke-linecap="round" stroke-linejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" />' },
		{ title: 'To Do Today', value: 5, color: 'text-orange-500', icon: '<path stroke-linecap="round" stroke-linejoin="round" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />' },
		{ title: 'Pending Approval', value: 3, color: 'text-yellow-500', icon: '<path stroke-linecap="round" stroke-linejoin="round" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />' },
		{ title: 'Weekly Completed', value: 24, color: 'text-green-500', icon: '<path stroke-linecap="round" stroke-linejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />' }
	];
</script>

<div class="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
	{#each stats as stat}
		<StatusElement {...stat} {compact} />
	{/each}
</div>
