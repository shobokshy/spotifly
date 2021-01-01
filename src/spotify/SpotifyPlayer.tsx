import React from 'react';
import ScriptTag from 'react-script-tag';
import { useSpotify } from './hooks/useSpotify';
import { PlaybackPlayer, PlaybackState } from './types';

export const SpotifyPlayerContext = React.createContext<{
	player?: PlaybackPlayer;
	playerState?: PlaybackState;
} | null>(null);

interface SpotifyPlayerProps {}

export const SpotifyPlayer: React.FC<SpotifyPlayerProps> = (props) => {
	const name = 'Spotifly';
	const [SDKReady, setSDKReady] = React.useState<boolean>(false);
	const [player, setPlayer] = React.useState<PlaybackPlayer>();
	const [playerState, setPlayerState] = React.useState<PlaybackState>();
	const { accessToken } = useSpotify();

	React.useEffect(() => {
		if (!SDKReady || !accessToken) return;

		//@ts-ignore
		const player = new window.Spotify.Player({
			getOAuthToken: (cb: (token: string) => void) => {
				cb(accessToken!);
			},
			name,
		}) as PlaybackPlayer;

		player.connect().then((test) => {
			setPlayer(player);
		});
	}, [SDKReady]);

	React.useEffect(() => {
		// @ts-ignore
		window.onSpotifyWebPlaybackSDKReady = () => setSDKReady(true);

		return () => player?.disconnect();
	}, []);

	React.useEffect(() => {
		if (player)
			player.addListener('player_state_changed', (state) => {
				if (state) setPlayerState(state);
			});
	}, [player]);

	return (
		<SpotifyPlayerContext.Provider value={{ player, playerState }}>
			<ScriptTag
				type="text/javascript"
				src="https://sdk.scdn.co/spotify-player.js"
			/>
			{player && props.children}
		</SpotifyPlayerContext.Provider>
	);
};
