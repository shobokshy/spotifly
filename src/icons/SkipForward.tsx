import React from 'react';
import Icon from '@ant-design/icons';
import { size } from './constants';

interface SkipForwardProps {}

const SkipForward: React.FC<SkipForwardProps> = (props) => {
	return (
		<svg
			xmlns='http://www.w3.org/2000/svg'
			viewBox='0 0 24 24'
			width={size}
			height={size}
			fill='currentColor'
		>
			<path fill='none' d='M0 0h24v24H0z' />
			<path d='M16 12.667L5.777 19.482A.5.5 0 0 1 5 19.066V4.934a.5.5 0 0 1 .777-.416L16 11.333V5a1 1 0 0 1 2 0v14a1 1 0 0 1-2 0v-6.333z' />
		</svg>
	);
};

export const SkipForwardIcon = (props: any) => (
	<Icon component={SkipForward} {...props} />
);
