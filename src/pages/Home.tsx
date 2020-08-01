/** @jsx jsx */
import { jsx } from '@emotion/core';
import React from 'react';
import { Layout } from 'antd';
import { Navigation } from '../components/Navigation';
import { Header } from '../components/Header';
import { Route } from 'react-router-dom';
import { Playlist } from '../components/Playlist';
import { Player } from '../components/Player';
import { Album } from '../components/Album';
import { Tracks } from '../components/Tracks';

interface HomeProps {}

export const Home: React.FC<HomeProps> = (props) => {
	return (
		<Layout css={{ height: '100vh' }}>
			<Layout>
				<Navigation />
				<Layout.Content>
					<Header />
					<div css={{ padding: 32, marginTop: 64 }}>
						<Route path='/collection/tracks'>
							<Tracks />
						</Route>
						<Route path='/playlist/:id'>
							<Playlist />
						</Route>
						<Route path='/album/:id'>
							<Album />
						</Route>
					</div>
				</Layout.Content>
			</Layout>
			<Layout.Footer
				css={{
					backgroundColor: '#282828',
					height: 90,
					zIndex: 2,
					display: 'flex',
					alignItems: 'center',
					padding: '0px 24px',
				}}
			>
				<Player />
			</Layout.Footer>
		</Layout>
	);
};
