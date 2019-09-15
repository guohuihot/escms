const mongoose = require('mongoose')
const User = mongoose.model('User')

const crypto = require('crypto')
const   jwt = require('jsonwebtoken')

/*module.exports = async (ctx) => {
    try {
        ctx.status = 200
        let resData = []
        if (ctx.request.method == 'GET') {
            resData = await User.find(Object.assign({}, ctx.params, ctx.query))
            ctx.body = JSON.stringify({
                status: 1,
                data: resData || []
            })
        } else if (ctx.request.method == 'POST') {
            resData = await User.create(ctx.request.body)
            ctx.body = JSON.stringify({
                status: 1,
                data: resData,
            })
        } else if (ctx.request.method == 'PUT') {
            resData = ctx.request.body
            await User.updateOne({ _id: ctx.params.id }, resData)
            ctx.body = JSON.stringify({
                status: 1,
                data: resData,
            })
        } else if (ctx.request.method == 'DELETE') {
            resData = ctx.request.body
            await User.deleteOne({ _id: ctx.params.id })
            ctx.body = JSON.stringify({
                status: 1,
                data: resData,
            })
        }
    } catch (error) {
        ctx.body = {
            status: 0,
            message: error
        }
    }
}*/
class UserController {
    // 用户注册
    static async register(ctx) {
        const data = ctx.request.body
        const checkUser = await User.findOne({
            name: data.name
        })
        if (checkUser !== null) {
            return ctx.sendError('000002', '该用户名已存在')
        }
        const user = new User({
            name: data.name,
            password: crypto.createHash('md5').update(data.password).digest('hex'),     // 密码加密存储
            email: data.email
        })
        const result = await user.save()
        return result !== null ? ctx.send(null, '注册成功') : ctx.sendError('000002', '注册失败')
    }
    // 用户登录
    static async login(ctx) {
        const data = ctx.request.body
        if (!data.username || !data.password) {
            return ctx.sendError('000002', '用户名或密码不能为空')
        }
        const result = await User.findOne({
            username: data.username,
            password: crypto.createHash('md5').update(data.password).digest('hex')
        })
        if (result !== null) {
            // 创建token
            const token = jwt.sign({
                username: result.username,
                id: result.id
            }, 'token', { expiresIn: 60 * 60 })
            return ctx.send({
                token
            }, '登录成功')
        }
        return ctx.sendError('000002', '用户名或密码错误')
    }
    // 获取用户信息
    static async userinfo(ctx) {
        const data = ctx.state.user
        const user = await User.findById(data.id)

        if (user !== null) {
            const result = user
            return ctx.send(result)
        }
        return ctx.sendError('000002')
    }
}
module.exports = UserController
