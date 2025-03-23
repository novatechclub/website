<script lang="ts">
	import { getImageURL } from '$lib/tools';
	import * as Carousel from '$lib/components/ui/carousel/index.js';
	import { ScrollArea } from '$lib/components/ui/scroll-area';
	import { type CarouselAPI } from '$lib/components/ui/carousel/context.js';
	import { cn } from '$lib/utils';
	let { src, alt, id , collection} = $props();

	console.log(src);

	let api = $state<CarouselAPI>();

	const count = $derived(api ? api.scrollSnapList().length : 0);
	let current = $state(0);

	$effect(() => {
		if (api) {
			current = api.selectedScrollSnap() + 1;
			api.on('select', () => {
				current = api!.selectedScrollSnap() + 1;
			});
		}
	});
</script>

<div>
	<Carousel.Root class="w-full" setApi={(emblaApi) => (api = emblaApi)}>
		<Carousel.Content>
			{#each src as image, i (i)}
				<Carousel.Item>
					<div class="p-1">
						<ScrollArea class="aspect-video w-full overflow-hidden rounded border object-cover">
							<img src={getImageURL(collection, id, image, '0x0')} {alt} />
						</ScrollArea>
					</div>
				</Carousel.Item>
			{/each}
		</Carousel.Content>
	</Carousel.Root>

	{#if count > 1}
		<div class=" text-center text-[2rem] leading-[0.5] transition-colors">
			<div class="inline-flex">
				{#each Array(count) as _, i (i)}
					<span class={cn('', i + 1 === current ? 'text-black' : 'text-muted-foreground')}
						>&bull;</span
					>
				{/each}
			</div>
		</div>
	{/if}
</div>
