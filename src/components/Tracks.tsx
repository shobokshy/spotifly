import React from 'react';
import { useSpotifyPaginatedQuery } from '../spotify/hooks/useSpotifyPaginatedQuery';
import { TrackInfo, User } from '../spotify/types';
import { CollectionHeader } from './CollectionHeader';
import { List, Button } from 'antd';
import { Track } from './Track';
import { useSpotifyQuery } from '../spotify/hooks/useSpotifyQuery';
import { useIntersect } from '../hooks/useIntersect';

interface TracksProps {}

export const Tracks: React.FC<TracksProps> = (props) => {
	const { data: user } = useSpotifyQuery<User>('user', '/me');
	const {
		data,
		isFetching,
		isFetchingMore,
		fetchMore,
		canFetchMore,
	} = useSpotifyPaginatedQuery<TrackInfo>('track', '/me/tracks');

	const [ref, intersection] = useIntersect({});

	React.useEffect(() => {
		if (isFetchingMore) return;
		if (intersection?.isIntersecting && canFetchMore) fetchMore();
	}, [intersection]);

	return (
		<React.Fragment>
			{data && user && (
				<CollectionHeader
					title='Liked Songs'
					type='Playlist'
					author={user?.display_name}
					duration={0}
				/>
			)}

			<List
				itemLayout='horizontal'
				loading={isFetching && isFetchingMore !== 'next'}
			>
				{data?.map((group, i) => (
					<React.Fragment key={i}>
						{group?.items.map((item) => (
							<Track
								key={item.added_at.toString()}
								track={item.track}
							/>
						))}
					</React.Fragment>
				))}
			</List>
			{data && (
				<Button
					loading={isFetchingMore === 'next'}
					block
					type='text'
					ref={ref}
				>
					Loading...
				</Button>
			)}
		</React.Fragment>
	);
};
