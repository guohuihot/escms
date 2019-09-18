const { Schema, model } = require('mongoose')

const schema = new Schema({
    site_name: {
        type: String,
        default: '',
        // required: [true, '不能为空']
    },
    copyright: {
        type: String,
        default: ''
    },
    current: {
        type: Boolean,
        default: false
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
        delete ret._id
    }
}
model('Config', schema)
