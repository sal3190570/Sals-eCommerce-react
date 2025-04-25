import React, { useContext } from "react";
import Logo from "../assets/Logo.png";
import { AppContext } from "../context/appContext";
import { faGear, faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
const Nav = () => {
  const { FontAwesomeIcon } = useContext(AppContext);
  return (
    <>
      <div className="nav__content">
        <div className="nav__left">
          <div className="nav__logo__wrapper">
            <img src={Logo} alt="" className="nav__logo__image" />
          </div>
          <div className="nav__links">
            <a href="#home" className="nav__link">
              Home
            </a>
            <a href="#contact" className="nav__link">
              Contact
            </a>
          </div>
        </div>
        <div className="nav__right">
          <div id="search__container" className="search__container">
            <button id="search__button" className="search__button">
              <FontAwesomeIcon
                icon={faMagnifyingGlass}
                className="search__button__icon"
              />
            </button>
            <input
              type="search"
              id="search__input"
              className="search__input"
              placeholder="Search..."
            />
          </div>
          <span className="nav__settings">
            <FontAwesomeIcon icon={faGear} />
          </span>
        </div>
      </div>
    </>
  );
};

export default Nav;
