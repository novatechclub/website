<script lang="ts">
	import * as m from '$lib/paraglide/messages.js';
	import * as Card from '$lib/components/ui/card';
	import { Badge } from '$lib/components/ui/badge';
	import { Button } from '$lib/components/ui/button';

	import Search from 'lucide-svelte/icons/search';
	import Calendar from 'lucide-svelte/icons/calendar';
	import Users from 'lucide-svelte/icons/users';
	import Podcast from 'lucide-svelte/icons/podcast';
	import MapPin from 'lucide-svelte/icons/map-pin';
	import LoaderCircle from 'lucide-svelte/icons/loader-circle';
	import { formatDate } from '$lib/tools';
	import ImageBox from '$lib/ui/ImageBox.svelte';

	let { event } = $props();
</script>

<Card.Root>
	<Card.Header>
		<ImageBox src={event?.images} alt="Event Image" id={event?.id} collection="events" />

		<Card.Title>{event.title}</Card.Title>
	</Card.Header>
	<Card.Content>
		{#if event.tags}
			<div class="mb-4 flex flex-wrap gap-2">
				{#each event.tags.split(';') as tag}
					<Badge variant="secondary">{tag}</Badge>
				{/each}
			</div>
		{/if}

		<div class="flex flex-row justify-between">
			<div class="flex items-center">
				<Calendar class="mr-2 h-4 w-4" />
				{formatDate(event.date)} | {event.time}
			</div>

			<div class="mt-1 flex items-center">
				<MapPin class="mr-2 h-4 w-4" />
				{event.location}
			</div>
		</div>

		{#if event.expand?.speakers}
			<div class="mt-1 flex items-center">
				<Podcast class="mr-2 h-4 w-4" />
				<div class="flex flex-row gap-4">
					{#each event.expand.speakers as speaker}
						<p>{speaker.name}</p>
					{/each}
				</div>
			</div>
		{/if}
		<p class="my-4">{event.description}</p>
		{#if event.capacity > 0}
			<p class="flex items-center text-sm text-muted-foreground">
				<Users class="mr-2 h-4 w-4" />
				{m.events_capacity()}: {event.capacity}
			</p>
		{/if}
	</Card.Content>
	<Card.Footer>
		<Button href="/events/{event.id}">{m.event_button()}</Button>
	</Card.Footer>
</Card.Root>
