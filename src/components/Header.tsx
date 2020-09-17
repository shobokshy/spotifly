/** @jsx jsx */
import { jsx } from '@emotion/core';
import React from 'react';
import {
	Layout,
	Input,
	Avatar,
	Typography,
	Space,
	Dropdown,
	Menu,
	Skeleton,
	Button,
} from 'antd';
import { useSpotifyQuery } from '../spotify/hooks/useSpotifyQuery';
import { User } from '../spotify/types';
import { ArrowLeftIcon } from '../icons/ArrowLeft';
import { ArrowRightIcon } from '../icons/ArrowRight';
import { useHistory } from 'react-router-dom';
import { useSpotify } from '../spotify/hooks/useSpotify';
import { UserIcon } from '../icons/User';

interface HeaderProps {}

export const Header: React.FC<HeaderProps> = (props) => {
	const { setAccessToken, setRefreshToken } = useSpotify();
	const { isLoading, data } = useSpotifyQuery<User>('user', '/me');
	const history = useHistory();

	const logout = () => {
		setAccessToken('');
		setRefreshToken('');
		history.push('/login');
	};

	return (
		<Layout.Header
			css={{
				display: 'flex',
				flexDirection: 'row',
				justifyContent: 'space-between',
				alignItems: 'center',
				position: 'fixed',
				zIndex: 1,
				width: 'calc(100vw - 232px)',
				padding: '0 32px',
			}}
		>
			<div>
				<Space size="large" direction="horizontal">
					<Space size="small" direction="horizontal">
						<Button
							shape="circle"
							icon={<ArrowLeftIcon />}
							onClick={history.goBack}
						/>
						<Button
							shape="circle"
							icon={<ArrowRightIcon />}
							onClick={history.goForward}
						/>
					</Space>

					<Input.Search
						placeholder="Search for what you love"
						onSearch={(value) => console.log(value)}
						css={{ width: 250 }}
					/>
				</Space>
			</div>

			<Dropdown
				arrow
				trigger={['click']}
				overlay={
					<Menu>
						<Menu.Item>Account</Menu.Item>
						<Menu.Item>Profile</Menu.Item>
						<Menu.Divider />
						<Menu.Item onClick={() => logout()}>Logout</Menu.Item>
					</Menu>
				}
			>
				<Space
					direction="horizontal"
					css={{
						':hover': {
							cursor: 'pointer',
						},
					}}
				>
					{isLoading ? (
						<React.Fragment>
							<Skeleton.Input
								style={{ width: 100 }}
								active={true}
							/>
							<Skeleton.Avatar active={true} />
						</React.Fragment>
					) : (
						<React.Fragment>
							<Typography.Text strong>
								{data?.display_name}
							</Typography.Text>
							<Avatar
								src={data?.images[0]?.url}
								icon={<UserIcon />}
							/>
						</React.Fragment>
					)}
				</Space>
			</Dropdown>
		</Layout.Header>
	);
};
