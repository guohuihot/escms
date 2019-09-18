const mongoose = require('mongoose')
const Model = mongoose.model('Config')

module.exports = async (ctx) => {
    try {
        let modelData = {}
        if (ctx.request.method == 'GET') {
            modelData = await Model.findOne({ current: true })
            if (!modelData) {
                // modelData = new Model({ current: true })
                modelData = await Model.create({ current: true })
            }
        } else if (ctx.request.method == 'POST') {
            modelData = ctx.request.body
            await Model.updateOne({ current: true }, modelData)
        }
        ctx.send(modelData)
    } catch (err) {
        ctx.sendError(0, err)
    }
}
