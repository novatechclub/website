<script lang="ts">
	import * as m from '$lib/paraglide/messages.js';
	import Marqueeck, { type MarqueeckOptions } from '@arisbh/marqueeck';
	import { Button } from '$lib/components/ui/button';
	import ArrowUpRight from 'lucide-svelte/icons/arrow-up-right';

	let { status } = $props();

	const options: MarqueeckOptions = {
		speed: 50
	};
	// console.log(status);
</script>

{#await status then recruit}
	{#if recruit.open}
		<div class="flex items-center">
			<Marqueeck {options} class="sm:!y-6 !py-4">
				<!-- Using Tailwind classes -->
				<div class="flex items-end gap-2 leading-4">
					<p>
						<i>{m.recruit_pretitle()}</i>
					</p>
					<span class="translate-y-1 text-2xl font-semibold">{m.recruit_title()}</span>
				</div>
			</Marqueeck>

			<div class="px-4">
				<Button href={recruit?.application_url}>
					{m.recruit_cta()}
					<ArrowUpRight />
				</Button>
			</div>
		</div>
	{/if}
{/await}
