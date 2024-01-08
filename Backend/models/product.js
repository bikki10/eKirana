const mongoose = require('mongoose');


const productSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    image: {
        type: String,

        default: './images/defaulter'
    },
    countInStock: {
        type: Number,

        default: 0
    },
    price: {
        type: Number,

        default: 100
    },
    description: {
        type: String,

        default: ''
    },
    richDescription: {
        type: String,
        default: ''
    },
    author: {
        type: String,
        default: 'Loren Epselum'
    },
    category: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Category',
        required: true
    },
    isFeatured: {
        type: Boolean,
        default: false
    },
    dateCreated: {
        type: Date,
        default: Date.now
    },
    numReviews: {
        type: Number,
        default: 0
    },
    discount: {
        type: Number,
        default: 0
    },
    language: {
        type: String,
        default: 'English'
    }

})
exports.Product = mongoose.model('Product', productSchema);