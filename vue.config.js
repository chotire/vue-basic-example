module.exports = {
  transpileDependencies: ['vuetify'],
  devServer: {
    overlay: false,
    proxy: {
      '/api': {
        target: 'http://localhost:8080', // target host
        changeOrigin: true, // needed for virtual hosted sites
        ws: true, // proxy websockets
      },
    },
  },
};
