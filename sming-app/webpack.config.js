const webpack = require('webpack');
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');

let VENDOR_LIBS = [
    "lodash",
    "react",
    "react-dom",
    "react-redux",
    "redux",
    "redux-thunk"
];

if (process.env.NODE_ENV !== 'production') {
    VENDOR_LIBS.push("redux-logger");
}

module.exports = {
    entry: {
        bundle: './public/src/index.js',
        vendor: VENDOR_LIBS
    },
    output: {
        path: path.join(__dirname, 'dist'),
        filename: '[name].[chunkhash].js'
    },
	optimization: {
	  splitChunks: {
	    cacheGroups: {
	      vendor: {
	        chunks: "initial",
	        test: path.resolve(__dirname, "node_modules"),
	        name: "vendor",
	        enforce: true
	      }
	    }
	  }
	},
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['react', 'env']
                    }
                }
            },
            {
                test: /\.css$/,
                use: ['style-loader', 'css-loader']
            },
            {
                test: /\.(png|jpg|gif)$/,
                use: [
                    {
                        loader: 'url-loader',
                        options: {
                            limit: 8192
                        }
                    }
                ]
            }
        ]
    },
    plugins: [
        new webpack.DefinePlugin({
            'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV)
        }),
        new CleanWebpackPlugin(['dist']),
        new HtmlWebpackPlugin({
            template: 'public/index.html'
        })
    ],
    devtool: 'source-map',
    devServer: {
        historyApiFallback: true,
        contentBase: './public/'
    }
};
