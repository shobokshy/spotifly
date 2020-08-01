/** @jsx jsx */
import { jsx } from '@emotion/core';
import React from 'react';
import { Track as ITrack } from '../spotify/types';
import { List, Typography, Divider } from 'antd';
import { MusicIcon } from '../icons/Music';
import { msToString } from '../spotify/helpers';
import { HeartIcon } from '../icons/Heart';
import { PlayIcon } from '../icons/Play';
import { useSpotifyMutation } from '../spotify/hooks/useSpotifyMutation';
import { useSpotifyPlayer } from '../spotify/hooks/useSpotifyPlayer';
import { Link } from 'react-router-dom';

interface TrackProps {
	contextUri?: string;
	contextUris?: string[];
	track: ITrack;
}

export const Track: React.FC<TrackProps> = (props) => {
	const { player, playerState } = useSpotifyPlayer();
	const [play] = useSpotifyMutation<
		undefined,
		{ uris?: string[]; context_uri?: string; offset: { uri: string } }
	>('PUT', `/me/player/play?device_id=${player?._options.id}`);

	const [hovered, setHovered] = React.useState<boolean>(false);

	const playItem = (event: React.MouseEvent<HTMLDivElement>) => {
		const target = event.target as HTMLDivElement;
		if (target.classList.contains('link')) return;
		play({
			context_uri: props.contextUri,
			uris: props.contextUris,
			offset: {
				uri: props.track.uri,
			},
		});
	};

	const isActive =
		props.track.id === playerState?.track_window.current_track.id;

	return (
		<List.Item
			extra={msToString(props.track.duration_ms)}
			actions={[<HeartIcon />]}
			style={{
				borderBottom: 'none',
			}}
			css={{
				paddingLeft: 12,
				paddingRight: 12,
				color: isActive ? '#1DB954' : undefined,
				backgroundColor: 'transparent',
				transition: 'background-color .3s ease-in-out',
				':hover': {
					backgroundColor: '#ffffff1a',
					cursor: 'pointer',
				},
			}}
			onMouseEnter={() => setHovered(true)}
			onMouseLeave={() => setHovered(false)}
			onClick={playItem}
		>
			<List.Item.Meta
				avatar={hovered ? <PlayIcon /> : <MusicIcon />}
				title={
					<Typography.Text
						strong
						css={{ color: isActive ? '#1DB954' : undefined }}
					>
						{props.track.name}
					</Typography.Text>
				}
				description={
					<React.Fragment>
						{props.track.artists.map((artist, index) => (
							<React.Fragment key={artist.id}>
								<Typography.Link className='link'>
									{artist.name}
								</Typography.Link>
								{index < props.track.artists.length - 1 && ', '}
							</React.Fragment>
						))}

						{props.track.album && (
							<React.Fragment>
								<Divider type='vertical' />
								<Link
									className='link'
									to={`/album/${props.track.album.id}`}
								>
									{props.track.album.name}
								</Link>
							</React.Fragment>
						)}
					</React.Fragment>
				}
			/>
		</List.Item>
	);
};
