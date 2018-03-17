var path = require("path");
var CopyWebpackPlugin = require('copy-webpack-plugin');
var DIST_DIR = path.resolve(__dirname, "dist");
var SRC_DIR = path.resolve(__dirname, "src");

var basePlugin = [
    new CopyWebpackPlugin([{
        from: SRC_DIR + "/app/index.css",
        to: DIST_DIR + "/app/index.css"
    }])
];

var config = {
    entry: SRC_DIR + "/app/index.js",
    output: {
        path: DIST_DIR + "/app",
        filename: "bundle.js",
        publicPath: "/app/"
    },
    module: {
        loaders: [
            {
                test: /\.js?/,
                include: SRC_DIR,
                loader: "babel-loader",
                query: {
                    presets: ["react", "es2015", "stage-2"]
                }
            }
        ]
    },
    plugins: basePlugin
};

module.exports = config;