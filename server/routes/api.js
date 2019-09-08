const router = require('koa-router')()
const controllers = require('require-all')({
    dirname     :  `${__dirname}/../controllers`,
    // filter      :  /(.+Controller)\.js$/,
    excludeDirs :  /^\.(git|svn)$/,
    recursive   : true
})
router.prefix('/api')
router.get('/menu', controllers.menu.getMenu)
router.get('/menu/:parent_id', controllers.menu.getMenu)
router.get('/user', controllers.user.getUser)

module.exports = router
