const path = require('path'),
	webpack = require('webpack'),
	HtmlWebpackPlugin = require('html-webpack-plugin'),
	CleanWebpackPlugin = require('clean-webpack-plugin');

const environment = process.env.NODE_ENV,
project = __dirname.split("/"),
dist = path.resolve(__dirname, 'dist', environment);

module.exports = {
	mode: environment === "debug" ? "development" : "production",
	entry: './src/index.tsx',
	output: {
		filename: project[project.length - 1] + ".js",
		path: dist
	},
	devtool: 'inline-source-map',
	devServer: {
		inline: true
	},
	resolve: {
        extensions: [".ts", ".tsx", ".js", ".json", ".less"], 
    },
	module: {
        rules: [
            { test: /\.tsx?$/, loader: "awesome-typescript-loader" },
            { enforce: "pre", test: /\.js$/, loader: "source-map-loader" },
			{ test: /\.less$/, loader: 'less-loader' },
		]
    },
	optimization: {
		minimize: environment === "release"
	},
	performance: {
		hints: false
	},
	plugins: [
        new CleanWebpackPlugin([environment]),
		new webpack.HotModuleReplacementPlugin(),
        new webpack.NoEmitOnErrorsPlugin(),
		new HtmlWebpackPlugin({
			hash: true,
			filename: 'index.html'
        })
	],
};


