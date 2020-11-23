module.exports = {
  css: {
    loaderOptions: {
      scss: {
        prependData: '@import "./src/assets/index.min.css";'
      }
    }
  },
  publicPath: './',
  outputDir: 'docs/',
};
