const pathHelper = require('path');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const isProduction = process.env.NODE_ENV === 'production';
var glob = require('glob')
const content = ['./Web/**/!(*Amp*|Index).html', '**/*.jpg'];
console.log('dada', content.flatMap(w => glob.sync(w)));

module.exports = {
  watch: true,
  entry: {
    home: './Web/Home/home-page'
  },
  output: {
    path: pathHelper.resolve(__dirname, './dist'),
    filename: isProduction ? '[name].[contenthash].js' : '[name].js',
    assetModuleFilename: 'assets/[name]-[hash]-[ext][query]',
  },
  plugins: [
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({
      title: 'home',
      filename: pathHelper.resolve(__dirname, 'Web/Home/Index.html'),
      template: './Web/Home/HomePage.html',
      chunks: ['home'],
    })
  ],
  module: {
    rules: [
      {
        test: /\.ts$/,
        use: 'ts-loader',
        exclude: /node_modules/,
      },
      {
        // website
        test: /\\Web\\Home\\home-page.scss/,
        use: [
          isProduction ? MiniCssExtractPlugin.loader : 'style-loader',
          'css-loader',
          {
            loader: 'postcss-loader',
            options: {
              postcssOptions: {
                plugins: [
                  require('postcss-import'),
                  require('tailwindcss')({
                    mode: 'jit',
                    purge: {
                      content: [...glob.sync('./Web/**/!(*Amp*|Index).html')]
                    },
                    darkMode: false,
                    theme: {
                      extend: {
                        colors: {
                          primary: '#ff0000',
                        },
                      },
                      fontFamily: {
                        Poppins: ['Poppins', 'san-serif'],
                      },
                      container: {
                        center: true,
                      },
                    },
                    variants: {
                      extend: {},
                    },
                    plugins: [require('@tailwindcss/aspect-ratio')],
                  }),
                  require('postcss-preset-env')({ stage: 1 }),
                  require('postcss-font-magician')({
                    display: 'swap',
                    variants: {
                      Poppins: {
                        300: [],
                        400: [],
                        700: [],
                      },
                    },
                    foundries: ['google'],
                  }),
                ],
              },
            },
          },
          {
            loader: 'resolve-url-loader',
            options: {
              sourceMap: true,
            },
          },
          {
            loader: 'sass-loader',
            options: {
              sourceMap: true,
            },
          },
        ],
      },
      {
        test: /\.(svg|gif|jpe?g|png|webp)$/i,
        type: 'asset/resource',
      },
      {
        test: /\.(woff|woff2|eot|ttf|otf)$/i,
        type: 'asset/resource',
      },
    ],
  },
  resolve: {
    extensions: ['.ts', '.js'],
  },
};
