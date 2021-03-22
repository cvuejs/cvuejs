/* eslint-disable */
const path = require('path')
const resolve = (dir) => path.resolve(__dirname, dir)

module.exports = {
  lintOnSave: true,
  chainWebpack: (config) => {
    config.resolve.alias
      .set('@', resolve('src'))
      .set('@cvue', resolve('packages'))
  }
}
