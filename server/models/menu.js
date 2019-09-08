const mongoose = require('mongoose')
const Schema = mongoose.Schema

const schema = new Schema({
    name: {
        type: String,
        default: ''
    },
    value: {
        type: String,
        default: ''
    },
    parent_id: {
        type: Number,
        default: 0
    },
    no_delete: {
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

schema.options.toJSON = {
    virtuals: true,
    versionKey: false,
    transform(doc, ret) {
        ret.id = ret._id
        delete ret._id
    }
}

mongoose.model('Menu', schema)
