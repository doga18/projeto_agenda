const path = require('path');

// carregando as variaveis de ambiente
require('dotenv').config();

module.exports = {
  mode: 'development', // Altere para 'production' quando estiver pronto para deploy
  entry: './frontend/main.js',
  output: {
    path: path.resolve(__dirname, 'public/assets/js'),
    filename: 'bundle.js',
    clean: true, // Limpa o diretório de saída antes de gerar novos arquivos
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env'],
          },
        },
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader'],
      },
    ],
  },
  devtool: 'source-map', // Ajuda na depuração
  devServer: {
    static: path.resolve(__dirname, 'public'), // Define o diretório de arquivos estáticos
    compress: true,
    port: process.env.PORTPROJECTFRONT, // Porta em que o servidor de desenvolvimento irá rodar
    open: true, // Abre o navegador automaticamente
    hot: true, // Ativa o HMR hot module replacement
  },
};
