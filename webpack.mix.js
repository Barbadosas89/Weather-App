const mix = require('laravel-mix');

mix.setPublicPath('docs');

mix.version();

if (mix.inProduction()) {
    mix.sourceMaps();
}

// mix.webpackConfig({
// 	resolve: {
// 		alias: {
// 			resources_js: path.resolve(__dirname, 'resources/js'),
// 		}
// 	}
// });

mix.js('resources/js/app.js', 'docs/js/app.js');
mix.sass('resources/sass/app.scss', 'docs/css/app.css');