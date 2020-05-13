// ========================
//
//  By:     Ibrahim Sardar
//  Proj:   P2PChatApp
//
// ========================

const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    entry: './dev-client/main.js',
    output: {
        path: path.resolve(__dirname, 'client'),
        filename: 'chatapp.min.js'
    },
    mode: 'production',
    module: {
        rules: [
            {
                test: /\.js$/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: [
                            '@babel/preset-env'
                        ],
                        plugins: [
                            '@babel/plugin-proposal-class-properties'
                        ]
                    }
                }
            }
        ]
    }
};