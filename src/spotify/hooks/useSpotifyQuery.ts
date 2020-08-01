import { useQuery, QueryKey } from 'react-query';
import { useSpotify } from './useSpotify';

export const useSpotifyQuery = <T>(key: QueryKey<any>, path: string) => {
	const { client } = useSpotify();

	return useQuery(key, async () => {
		return (await client.get(path)).data as T;
	});
};
