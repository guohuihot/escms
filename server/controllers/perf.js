const Monk = require('monk')

// 存性能数据
const savePerf = async (ctx) => {
    try {
        const db = Monk('localhost/test')//链接到库
        const perf = db.get('perf')//表
        const perfData =  Object.assign(ctx.request.query, { saveTime: new Date() })
        perf.insert({ 'perfTest': perfData })
        console.log('post perf.....', perfData)
        ctx.status = 200
        ctx.body = JSON.stringify({ status:0 })
    } catch (error) {
        ctx.body = {
            error:1,
            info:error
        }
    }
}

// 取性能数据
const getPerf = async (ctx) => {
    try {
        const db = Monk('localhost/test')//链接到库
        const perf = db.get('test')//表
        ctx.status = 200
        let path = ctx.params.id
        console.log('get ctx.req', ctx.request.query)
        let st = await perf.find({ 'perfTest.path': ctx.request.query.path }, { _id:false })
        const data = [...st]
        ctx.body = JSON.stringify({ status: 0, data })
    } catch (error) {
        ctx.body = {
            error:1,
            info:error
        }
    }
}

// 取页面分类
const getCategory = async (ctx) => {
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
        ctx.body = JSON.stringify({ status: 0,
            data: [
                { a: 1, b: 2 },
                { c: 3, d: 4 }
            ] })
    } catch (error) {
        ctx.body = {
            error:1,
            info:error
        }
    }
}

module.exports = {
    savePerf,
    getPerf,
    getCategory
}
