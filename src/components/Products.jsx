import React, { useContext } from "react";
import Product from "./ui/Product";
import { AppContext } from "../context/appContext";
import ProductSkeleton from "./ui/ProductSkeleton";

const Products = () => {
  const { products, loading } = useContext(AppContext);
  return (
    <>
      <section id="products">
        <div className="products__container">
          <div className="row products__row">
            <div className="products__content">
              <div className="products__top">
                <h2 className="products__top--title">
                  Browse Our Range Of Cosmetics, Fragrances, Furniture and
                  Groceries
                </h2>
              </div>
              <div id="all-products-list" className="products__list">
                {loading
                  ? new Array(6)
                      .fill(0)
                      .map((_, index) => <ProductSkeleton key={index} />)
                  : products
                      .slice(0, 6)
                      .map((product) => (
                        <Product product={product} key={product.id} />
                      ))}
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Products;
