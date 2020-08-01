import React from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import queryString from 'query-string';
import { getToken } from '../spotify/utils';
import { useSpotify } from '../spotify/hooks/useSpotify';

interface AuthorizedProps {}

export const Authorized: React.FC<AuthorizedProps> = (props) => {
	const location = useLocation();
	const history = useHistory();
	const {
		clientId,
		redirectUri,
		setAccessToken,
		setRefreshToken,
		pkce,
	} = useSpotify();

	React.useEffect(() => {
		(async () => {
			const params = queryString.parse(location.search);
			if (params.code && typeof params.code == 'string') {
				const response = await getToken(
					clientId,
					redirectUri,
					params.code,
					pkce.verifier
				);
				setAccessToken(response.accessToken);
				setRefreshToken(response.refreshToken);

				history.replace('/');
			}
		})();
	}, []);

	return null;
};
