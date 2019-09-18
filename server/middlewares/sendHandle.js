const sendHandle = () => {
    // 处理请求成功方法
    const render = ctx => {
        return (data, message = '请求成功') => {
            ctx.set('Content-Type', 'application/json')
            ctx.body = {
                code: 1,
                data,
                message
            }
        }
    }

    // 处理请求失败方法
    const renderError = ctx => {
        return (code, message = '请求失败') => {
            ctx.set('Content-Type', 'application/json')
            let _body = {
                code,
                data: null,
                message
            }
            // object为抛出的错误
            if (typeof message == 'object') {
                Object.assign(_body, {
                    message: message.message,
                    errors: message.errors,
                })
            }
            ctx.body = _body
        }
    }

    return async (ctx, next) => {
        ctx.send = render(ctx)
        ctx.sendError = renderError(ctx)
        await next()
    }
}

module.exports = sendHandle
