// const serveStatic = require('serve-static')

module.exports = {
    mode: 'universal',
    /*
  ** Headers of the page
  */
    head: {
        title: process.env.npm_package_name || '',
        meta: [
            { charset: 'utf-8' },
            { name: 'viewport', content: 'width=device-width, initial-scale=1' },
            { hid: 'description', name: 'description', content: process.env.npm_package_description || '' }
        ],
        link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }]
    },
    /*
  ** Customize the progress-bar color
  */
    loading: { color: '#ffd04b' },
    /*
  ** Global CSS
  */
    css: [
        '@/assets/css/main.scss',
        'element-ui/lib/theme-chalk/index.css'
    ],
    /*
  ** Plugins to load before mounting the App
  */
    plugins: [
        '@/plugins/element-ui',
        {
            src: '@/plugins/set-token',
            ssr: false
        },
        '@/plugins/axios',
    ],

    serverMiddleware: [
        // Will register redirect-ssl npm package
        // 'redirect-ssl',

        // Will register file from project api directory to handle /api/* requires
        // { path: '/api', handler: '~/api/index.js' },

        // We can create custom instances too
        // { path: '/static2', handler: serveStatic(__dirname + '/static2') }
    ],
    /*
  ** Nuxt.js dev-modules
  */
    buildModules: [],

    /*
  ** Nuxt.js modules
  */
    modules: ['@nuxtjs/axios'],
    /*
  ** Axios module configuration
  */
    axios: {
        baseURL: 'http://localhost:3000',
        // proxy: true,
        prefix: '/api/',
        credentials: true
    // See https://github.com/nuxt-community/axios-module#options
    },

    proxy: {
        '/api/': {
            target: '', //这个网站是开源的可以请求到数据的
            pathRewrite: {
                '^/api/': '/',
                changeOrigin: true
            }
        }
    },
    router: {
        extendRoutes (routes, resolve) {
            routes = [
                {
                    name: 'custom',
                    path: '*',
                    component: resolve(__dirname, 'pages/404.vue')
                }
            ]
        }
    },
    /*
  ** Build configuration
  */
    build: {
        transpile: [/^element-ui/],
        /*
         ** You can extend webpack config here
         */
        extend(config, ctx) {},
        postcss: {
            'plugins': {
                'postcss-import': {},
                'postcss-url': {},
                // to edit target browsers: use "browserslist" field in package.json
                'autoprefixer': {}
            }
        }
    },
    mongodb: {
        host: '127.0.0.1',
        database: 'escms',
        port: 27017,
        username: '',
        password: '',
    },
    user: {
        role: 'superAdmin',
        username: 'admin',
        password: 'admin',
        nickname: 'abcdefg',
        email: 'guohuihot@163.com',
    },
    map: {
        ak: '1hrKaakG5iBUhv99pka4XCdvhphi4014'
    },
    editor: {
        url: `laravel-u-editor/`
    }
}
