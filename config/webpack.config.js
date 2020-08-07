const monacoEditorWebpackPlugin = require("monaco-editor-webpack-plugin");
const MonacoWebpackPlugin = require('monaco-editor-esm-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');
const path = require("path");
module.exports = {
    plugins: [
        new monacoEditorWebpackPlugin(),
        // new MonacoWebpackPlugin()
    ],
    // module: {
    //     rules: [
    //         {
	// 			test: /\.js/,
	// 			enforce: 'pre',
	// 			include: /node_modules[\\\/]monaco-editor[\\\/]esm/,
	// 			use: [
    //                 {
    //                     loader: path.resolve(__dirname, "./webpack.loader.js")
    //                 }
    //             ]
	// 		},
    //     ]
    // },
    optimization: {
        minimize: true,
        minimizer: [new TerserPlugin()]
	},
};
