import React, { useContext, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { IconContext } from "../../context/IconContext";
import { AppContext } from "../../context/AppContext";

const SearchBar = () => {
  const icons = useContext(IconContext);
  const { searchProduct } = useContext(AppContext);
  const [inputValue, setInputValue] = useState("");

  const handleInputChange = (event) => {
    setInputValue(event.target.value);
  };

  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      searchProduct(inputValue);
    }
  };

  return (
    <div className="searchBar__container">
      <div className="row searchBar__row">
        <input
          type="text"
          placeholder="Search..."
          className="searchBar__input"
          value={inputValue}
          onChange={handleInputChange}
          onKeyDown={handleKeyDown}
        />
        <button
          className="searchBar__btn"
          onClick={() => searchProduct(inputValue)}
        >
          <FontAwesomeIcon
            icon={icons.search}
            className="searchBar__btn__icon"
          />
        </button>
      </div>
    </div>
  );
};

export default SearchBar;
