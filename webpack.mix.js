

const BrowserSyncPlugin = require('browser-sync-webpack-plugin')
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');

const mix = require('laravel-mix');

mix
    .js(
        "./src/entry.ts", 
        `${process.env.MIX_PUBLIC}/entry.js`
    )
    .sass(
        "./src/styles/master.sass", 
        `${process.env.MIX_PUBLIC}/entry.css`
    )
    //.copyDirectory('src/assets', `${process.env.MIX_PUBLIC}`/assets`)
    .sourceMaps()
    .disableNotifications()
    .webpackConfig({
        optimization: {
            minimizer: [new UglifyJsPlugin()],
        },
        node: {
            fs: 'empty',
        },
        module: {
            rules: [
                {
                    test: /\.tsx?$/,
                    loader: "ts-loader",
                    exclude: /node_modules/
                }
            ]
        },
        resolve: {
            extensions: [ 
                '.tsx', 
                '.ts', 
                '.js' 
            ],
        },
        plugins: [
            new BrowserSyncPlugin({
                host: 'localhost',
                port: 6190,
                server: { 
                    baseDir: [
                        process.env.MIX_PUBLIC
                    ] 
                }
            }),
        ]
    })
    .options({
        uglify: {
          uglifyOptions: {
                warnings: false,
                comments: false,
                beautify: false,
            compress: {
                      drop_console: true,
            }
          }
        }
      });