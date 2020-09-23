const path = require("path");
const webpack = require("webpack");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const CopyWebpackPlugin = require("copy-webpack-plugin");

const cesiumSource = "cesium/Source";
const cesiumWorkers = "../Build/Cesium/Workers";
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
module.exports = {
  mode: "development",
  context: __dirname,
  entry: {
    
    index: "./src/index.js",
  },
  output: {
    filename: (chunkData) => {
      let chunkName = chunkData.chunk.name;
      return chunkName === "index" ? "[name].js" : "[name]/[name].js";
    },
    library: "[name]",
    libraryTarget: "umd",
    path: path.resolve(__dirname, "build"),
    sourcePrefix: "",
  },
  module: {
    rules: [
      {
        test: /\.(le|c)ss$/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
            options: {
              publicPath: "../",
            },
          },
          {
            loader: "css-loader",
          },
          {
            loader: "postcss-loader",
            options: {
              plugins: [require("autoprefixer")],
            },
          },
          {
            loader: "less-loader",
            options: {
              sourceMap: true,
            },
          },
        ],
      },
      {
        test: /\.(png|gif|jpg|jpeg|svg|xml|json)$/,
        use: ["url-loader"],
      },
    ],
  },
  resolve: {
    alias: {
      // Cesium模块名称
      cesium: path.resolve(__dirname, cesiumSource),
    },
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: "index.html",
      minify: {
        collapseWhitespace: false,
        removeComments: true,
      },
    }),
  
    new CopyWebpackPlugin([
      { from: path.join(cesiumSource, "Assets"), to: "Assets" },
      { from: path.join(cesiumSource, cesiumWorkers), to: "Workers" },
      { from: path.join(cesiumSource, "ThirdParty"), to: "ThirdParty" },
      // {from: path.join(cesiumSource, 'ThirdParty/draco_decoder.wasm', to: targetDir + 'ThirdParty/draco_decoder.wasm'},
      // {from: path.join(cesiumSource, 'ThirdParty/Workers', to: targetDir + 'ThirdParty/Workers'},
      { from: path.join(cesiumSource, "Widgets"), to: "Widgets" },
      // { from: "resource", to: "resource" },
      // {from: 'src/geo/layer/workers', to: targetDir + 'Workers'},
      // {from: 'app/assets', to: 'assets'},
    ]),
    new webpack.ProvidePlugin({
      $: "jquery",
      jQuery: "jquery",
    }),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.DefinePlugin({
      //Cesium载入静态的资源的相对路径
      CESIUM_BASE_URL: JSON.stringify(""),
    }),
  ],
  devtool: "eval",
  devServer: {
    contentBase: path.join(__dirname, "build"),
    port: 8099,
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "GET,POST",
    },
    open: true,
    hot: true,
    overlay: {
      warnins: false,
      errors: true,
    },
    watchContentBase: true,
    watchOptions: {
      ignored: ["node_modules"], // 忽略不用监听变更的目录
      aggregateTimeout: 500, // 防止重复保存频繁重新编译，500毫秒内重复保存不打包
      poll: 1000, // 指定轮询时间
    },
  },
};
