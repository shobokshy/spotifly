import React from 'react';
import Icon from '@ant-design/icons';
import { size } from './constants';

interface RepeatProps {}

const Repeat: React.FC<RepeatProps> = (props) => {
	return (
		<svg
			xmlns='http://www.w3.org/2000/svg'
			viewBox='0 0 24 24'
			width={size}
			height={size}
			fill='currentColor'
		>
			<path fill='none' d='M0 0h24v24H0z' />
			<path d='M6 4h15a1 1 0 0 1 1 1v7h-2V6H6v3L1 5l5-4v3zm12 16H3a1 1 0 0 1-1-1v-7h2v6h14v-3l5 4-5 4v-3z' />
		</svg>
	);
};

export const RepeatIcon = (props: any) => (
	<Icon component={Repeat} {...props} />
);
