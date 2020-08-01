import React from 'react';
import Icon from '@ant-design/icons';
import { size } from './constants';

interface DiscProps {}

const Disc: React.FC<DiscProps> = (props) => {
	return (
		<svg
			xmlns='http://www.w3.org/2000/svg'
			viewBox='0 0 24 24'
			width={size}
			height={size}
			fill='currentColor'
		>
			<path fill='none' d='M0 0h24v24H0z' />
			<path d='M13 9.17A3 3 0 1 0 15 12V2.458c4.057 1.274 7 5.064 7 9.542 0 5.523-4.477 10-10 10S2 17.523 2 12 6.477 2 12 2c.337 0 .671.017 1 .05v7.12z' />
		</svg>
	);
};

export const DiscIcon = (props: any) => <Icon component={Disc} {...props} />;
