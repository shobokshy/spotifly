import React from 'react';
import Icon from '@ant-design/icons';
import { size } from './constants';

interface PlaylistProps {}

const Playlist: React.FC<PlaylistProps> = (props) => {
	return (
		<svg
			xmlns='http://www.w3.org/2000/svg'
			viewBox='0 0 24 24'
			width={size}
			height={size}
			fill='currentColor'
		>
			<path fill='none' d='M0 0H24V24H0z' />
			<path d='M22 18v2H2v-2h20zM2 3.5l8 5-8 5v-10zM22 11v2H12v-2h10zm0-7v2H12V4h10z' />
		</svg>
	);
};

export const PlaylistIcon = (props: any) => (
	<Icon component={Playlist} {...props} />
);
