const path = require('path');
const HtmlWebPackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

module.exports = {
    entry: {
       a:  "./public/sass/main.scss", "./public/js/javascript.js"]
    },      
    output: {
        filename: 'main.js',
        path: path.resolve(__dirname + '/dist')
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: {
                loader: "babel-loader"
                }
            },
            {
                test: /\.scss$/,
                use: [
                    {
                        loader: MiniCssExtractPlugin.loader,
                    },
                    "css-loader", "sass-loader"
                ]
            }
        ]
    },
    // add this line
    plugins: [
        new MiniCssExtractPlugin({
            filename: "main.css"
        })
    ]
};
