const Koa               = require('koa')
const consola           = require('consola')
const { Nuxt, Builder } = require('nuxt')
const bodyParser        = require('koa-bodyparser')
const cors              = require('koa-cors')
const convert           = require('koa-convert')
const koajwt            = require('koa-jwt')
const session           = require('koa-session')

const sendHandle        = require('./middlewares/sendHandle.js')
const errorHandle       = require('./middlewares/errorHandle.js')
const captcha           = require('./middlewares/captcha.js')
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
// session相关
app.keys = ['captcha']
const CONFIG = {
    key: 'es:session', /** (string) cookie key (default is koa:sess) */
    /** (number || 'session') maxAge in ms (default is 1 days) */
    /** 'session' will result in a cookie that expires when session/browser is closed */
    /** Warning: If a session cookie is stolen, this cookie will never expire */
    maxAge: 'session', // cookie的过期时间 maxAge in ms (default is 1 days)
    autoCommit: true, /** (boolean) automatically commit headers (default true) */
    overwrite: true, //是否可以overwrite    (默认default true)
    httpOnly: true, /** (boolean) httpOnly or not (default true) */
    signed: true, /** (boolean) signed or not (default true) */
    rolling: false, /** (boolean) Force a session identifier cookie to be set on every response. The expiration is reset to the original maxAge, resetting the expiration countdown. (default is false) */
    renew: false, /** (boolean) renew session when session is nearly expired, so we can always keep user logged in. (default is false)*/
}
app.use(session(CONFIG, app))
// 验证码
app.use(captcha())
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
