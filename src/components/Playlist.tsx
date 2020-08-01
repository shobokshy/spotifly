/** @jsx jsx */
import { jsx } from '@emotion/core';
import { List } from 'antd';
import React from 'react';
import { useParams } from 'react-router-dom';
import { useSpotifyQuery } from '../spotify/hooks/useSpotifyQuery';
import { Playlist as IPlaylist } from '../spotify/types';
import { CollectionHeader } from './CollectionHeader';
import { Track } from './Track';

interface PlaylistProps {}

export const Playlist: React.FC<PlaylistProps> = (props) => {
	const { id } = useParams();
	const { isLoading, data } = useSpotifyQuery<IPlaylist>(
		['playlist', id],
		`/playlists/${id}`
	);

	return (
		<React.Fragment>
			{data && (
				<CollectionHeader
					title={data.name}
					imageSrc={data.images[0].url}
					type={data.type}
					author={data.owner.display_name}
					duration={data.tracks.items.reduce(
						(a, b) => a + b.track.duration_ms,
						0
					)}
				/>
			)}

			<List itemLayout='horizontal' loading={isLoading}>
				{data?.tracks.items.map((item) => (
					<Track
						key={item.added_at.toString()}
						contextUri={data.uri}
						track={item.track}
					/>
				))}
			</List>
		</React.Fragment>
	);
};
