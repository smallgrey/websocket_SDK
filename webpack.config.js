const path = require('path')
module.exports = {
    mode: 'production',
    entry: './main.js',
    resolve: {
        extensions: [".ts", ".js"]
    },
    module: {
        rules:[
            {
                test: /\.tsx?$/,
                use: 'ts-loader',
                exclude: /node_modules/
            }
        ]
    },
    output: {
        path: path.resolve(__dirname, 'build'),
        filename: 'terminalSDK.js'
    }
}