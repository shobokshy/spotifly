import axios from 'axios';
import qs from 'qs';

export const getToken = async (
	clientId: string,
	redirectUri: string,
	code: string,
	verifier: string
): Promise<{
	accessToken: string;
	refreshToken: string;
}> => {
	const res = await axios.post(
		'https://accounts.spotify.com/api/token',
		qs.stringify({
			client_id: clientId,
			grant_type: 'authorization_code',
			redirect_uri: redirectUri,
			code: code,
			code_verifier: verifier,
		}),
		{
			headers: { 'content-type': 'application/x-www-form-urlencoded' },
		}
	);

	return {
		accessToken: res.data.access_token,
		refreshToken: res.data.refresh_token,
	};
};
