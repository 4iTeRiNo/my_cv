const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

let mode = 'development';
if(process.env.NODE_ENV === 'production') {
	mode = 'production';
}
console.log(mode + ' mode')

module.exports = {
	mode: mode,
	entry: path.resolve(__dirname, 'src', 'index.js'),
	output: {
		assetModuleFilename: 'asset/[hash][ext][query]',
		path: path.resolve(__dirname, 'dist', 'minesweeper'),
		publicPath: 'auto',
		filename: '[name].[contenthash].js',
		clean: true,
	},
	devtool: 'source-map',
	plugins: [
		new MiniCssExtractPlugin({
			filename: '[name].[contenthash].css'
		}),
		new HtmlWebpackPlugin({
		template: path.resolve(__dirname, 'src', 'index.html')
	})],
	module: {
		rules: [
			{
				test: /\.html$/i,
				loader: 'html-loader'
			},
      {
        test: /\.(sa|sc|c)ss$/i,
        use: [
					(mode === 'development') ? 'style-loader' : MiniCssExtractPlugin.loader,
					'css-loader',
					'postcss-loader',
					'sass-loader',
				],
      },
			{
				test: /\.(png|svg|jpg|jpeg|gif)$/i,
				type: 'asset/resource',
			},
			{
				test: /\.(woff|woff2|eot|ttf|otf)$/i,
				type: 'asset/resource',
			},
			{
				test: /\.(?:js|mjs|cjs)$/,
				exclude: /node_modules/,
				use: {
					loader: 'babel-loader',
					options: {
						presets: [
							['@babel/preset-env', { targets: "defaults" }]
						]
					}
				}
			},
    ],
	},
}