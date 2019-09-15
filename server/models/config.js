const mongoose = require('mongoose')
const Schema = mongoose.Schema

const schema = new Schema({
    site_name: {
        type: String,
        default: ''
    },
    copyright: {
        type: String
    },
    created_at: {
        type: Date,
        default: Date.now
    },
    updated_at: {
        type: Date,
        default: Date.now
    }
})

// 隐藏一些字段
schema.options.toJSON = {
    virtuals: true,
    versionKey: false,
    transform(doc, ret) {
        ret.id = ret._id
        delete ret._id
    }
}
mongoose.model('Config', schema)
