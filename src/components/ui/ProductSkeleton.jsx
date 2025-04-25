import React from "react";

const ProductSkeleton = () => (
  <div className="product skeleton">
    <figure className="product__image--wrapper">
      <div className="skeleton__image" />
      <div className="product__skeleton__title1 product-skeleton__block" />
      <div className="product__info--list--skeleton">
        <div className="product__info1--skeleton">
          <div className="skeleton__icon" />
          <div className="skeleton__text" />
        </div>
        <div className="product__info2--skeleton">
          <div className="skeleton__icon" />
          <div className="skeleton__text" />
        </div>
        <div className="skeleton__button" />
      </div>
    </figure>
    <div className="product__skeleton--text">
      <div className="product__skeleton__title2 product-skeleton__block" />
      <div className="product__skeleton__subtitle product-skeleton__block" />
    </div>
  </div>
);
export default ProductSkeleton;
