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

import { fetchArtItems } from "../../utils/api";

import "./App.css";

function App() {
  const [cartList, setCartList] = useState([]);
  const [cartLoaded, setCartLoaded] = useState(false);

  const [activeModal, setActiveModal] = useState("");

  const [isCartMenuOpen, setIsCartMenuOpen] = useState(false);

  const [artItems, setArtItems] = useState([]);
  const [artItemsLoading, setArtItemsLoading] = useState(true);

  useEffect(() => {
    fetchArtItems()
      .then(setArtItems)
      .catch((err) => console.error("Error fetching art items:", err))
      .finally(() => setArtItemsLoading(false));
  }, []);

  // Load cart once
  useEffect(() => {
    const savedCart = localStorage.getItem("cart");
    if (savedCart) {
      setCartList(JSON.parse(savedCart));
    }
    setCartLoaded(true);
  }, []);

  // Save only after loading is done
  useEffect(() => {
    if (cartLoaded) {
      localStorage.setItem("cart", JSON.stringify(cartList));
    }
  }, [cartList, cartLoaded]);

  const cartMenuToggle = () => {
    setIsCartMenuOpen((prev) => !prev);
  };

  const onGetDiscountClick = () => {
    setActiveModal("discount");
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

  const onUpdateCart = (updatedCart) => {
    setCartList(updatedCart);
  };

  const onAddToCart = (item) => {
    setCartList((prev) => {
      const exists = prev.find(
        (cartItem) =>
          cartItem._id === item._id &&
          cartItem.version === item.version &&
          cartItem.variantId === item.variantId
      );

      if (item.version === "original" && exists) return prev;

      if (exists) {
        return prev.map((cartItem) =>
          cartItem.cartKey === exists.cartKey
            ? { ...cartItem, quantity: cartItem.quantity + 1 }
            : cartItem
        );
      }

      return [
        ...prev,
        {
          ...item,
          quantity: 1,
          cartKey: `${item._id}-${item.version}-${item.variantId}`,
        },
      ];
    });
  };

  const handleRemove = (cartKey) => {
    onUpdateCart(cartList.filter((item) => item.cartKey !== cartKey));
  };

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
                cartList={cartList}
                artItems={artItems}
                artItemsLoading={artItemsLoading}
              />
            }
          />
          <Route path="about" element={<About />} />
          <Route path="exhibits" element={<Exhibits artItems={artItems} />} />
          <Route path="contact" element={<Contact />} />
          <Route path="admin" element={<Admin />} />
          <Route
            path="checkout"
            element={
              <Checkout
                cartList={cartList}
                onUpdateCart={onUpdateCart}
                handleRemove={handleRemove}
              />
            }
          />
          <Route
            path="success"
            element={<Success setCartList={setCartList} />}
          />
          <Route path="cancel" element={<Cancelled />} />
        </Routes>
        {!hideLayout && <Footer />}
        {isCartMenuOpen && !hideLayout ? (
          <CartMenu
            setIsCartMenuOpen={setIsCartMenuOpen}
            cartList={cartList}
            onUpdateCart={onUpdateCart}
            handleRemove={handleRemove}
          />
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
// For CDN use Cloudinary API so that Ben can use a form and it sends it to cloudinary
// Mark Order as paid when transaction succeeds with webhook
