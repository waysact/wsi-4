var SriPlugin = require('webpack-subresource-integrity');
var webpack = require('webpack');

var __DEVELOPMENT__ = true;

var config = {
    entry: {
        main: [
            'babel-polyfill',
            './src/web/client.js'
        ],
        vendor: [
            'react',
            'react-dom',
            'react-router',
            'redux',
            'react-redux',
            'react-router-redux'
        ]
    },
    output: {
        path: 'assets',
        filename: '[name]-[hash].js',
        chunkFilename: '[id].chunk-[chunkhash].js',
        publicPath: '/assets/'
    },
    plugins: [
        new webpack.DefinePlugin({
            __DEVELOPMENT__: __DEVELOPMENT__,
            __DEVTOOLS__: __DEVELOPMENT__,
            __CLIENT__: true,
            __SERVER__: false,
            'process.env': {
                'NODE_ENV': JSON.stringify(__DEVELOPMENT__ ? 'development' : 'production')
            }
        }),
        new SriPlugin(['sha256'])
    ]
};

webpack(config).run(function(err, stats) {
    for (var key in stats.compilation.assets) {
        console.log(key, '=>', stats.compilation.assets[key].integrity);
    }
});
