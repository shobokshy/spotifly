/** @jsx jsx */
import { jsx } from '@emotion/core';
import React from 'react';
import { useSpotifyPlayer } from '../spotify/hooks/useSpotifyPlayer';
import { Typography, Button, Space, Slider } from 'antd';
import { HeartIcon } from '../icons/Heart';
import { PlayIcon } from '../icons/Play';
import { SkipBackwardIcon } from '../icons/SkipBackward';
import { SkipForwardIcon } from '../icons/SkipForward';
import { RepeatIcon } from '../icons/Repeat';
import { ShuffleIcon } from '../icons/Shuffle';
import { PlaylistIcon } from '../icons/Playlist';
import { VolumeUpIcon } from '../icons/VolumeUp';
import { VolumeDownIcon } from '../icons/VolumeDown';
import { VolumeMuteIcon } from '../icons/VolumeMute';
import { PauseIcon } from '../icons/Pause';
import { msToString } from '../spotify/helpers';
import { useSpotifyMutation } from '../spotify/hooks/useSpotifyMutation';

interface PlayerProps {}

export const Player: React.FC<PlayerProps> = (props) => {
	const { player, playerState } = useSpotifyPlayer();
	const [volume, setVolume] = React.useState<number>(100);
	const [lastMutedVolume, setLastMutedVolume] = React.useState<number>(100);
	const [progress, setProgress] = React.useState<number>(0);

	const [shuffle, { isLoading: isShuffling }] = useSpotifyMutation<
		undefined,
		undefined
	>(
		'PUT',
		`/me/player/shuffle?device_id=${
			player?._options.id
		}&state=${!playerState?.shuffle}`
	);

	React.useEffect(() => {
		if (playerState) setProgress(playerState.position);
	}, [playerState]);

	React.useEffect(() => {
		const interval = setInterval(() => {
			if (playerState && !playerState.paused)
				setProgress((value) => value + 10);
		}, 10);
		return () => clearInterval(interval);
	}, [playerState]);

	const handleVolumeChange = async (percent: number) => {
		if (player) {
			player.setVolume(percent / 100);
			setVolume(percent);
		}
	};

	const toggleMute = () => {
		if (volume > 0) {
			setLastMutedVolume(volume);
			handleVolumeChange(0);
		} else {
			handleVolumeChange(lastMutedVolume);
		}
	};

	return (
		<div
			css={{
				display: 'flex',
				flexDirection: 'row',
				justifyContent: 'space-between',
				width: '100%',
			}}
		>
			<div
				css={{
					display: 'flex',
					flexDirection: 'row',
					alignItems: 'center',
					width: '30%',
					minWidth: 180,
				}}
			>
				{playerState?.track_window.current_track && (
					<React.Fragment>
						<img
							css={{ width: 56, height: 56 }}
							src={
								playerState?.track_window.current_track.album
									.images[0].url
							}
							alt='Track Album'
						/>
						<div
							css={{
								margin: '0 14px',
								display: 'flex',
								flexDirection: 'column',
								justifyContent: 'center',
							}}
						>
							<Typography.Link
								style={{
									color: '#fff',
									lineHeight: 'normal',
								}}
							>
								{playerState?.track_window.current_track.name}
							</Typography.Link>
							<Typography.Link>
								{
									playerState?.track_window.current_track
										.artists[0].name
								}
							</Typography.Link>
						</div>
						<HeartIcon />
					</React.Fragment>
				)}
			</div>

			<div
				css={{
					display: 'flex',
					flexDirection: 'column',
					alignItems: 'center',
					justifyContent: 'center',
					width: '40%',
					maxWidth: 722,
				}}
			>
				<Space direction='horizontal'>
					<Button
						css={{
							color: playerState?.shuffle
								? '#1DB954 !important'
								: undefined,
						}}
						loading={isShuffling}
						shape='circle'
						type='text'
						icon={<ShuffleIcon />}
						onClick={() => shuffle()}
					/>
					<Button
						shape='circle'
						type='text'
						icon={<SkipBackwardIcon />}
						onClick={() => player?.previousTrack()}
					/>
					<Button
						shape='circle'
						icon={
							playerState ? (
								playerState.paused ? (
									<PlayIcon />
								) : (
									<PauseIcon />
								)
							) : (
								<PlayIcon />
							)
						}
						onClick={() => player?.togglePlay()}
					/>
					<Button
						shape='circle'
						type='text'
						icon={<SkipForwardIcon />}
						onClick={() => player?.nextTrack()}
					/>
					<Button shape='circle' type='text' icon={<RepeatIcon />} />
				</Space>

				<Space
					direction='horizontal'
					size='small'
					css={{
						width: '100%',
						'.ant-space-item:nth-child(2)': {
							width: '100%',
						},
					}}
				>
					{playerState && msToString(progress)}
					<Slider
						value={progress}
						tooltipVisible={false}
						css={{
							width: '100%',
							'.ant-slider-handle': {
								display: 'none',
								backgroundColor: '#fff',
							},
							':hover': {
								'.ant-slider-handle': {
									display: 'block',
								},
							},
						}}
						max={
							playerState?.track_window.current_track.duration_ms
						}
					/>
					{playerState &&
						msToString(
							playerState.track_window.current_track.duration_ms
						)}
				</Space>
			</div>

			<div
				css={{
					display: 'flex',
					flexDirection: 'row-reverse',
					alignItems: 'center',
					justifyItems: 'center',
					width: '30%',
					minWidth: 180,
				}}
			>
				<Space direction='horizontal'>
					<Button
						shape='circle'
						type='text'
						icon={<PlaylistIcon />}
					/>
					<div
						css={{
							display: 'flex',
							alignItems: 'center',
							justifyItems: 'center',
							width: 136,
						}}
					>
						<Button
							shape='circle'
							type='text'
							onClick={toggleMute}
							icon={
								volume >= 50 ? (
									<VolumeUpIcon />
								) : volume > 0 ? (
									<VolumeDownIcon />
								) : (
									<VolumeMuteIcon />
								)
							}
						/>
						<Slider
							value={volume}
							css={{ width: '100%' }}
							onChange={handleVolumeChange}
						/>
					</div>
				</Space>
			</div>
		</div>
	);
};
