const router = require('koa-router')()
const controllers = require('require-all')({
    dirname     :  `${__dirname}/../controllers`,
    // filter      :  /(.+Controller)\.js$/,
    excludeDirs :  /^\.(git|svn)$/,
    recursive   : true
})
router.prefix('/api')

/*获取分类接口*/
Object.keys(controllers).forEach(key => {
    let controller = controllers[key]
    if (controller instanceof Function) {
        router
            .get(`/${key}`, controller)
            .post(`/${key}`, controller)
            .put(`/${key}/:id`, controller)
            .del(`/${key}/:id`, controller)
            .all(`/${key}/:id`, controller)
    }
})

module.exports = router
