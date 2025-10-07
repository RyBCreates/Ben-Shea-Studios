import { useState, useEffect } from "react";
import { Routes, Route, useLocation } from "react-router-dom";

import Header from "../Header/Header";
import Home from "../pages/Home/Home";
import About from "../pages/About/About";
import Exhibits from "../pages/Exhibits/Exhibits";
import Contact from "../pages/Contact/Contact";
import Admin from "../admin/Admin/Admin";
import Checkout from "../pages/Checkout/Checkout";
import Footer from "../Footer/Footer";
import CartMenu from "../CartMenu/CartMenu";
import Success from "../pages/Success/Success";
import Cancelled from "../pages/Cancelled/Cancelled";

import GetDiscountModal from "../modals/GetDiscountModal/GetDiscountModal";
import "./App.css";

function App() {
  const [cartList, setCartList] = useState([]);

  const [activeModal, setActiveModal] = useState("");

  const [isCartMenuOpen, setIsCartMenuOpen] = useState(false);

  const onAddToCart = (item) => {
    setCartList((prev) => {
      const exists = prev.find(
        (cartItem) =>
          cartItem._id === item._id && cartItem.version === item.version
      );
      // If Item version = original call Mark Original as Sold Out from Backend
      if (exists) {
        return prev.map((cartItem) =>
          cartItem._id === item._id
            ? { ...cartItem, quantity: cartItem.quantity + 1 }
            : cartItem
        );
      } else {
        return [...prev, { ...item, quantity: 1 }];
      }
    });
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
          <Route path="about" element={<About />} />
          <Route path="exhibits" element={<Exhibits />} />
          <Route path="contact" element={<Contact />} />
          <Route path="admin" element={<Admin />} />
          <Route path="checkout" element={<Checkout />} />
          <Route path="success" element={<Success />} />
          <Route path="cancel" element={<Cancelled />} />
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

// TODO:
// 1. Add Delete Button to Cart Items
// 2. Disable add button if the original is in the cart, only 1 exists at a time.
// 3. Make CartMenu Responsive
// 4. Make the Header responsive
// 5. Add ArtItems to the Backend
// 6. Connect CartMenu to the Backend
// 7. At smaller Screens fix the grid of the gallery section
// 8. Style and add Content to Success Page
// 9. Style and add Content to Cancelled Page
// 10. Style Checkout page
// 11. Add Cart Items to Checkout page for more editability for user
// 12. Add Unfulfilled orders to Admin
// 13. Add Fulfilled Orders to Admin
// 14. Add Add Button to Admin
// For CDN use Cloudinary API so that Ben can use a form and it sends it to cloudinary
