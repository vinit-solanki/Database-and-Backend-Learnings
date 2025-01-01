const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    onSale: {
        type: Boolean,
        required: true
    },
    manufactureDate:{
        type: Date,
        required: true,
        default: null
    },
    expirationDate:{
        type: Date,
        required: true,
        default: null
    },
    category:{
        type: String,
        enum: ['fruit','vegetable','cereal','ice-cream','chocolate','beauty','fashion'],
        required: true
    }
})

const Product = new mongoose.model('Product',productSchema);

module.exports = Product;