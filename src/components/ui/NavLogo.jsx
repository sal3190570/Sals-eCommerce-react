import React from "react";
import Logo from "../../assets/Logo.png";

const NavLogo = () => {
  return (
    <>
      <div className="nav__logo__wrapper">
        <img src={Logo} alt="" className="nav__logo__image" />
      </div>
    </>
  );
};

export default NavLogo;
