var path = require('path');
var MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = {
    mode: 'production',
    entry: path.join(__dirname, 'example/src/index.tsx'),
    output: {
        path: path.join(__dirname, 'example/assets'),
        filename: 'bundle.js',
        publicPath: '/assets/',
    },
    module: {
        rules: [
            {test: /\.tsx?$/, loaders: ['ts-loader'], exclude: /node_modules/},
            {
                test: /\.css$/,
                include: path.join(__dirname),
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
        extensions: ['.ts', '.tsx', '.js', '.jsx'],
    },
    plugins: [
        new MiniCssExtractPlugin({
            // Options similar to the same options in webpackOptions.output
            // both options are optional
            filename: 'bundle.css',
            chunkFilename: '[id].css',
        }),
    ],
};
