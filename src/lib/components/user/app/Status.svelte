<script>
	import StatusElement from './StatusElement.svelte';
</script>

<div class="grid grid-cols-1  mt-2 gap-4 md:grid-cols-2 lg:grid-cols-4">
	<StatusElement title="Tache en cours" value={10} />
	<StatusElement title="A faire aujourd'hui" value={10} color="text-orange-500"/>
	<StatusElement title="En attente" value={10} color="text-green-500"/>
	<StatusElement title="Termines cette semaine" value={10} color="text-indigo-500"/>
</div>
