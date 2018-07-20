const ManifestPlugin = require('webpack-manifest-plugin')

module.exports = {
  baseUrl: process.env.NODE_ENV === 'production'
    ? '/wp-content/themes/valencia-nonstop/dist/'
    : '/',
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
    if (process.env.NODE_ENV === 'production') {
      config
        .plugin('optimize-css')
        .tap(args => {
          args[0].cssnanoOptions.preset = ['default', { calc: false, cssDeclarationSorter: false }]
          return args
        })
    }
  }
}
