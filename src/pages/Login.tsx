/** @jsx jsx */
import { jsx } from '@emotion/core';
import React from 'react';
import { useSpotifyLogin } from '../spotify/hooks/useSpotifyLogin';
import { Layout, Typography, Button } from 'antd';
import { StaticBackground } from '../components/StaticBackground';

interface LoginProps {}

export const Login: React.FC<LoginProps> = (props) => {
	const { login } = useSpotifyLogin();

	return (
		<Layout
			css={{
				justifyContent: 'center',
				alignItems: 'center',
				height: '100vh',
			}}
		>
			<Typography.Title
				css={{ color: '#fff !important', textShadow: '0 0 6px #fff' }}
				level={1}
			>
				Keltonfy
			</Typography.Title>
			<Button
				type='primary'
				onClick={() => login()}
				css={{ boxShadow: '0 0 6px #1DB954' }}
			>
				Log In
			</Button>
			<StaticBackground />
		</Layout>
	);
};
