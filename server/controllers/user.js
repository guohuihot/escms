const mongoose = require('mongoose')
const User = mongoose.model('User')
exports.getUser = async (ctx) => {
    try {
        /*const db = Monk('localhost/test')//链接到库
        const perf = db.get('ltt')//表
        ctx.status = 200
        let all = await perf.find({}, { _id:false })
        let cate = []
        all.forEach((item, index) => {
            if (!cate.includes(item.perfTest.path) && item.perfTest.path) {
                cate.push(item.perfTest.path)
            }
        })
        const data = [...cate]*/
        ctx.status = 200
        ctx.body = JSON.stringify({
            status: 0,
            data: [
                { a: 1, b: 2 },
                { c: 3, d: 4 }
            ]
        })
    } catch (error) {
        ctx.body = {
            error: 1,
            info: error
        }
    }
}
