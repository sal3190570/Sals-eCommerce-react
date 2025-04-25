import React from "react";

const IPPSkeleton = () => {
  return (
    <>
      <div className="product__main__container skeleton">
        <div className="row product-page__row--skeleton">
          <div className="selected-product">
            {/* Left column skeleton */}
            <div className="selected-product__left--skeleton">
              <figure className="selected-product__img__wrapper">
                <div className="skeleton__img" />
              </figure>
              <div className="skeleton__img__options">
                {[...Array(4)].map((_, index) => (
                  <div className="skeleton__img__option" key={index} />
                ))}
              </div>
            </div>

            {/* Right column skeleton */}
            <div className="selected-product__right--skeleton">
              <div className="skeleton__subtitle skeleton__block" />
              <div className="skeleton__title skeleton__block" />
              <div className="skeleton__para skeleton__block" />

              {/* Quantity controls */}
              <div className="selected-product__quantity__controls">
                <div className="skeleton__label skeleton__block" />
                <div className="selected-product__quantity__wrapper--skeleton">
                  <div className="skeleton__quantity__btn skeleton__circle" />
                  <div className="skeleton__quantity__amount skeleton__block" />
                  <div className="skeleton__quantity__btn skeleton__circle" />
                </div>
              </div>

              {/* Price and add to cart */}
              <div className="selected-product__price-add">
                <div className="skeleton__price skeleton__block" />
                <div className="skeleton__add skeleton__block" />
              </div>
            </div>
          </div>

          {/* Specifications */}
          <div className="specifications--skeleton">
            {[...Array(3)].map((_, idx) => (
              <div className="spec--skeleton" key={idx}>
                <div className="skeleton__spec__title skeleton__block" />
                <div className="skeleton__spec__detail skeleton__block" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default IPPSkeleton;
