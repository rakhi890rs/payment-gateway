const productModel = require("../models/product.model");
const PaymentModel = require("../models/payment.model");
const Razorpay = require("razorpay");

const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_KEY_SECRET,
});

async function createOrder(req, res) {
  try {
    const product = await productModel.findOne();

    if (!product) {
      return res.status(404).json({
        message: "Product not found",
      });
    }

    const options = {
      amount: product.price.amount,
      currency: product.price.currency,
    };

    const order = await razorpay.orders.create(options);

    const body = req.body || {};

    const newPayment = await PaymentModel.create({
      productId: product._id,
      orderId: order.id,
      amount: order.amount,
      currency: order.currency,
      status: "created",
      customerName: body.customerName || "",
      customerEmail: body.customerEmail || "",
      customerContact: body.customerContact || "",
    });

    return res.status(201).json({
      message: "Order created successfully",
      order,
      payment: newPayment,
    });
  } catch (error) {
    console.log("CREATE ORDER ERROR:", error);
    return res.status(500).json({
      message: "Error creating order",
      error: error.message,
    });
  }
}

module.exports = { createOrder };