import React from 'react';
import Icon from '@ant-design/icons';
import { size } from './constants';

interface MusicProps {}

const Music: React.FC<MusicProps> = (props) => {
	return (
		<svg
			xmlns='http://www.w3.org/2000/svg'
			viewBox='0 0 24 24'
			width={size}
			height={size}
			fill='currentColor'
		>
			<path fill='none' d='M0 0h24v24H0z' />
			<path d='M12 13.535V3h8v3h-6v11a4 4 0 1 1-2-3.465z' />
		</svg>
	);
};

export const MusicIcon = (props: any) => <Icon component={Music} {...props} />;
