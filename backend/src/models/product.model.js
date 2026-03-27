const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    image: String,
    title: String,
    description: String,
    price: {
        amount: {
            type: Number,
            min: 0
        },
        currency: {
            type: String,
            enum: ["INR", "USD"],
            default: "INR"
        }
    },
    category: String
});

module.exports = mongoose.model("product", productSchema);