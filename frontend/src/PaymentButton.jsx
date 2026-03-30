import React from "react";
import axios from "axios";

const PaymentButton = ({ product }) => {
  const handlePayment = async () => {
    try {
      if (!product || !product._id) {
        alert("Product not loaded yet");
        return;
      }

      const { data } = await axios.post(
        "http://localhost:3000/api/payment/create-order",
        {
          productId: product._id,
          customerName: "Rakhi Singh",
          customerEmail: "rakhisingh876@gmail.com",
          customerContact: "8873190804",
        }
      );

      const order = data.order;

      const options = {
        key: "rzp_test_SWLZUxlJA7CHSX",
        amount: order.amount,
        currency: order.currency,
        name: "Rakhi Store 💙",
        description: "Test Payment",
        order_id: order.id,

        handler: async function (response) {
          console.log("Payment Success:", response);

          await axios.post(
            "http://localhost:3000/api/payment/verify",
            {
              razorpay_payment_id: response.razorpay_payment_id,
              razorpay_order_id: response.razorpay_order_id,
              razorpay_signature: response.razorpay_signature,
            }
          );

          alert("Payment Verified ✅");
        },

        prefill: {
          name: "Rakhi Singh",
          email: "rakhisingh876@gmail.com",
          contact: "8873190804",
        },
      };

      const rzp = new window.Razorpay(options);
      rzp.open();
    } catch (error) {
      console.log("Payment Error:", error);
      console.log("Response data:", error?.response?.data);
      console.log("Response status:", error?.response?.status);
      alert("Something went wrong!");
    }
  };

  return <button onClick={handlePayment}>Pay Now 💳</button>;
};

export default PaymentButton;