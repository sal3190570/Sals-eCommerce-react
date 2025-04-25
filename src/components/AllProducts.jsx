import React, { useContext, useEffect, useState } from "react";
import { AppContext } from "../context/appContext";
import Product from "./ui/Product";
import SearchBar from "./ui/SearchBar";
import { Link } from "react-router-dom";
import ProductSkeleton from "./ui/ProductSkeleton";

const AllProducts = () => {
  const {
    products,
    fragrances,
    cosmetics,
    furniture,
    groceries,
    search,
    searchedProduct,
  } = useContext(AppContext);

  const [title, setTitle] = useState("All Products");
  const [sortValue, setSortValue] = useState("Default");
  const [filterValue, setFilterValue] = useState("All Products");
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);

    const timerPromise = new Promise((resolve) => setTimeout(resolve, 1000));
    const filterAndSortPromise = new Promise((resolve) => {
      let filtered = [];
      switch (filterValue) {
        case "Cosmetics":
          filtered = cosmetics;
          break;
        case "Fragrances":
          filtered = fragrances;
          break;
        case "Furniture":
          filtered = furniture;
          break;
        case "Groceries":
          filtered = groceries;
          break;
        case "All Products":
        default:
          filtered = products;
          break;
      }

      if (search && searchedProduct) {
        filtered = filtered.filter((product) =>
          product.title.toLowerCase().includes(searchedProduct.toLowerCase())
        );
      }

      let sorted = [...filtered];
      if (sortValue === "HIGH_TO_LOW") {
        sorted.sort((a, b) => b.price - a.price);
      } else if (sortValue === "LOW_TO_HIGH") {
        sorted.sort((a, b) => a.price - b.price);
      } else if (sortValue === "RATING") {
        sorted.sort((a, b) => b.rating - a.rating);
      }
      resolve(sorted);
    });

    Promise.all([filterAndSortPromise, timerPromise]).then(([sorted]) => {
      setFilteredProducts(sorted);
      setLoading(false);
    });
  }, [
    filterValue,
    sortValue,
    products,
    cosmetics,
    fragrances,
    furniture,
    groceries,
    search,
    searchedProduct,
  ]);

  return (
    <>
      <section id="products">
        <SearchBar search={search} />
        <div className="products__container">
          <div className="row products__row">
            <div className="products__header">
              <div className="products__header__top">
                <Link to="/" className="products__header__link">
                  <span className="products__header__link__text">
                    {"< Home"}
                  </span>
                </Link>
                <h1 className="products__header__title">{title}</h1>
              </div>
              <div className="products__header__bottom">
                <label className="products__header__label">
                  Show:
                  <select
                    value={filterValue}
                    onChange={(e) => {
                      setFilterValue(e.target.value);
                      setTitle(e.target.value);
                    }}
                    className="products__header__filter"
                  >
                    <option value="All Products">All Products</option>
                    <option value="Cosmetics">Cosmetics</option>
                    <option value="Fragrances">Fragrances</option>
                    <option value="Furniture">Furniture</option>
                    <option value="Groceries">Groceries</option>
                  </select>
                </label>
                <label className="products__header__label">
                  Sort by:
                  <select
                    value={sortValue}
                    onChange={(e) => setSortValue(e.target.value)}
                    className="products__header__sort"
                  >
                    <option value="Default">Default</option>
                    <option value="HIGH_TO_LOW">Price (High to Low)</option>
                    <option value="LOW_TO_HIGH">Price (Low To High)</option>
                    <option value="RATING">Rating</option>
                  </select>
                </label>
              </div>
            </div>
            <div className="products__content">
              {search === true ? (
                <div className="products__search">
                  <h2 className="products__search--title">
                    Search results for:
                  </h2>
                  <h2 className="products__search--results">
                    {searchedProduct}
                  </h2>
                </div>
              ) : null}
              <div id="all-products-list" className="products__list">
                {loading ? (
                  new Array(6)
                    .fill(0)
                    .map((_, index) => <ProductSkeleton key={index} />)
                ) : filteredProducts.length > 0 ? (
                  filteredProducts
                    .slice(0, 6)
                    .map((product) => (
                      <Product product={product} key={product.id} />
                    ))
                ) : search ? (
                  <div className="products__no-results">
                    <h3>No products found.</h3>
                    <p>
                      We couldn't find any products matching your search.
                      <br />
                      Try adjusting your search term or filter options.
                    </p>
                  </div>
                ) : null}
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default AllProducts;
