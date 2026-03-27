import React, { useEffect, useState } from "react";
import axios from "axios";
import "./App.css";

const App = () => {
  const [product, setProduct] = useState(null);

  useEffect(() => {
    axios
      .get("http://localhost:3000/api/products/get-item")
      .then((response) => {
        setProduct(response.data.product);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const handleBuyNow = async () => {
    if (!product) return;

    const amountInSmallestUnit =
      product.price.currency === "INR"
        ? product.price.amount * 100
        : product.price.amount;

    console.log("Razorpay amount:", amountInSmallestUnit);

    // later you will send this amount to backend to create razorpay order
  };

  if (!product) {
    return <h2 className="loading">Loading...</h2>;
  }

  return (
    <div className="page">
      <div className="product-card">
        <div className="image-box">
          <img
            src={product.image}
            alt={product.title}
            className="product-image"
          />
        </div>

        <div className="product-details">
          <span className="category">{product.category}</span>
          <h1>{product.title}</h1>
          <p className="description">{product.description}</p>

          <div className="price-row">
            <h2>
              ₹{product.price.amount}
            </h2>
            {/* <p className="sub-text">
              Razorpay Amount: {product.price.currency === "INR"
                ? product.price.amount * 100
                : product.price.amount}{" "}
              paise
            </p> */}
          </div>

          <button className="buy-btn" onClick={handleBuyNow}>
            Buy Now
          </button>
        </div>
      </div>
    </div>
  );
};

export default App;