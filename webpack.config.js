const path = require('path');
// webpackモジュールを読み込む
const webpack = require('webpack');
// html-webpack-pluginモジュールを読み込む
const HtmlWebpackPlugin = require('html-webpack-plugin');

const src = path.join(__dirname, 'src');
const dist = path.join(__dirname, 'dist');

const IconfontPlugin = require('iconfont-plugin-webpack');
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const ExtractTextPlugin = require('extract-text-webpack-plugin');
module.exports = {
  // developmentモードで実行します
  mode: 'development',
  // ビルドを実行するファイルパス
  entry: path.resolve(src, 'js/index.js'),
  output: {
    // 生成されるファイル名
    filename: 'index.bundle.js',
    // 生成先のディレクトリー
    path: dist
  },
  resolve: {
    // import文のパス指定にnode_modulesを省略できるようにします
    modules: ['node_modules'],
    // .jsまたは.jsxの拡張子を省略できるようにします
    extensions: ['.js', '.jsx']
  },
  module: {
    rules: [
      {
        // ルールを適用するファイルの正規表現
        test: /\.(js|jsx)$/,
        // node_modules以下のファイルには適用しないようにします
        exclude: /node_modules/,
        // 使用するloader
        loader: 'babel-loader'
      },
      {
          test: /\.scss$/,
          use: ExtractTextPlugin.extract({
              fallback: 'style-loader',
              use: ['css-loader', 'sass-loader']
          })
      },
      {
          test: /\.(svg|eot|ttf|woff|woff2)$/,
          use: [
              {
                  loader: 'url-loader',
                  options: {
                      limit: 8192,
                      outputPath: 'fonts/'
                  }
              }
          ]
      }
    ]
  },
  // sourceMappingの設定
  devtool: 'cheap-module-eval-source-map',
  devServer: {
    contentBase: dist, // 開発サーバーを立ち上げる参照ディレクトリー
    hot: true, // hot-reloadを有効にします
    port: 3000 // サーバーを立ち上げるポート番号
  },
  plugins: [
    // hot-reloadを有効にするプラグインを追加
    new webpack.HotModuleReplacementPlugin(), // HtmlWebpackPluginプラグインを追加
    new HtmlWebpackPlugin(),
    new IconfontPlugin({
      src: 'src/asset/iconfont', // required - directory where your .svg files are located
      family: 'iconfont', // optional - the `font-family` name. if multiple iconfonts are generated, the dir names will be used.
      dest: {
          font: 'src/font/[family].[type]', // required - paths of generated font files
          css: 'src/css/_iconfont_[family].scss' // required - paths of generated css files
      },
      watch: {
          pattern: 'src/asset/iconfont/*.svg', // required - watch these files to reload
          cwd: undefined // optional - current working dir for watching
      },
      // cssTemplate: function() {}// optional - the function to generate css contents
    }),
    new MiniCssExtractPlugin('src/css/[name].css')

  ]
};