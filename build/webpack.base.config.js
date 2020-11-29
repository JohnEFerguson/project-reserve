const path = require("path");
const webpack = require("webpack");
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const FriendlyErrorsPlugin = require("friendly-errors-webpack-plugin");
const { VueLoaderPlugin } = require("vue-loader");

const isProd = process.env.NODE_ENV === "production";

const config = {
  devtool: isProd ? false : "cheap-module-source-map",
  resolve: {
    alias: {
      public: path.resolve(__dirname, "../public"),
    },
  },
  module: {
    noParse: /es6-promise\.js$/, // avoid webpack shimming process
    rules: [
      {
        test: /\.vue$/,
        loader: "vue-loader",
        options: {
          compilerOptions: {
            preserveWhitespace: false,
          },
        },
      },
      {
        test: /\.js$/,
        loader: "babel-loader",
        exclude: /node_modules/,
        query: {
          presets: ["es2015", "stage-2"],
        },
      },
      {
        test: /\.(png|jpg|gif|svg)$/,
        loader: "url-loader",
        options: {
          limit: 10000,
          name: "[name].[ext]?[hash]",
        },
      },
      {
        test: /\.styl(us)?$/,
        use: isProd
          ? ExtractTextPlugin.extract({
              use: [
                {
                  loader: "css-loader",
                  options: { minimize: true },
                },
                "stylus-loader",
              ],
              fallback: "vue-style-loader",
            })
          : ["vue-style-loader", "css-loader", "stylus-loader"],
      },
    ],
  },
  performance: {
    hints: false,
  },
  plugins: isProd
    ? [
        new VueLoaderPlugin(),
        new webpack.optimize.ModuleConcatenationPlugin(),
        new ExtractTextPlugin({
          filename: "common.[chunkhash].css",
        }),
      ]
    : [new VueLoaderPlugin(), new FriendlyErrorsPlugin()],
};

module.exports = config;
