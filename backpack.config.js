const path = require('path');
const CopyWebpackPlugin = require('copy-webpack-plugin')

module.exports = {
  webpack: (config, options, webpack) => {
    config.resolve.alias = {
      '~': path.resolve(__dirname, 'src'),
    };
    config.plugins = [
      new CopyWebpackPlugin([
        { from: 'src/migrations/users.db', to: 'assets' },
      ], options),
    ];
    return config;
  },
};
