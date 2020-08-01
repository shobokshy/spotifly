import { useMutation } from 'react-query';
import { useSpotify } from './useSpotify';

export const useSpotifyMutation = <R, V>(
	method: 'PUT' | 'POST' | 'DELETE',
	path: string
) => {
	const { client } = useSpotify();

	return useMutation<R, V>(async (data) => {
		switch (method) {
			case 'DELETE':
				return (await client.delete(path, data)).data as R;
			case 'POST':
				return (await client.post(path, data)).data as R;
			case 'PUT':
				return (await client.put(path, data)).data as R;
		}
	});
};
