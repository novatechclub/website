import { pb } from '$lib/pocketbase';

export function load() {
	const getRecruitStatus = async () => {
		try {
			const record = await pb.collection('recruiting').getFirstListItem('open = true');

			return record;
		} catch (err) {
			// console.log(err);
			return err;
		}
	};

	return {
		recruit_status: getRecruitStatus()
	};
}
