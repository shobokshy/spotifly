/** @jsx jsx */
import { jsx } from '@emotion/core';
import { List } from 'antd';
import React from 'react';
import { useParams } from 'react-router-dom';
import { useSpotifyQuery } from '../spotify/hooks/useSpotifyQuery';
import { Album as IAlbum } from '../spotify/types';
import { CollectionHeader } from './CollectionHeader';
import { Track } from './Track';

interface AlbumProps {}

export const Album: React.FC<AlbumProps> = (props) => {
	const { id } = useParams();
	const { isLoading, data } = useSpotifyQuery<IAlbum>(
		['album', id],
		`/albums/${id}`
	);

	return (
		<React.Fragment>
			{data && (
				<CollectionHeader
					title={data.name}
					imageSrc={data.images[0].url}
					type={data.album_type}
					author={data.artists[0].name}
					duration={data.tracks.items.reduce(
						(a, b) => a + b.duration_ms,
						0
					)}
				/>
			)}

			<List itemLayout='horizontal' loading={isLoading}>
				{data?.tracks.items.map((item) => (
					<Track contextUri={data.uri} key={item.id} track={item} />
				))}
			</List>
		</React.Fragment>
	);
};
