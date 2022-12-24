const path = require('path');
const env = require('./dev/env');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const HTMLWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

const ASSET_PATH = process.env.ASSET_PATH || '/';

var fileExtensions = [
  'jpg',
  'jpeg',
  'png',
  'gif',
  'eot',
  'otf',
  'svg',
  'ttf',
  'woff',
  'woff2',
];

let options = {
  mode: process.env.NODE_ENV || 'development',
  entry: {
    backgroundScript: path.resolve(
      __dirname,
      'src',
      'app',
      'scripts',
      'backgroundScript.js'
    ),
    contentScript: path.resolve(
      __dirname,
      'src',
      'app',
      'scripts',
      'contentScript.js'
    ),
    popup: path.resolve(__dirname, 'src', 'app', 'scripts', 'popup.js'),
    injectScript: path.resolve(
      __dirname,
      'src',
      'app',
      'scripts',
      'injectScript.js'
    ),
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: '[name].js',
    publicPath: ASSET_PATH,
  },
  devServer: {
    port: env.PORT,
    static: {
      directory: path.join(__dirname, 'dist'),
      watch: true,
    },
    proxy: {
      '*': `http://localhost:${env.PORT}`,
    },
    devMiddleware: {
      writeToDisk: true,
      index: true,
      publicPath: '/dist',
      serverSideRender: true,
    },
    compress: true,
    client: {
      logging: 'info',
      progress: true,
    },
    headers: { 'Access-Control-Allow-Origin': '*' },
    host: '0.0.0.0',
    server: 'http',
    liveReload: true,
  },
  module: {
    rules: [
      {
        // look for .css or .scss files
        test: /\.(css|scss)$/,
        // in the `src` directory
        use: [
          {
            loader: 'style-loader',
          },
          {
            loader: 'css-loader',
          },
          {
            loader: 'sass-loader',
            options: {
              sourceMap: true,
            },
          },
        ],
      },
      {
        test: new RegExp('.(' + fileExtensions.join('|') + ')$'),
        loader: 'file-loader',
        options: {
          name: '[name].[ext]',
        },
        exclude: /node_modules/,
      },
      {
        test: /\.html$/,
        loader: 'html-loader',
        exclude: /node_modules/,
      },
      //   { test: /\.(ts|tsx)$/, loader: 'ts-loader', exclude: /node_modules/ },
      {
        test: /\.(js|jsx)$/,
        use: [
          {
            loader: 'source-map-loader',
          },
          {
            loader: 'babel-loader',
          },
        ],
        exclude: /node_modules/,
      },

      {
        test: /\.svg$/i,
        issuer: /\.[jt]sx?$/,
        use: ['@svgr/webpack'],
        exclude: /node_modules/,
      },
    ],
  },
  resolve: {
    extensions: fileExtensions
      .map((extension) => '.' + extension)
      .concat(['.js', '.jsx', '.ts', '.tsx', '.css']),
    fallback: {
      crypto: require.resolve('crypto-browserify'),
      stream: require.resolve('stream-browserify'),
    },
  },
  plugins: [
    new CleanWebpackPlugin({
      verbose: true,
      cleanStaleWebpackAssets: true,
    }),
    new CopyWebpackPlugin({
      patterns: [
        {
          from: path.resolve(__dirname, 'src', 'public'),
          to: path.resolve(__dirname, 'dist'),
        },
      ],
    }),
  ],
};

if (env.NODE_ENV === 'development') {
  options.devtool = 'cheap-module-source-map';
} else {
  options.optimization = {
    minimize: true,
  };
}

module.exports = options;
