const mongoose = require('mongoose')
const md5 = require('md5')
const config = require('../../nuxt.config.js')
//
require('./menu')
require('./user')
require('./config')
//
const User = mongoose.model('User')
const mongoUrl = `mongodb://${config.mongodb.host}:${config.mongodb.port}/${config.mongodb.database}`
mongoose.Promise = global.Promise
mongoose.connect(mongoUrl, { useNewUrlParser: true })
mongoose.connection
    .once('open', async () => {
        console.log('database connect successed')
        // 初始化管理员信息
        let userInfo = config.user
        userInfo.password = md5(userInfo.password)

        let user = await User.findOne({ role: 'superAdmin' }).exec()
        if (!user) {
            user = new User(userInfo)
            await user.save()
            console.log('Administrator information initialization succeeded')
        }
    })
    .on('error', (error) => {
        console.warn('database connect fail', error)
    })
