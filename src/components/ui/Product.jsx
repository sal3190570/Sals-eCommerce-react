import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { IconContext } from "../../context/IconContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const Product = ({ product }) => {
  const icons = useContext(IconContext);
  const navigate = useNavigate();

  const handleClick = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
    navigate(`/products/${product.id}`);
  };

  return (
    <div className="product">
      <figure className="product__image--wrapper">
        <img src={product.thumbnail} alt="" className="product__image" />
        <h3 className="product__info--title">{product.title}</h3>
        <div className="product__info--list">
          <div className="product__info1">
            <FontAwesomeIcon
              icon={icons.dollarSign}
              className="product__info--icon"
            />
            <p className="product__info--text">${product.price}</p>
          </div>
          <div className="product__info2">
            <FontAwesomeIcon
              icon={icons.list}
              className="product__info--icon"
            />
            <p className="product__info--text">{product.category}</p>
          </div>
          <button className="product__info--btn" onClick={handleClick}>
            Find Out More
          </button>
        </div>
      </figure>
      <div className="product__text">
        <h4 className="product__text__title">{product.title}</h4>
        <p className="product__text__subtitle">${product.price}</p>
      </div>
    </div>
  );
};

export default Product;
