/** @jsx jsx */
import { jsx, keyframes } from '@emotion/core';
import React from 'react';

interface StaticBackgroundProps {}

export const StaticBackground: React.FC<StaticBackgroundProps> = (props) => {
	const grain = keyframes`
        0%, 100% { transform:translate(0, 0) }
        10% { transform:translate(-5%, -10%) }
        20% { transform:translate(-15%, 5%) }
        30% { transform:translate(7%, -25%) }
        40% { transform:translate(-5%, 25%) }
        50% { transform:translate(-15%, 10%) }
        60% { transform:translate(15%, 0%) }
        70% { transform:translate(0%, 15%) }
        80% { transform:translate(3%, 35%) }
        90% { transform:translate(-10%, 10%) }
    `;

	return (
		<div
			css={{
				position: 'fixed',
				width: '300%',
				height: '300%',
				top: '-100%',
				left: '-50%',
				backgroundImage: `url(/noise.png)`,
				backgroundRepeat: 'repeat',
				animation: `${grain} 10s steps(10) infinite`,
				zIndex: 0,
				pointerEvents: 'none',
				opacity: 0.9,
			}}
		/>
	);
};
