const path = require("path"),
  webpack = require("webpack"),
  HtmlWebpackPlugin = require("html-webpack-plugin"),
  CleanWebpackPlugin = require("clean-webpack-plugin"),
  MiniCssExtractPlugin = require("mini-css-extract-plugin");

const environment = process.env.NODE_ENV,
  project = __dirname.split("/"),
  dist = path.resolve(__dirname, "dist", environment);

const isDebugEnv = () => {
	return environment === "debug";
};

module.exports = {
  mode: isDebugEnv() ? "development" : "production",
  entry: "./src/index.tsx",
  output: {
    filename: project[project.length - 1] + ".js",
    path: dist
  },
  devtool: "inline-source-map",
  devServer: {
    inline: true
  },
  resolve: {
    extensions: [".ts", ".tsx", ".js", ".json", ".less"]
  },
  module: {
    rules: [
      { test: /\.tsx?$/, loader: "awesome-typescript-loader" },
      { enforce: "pre", test: /\.js$/, loader: "source-map-loader" },
      {
        test: /\.less$/,
        use: [MiniCssExtractPlugin.loader, "css-loader", "less-loader"]
      },
      { test: /\.(png|jpg|gif)$/, loader: "file-loader", options: {} }
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
    new webpack.DefinePlugin({
    	__STATIC_HOSTED__: true 
    }),
    new MiniCssExtractPlugin({
      filename: "index.css"
    }),
    new HtmlWebpackPlugin({
      hash: true,
      filename: "index.html",
      template: "./src/index.html"
    })
  ]
};
