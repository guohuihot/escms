const Koa               = require('koa')
const consola           = require('consola')
const { Nuxt, Builder } = require('nuxt')
const bodyParser        = require('koa-bodyparser')
const cors              = require('koa-cors')
const convert           = require('koa-convert')
const koajwt            = require('koa-jwt')

const sendHandle        = require('./middlewares/sendHandle.js')
const errorHandle       = require('./middlewares/errorHandle.js')
const app               = new Koa()

// data数据库相关
require('./models')

const api = require('./routes/api')
// 进行requestbody解析
app.use(bodyParser())
// 加入路由
// app.use(router.routes())
// 处理跨域
app.use(convert(cors()))
// 引入中间件
app.use(sendHandle())
// 错误处理
app.use(errorHandle)
// 验证token
app.use(koajwt({
    secret: 'token'
}).unless({
    path: [
        /^\/api\/login/,
        /^\/api\/register/,
        /^\/api\/captcha/,
        /^((?!\/api).)*$/   // 设置除了私有接口外的其它资源，可以不需要认证访问
    ]
}))

// 路由处理，在api中
app.use(api.routes(), api.allowedMethods())

// Import and Set Nuxt.js options
const config = require('../nuxt.config.js')
config.dev = app.env !== 'production'

async function start () {
    // Instantiate nuxt.js
    const nuxt = new Nuxt(config)

    const {
        host = process.env.HOST || '127.0.0.1',
        port = process.env.PORT || 3000
    } = nuxt.options.server

    // Build in development
    if (config.dev) {
        const builder = new Builder(nuxt)
        await builder.build()
    } else {
        await nuxt.ready()
    }

    app.use((ctx) => {
        ctx.status = 200
        ctx.respond = false // Bypass Koa's built-in response handling
        ctx.req.ctx = ctx // This might be useful later on, e.g. in nuxtServerInit or with nuxt-stash
        nuxt.render(ctx.req, ctx.res)
    })

    app.listen(port, host)
    consola.ready({
        message: `Server listening on http://${host}:${port}`,
        badge: true
    })
}

start()
