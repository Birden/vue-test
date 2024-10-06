const {defineConfig} = require('@vue/cli-service');

module.exports = defineConfig({
    transpileDependencies: true,
    publicPath: './',
    productionSourceMap: false,
    configureWebpack: {
        devtool: 'source-map'
    }
});
