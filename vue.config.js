module.exports = {
  chainWebpack: config => {
    const vueRule = config.module.rule('vue')

    // add replacement loader(s)
    vueRule
      .use('vue-svg-inline-loader')
      .loader('vue-svg-inline-loader')
  }
}
