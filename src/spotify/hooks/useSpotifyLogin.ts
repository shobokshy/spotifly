import { useSpotify } from './useSpotify';

export const useSpotifyLogin = () => {
	const spotify = useSpotify();
	const clientId = spotify.clientId;
	const redirectUri = spotify.redirectUri;
	const codeChallengeMethod = 'S256';
	const codeChallenge = spotify.pkce.challenge;
	const scope =
		'streaming user-read-private user-library-read playlist-read-private playlist-read-collaborative';

	const login = () => {
		const authorizationUri = `https://accounts.spotify.com/authorize?response_type=code&client_id=${clientId}&redirect_uri=${redirectUri}&scope=${scope}&state=e21392da45dbf4&code_challenge=${codeChallenge}&code_challenge_method=${codeChallengeMethod}`;
		window.location.href = authorizationUri;
	};

	return {
		login,
	};
};
