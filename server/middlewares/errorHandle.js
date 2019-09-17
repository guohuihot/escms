const errorHandle = (ctx, next) => {
    return next().catch((err) => {
        if (err.status === 401) {
            ctx.status = 401
            return ctx.sendError('000004', '未授权，访问被拒绝')
        } else if (err.status === 403) {
            ctx.status = 200
            return ctx.sendError(0, '验证码错误')
        }
        throw err
    })
}

module.exports = errorHandle
