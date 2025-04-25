import React, { useContext, useState } from "react";
import landingImg from "../assets/landing-background-image.jpg";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import NavLogo from "./ui/NavLogo";
import { IconContext } from "../context/IconContext.jsx";
import { AppContext } from "../context/AppContext.jsx";
import { useNavigate } from "react-router-dom";

const Landing = () => {
  const icons = useContext(IconContext);
  const { searchProduct } = useContext(AppContext);
  const [inputValue, setInputValue] = useState("");
  let navigate = useNavigate();
  const handleInputChange = (event) => {
    setInputValue(event.target.value);
  };

  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      event.preventDefault();
      searchProduct(inputValue);
      navigate("/products");
    }
  };
  return (
    <>
      <section id="landing">
        <div className="landing__background">
          <figure className="landing__background--wrapper">
            <NavLogo />
            <img src={landingImg} alt="" className="landing__background--img" />
            <div className="landing__background__content">
              <h1 className="landing__background__title">Sal's</h1>
              <h2 className="landing__background__subtitle">
                Explore and shop the latest in urban culture
              </h2>
              <form>
                <div className="landing__background__search">
                  <FontAwesomeIcon
                    icon={icons.search}
                    className="landing__background__search__icon"
                  />
                  <input
                    type="search"
                    className="landing__background__search__input"
                    id="landing__background__search__input"
                    placeholder="Search..."
                    value={inputValue}
                    onChange={handleInputChange}
                    onKeyDown={handleKeyDown}
                  />
                </div>
              </form>
            </div>
          </figure>
        </div>
      </section>
    </>
  );
};

export default Landing;
