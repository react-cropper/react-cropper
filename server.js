const webpack = require('webpack');
const WebpackDevServer = require('webpack-dev-server');
const config = require('./webpack.config.dev');

new WebpackDevServer(webpack(config), {
    hot: true,
    historyApiFallback: true,
    contentBase: 'example',
    publicPath: config.output.publicPath,
}).listen(3000, 'localhost', function (err, result) {
    if (err) {
        return console.log(err);
    }

    console.log('Listening at http://localhost:3000/');
});
