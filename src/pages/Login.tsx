/** @jsx jsx */
import { jsx } from '@emotion/core';
import { Button, Layout, Typography } from 'antd';
import React from 'react';
import { StaticBackground } from '../components/StaticBackground';
import { useSpotifyLogin } from '../spotify/hooks/useSpotifyLogin';

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
				Spotifly
			</Typography.Title>
			<Button
				type="primary"
				onClick={() => login()}
				css={{ boxShadow: '0 0 6px #1DB954' }}
			>
				Log In
			</Button>
			<StaticBackground />
		</Layout>
	);
};
