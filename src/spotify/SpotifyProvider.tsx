import React from 'react';
import { pkce } from './pkce';
import { useLocalStorage } from '../hooks/useLocalStorage';
import axios, { AxiosInstance, AxiosResponse } from 'axios';
import qs from 'qs';
import { useHistory, useLocation } from 'react-router-dom';
import { ReactQueryConfigProvider } from 'react-query';

interface SpotifyProviderProps {
	clientId: string;
	redirectUri: string;
}

export interface SpotifyContext {
	accessToken?: string;
	refreshToken?: string;
	setAccessToken: (token: string) => void;
	setRefreshToken: (token: string) => void;
	clientId: string;
	redirectUri: string;
	client: AxiosInstance;
	pkce: {
		challenge: string;
		verifier: string;
	};
}

export const SpotifyContext = React.createContext<SpotifyContext | null>(null);

export const SpotifyProvider: React.FC<SpotifyProviderProps> = (props) => {
	const history = useHistory();
	const location = useLocation();
	const [accessToken, setAccessToken] = React.useState<string>();
	const isRefreshing = React.useRef<boolean>(false);
	const failedQueue = React.useRef<Array<any>>([]);
	const [refreshToken, setRefreshToken] = useLocalStorage<string>(
		'sp_refresh_token'
	);
	const [challenge] = useLocalStorage('sp_challenge', pkce.challenge);
	const [verifier] = useLocalStorage('sp_verifier', pkce.verifier);

	const [isInit, setIsInit] = React.useState<boolean>(false);
	const [isClientReady, setIsClientReady] = React.useState<boolean>(false);

	const [client] = React.useState<AxiosInstance>(() =>
		axios.create({
			baseURL: 'https://api.spotify.com/v1/',
		})
	);

	const isOnAuthPages = () => {
		return (
			location.pathname === '/authorized' ||
			location.pathname === '/login'
		);
	};

	const processQueue = (error?: any, token?: string) => {
		failedQueue.current.forEach((prom) => {
			if (error) {
				prom.reject(error);
			} else {
				prom.resolve(token);
			}
		});

		failedQueue.current = [];
	};

	const responseOnFulfilled = (
		response: AxiosResponse<any>
	): AxiosResponse<any> | Promise<AxiosResponse<any>> => {
		return response;
	};

	const getAccessToken = () => {
		if (!refreshToken) return Promise.reject('No refresh token');
		return client.post(
			'https://accounts.spotify.com/api/token',
			qs.stringify({
				client_id: props.clientId,
				grant_type: 'refresh_token',
				refresh_token: refreshToken,
			}),
			{
				headers: {
					authorization: '',
					'content-type': 'application/x-www-form-urlencoded',
				},
			}
		);
	};

	const responseOnRejected = (error: any) => {
		if (error.response.status !== 401) return Promise.reject(error);

		if (isRefreshing.current) {
			return new Promise((resolve, reject) => {
				failedQueue.current = [
					...failedQueue.current,
					{ resolve, reject },
				];
			})
				.then((token) => {
					error.response.config.headers['Authorization'] =
						'Bearer ' + token;
					return axios(error.response.config);
				})
				.catch((error) => Promise.reject(error));
		}

		error.response.config._retry = true;
		isRefreshing.current = true;

		return getAccessToken()
			.then((response) => {
				setAccessToken(response.data.access_token);
				setRefreshToken(response.data.refresh_token);
				error.response.config.headers.authorization =
					'Bearer ' + response.data.access_token;
				processQueue(null, response.data.access_token);
				return client(error.response.config);
			})
			.catch((error) => {
				history.push('/login');
				processQueue(error);
				return Promise.reject(error);
			})
			.finally(() => (isRefreshing.current = false));
	};

	React.useEffect(() => {
		const interceptor = client.interceptors.response.use(
			responseOnFulfilled,
			responseOnRejected
		);

		setIsInit(true);

		return () => client.interceptors.response.eject(interceptor);
	}, [refreshToken]);

	React.useEffect(() => {
		if (!accessToken) return;

		const interceptor = client.interceptors.request.use(
			(config) => {
				config.headers.Authorization = `Bearer ${accessToken}`;
				return config;
			},
			(error) => Promise.reject(error)
		);

		return () => client.interceptors.request.eject(interceptor);
	}, [accessToken]);

	React.useEffect(() => {
		if (isOnAuthPages()) return;
		if (isInit) {
			if (!accessToken) {
				getAccessToken()
					.then((response) => {
						setAccessToken(response.data.access_token);
						setRefreshToken(response.data.refresh_token);
						setIsClientReady(true);
					})
					.catch((error) => {
						history.push('/login');
					});
			} else {
				setIsClientReady(true);
			}
		}
	}, [isInit, location]);

	return (
		<SpotifyContext.Provider
			value={{
				accessToken,
				refreshToken,
				setAccessToken,
				setRefreshToken,
				client,
				clientId: props.clientId,
				redirectUri: `${window.location.origin}${props.redirectUri}`,
				pkce: {
					challenge: challenge,
					verifier: verifier,
				},
			}}
		>
			<ReactQueryConfigProvider
				config={{
					queries: {
						staleTime: 120000,
					},
				}}
			>
				{isOnAuthPages() ? (
					props.children
				) : (
					<React.Fragment>
						{isClientReady && props.children}
					</React.Fragment>
				)}
			</ReactQueryConfigProvider>
		</SpotifyContext.Provider>
	);
};
