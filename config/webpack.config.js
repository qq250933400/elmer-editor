const monacoEditorWebpackPlugin = require("monaco-editor-webpack-plugin");
const TerserPlugin = require('terser-webpack-plugin');
module.exports = {
    plugins: [
        // new monacoEditorWebpackPlugin(),
    ],
    optimization: {
        minimize: true,
        minimizer: [new TerserPlugin()]
	},
};
