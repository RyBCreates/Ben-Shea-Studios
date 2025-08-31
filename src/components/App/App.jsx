import { useState, useEffect } from "react";
import Header from "../Header/Header";
import Hero from "../Hero/Hero";
import Gallery from "../Gallery/Gallery";
import Footer from "../Footer/Footer";
import CartMenu from "../CartMenu/CartMenu";
import "./App.css";

function App() {
  const [cartList, setCartList] = useState([]);

  const [isCartMenuOpen, setIsCartMenuOpen] = useState(false);

  const cartMenuToggle = (prev) => {
    return setIsCartMenuOpen(!prev);
  };

  useEffect(() => {
    const handleEscClose = (e) => {
      if (e.key === "Escape") setIsCartMenuOpen(false);
    };

    const handleClickOutside = (e) => {
      if (e.target.classList.contains("cart-menu")) {
        setIsCartMenuOpen(false);
      }
    };

    window.addEventListener("keydown", handleEscClose);
    window.addEventListener("click", handleClickOutside);

    return () => {
      window.removeEventListener("keydown", handleEscClose);
      window.removeEventListener("click", handleClickOutside);
    };
  }, []);

  return (
    <div className="app">
      <div className="app__content">
        <Header cartList={cartList} cartMenuToggle={cartMenuToggle} />
        <Hero />
        <Gallery />
        <Footer />
        {isCartMenuOpen ? <CartMenu /> : ""}
      </div>
    </div>
  );
}

export default App;
