const productModel = require("../models/product.model");

async function createProduct(req, res) {
    const { image, title, description, price: { amount, currency }, category } = req.body;
    try {
        const product = await productModel.create({
            image, title, description, price: { amount, currency }, category
        });
        return res.status(201).json({
            message: "Product created successfully",
            product
        });
    } catch (error) {
        return res.status(500).json({
            message: "something went wrong",
            error: error.message
        });
    }
}

async function getItem(req, res) {
    try {
        const product = await productModel.findOne();
        return res.status(200).json({
            message: "product fetch successfully",
            product
        });
    } catch (error) {
        return res.status(500).json({
            message: "something went wrong",
            error: error.message
        });
    }
}

module.exports = {
    createProduct,
    getItem
};