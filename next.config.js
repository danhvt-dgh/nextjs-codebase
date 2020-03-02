require('dotenv').config()

const withPlugins = require('next-compose-plugins');
const css = require('@zeit/next-css');
const withImages = require("next-images");
const webpack = require('webpack')

const nextConfig = {
  target: 'serverless',
  webpack(config) {
    config.module.rules.push({
      test: /\.(png|svg|eot|otf|ttf|woff|woff2)$/,
      use: {
        loader: 'url-loader',
        options: {
          limit: 8192,
          publicPath: '/_next/static/',
          outputPath: 'static/',
          name: '[name].[ext]',
        },
      },
		});
		config.plugins.push(
      new webpack.EnvironmentPlugin(process.env)
    )
    return config;
  },
};

module.exports = withPlugins([[css], [withImages]], nextConfig);
