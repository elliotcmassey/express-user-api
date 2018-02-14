const path = require('path');

module.exports = {
  webpack: (config, options, webpack) => {
    config.resolve.alias = {
      '~': path.resolve(__dirname, 'src'),
    };
    return config;
  },
};
