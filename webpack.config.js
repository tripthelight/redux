import path from "path";
import * as url from "url";
import webpack from "webpack";
import HtmlWebpackPlugin from "html-webpack-plugin";
import webpackDevServer from "webpack-dev-server";
import TerserWebpackPlugin from "terser-webpack-plugin";

const __dirname = url.fileURLToPath(new URL(".", import.meta.url));

const CONFIG = {
  mode: "production", // development | production
  devtool: "inline-source-map",
  watch: true,
  entry: {
    // redux: "./src/client/js/redux.js",
    redux: {
      import: "./src/client/js/redux.js",
      dependOn: "shared",
    },
    shared: "redux",
  },
  output: {
    path: path.join(__dirname, "dist"),
    filename: "js/[name].bundle.js",
    // chunkFilename: "js/[name].chunk.js",
    clean: true,
    publicPath: "/",
  },
  optimization: {
    splitChunks: {
      chunks: "all",
    },
  },
  // optimization: {
  //   runtimeChunk: "single",
  // },
  stats: {
    warnings: false, // 모든 경고 메시지 무시
  },
  performance: {
    hints: false,
  },
  module: {
    rules: [
      {
        test: /\.m?js$/i,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
          options: {
            presets: ["@babel/preset-env"],
          },
        },
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: "./src/client/index.html",
      filename: "index.html",
      inject: "body",
      minify: false,
    }),
  ],
};

/**
 * node express server 연동을 위한 client server 비동기처리
 */
const compiler = webpack(CONFIG);
const server = new webpackDevServer(
  {
    static: {
      directory: path.join(__dirname, "dist"), // dist | src
    },
    compress: true,
    port: 3000,
    hot: true,
    client: {
      progress: true,
    },
    /**
     * url path route
     * node express를 사용하지 않을 경우
     */
    historyApiFallback: {
      rewrites: [{ from: /^\/$/, to: "/index.html" }],
    },
  },
  compiler
);

(async () => {
  await server.start();
  console.log("dev server is running");
})();

export default CONFIG;
