var webpack = require('webpack');
var HtmlWebpackPlugin = require('html-webpack-plugin');

var paths = {
  build: __dirname + '/build',
  node: __dirname + '/node_modules',
  source: __dirname + '/src'
};

module.exports = {
  context: paths.source,
  entry: {
    main: [
      'webpack-dev-server/client?http://localhost:8080', // WebpackDevServer host and port
      'webpack/hot/only-dev-server',
      './index.js' // Your appʼs entry point
    ]
  },
  output: {
    filename: '[name].js',
    path: paths.build
  },
  resolve: {
    extensions: ['', '.js', '.jsx']
  },
  resolveLoader: {
    // Ensure dependencies in external packages will use this projects's loaders,
    // instead of resolving to its loaders.
    root: paths.node
  },
  devServer: {
    //contentBase: './src',
    noInfo: true, //  --no-info option
    hot: true
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoErrorsPlugin(),
    // Create `index.html` with appropriate references to generated files.
    new HtmlWebpackPlugin({
      title: 'Cycle Demo',
      inject: true,
      template: paths.source + '/index.html'
    })
  ],
  module: {
    loaders: [
      {
        test: /\.(css|less)$/,
        loader: 'style!css?modules&localIdentName=[path][local]_[hash:base64:5]!autoprefixer!less'
      },
      {
        test: /\.html$/,
        loader: 'file?name=[name].[ext]'
      },
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        loaders: ['babel']
      },
      {
        test: /\.svg$/,
        loader: 'raw'
      }
    ]
  }
};
