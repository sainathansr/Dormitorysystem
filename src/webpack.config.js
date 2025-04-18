const path = require('path');

module.exports = {
    entry: './src/index.js', // Your main entry file
    output: {
        filename: 'bundle.js', // Output bundle file name
        path: path.resolve(__dirname, 'dist'), // Output directory
    },
    module: {
        rules: [
            {
                test: /\.js$/, // Transpile JavaScript files with Babel
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['@babel/preset-env', '@babel/preset-react']
                    },
                },
            },
            {
                test: /\.css$/,
                use: ['style-loader', 'css-loader'], // For handling CSS imports
            },
            {
                test: /leaflet\/dist\/leaflet.css/,
                use: ['style-loader', 'css-loader'], // For leaflet CSS
            },
            {
                test: /react-leaflet/,
                use: 'babel-loader', // For react-leaflet components
            },
            // Add other loaders as needed
        ],
    },
    resolve: {
        alias: {
            'leaflet': 'leaflet/dist/leaflet.js',
        },
    },
    devServer: {
        contentBase: path.join(__dirname, 'dist'),
        compress: true,
        port: 9000,
    },
};
