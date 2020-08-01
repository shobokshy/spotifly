import React from 'react';
import Icon from '@ant-design/icons';
import { size } from './constants';

interface PauseProps {}

const Pause: React.FC<PauseProps> = (props) => {
	return (
		<svg
			xmlns='http://www.w3.org/2000/svg'
			viewBox='0 0 24 24'
			width={size}
			height={size}
			fill='currentColor'
		>
			<path fill='none' d='M0 0h24v24H0z' />
			<path d='M6 5h2v14H6V5zm10 0h2v14h-2V5z' />
		</svg>
	);
};

export const PauseIcon = (props: any) => <Icon component={Pause} {...props} />;
