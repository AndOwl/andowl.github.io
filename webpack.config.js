const path = require('path'),
	  sourcePath = path.join(__dirname, './sources'),
	  outputPath = path.join(__dirname, './docs'),
	  webpackCleanUpPlugin = require('webpack-cleanup-plugin'),
	  HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
	context: sourcePath,
	entry: {
		main: './main.tsx'
	},
	output: {
		path: outputPath,
		publicPath: '/',
		filename: 'bundle.js'
	},
	resolve: {
		extensions: ['*', '.js', '.jsx', '.ts', '.tsx'],
		mainFields: ['module', 'browser', 'main'],
		alias: {
			'app': path.resolve(__dirname, 'sources/app/')
		}
	},
	module: {
		rules: [
			// {
			// 			// 	test: /\.(js|jsx)$/,
			// 			// 	exclude: /node_modules/,
			// 			// 	use: ['babel-loader']
			// 			// },
			// 			// {
			// 			// 	test: /\.less$/,
			// 			// 	// use: ['style-loader', 'css-loader', 'sass-loader'],
			// 			// 	use: [
			// 			// 		{ loader: 'style-loader' },
			// 			// 		{ loader: 'css-loader' },
			// 			// 		{ loader: 'less-loader' }
			// 			// 	]
			// 			// },
			{
				test: /\.css$/,
				use: [
					{ loader: 'style-loader' },
					{ loader: 'css-loader' },
				]
			},
			{ test: /\.tsx?$/, use: 'ts-loader'},
			{ test: /\.html$/, use: 'html-loader' },
		]
	},
	plugins: [
		new webpackCleanUpPlugin(),
		new HtmlWebpackPlugin({
			template: 'assets/index.html'
		})
	],
	devServer: {
		contentBase: sourcePath,
		hot:true,
		inline: true,
		historyApiFallback: {
			disableDotRule: true
		},
		stats: 'minimal',
		headers: { 'Access-Control-Allow-Origin': '*' }
	},
	node: {
		// workaround for webpack-dev-server issue
		// https://github.com/webpack/webpack-dev-server/issues/60#issuecomment-103411179
		fs: 'empty',
		net: 'empty'
	}
};