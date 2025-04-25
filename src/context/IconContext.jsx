import React, { createContext } from "react";
import {
  faCartShopping,
  faHome,
  faEnvelope,
  faCog,
  faSignOutAlt,
  faMagnifyingGlass,
  faDollarSign,
  faList,
} from "@fortawesome/free-solid-svg-icons";

export const IconContext = createContext();

export const iconMap = {
  home: faHome,
  products: faCartShopping,
  messages: faEnvelope,
  settings: faCog,
  logout: faSignOutAlt,
  search: faMagnifyingGlass,
  dollarSign: faDollarSign,
  list: faList,
};

export function IconProvider({ children }) {
  return (
    <IconContext.Provider value={iconMap}>{children}</IconContext.Provider>
  );
}
