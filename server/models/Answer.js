'use strict'

const mongoose = require('mongoose');
const schema = mongoose.Schema;

module.exports = mongoose.model('Answer', schema({
    answer: {
        type: String,
        required: true
    },
    question: {
        type: schema.Types.ObjectId,
        ref: 'Question'
    },
    user: {
        type: schema.Types.ObjectId,
        ref: 'User',
        required: true        
    },
    point: {
        type: Number,
        default: 0
    }
}, {
    timestamps: true
})
.pre('remove', function() {
    console.log('deleted')
})
)
