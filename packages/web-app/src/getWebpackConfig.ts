import path from 'path';
import webpack from 'webpack';
import TerserPlugin from 'terser-webpack-plugin';
import { WebpackManifestPlugin } from 'webpack-manifest-plugin';
import LoadablePlugin from '@loadable/webpack-plugin';
import nodeExternals from 'webpack-node-externals';
import MiniCssExtractPlugin from 'mini-css-extract-plugin';

export type Environment = 'development' | 'staging' | 'production';

export default function getWebpackConfig(
  environment: Environment,
  basePath: string
) {
  const isProduction = environment === 'production';
  const isDevelopment = environment === 'development';

  return {
    mode: environment || 'production',
    entry: {
      client: !isDevelopment
        ? path.resolve(basePath, 'src/client')
        : [
            'webpack-hot-middleware/client',
            path.resolve(basePath, 'src/client'),
          ],
    },
    output: {
      filename: isProduction ? '[name].[chunkhash].js' : '[name].bundle.js',
      path: path.resolve(basePath, './build-static'),
      publicPath: '/',
    },
    module: {
      rules: [
        {
          test: /\.jsx$/,
          exclude: /node_modules/,
          loader: 'babel-loader',
        },
        {
          test: /\.tsx?$/,
          exclude: /node_modules/,
          loader: 'ts-loader',
          options: {
            compilerOptions: {
              module: 'esnext',
            },
          },
        },
        {
          test: /\.svg$/,
          exclude: /node_modules/,
          use: [
            'babel-loader',
            {
              loader: 'react-svg-loader',
              options: { jsx: true },
            },
          ],
        },
        {
          test: /\.css$/,
          use: [
            isProduction ? MiniCssExtractPlugin.loader : 'style-loader',
            {
              loader: 'css-loader',
              options: {
                sourceMap: true,
                modules: {
                  localIdentName: '[name]__[local]___[hash:base64:5]',
                },
                importLoaders: 1,
              },
            },
            {
              loader: 'postcss-loader',
              options: {
                plugins: () => [
                  // eslint-disable-next-line global-require
                  require('postcss-import'),
                  // eslint-disable-next-line global-require
                  require('postcss-preset-env')({
                    browsers: '> 0.5%, last 2 versions, Firefox ESR, not dead',
                    stage: 1,
                  }),
                ],
              },
            },
          ],
        },
      ],
    },
    plugins: [
      new WebpackManifestPlugin(),
      new LoadablePlugin({ writeToDisk: true }),
      isDevelopment && new webpack.HotModuleReplacementPlugin(),
    ].filter(Boolean),
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
      extensions: ['.ts', '.tsx', '.js', '.jsx', '.json'],
    },
    devtool: isProduction ? 'cheap-source-map' : false,
    performance: {
      maxAssetSize: 500000, // in bytes
      hints: false,
    },
    externals: nodeExternals(),
  };
}
