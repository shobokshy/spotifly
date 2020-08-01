const CracoLessPlugin = require('craco-less');

module.exports = {
	plugins: [
		{
			plugin: CracoLessPlugin,
			options: {
				lessLoaderOptions: {
					lessOptions: {
						modifyVars: {
							'@primary-color': '#1DB954',
							'@body-background': '#131313',
							'@layout-header-background': '#040404',
							'@layout-header-color': '#fff',
							'@link-color': '@text-color-secondary',
							'@link-hover-color': '@text-color',
							'@link-hover-decoration': 'underline',
							'@menu-icon-size': '21px',
							'@slider-rail-background-color': '#434343',
							'@slider-track-background-color': '#b3b3b3',
							'@slider-track-background-color-hover':
								'@primary-color',
							'@slider-handle-color': 'transparent',
							'@slider-handle-color-hover': '#fff',
						},
						javascriptEnabled: true,
					},
				},
			},
		},
	],
};
