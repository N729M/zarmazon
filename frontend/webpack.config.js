const path = require('path');

module.exports = {
    mode: 'development',
    entry: './src/index.js',
    output: {
        filename: 'main.js',
        path: path.resolve(__dirname, 'dist'),
        publicPath: '/', // Ajouté pour s'assurer que les fichiers sont servis correctement lors de l'utilisation du devServer
    },
    devServer: {
        static: {
            directory: path.join(__dirname, 'dist'),
        },
        historyApiFallback: true, // Ajouté pour gérer le routage côté client
        compress: true, // Active la compression gzip pour réduire la taille des fichiers servis
        port: 8080, // Port par défaut, peut être modifié selon vos besoins
        open: true, // Ouvre automatiquement le navigateur après le démarrage du serveur
    },
    module: {
        rules: [
            {
                test: /\.js$/, // Traite les fichiers .js
                exclude: /node_modules/, // Exclut les fichiers dans node_modules
                use: {
                    loader: 'babel-loader', // Utilise babel-loader pour transpiler le code ES6+ en ES5
                },
            },
        ],
    },
};
