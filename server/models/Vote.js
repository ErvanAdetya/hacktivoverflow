'use strict'

const mongoose = require('mongoose');

const schema = mongoose.Schema;

module.exports = mongoose.model('Vote', schema({
    vote: Boolean,
    user: {
        type: schema.Types.ObjectId,
        ref: 'User',
        required: true        
    },
    answer: {
        type: schema.Types.ObjectId,
        ref: 'Answer'    
    },
    question: {
        type: schema.Types.ObjectId,
        ref: 'Question'    
    }
}, {
    timestamps: true
})
.pre('save', function() {
    // console.log('created')
})
.pre('update', function() {
    // console.log('updated')
})
)
