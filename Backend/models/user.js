const mongoose = require('mongoose');


const userSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },

    hashPassword: {
        type: String,

    },
    password: {
        type: String,
        required: true
    },
    phone: {
        type: Number,
        required: true
    },
    isAdmin: {
        type: Boolean,
        default: false
    },
    streetAdress1: {
        type: String,
        default: ''
    },
    streetAdress2: {
        type: String,
        default: ''
    },
    zip: {
        type: Number,
        default: 44600
    },
    city: {
        type: String,
        default: 'Kathmandu'
    },
    country: {
        type: String,
        default: 'Nepal'
    },
    emailVerified: {
        type: Boolean,
        default: true
    }


})

userSchema.virtual('id').get(function() {
    return this._id.toHexString();
})

userSchema.set('toJSON', {
    virtuals: true
});

exports.User = mongoose.model('User', userSchema);