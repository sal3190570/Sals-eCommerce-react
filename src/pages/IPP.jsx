import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import Trending from "../components/ui/Trending";
import IPPSkeleton from "../components/ui/IPPSkeleton";

const IPP = () => {
  const { id } = useParams();
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [selectedImage, setSelectedImage] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let isMounted = true;
    setLoading(true);
    setError(null);

    const fetchProduct = async () => {
      try {
        const { data } = await axios.get(
          `https://dummyjson.com/products/${id}`
        );
        if (isMounted) {
          setSelectedProduct(data);
          setSelectedImage(data.images[0]);
        }
      } catch (err) {
        if (isMounted) {
          setError("Failed to fetch product. Please try again.");
        }
      }
    };

    const timerPromise = new Promise((resolve) => setTimeout(resolve, 1000));
    const fetchPromise = fetchProduct();

    Promise.all([timerPromise, fetchPromise]).then(() => {
      if (isMounted) setLoading(false);
    });

    return () => {
      isMounted = false;
    };
  }, [id]);

  if (error) {
    return (
      <section id="product__main">
        <div className="product__main__container">
          <div className="row product-page__row">
            <div className="error-message">{error}</div>
          </div>
        </div>
      </section>
    );
  }

  if (loading || !selectedProduct) {
    return (
      <section id="product__main">
        <div className="product__main__container">
          <div className="row product-page__row">
            <IPPSkeleton />
            <Trending selectedProduct={selectedProduct} loading={true} />
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="product__main">
      <div className="product__main__container">
        <div className="row product-page__row">
          <div className="selected-product">
            {/* Left column content */}
            <div className="selected-product__left">
              <figure className="selected-product__img__wrapper">
                <img
                  src={selectedImage}
                  alt={selectedProduct.title}
                  className="selected-product__img"
                />
              </figure>
              <div className="selected-product__img__options">
                {selectedProduct.images.map((image) => (
                  <img
                    src={image}
                    alt={selectedProduct.title}
                    className={`selected-product__img__option${
                      selectedImage === image ? " selected" : ""
                    }`}
                    onClick={() => setSelectedImage(image)}
                    key={image}
                  />
                ))}
              </div>
            </div>

            {/* Right column content */}
            <div className="selected-product__right">
              <h2 className="selected-product__subtitle">
                {selectedProduct.category}
              </h2>
              <h1 className="selected-product__title">
                {selectedProduct.title}
              </h1>
              <p className="selected-product__para">
                {selectedProduct.description}
              </p>

              {/* Quantity controls */}
              <div className="selected-product__quantity__controls">
                <span className="selected-product__quantity__span selected-product__quantity__span-1">
                  Quantity
                </span>
                <div className="selected-product__quantity__wrapper">
                  <button
                    className="selected-product__quantity__btn"
                    onClick={() =>
                      setQuantity((prev) => (prev > 1 ? prev - 1 : prev))
                    }
                  >
                    -
                  </button>
                  <div className="selected-product__quantity__amount">
                    {quantity}
                  </div>
                  <button
                    className="selected-product__quantity__btn"
                    onClick={() => setQuantity((prev) => prev + 1)}
                  >
                    +
                  </button>
                </div>
              </div>

              {/* Price and add to cart */}
              <div className="selected-product__price-add">
                <span className="selected-product__quantity__span selected-product__quantity__span-2">
                  $
                  {(
                    Math.floor(selectedProduct.price * quantity * 100) / 100
                  ).toFixed(2)}
                </span>
                <button className="selected-product__add">Add to Cart</button>
              </div>
            </div>
          </div>

          {/* Specifications */}
          <div className="specifications">
            <div className="spec">
              <h3 className="spec__title">Stock:</h3>
              <span className="spec__detail">{selectedProduct.stock}</span>
            </div>
            <div className="spec">
              <h3 className="spec__title">Brand:</h3>
              <span className="spec__detail">{selectedProduct.brand}</span>
            </div>
            <div className="spec">
              <h3 className="spec__title">Rating:</h3>
              <span className="spec__detail">{selectedProduct.rating}</span>
            </div>
          </div>
          {/* Trending products */}
          <Trending selectedProduct={selectedProduct} loading={false} />
        </div>
      </div>
    </section>
  );
};

export default IPP;
