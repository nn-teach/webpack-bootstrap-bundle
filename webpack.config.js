// Webpack à besoin de path pour fonctionner avec les répertoires
const path = require('path');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

// Ceci est notre objet principale de configuration
// Ici on écrit les différentes options et on dit à Webpack quoi faire
module.exports = {

  // Chemin vers votre point d’entrée. Ici webpack va commencer son travail
  entry: './src/javascript/index.js',

  // Chemin et fichier vers votre résultat
  // Webpack va compiler le Javascript de index.js dans le fichier bundle.js
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.js',
    publicPath: '/dist/',
  },
  devtool: 'inline-source-map',
  module:{
    rules: [
        {
            test: /\.js$/,
            exclude: /(node_modules)/,
            use: {
              loader: 'babel-loader',
              options: {
                presets: ['@babel/preset-env']
              }
            }
          },
          {
            // Applique la règle pour les fichiers .sass, .scss ou .css
            test: /\.(sa|sc|c)ss$/,
        
            // Configure les loaders pour transformer les fichiers.
            // Les loaders sont appliqués de droite à gauche
            // Les premiers loader sont appliqués après les autres
            use: [
                     {
                     // Injecte le CSS dans le DOM
                     loader: "style-loader",
                   },  
     /*               {
                    // Après tous les loaders CSS nous utilisons le plugin
                    // Il récupère tous le CSS transformé et l'extrait dans un fichier bundle séparé
                    loader: MiniCssExtractPlugin.loader,
                    options:{
                        hmr: true,
                    }
                  }, */
                   {
                     // Ce loader résout les url() et @imports dans les CSS
                     loader: "css-loader",
                     options: {
                        sourceMap: true
                    }
                   },
                   {
                     // On applique postCSS (autoprefixer et minifier)
                     loader: "postcss-loader",
                     options: {
                        sourceMap: true
                    }
                   },
                   {
                     // D'abord on transforme le SASS en CSS standard
                     loader: "sass-loader",
                     options: {
                       implementation: require("sass"),
                       sourceMap: true
                     }
                   }
                 ]
          } 
    ]
  },
/*   plugins: [

    new MiniCssExtractPlugin({
      filename: "bundle.css"
    })
  
  ], */
  devServer: {
    contentBase: '.',
},
  

  // Le mode par défaut de Webpack est production.
  // En fonction du mode Webpack va appliquer différent travaux sur le
  // résultat final. Pour le moment nous n’avons pas besoin d’un 
  // Javascript minifié ou transformé pour la production
  mode: 'development'
};