const path = require('path');
const MonacoWebpackPlugin = require('monaco-editor-webpack-plugin');

module.exports = {
	mode: 'production',
	entry: './m-index.js',
	output: {
		path: path.resolve(__dirname, '../frontend/js/monaco/'),
		filename: 'monaco.bundle.js'
	},
	module: {
		rules: [
			{
				test: /\.css$/,
				use: ['style-loader', 'css-loader']
			},
			{
				test: /\.ttf$/,
				use: ['null-loader']
			}
		]
	},
	plugins: [
		new MonacoWebpackPlugin({
			languages: ["cpp"],
			globalAPI: true
		})
	]
};
