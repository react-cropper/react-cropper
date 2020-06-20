var webpack = require('webpack');
var path = require('path');
var MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = {
    mode: 'development',
    entry: [
        'react-hot-loader/patch',
        'webpack-dev-server/client?http://0.0.0.0:3000',
        'webpack/hot/only-dev-server',
        path.join(__dirname, 'example/src/index.tsx'),
    ],
    output: {
        path: path.join(__dirname, 'example/assets'),
        filename: 'bundle.js',
        publicPath: '/assets/',
    },
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                loaders: ['react-hot-loader/webpack', 'ts-loader'],
                exclude: /node_modules/,
            },
            {
                test: /\.css$/,
                use: [
                    {
                        loader: MiniCssExtractPlugin.loader,
                    },
                    'css-loader',
                ],
            },
        ],
    },
    resolve: {
        extensions: ['.webpack.js', '.web.js', '.ts', '.tsx', '.js'],
    },
    plugins: [
        new webpack.HotModuleReplacementPlugin(),
        new MiniCssExtractPlugin({
            // Options similar to the same options in webpackOptions.output
            // both options are optional
            filename: 'bundle.css',
            chunkFilename: '[id].css',
        }),
    ],
};
