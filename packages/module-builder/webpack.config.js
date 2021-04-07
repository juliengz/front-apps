const path = require('path');

// Retrieve env variables
const NODE_ENV = process.env.NODE_ENV || "development";

// Get package.json content
const cwd = process.cwd();
const pkg = require(path.resolve(cwd, "package.json"));

// Output file
const modulePath = path.resolve(cwd, pkg.module || `index.js`);
const filename = modulePath.replace(/^.*[\\\/]/, '')

module.exports = {
    mode: NODE_ENV,
    output: {
        path: path.resolve('dist'),
        filename: filename,
        libraryTarget: 'umd',
        // library: {
        //     type: 'umd'
        // }
    },
    module: {
        rules: [
            {
                test: /\.jsx?$/,
                exclude: /(node_modules)/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['@babel/preset-env', '@babel/preset-react'],
                        plugins: ['@babel/plugin-proposal-class-properties', '@babel/plugin-transform-runtime']
                    }
                }
            }
        ],
    },
    externals: {
        // @TODO: Explain this !!!
        "react-router-dom": "react-router-dom",
        "react": "react",
        "react-dom": "react-dom",
    }
};