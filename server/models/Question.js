'use strict'

const mongoose = require('mongoose');
const schema = mongoose.Schema;

module.exports = mongoose.model('Question', schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    solved: {
        type: Boolean,
        default: false
    },
    user: {
        type: schema.Types.ObjectId,
        ref: 'User',
        required: true        
    },
    point: {
        type: Number,
        default: 0
    },
    votes: [{type: schema.Types.ObjectId, ref: 'Vote'}],
    answers: [{type: schema.Types.ObjectId, ref: 'Answer'}]    
}, {
    timestamps: true
})
.post('remove', function() {
    console.log('deleted')
})
)
