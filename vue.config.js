module.exports = {
  publicPath: './',
  outputDir: 'docs/',
  css: {
    loaderOptions: {
      scss: {
        prependData: '@import "@/assets/index.min.css";'
      }
    }
  },
}
