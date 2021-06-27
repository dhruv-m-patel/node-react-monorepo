const path = require('path');
const dotenv = require('dotenv');
const webpack = require('webpack');
const TerserPlugin = require('terser-webpack-plugin');
const ManifestPlugin = require('webpack-manifest-plugin');
const LoadablePlugin = require('@loadable/webpack-plugin');

dotenv.config();

const isProduction = process.env.NODE_ENV === 'production';
const isDevelopment = process.env.NODE_ENV === 'development';

const plugins = [
  new ManifestPlugin(),
  new LoadablePlugin({ writeToDisk: true }),
];

if (isDevelopment) {
  plugins.push(new webpack.HotModuleReplacementPlugin());
}

module.exports = {
  mode: process.env.NODE_ENV || 'production',
  entry: {
    client: !isDevelopment
      ? path.resolve(__dirname, 'src/client/index.js')
      : [
          'webpack-hot-middleware/client?reload=true',
          path.resolve(__dirname, 'src/client/index.js'),
        ],
  },
  output: {
    filename: isProduction ? '[name].[chunkhash].js' : '[name].bundle.js',
    path: path.resolve(__dirname, './build-static'),
    publicPath: '/',
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
        options: {
          envName: 'webpack',
        },
      },
    ],
  },
  plugins,
  optimization: {
    splitChunks: {
      cacheGroups: {
        vendor: {
          chunks: 'initial',
          test: /[\\/]node_modules[\\/](react|react-dom|react-router-dom|redux|react-redux)[\\/]/,
          name: 'vendor',
          enforce: true,
        },
      },
    },
    namedModules: true,
    noEmitOnErrors: true,
    ...(isProduction && {
      minimizer: [
        new TerserPlugin({
          sourceMap: true,
          cache: true,
          parallel: true,
        }),
      ],
    }),
  },
  resolve: {
    extensions: ['.js', '.jsx', '.json'],
  },
  devtool: isProduction ? 'cheap-source-map' : false,
  performance: {
    maxAssetSize: 500000, // in bytes
    hints: false,
  },
};
