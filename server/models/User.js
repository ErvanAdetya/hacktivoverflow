'use strict'

const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const schema = mongoose.Schema;

const saltRounds = 10;

module.exports = mongoose.model('User', schema({
    fbId: String,
    username: {
        type: String,
        trim: true,
        required: true
    },
    email: {
        type: String,
        lowercase: true,
        trim: true,
        required: true
    },
    first_name: {
        type: String,
        trim: true
    },
    last_name: {
        type: String,
        trim: true
    },
    password: {
        type: String,
        required: true
    }
}, {
    timestamps: true
})
.pre('save', function() {
    this.password = bcrypt.hashSync(this.password, saltRounds)
  })
.pre('update', function() {
    this._update.$set.password = bcrypt.hashSync(this._update.$set.password, saltRounds);
})
)
