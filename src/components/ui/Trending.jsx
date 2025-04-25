import React, { useContext } from "react";
import Product from "./Product";
import ProductSkeleton from "./ProductSkeleton";
import { AppContext } from "../../context/appContext";

const Trending = ({ selectedProduct, loading }) => {
  const { products } = useContext(AppContext);

  const trendingProducts = products
    .filter((product) => product.id !== selectedProduct?.id)
    .slice(4, 8);

  return (
    <div id="trending">
      <h2 className="trending__title">Trending Now</h2>
      <div className="trending__list">
        {loading
          ? new Array(4)
              .fill(0)
              .map((_, index) => <ProductSkeleton key={index} />)
          : trendingProducts.map((product) => (
              <Product product={product} key={product.id} />
            ))}
      </div>
    </div>
  );
};

export default Trending;
