<script lang="ts">
	import RecentElement from './RecentElement.svelte';
</script>

<div class="shadow-md px-4 py-4 border rounded-md">
	<h2 class="text-xl font-bold text-gray-700">Recent project</h2>
	<div class="space-y-4 mt-2">
		<RecentElement title="Lancement du produit" value={75}/>
        <RecentElement title="Site web marketing" value={45} color="bg-green-400"/>
        <RecentElement title="Campagne de reseau social" value={60} color='bg-orange-400'/>
	</div>
</div>
