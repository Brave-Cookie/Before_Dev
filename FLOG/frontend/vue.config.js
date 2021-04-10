
// 백엔드와 통신하기 위한 설정
// api 

module.exports = { 
    devServer: { 
      proxy: { 
        '/api': { 
          target: 'http://localhost:3000/api',
          changeOrigin: true, 
          pathRewrite: { 
            '^/api': ''
          } 
        } 
      } 
    },
    outputDir: '../backend/public',
  }