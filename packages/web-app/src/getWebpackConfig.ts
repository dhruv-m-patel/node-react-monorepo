import path from 'path';
import webpack from 'webpack';
import TerserPlugin from 'terser-webpack-plugin';
import { WebpackManifestPlugin } from 'webpack-manifest-plugin';
import LoadablePlugin from '@loadable/webpack-plugin';
import nodeExternals from 'webpack-node-externals';
import MiniCssExtractPlugin from 'mini-css-extract-plugin';
import CssMinimizerPlugin from 'css-minimizer-webpack-plugin';

export type Environment = 'development' | 'staging' | 'production';

export default function getWebpackConfig(
  environment: Environment,
  basePath: string
) {
  const isProduction = environment === 'production';
  const isDevelopment = environment === 'development';

  return {
    mode: environment || 'production',
    devtool: 'inline-source-map',
    entry: {
      client: [
        isDevelopment && 'webpack-hot-middleware/client?reload=true',
        path.resolve(basePath, 'src/client'),
      ].filter(Boolean),
    },
    output: {
      filename: isProduction ? '[name].[chunkhash].js' : '[name].bundle.js',
      path: path.resolve(basePath, './build-static'),
      publicPath: '/',
    },
    module: {
      rules: [
        {
          test: /\.tsx?$/,
          exclude: /node_modules/,
          use: [
            'babel-loader',
            {
              loader: 'ts-loader',
              options: {
                compilerOptions: {
                  sourceMap: true,
                  module: 'esnext',
                },
              },
            },
          ],
        },
        {
          test: /\.jsx?$/,
          exclude: /node_modules/,
          loader: 'babel-loader',
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
                    // If you don't set this, you get the GB preset default,
                    // which is fine in most cases
                    browsers: process.env.BROWSER_SUPPORT,
                    // Setting to stage 1 for now so we don't break functionality
                    // that worked with postcss-cssnext
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
      new WebpackManifestPlugin({}),
      new LoadablePlugin({ writeToDisk: true }),
      isProduction &&
        new MiniCssExtractPlugin({
          filename: '[name].[contenthash].css',
        }),
      isDevelopment && new webpack.HotModuleReplacementPlugin(),
      isDevelopment && new webpack.NoEmitOnErrorsPlugin(),
    ].filter(Boolean),
    optimization: {
      moduleIds: 'named',
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
      ...(isProduction && {
        minimizer: [
          new TerserPlugin({
            parallel: true,
            terserOptions: {
              sourceMap: true,
              compress: true,
              mangle: true,
            },
          }),
          new CssMinimizerPlugin({
            minimizerOptions: {
              preset: [
                'default',
                {
                  discardComments: true,
                },
              ],
            },
            minify: CssMinimizerPlugin.cleanCssMinify,
          }),
        ],
      }),
    },
    resolve: {
      extensions: ['.js', '.jsx', '.ts', '.tsx', '.css'],
    },
    ...(isProduction && {
      devtool: 'source-map',
      performance: {
        maxAssetSize: 200 * 1000, // Max 200kB per bundle
        maxEntrypointSize: 300 * 1000, // Max 300kB per bundle
        hints: 'warning',
      },
    }),
    externals: nodeExternals(),
  };
}
