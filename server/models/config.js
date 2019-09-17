const { Schema, model } = require('mongoose')

const schema = new Schema({
    site_name: {
        type: String,
        default: ''
    },
    copyright: {
        type: String
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
}, {
    _id: false
})

model('Config', schema)
