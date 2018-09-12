const webpack = require('webpack')
const path = require("path");


module.exports = (baseConfig, env, defaultConfig) => {
  // configType has a value of 'DEVELOPMENT' or 'PRODUCTION'
  // You can change the configuration based on that.
  // 'PRODUCTION' is used when building the static version of storybook.

  // Make whatever fine-grained changes you need
  defaultConfig.module.rules.push({
    test: /\.(vert|frag)$/,
    include: path.resolve(__dirname, '../node_modules'),
    use: 'raw-loader'
  })
  defaultConfig.module.rules.push({
    test: /\.(ogg|mp3)$/,
    include: path.resolve(__dirname, '../src/assets'),
    use: 'file-loader'
  })

  defaultConfig.resolve.extensions.push('.vert', '.frag', '.ogg', '.mp3')

  defaultConfig.plugins.push(
    new webpack.DefinePlugin({
      'CANVAS_RENDERER': JSON.stringify(true),
      'WEBGL_RENDERER': JSON.stringify(true)
    })
  )

  // Return the altered config
  return defaultConfig
}
