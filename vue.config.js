const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true
})
defineConfig({
  base: '/projeto15/'
})
module.exports = {
  css: {
    loaderOptions: {
      sass: {
        additionalData: `@import "./src/utilitarios/_index.scss";`
      }
    }
  }
};
module.exports = {
  publicPath: process.env.NODE_ENV === "production" ? "/projeto15/" : "/",
};