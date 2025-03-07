<script lang="ts">
	import * as m from '$lib/paraglide/messages.js';

	import * as Card from '$lib/components/ui/card/index.js';
	import { Button } from '$lib/components/ui/button';
	import { Input } from '$lib/components/ui/input';
	import { formatDate } from '$lib/tools';
	import { Badge } from '$lib/components/ui/badge';
	import { fade } from 'svelte/transition';

	import Search from 'lucide-svelte/icons/search';
	import Calendar from 'lucide-svelte/icons/calendar';
	import Users from 'lucide-svelte/icons/users';
	import Podcast from 'lucide-svelte/icons/podcast';
	import MapPin from 'lucide-svelte/icons/map-pin';
	import LoaderCircle from 'lucide-svelte/icons/loader-circle';
	import { cn } from '$lib/utils.js';
	import { json } from '@sveltejs/kit';

	let { data } = $props();

	let search = $state('');
	let query = $derived(search.trim());

	// let filtered = $derived.by(() => {
	// 	search;

	// 	return data.events.then((r) => {
	// 		const articles = r.map((event) => ({
	// 			...event,
	// 			searchTerms: `${event.title} ${event.abstract} ${event.expand?.speakers} ${event.tags} ${formatDate(event.date)}`
	// 		}));

	// 		const filteredArticles = articles.filter((item) => {
	// 			return item.searchTerms.toLowerCase().includes(search);
	// 		});

	// 		return filteredArticles;
	// 	});
	// });
</script>

<main class="container mx-auto flex-grow px-4 py-8">
	<h1 class="mb-8 text-center text-4xl font-bold">{m.events_title()}</h1>

	<section class="mb-12">
		<p class="mb-8 text-center text-xl">
			{m.events_description()}
		</p>
		<div class="mx-auto max-w-md">
			<div class="relative">
				<Search class="absolute left-2 top-1/2 -translate-y-1/2 transform text-muted-foreground" />
				<Input
					type="text"
					placeholder={m.events_input_placeholder()}
					class="pl-10"
					bind:value={search}
				/>
			</div>
		</div>
	</section>

	{#await data.events}
		<div
			class="flex w-full justify-center
"
		>
			<LoaderCircle class="animate-spin" />
		</div>
	{:then events}
		{@const filtered = events.filter(
			(entry) =>
				entry.title.toLowerCase().includes(query.toLowerCase()) ||
				entry.location.toLowerCase().includes(query.toLowerCase()) ||
				entry.description.toLowerCase().includes(query.toLowerCase()) ||
				entry.expand.speakers.some((speaker) =>
					speaker.name.toLowerCase().includes(query.toLowerCase())
				) ||
				entry.tags.toLowerCase().includes(query.toLowerCase())
		)}
		{@const upcomingEvents = filtered.filter((entry) => new Date(entry.date) >= new Date())}
		
		{#if upcomingEvents.length > 0}
			<section class="grid grid-cols-1 gap-8 md:grid-cols-2">
				{#each upcomingEvents as event}
					<div in:fade>
						<Card.Root>
							<Card.Header>
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
									<div class='flex items-center'>
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
								<p class="flex items-center text-sm text-muted-foreground">
									<Users class="mr-2 h-4 w-4" />
									{m.events_capacity()}: {event.capacity}
								</p>
							</Card.Content>
							<Card.Footer>
								<Button href="/events/{event.id}">{m.event_button()}</Button>
							</Card.Footer>
						</Card.Root>
					</div>
				{/each}
			</section>
		{:else}
			<p class="my-32 text-center text-lg font-semibold">{m.events_no_upcomming()}</p>
		{/if}
	{:catch error}
		<p>{m.load_error()}: {error}</p>
	{/await}

	{#await data.events}
		<div
			class="flex w-full justify-center
"
		>
			<!-- <LoaderCircle class="animate-spin" /> -->
		</div>
	{:then events}
		<!-- {@const filtered = events.filter((entry) => new Date(entry.date) < new Date())} -->
		{@const filtered = events.filter(
			(entry) =>
				entry.title.toLowerCase().includes(query.toLowerCase()) ||
				entry.location.toLowerCase().includes(query.toLowerCase()) ||
				entry.description.toLowerCase().includes(query.toLowerCase()) ||
				entry.expand.speakers.some((speaker) =>
					speaker.name.toLowerCase().includes(query.toLowerCase())
				) ||
				entry.tags.toLowerCase().includes(query.toLowerCase())
		)}
		{@const pastEvents = filtered.filter((entry) => new Date(entry.date) < new Date())}

		<h2 class="my-4 text-3xl font-bold">{m.events_past()}</h2>

		<section class="grid grid-cols-1 gap-8 md:grid-cols-2">
			{#each pastEvents as event}
				<div in:fade>
					<Card.Root>
						<Card.Header>
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
				</div>
			{/each}
		</section>
	{:catch error}
		<p>{m.load_error()}: {error}</p>
	{/await}

	<section class="mt-16 text-center">
		<h2 class="mb-4 text-3xl font-bold">{m.events_cta_title()}</h2>
		<p class="mb-8 text-xl">{m.events_cta_description()}</p>
		<Button size="lg" href="/contacts">
			{m.events_cta_button()}
			<Calendar class="ml-2" />
		</Button>
	</section>
</main>
