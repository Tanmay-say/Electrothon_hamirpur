const webpack = require('webpack');
const NodePolyfillPlugin = require('node-polyfill-webpack-plugin');

module.exports = function override(config) {
  config.resolve = {
    ...config.resolve,
    fallback: {
      "fs": false,
      "tls": false,
      "net": false,
      "path": require.resolve("path-browserify"),
      "zlib": require.resolve("browserify-zlib"),
      "http": require.resolve("stream-http"),
      "https": require.resolve("https-browserify"),
      "stream": require.resolve("stream-browserify"),
      "crypto": require.resolve("crypto-browserify"),
      "os": require.resolve("os-browserify/browser"),
      "buffer": require.resolve("buffer"),
      "util": require.resolve("util/"),
      "worker_threads": false
    }
  };
  
  config.plugins.push(
    new webpack.ProvidePlugin({
      process: 'process/browser',
      Buffer: ['buffer', 'Buffer']
    }),
    new NodePolyfillPlugin()
  );

  config.ignoreWarnings = [/Failed to parse source map/];

  return config;
};