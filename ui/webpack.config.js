const webpack = require('webpack');

module.exports = {
  entry: [
    'react-hot-loader/patch',
    './src/index.js'
  ],
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: ['babel-loader']
      },
      {
        test: /\.(png|jpg|gif|svg)$/,
        use: [
          {
            loader: 'file-loader',
            options: {}
          }
        ]
      },
      {
        test: /\.scss$/,
        use: [
          "style-loader",
          "css-loader",
          "sass-loader"
        ]
      }
    ]
  },
  resolve: {
    extensions: ['*', '.js', '.jsx']
  },
  output: {
    path: __dirname + '/dist',
    publicPath: '/',
    filename: 'bundle.js'
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.DefinePlugin({
        'process.env': {
          'SECRET_KEY': JSON.stringify("f_w^fy7oax5&iln&l@a4z@*m3ts584%pbx*fnxd7108$rj84t3")
        }
      }
    )
  ],
  devServer: {
    contentBase: './dist',
    port: 8080,
    hot: true,
    historyApiFallback: true,
    proxy: {
      '/api': {
         target: {
            host: "127.0.0.1",
            protocol: 'http:',
            port: 5000
         },
         pathRewrite: {
            '^/api': ''
         }
      }
   }
  }
};
