import { useState, useEffect } from "react";
import { Routes, Route, useLocation } from "react-router-dom";

import Header from "../Header/Header";
import Home from "../pages/Home/Home";
import About from "../pages/About/About";
import Exhibits from "../pages/Exhibits/Exhibits";
import Contact from "../pages/Contact/Contact";
import Admin from "../pages/Admin/Admin";
import Footer from "../Footer/Footer";
import CartMenu from "../CartMenu/CartMenu";

import GetDiscountModal from "../modals/GetDiscountModal/GetDiscountModal";
import "./App.css";

function App() {
  const [cartList, setCartList] = useState([]);

  const [activeModal, setActiveModal] = useState("");

  const [isCartMenuOpen, setIsCartMenuOpen] = useState(false);

  const onAddToCart = (item) => {
    setCartList((prev) => [...prev, item]);
  };

  const cartMenuToggle = (prev) => {
    return setIsCartMenuOpen(!prev);
  };

  const onGetDiscountClick = () => {
    setActiveModal("discount");
    console.log(activeModal);
  };

  const closeModal = () => {
    setActiveModal("");
  };

  useEffect(() => {
    const handleEscClose = (e) => {
      if (e.key === "Escape") {
        setIsCartMenuOpen(false);
        setActiveModal("");
      }
    };

    const handleClickOutside = (e) => {
      if (
        e.target.classList.contains("cart-menu") ||
        e.target.classList.contains("modal")
      ) {
        setIsCartMenuOpen(false);
        setActiveModal("");
      }
    };

    window.addEventListener("keydown", handleEscClose);
    window.addEventListener("click", handleClickOutside);

    return () => {
      window.removeEventListener("keydown", handleEscClose);
      window.removeEventListener("click", handleClickOutside);
    };
  }, []);

  // Admin page Layout change
  const location = useLocation();
  const hideLayout = location.pathname.startsWith("/admin");

  return (
    <div className="app">
      <div className="app__content">
        {!hideLayout && (
          <Header cartList={cartList} cartMenuToggle={cartMenuToggle} />
        )}
        <Routes>
          <Route
            path="/"
            element={
              <Home
                onAddToCart={onAddToCart}
                onGetDiscountClick={onGetDiscountClick}
              />
            }
          />
          <Route path="/about" element={<About />} />
          <Route path="/exhibits" element={<Exhibits />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/admin" element={<Admin />} />
        </Routes>
        {!hideLayout && <Footer />}
        {isCartMenuOpen && !hideLayout ? (
          <CartMenu setIsCartMenuOpen={setIsCartMenuOpen} cartList={cartList} />
        ) : (
          ""
        )}
      </div>
      <GetDiscountModal activeModal={activeModal} closeModal={closeModal} />
    </div>
  );
}

export default App;
