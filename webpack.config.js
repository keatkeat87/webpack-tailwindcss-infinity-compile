const pathHelper = require("path");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const isProduction = process.env.NODE_ENV === "production";

module.exports = {
  watch: !isProduction,
  entry: {
    home: "./Web/Home/home-page",
  },
  output: {
    path: pathHelper.resolve(__dirname, "./dist"),
    filename: isProduction ? "[name].[contenthash].js" : "[name].js",
    assetModuleFilename: "assets/[name]-[hash]-[ext][query]",
  },
  plugins: [
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({
      title: "home",
      filename: pathHelper.resolve(__dirname, "Web/Home/Index.html"),
      template: "./Web/Home/HomePage.html",
      chunks: ["home"],
    }),
  ],
  module: {
    rules: [
      {
        test: /\.ts$/,
        use: "ts-loader",
        exclude: /node_modules/,
      },
      {
        // website
        test: /\\Web\\Home\\home-page.scss/,
        use: [
          "style-loader",
          "css-loader",
          {
            loader: "postcss-loader",
            options: {
              postcssOptions: {
                plugins: [
                  require("postcss-import"),
                  require("tailwindcss")({
                    mode: "jit",
                    purge: {
                      content: ["./Web/Home/HomePage.html"],
                    },
                    darkMode: false,
                    theme: {
                      aspectRatio: {
                        1: "1",
                        2: "2",
                        3: "3",
                        4: "4",
                        5: "5",
                        6: "6",
                        7: "7",
                        8: "8",
                        9: "9",
                        10: "10",
                        11: "11",
                        12: "12",
                        13: "13",
                        14: "14",
                        15: "15",
                        16: "16",
                      },
                      extend: {
                        colors: {
                          primary: "#ff0000",
                        },
                      },
                      fontFamily: {
                        Poppins: ["Poppins", "san-serif"],
                      },
                      container: {
                        center: true,
                      },
                    },
                    variants: {
                      extend: {},
                      aspectRatio: ["responsive", "hover"],
                    },
                    plugins: [require("@tailwindcss/aspect-ratio")],
                  }),
                  // require("postcss-css-variables"),
                  require("postcss-preset-env")({ stage: 1 }),
                  require("postcss-font-magician")({
                    display: "swap",
                    variants: {
                      Poppins: {
                        300: [],
                        400: [],
                        700: [],
                      },
                    },
                    foundries: ["google"],
                  }),
                ],
              },
            },
          },
          {
            loader: "resolve-url-loader",
            options: {
              sourceMap: true,
            },
          },
          {
            loader: "sass-loader",
            options: {
              sourceMap: true,
            },
          },
        ],
      },
      {
        test: /\.(svg|gif|jpe?g|png|webp)$/i,
        type: "asset/resource",
      },
      {
        test: /\.(woff|woff2|eot|ttf|otf)$/i,
        type: "asset/resource",
      },
    ],
  },
  resolve: {
    extensions: [".ts", ".js"],
  },
};
