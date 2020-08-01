/** @jsx jsx */
import { jsx } from '@emotion/core';
import React from 'react';
import { Typography, Divider, Button } from 'antd';
import { parseMS, padWithZero } from '../spotify/helpers';
import { PlayIcon } from '../icons/Play';

interface CollectionHeaderProps {
	type: string;
	title: string;
	author: string;
	duration: number;
	imageSrc?: string;
}

export const CollectionHeader: React.FC<CollectionHeaderProps> = (props) => {
	const msToString = (ms: number) => {
		const parsed = parseMS(ms);
		if (parsed.hours) {
			return `${parsed.hours} hr ${parsed.minutes} min`;
		} else {
			return `${parsed.minutes} min ${padWithZero(
				parsed.seconds,
				2
			)} sec`;
		}
	};

	return (
		<div
			css={{
				maxHeight: 500,
				minHeight: 340,
				height: '30vh',
			}}
		>
			<div
				css={{
					display: 'flex',
					flexDirection: 'row',
					alignItems: 'flex-end',
					minHeight: 232,
					paddingBottom: 12,
				}}
			>
				{props.imageSrc && (
					<img
						css={{ width: 232, height: 232, marginRight: 24 }}
						loading='lazy'
						src={props.imageSrc}
						alt={`${props.type} cover`}
					/>
				)}

				<div
					css={{
						display: 'flex',
						flexDirection: 'column',
					}}
				>
					<Typography.Text strong>
						{props.type.toUpperCase()}
					</Typography.Text>
					<Typography.Title style={{ marginTop: 0 }}>
						{props.title}
					</Typography.Title>
					<div>
						<Typography.Link>{props.author}</Typography.Link>
						<Divider type='vertical' />

						<Typography.Text type='secondary'>
							{msToString(props.duration)}
						</Typography.Text>
					</div>
				</div>
			</div>
			<div
				css={{
					paddingTop: 24,
				}}
			>
				<Button
					type='primary'
					shape='circle'
					size='large'
					icon={<PlayIcon />}
				/>
			</div>
		</div>
	);
};
