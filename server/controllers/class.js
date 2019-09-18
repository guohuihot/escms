const mongoose = require('mongoose')
const Model = mongoose.model('Class')

module.exports = async (ctx) => {
    let modelData = []
    if (ctx.request.method == 'GET') {
        modelData = await Model.find(Object.assign({}, ctx.params, ctx.query))
            .sort({ sort: 1 })
    } else if (ctx.request.method == 'POST') {
        modelData = await Model.create(ctx.request.body)
    } else if (ctx.request.method == 'PUT') {
        modelData = ctx.request.body
        await Model.updateOne({ _id: ctx.params.id }, modelData)
    } else if (ctx.request.method == 'DELETE') {
        // console.log('del', ctx.params);
        modelData = ctx.request.body
        await Model.deleteOne({ _id: ctx.params.id })
    }
    ctx.send(modelData)
}
