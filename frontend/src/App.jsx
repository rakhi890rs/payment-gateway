import React, { useEffect, useState } from "react";
import axios from "axios";
import PaymentButton from "./PaymentButton";
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
            <h2>₹{product.price.amount}</h2>
          </div>

          <PaymentButton product={product} />
        </div>
      </div>
    </div>
  );
};

export default App;