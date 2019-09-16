const mongoose = require('mongoose')
const User = mongoose.model('User')

const crypto = require('crypto')
const   jwt = require('jsonwebtoken')

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
        if (!data.captcha) {
            return ctx.sendError('000002', '验证码不能为空')
        }
        if (data.captcha != ctx.session.captcha) {
            return ctx.sendError('000002', '验证码错误')
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
            }, 'token', { expiresIn: '30 days' })
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
