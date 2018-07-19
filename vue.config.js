const ManifestPlugin = require('webpack-manifest-plugin')

module.exports = {
  configureWebpack: {
    plugins: [
      new ManifestPlugin()
    ]
  },
  chainWebpack: config => {
    // Add support for inline SVG
    config.module
      .rule('vue')
      .use('vue-svg-inline-loader')
      .loader('vue-svg-inline-loader')

    // Temporarily disable postcss-calc optimizations due to
    // an unresolved issue when combining cal() and env()
    config
      .plugin('optimize-css')
      .tap(args => {
        args[0].cssnanoOptions.preset = ['default', { calc: false }]
        return args
      })
  }
}
