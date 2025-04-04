const path = require('path');
const TerserPlugin = require('terser-webpack-plugin');
const CopyPlugin = require('copy-webpack-plugin');

module.exports = {
  entry: './src/main.ts', // Entry point of your application
  module: {
    rules: [
      {
        test: /\.ts$/,
        use: 'ts-loader',
        exclude: /node_modules/,
      },
    ],
  },
  resolve: {
    extensions: ['.ts', '.js'],
  },
  output: {
    filename: 'script.min.js', // Output filename
    path: path.resolve(__dirname, './../static'), // Output directory
  },
  mode: 'production', // Enables minification and optimizations
  optimization: {
    minimizer: [new TerserPlugin()],
  },
  plugins: [ // Add this section
    new CopyPlugin({
      patterns: [
        { from: 'src/localization/locales', to: 'localization/locales' },
      ],
    }),
  ],
};