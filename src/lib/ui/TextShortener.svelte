<script lang="ts">
	import * as m from '$lib/paraglide/messages.js';

	let { text, maxLength }: { text: string; maxLength: number } = $props();

	let showFullText = $state(false);
</script>

{#if text.length <= maxLength}
	{text}
{:else if showFullText}
	{text}
	<button onclick={() => (showFullText = !showFullText)} class="font-semibold"
		>{m.read_less()}</button
	>
{:else}
	{text.slice(0, maxLength)}...
	<button onclick={() => (showFullText = !showFullText)} class="font-semibold"
		>{m.read_more()}</button
	>
{/if}
