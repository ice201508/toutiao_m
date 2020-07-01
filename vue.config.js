module.exports = {
  devServer: {
    host: '127.0.0.1',
    proxy: {
      '/tt': {
        target: 'http://ttapi.research.itcast.cn/',
        changeOrigin: true,
        pathRewrite: {
          '^/tt': ''
        }
      }
    }
  }
};
