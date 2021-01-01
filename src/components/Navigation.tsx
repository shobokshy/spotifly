/** @jsx jsx */
import { jsx } from '@emotion/core';
import { Button, Divider, Layout, Menu, Space, Typography } from 'antd';
import React from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import { useIntersect } from '../hooks/useIntersect';
import { AddIcon } from '../icons/Add';
import { DiscIcon } from '../icons/Disc';
import { HeartIcon } from '../icons/Heart';
import { HomeIcon } from '../icons/Home';
import { SpotifyIcon } from '../icons/Spotify';
import { useSpotifyPaginatedQuery } from '../spotify/hooks/useSpotifyPaginatedQuery';
import { Playlist } from '../spotify/types';

interface NavigationProps {}

export const Navigation: React.FC<NavigationProps> = (props) => {
	const history = useHistory();
	const location = useLocation();
	const {
		data,
		isFetching,
		isFetchingMore,
		fetchMore,
		canFetchMore,
	} = useSpotifyPaginatedQuery<Playlist>('playlist', '/me/playlists');

	const [ref, intersection] = useIntersect({ threshold: 1 });

	React.useEffect(() => {
		if (isFetchingMore) return;
		if (intersection?.isIntersecting && canFetchMore) fetchMore();
	}, [intersection]);

	const isLoading = isFetching && isFetchingMore !== 'next';

	return (
		<Layout.Sider
			width={232}
			css={{
				'.ant-layout-sider-children': {
					paddingTop: 24,
					display: 'flex',
					flexDirection: 'column',
				},
			}}
			collapsed={isLoading}
		>
			<div css={{ marginLeft: 24 }}>
				<Typography.Title css={{ color: '#fff !important' }} level={2}>
					<Space css={{ alignItems: 'center' }}>
						<SpotifyIcon css={{ fontSize: 36 }} />
						{!isLoading && 'Spotifly'}
					</Space>
				</Typography.Title>
			</div>

			<Menu
				css={{
					width: '100%',
					backgroundColor: 'transparent',
					border: 'none',
					fontSize: 16,
					marginBottom: 24,
				}}
				mode="inline"
				selectedKeys={[location.pathname]}
				onSelect={({ key }) => history.push(key.toString())}
			>
				<Menu.Item key="1" icon={<HomeIcon />}>
					Home
				</Menu.Item>
				<Menu.Item key="2" icon={<DiscIcon />}>
					Your Library
				</Menu.Item>
				<Menu.Item key="/collection/tracks" icon={<HeartIcon />}>
					Liked Songs
				</Menu.Item>
			</Menu>

			{!isLoading && (
				<React.Fragment>
					<Button
						css={{ textAlign: 'left' }}
						block
						type="text"
						size="large"
						icon={<AddIcon />}
					>
						Create Playlist
					</Button>

					<Divider />

					<div
						css={{
							overflowX: 'scroll',
						}}
					>
						<Menu
							css={{
								width: '100%',
								backgroundColor: 'transparent',
								border: 'none',
							}}
							mode="inline"
							selectedKeys={[location.pathname]}
							onSelect={({ key }) => history.push(key.toString())}
						>
							{data?.map((group, i) => {
								return group.items.map((item) => (
									<Menu.Item
										key={`/playlist/${item.id}`}
										style={{
											height: 32,
											lineHeight: '32px',
											paddingBottom: 0,
										}}
									>
										{item.name}
									</Menu.Item>
								));
							})}
							{canFetchMore && (
								<Menu.Item disabled>
									<div ref={ref}>Loading...</div>
								</Menu.Item>
							)}
						</Menu>
					</div>
				</React.Fragment>
			)}
		</Layout.Sider>
	);
};
