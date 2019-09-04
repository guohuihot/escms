const router = require('koa-router')();
const perf = require('../controller/perf');

router.prefix('/api');

/*保存perfData接口*/
router.post('/savePerf', perf.savePerf);
/*获取perfData接口*/
router.get('/getPerf', perf.getPerf);
/*获取分类接口*/
router.get('/getCategory', perf.getCategory);

module.exports = router
