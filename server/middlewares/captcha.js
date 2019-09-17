const captcha = (options) => {
    // 处理请求成功方法
    const validateCaptcha = ctx => {
        return () => {
            let { captcha } = ctx.request.body
            if (ctx.session.captcha !== captcha) {
                ctx.throw(403)
            }
        }
    }

    return async (ctx, next) => {
        ctx.validateCaptcha = validateCaptcha(ctx)
        await next()
    }
}

module.exports = captcha
