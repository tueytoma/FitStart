const merge = require('lodash/merge')

const config = {
  all: {
    env: process.env.NODE_ENV || 'development',
    isDev: process.env.NODE_ENV !== 'production',
    basename: process.env.PUBLIC_PATH,
    isBrowser: typeof window !== 'undefined',
    FRONTURL: 'http://localhost:3000',
    BACKURL: 'http://localhost:4000',
  },
  test: {},
  development: {},
  production: {},
}

module.exports = merge(config.all, config[config.all.env])
