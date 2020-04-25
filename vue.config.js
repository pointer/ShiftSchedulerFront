module.exports = {
  productionSourceMap: false,
  transpileDependencies: [/node_modules[/\\\\]vuetify[/\\\\]/],
  pluginOptions: {
    i18n: {
      enableInSFC: true
    }
  }
}
