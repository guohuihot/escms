const router = require('koa-router')()

router.get(`/admin`, (ctx, next) => {
    ctx.body = 'Hello World!'
})
router.get(`/member`, (ctx, next) => {
    ctx.body = 'member'
})

module.exports = router
