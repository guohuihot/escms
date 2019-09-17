const router = require('koa-router')()
const controllers = require('require-all')({
    dirname     :  `${__dirname}/../controllers`,
    // filter      :  /(.+Controller)\.js$/,
    excludeDirs :  /^\.(git|svn)$/,
    recursive   : true
})
router.prefix('/api')

router
    .get('/menu', controllers.menu)
    .post('/menu', controllers.menu)
    .put('/menu/:id', controllers.menu)
    .del('/menu/:id', controllers.menu)

    .get('/captcha', controllers.captcha)

    // .get('/user', controllers.user)
    // .post('/user', controllers.user)
    // .put('/user/:id', controllers.user)
    // .del('/user/:id', controllers.user)

    .post('/register', controllers.user.register)
    .post('/login', controllers.user.login)
    .get('/userinfo', controllers.user.userinfo)

    .get('/config', controllers.config)
    .post('/config', controllers.config)

module.exports = router
