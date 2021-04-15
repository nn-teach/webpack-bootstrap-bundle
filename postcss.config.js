// C’est mieux de ne pas avoir ces transformations en développement
if(process.env.NODE_ENV === 'production') {
    module.exports = {
        plugins: [
            require('autoprefixer'),
            require('cssnano'),
            // Plus de module PostCSS ici
        ]
    }
}