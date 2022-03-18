import path from 'path';
import { Configuration } from 'webpack';

// Plugins
import ForkTsCheckerWebpackPlugin from 'fork-ts-checker-webpack-plugin';
import { TsconfigPathsPlugin } from 'tsconfig-paths-webpack-plugin';
import ESLintPlugin from 'eslint-webpack-plugin';

export const babelOptions = {
  presets: [
    '@babel/preset-env',
    [
      '@babel/preset-typescript',
      {
        allowDeclareFields: true,
      },
    ],
  ],
  plugins: [
    '@babel/plugin-transform-runtime',
    '@babel/proposal-class-properties',
    '@babel/proposal-object-rest-spread',
  ],
  sourceType: 'unambiguous',
};

const webpackConfig: Configuration = {
  mode: 'production',
  entry: {
    index: path.resolve(__dirname, 'index.ts'),
  },
  resolve: {
    extensions: ['.ts', '.tsx', '.js'],
    plugins: [new TsconfigPathsPlugin()],
  },
  target: 'node',
  optimization: {
    moduleIds: 'deterministic',
    splitChunks: {
      chunks: 'all',
    },
  },
  module: {
    rules: [
      {
        test: /\.[jt]sx?$/,
        exclude: /node_modules/,
        use: [
          {
            loader: 'babel-loader',
            options: babelOptions,
          },
          {
            loader: 'ts-loader',
            options: {
              transpileOnly: true,
            },
          },
        ],
      },
      {
        test: /\.m?js$/,
        exclude: /node_modules/,
        use: [
          {
            loader: 'babel-loader',
            options: babelOptions,
          },
        ],
      },
    ],
  },
  output: {
    path: path.join(__dirname),
    filename: '[name].js',
    publicPath: 'auto',
    library: {
      name: 'Blocker',
      type: 'commonjs-module',
    },
  },
  plugins: [
    new ESLintPlugin({
      extensions: ['.ts', '.js'],
    }),
    new ForkTsCheckerWebpackPlugin(),
  ],
};

export default webpackConfig;
