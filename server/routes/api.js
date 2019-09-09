const router = require('koa-router')()
const controllers = require('require-all')({
    dirname     :  `${__dirname}/../controllers`,
    // filter      :  /(.+Controller)\.js$/,
    excludeDirs :  /^\.(git|svn)$/,
    recursive   : true
})
router.prefix('/api')

router
    .get('/menu', controllers.menu.getMenu)
    .get('/menu/:id', controllers.menu.getMenu)
    .get('/menu/parent_id/:parent_id', controllers.menu.getMenu)
    .get('/user', controllers.user.getUser)

module.exports = router
