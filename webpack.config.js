var path = require('path');
var webpack = require('webpack');

module.exports = {
    devtool: 'eval-source-maps',
    entry: [
        'webpack-dev-server/client?http://127.0.0.1:3000',
        'webpack/hot/only-dev-server',
        './app/Resources/js/app.js',
    ],
    output: {
        path: path.join(__dirname, 'web/dist'),
        filename: 'bundle.js',
        publicPath: 'http://127.0.0.1:3000/static/'
    },
    plugins: [
        new webpack.HotModuleReplacementPlugin(),
        new webpack.NoErrorsPlugin(),
        new webpack.ProvidePlugin({
            $: 'jquery',
            jQuery: 'jquery',
            'window.jQuery': 'jquery'
        })
    ],
    resolve: {
        extensions: ['', '.js', '.jsx'],
        alias: {
            'local': path.join(__dirname, 'app/Resources/js')
        }
    },
    module: {
        loaders: [
            {
                test: /\.jsx?$/,
                include: path.join(__dirname, 'app/Resources/js'),
                loader: 'react-hot!babel'
            },
            {
                test: /\.css$/, // Only .css files
                loader: 'style!css' // Run both style-loader and css-loader. The css-loader will go through the CSS file and find url() expressions and resolve them. The style-loader will insert the raw css into a style tag on your page.
            }
        ]
    }
};
