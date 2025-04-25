import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import ProductsPage from "./pages/ProductsPage";
import IPP from "./pages/IPP";
import { AppContext } from "./context/appContext";
import { IconProvider } from "./context/IconContext";
import axios from "axios";
import { useEffect, useState } from "react";
import NavigationMenu from "./components/ui/NavigationMenu";

function App() {
  const [products, setProducts] = useState([]);
  const [cosmetics, setCosmetics] = useState([]);
  const [fragrances, setFragrances] = useState([]);
  const [furniture, setfurniture] = useState([]);
  const [groceries, setGroceries] = useState([]);
  const [search, setSearchValue] = useState(false);
  const [searchedProduct, setSearchedProduct] = useState("");
  const [loading, setLoading] = useState(true);

  function searchProduct(string) {
    setSearchedProduct(string);
    setSearchValue(string !== "");
  }

  useEffect(() => {
    setLoading(true);
    const timerPromise = new Promise((resolve) => setTimeout(resolve, 1000));
    const fetchPromise = axios.get("https://dummyjson.com/products");
    Promise.all([fetchPromise, timerPromise]).then(([response]) => {
      const data = response.data;
      setProducts(data.products);
      setCosmetics(
        data.products.filter((product) => product.category === "beauty")
      );
      setFragrances(
        data.products.filter((product) => product.category === "fragrances")
      );
      setfurniture(
        data.products.filter((product) => product.category === "furniture")
      );
      setGroceries(
        data.products.filter((product) => product.category === "groceries")
      );
      setLoading(false);
    });
  }, []);

  return (
    <AppContext.Provider
      value={{
        products,
        fragrances,
        cosmetics,
        furniture,
        groceries,
        searchProduct,
        searchedProduct,
        search,
        loading,
      }}
    >
      <IconProvider>
        <Router>
          <NavigationMenu />
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/products" element={<ProductsPage />} />
            <Route path={`/products/:id`} element={<IPP />} />
          </Routes>
        </Router>
      </IconProvider>
    </AppContext.Provider>
  );
}

export default App;
