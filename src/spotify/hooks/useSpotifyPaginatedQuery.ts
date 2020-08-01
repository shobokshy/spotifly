import { QueryKey, useInfiniteQuery } from 'react-query';
import { useSpotify } from './useSpotify';
import { ListOf } from '../types';

export const useSpotifyPaginatedQuery = <T>(
	key: QueryKey<any>,
	path: string
) => {
	const { client } = useSpotify();

	return useInfiniteQuery<ListOf<T>, QueryKey<any>, string>(
		key,
		async (key, next) => {
			return (await client.get(next || path)).data;
		},
		{
			getFetchMore: (prev, all) => prev.next,
		}
	);
};
