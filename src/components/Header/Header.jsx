import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import cartIcon from "../../assets/icons/cart-icon.png";
import "./Header.css";

function Header({ cartList, cartMenuToggle }) {
  const [isHamburgerOpen, setIsHamburgerOpen] = useState(false);

  const navigate = useNavigate();

  const hamburgerToggle = () => {
    setIsHamburgerOpen((prev) => !prev);
  };
  return (
    <header className="header">
      <Link to="/" className="header__logo">
        <h1 className="header__title">Ben Shea Studios</h1>
      </Link>
      <ul className="navbar">
        <Link to="/about" className="navbar__link-container">
          <li className="navbar__link">About</li>
        </Link>
        <Link to="/exhibits" className="navbar__link-container">
          <li className="navbar__link">Exhibits</li>
        </Link>
        <Link to="/contact" className="navbar__link-container">
          <li className="navbar__link">Contact</li>
        </Link>
      </ul>
      <button
        type="button"
        className="header__hamburger"
        onClick={() => {
          hamburgerToggle();
        }}
      >
        |||
      </button>
      <button
        className={`header__cart-button ${
          cartList.length === 0 ? "header__cart-button_empty" : ""
        }`}
        onClick={() => {
          cartMenuToggle();
        }}
      >
        {cartList.length}
        <img className="header__cart-icon" src={cartIcon} alt="cart icon"></img>
      </button>

      {isHamburgerOpen && (
        <div className="header__hamburger-menu">
          <button
            type="button"
            className="header__hamburger-option"
            onClick={() => {
              navigate("about");
              setIsHamburgerOpen(false);
            }}
          >
            About
          </button>
          <button
            type="button"
            className="header__hamburger-option"
            onClick={() => {
              navigate("exhibits");
              setIsHamburgerOpen(false);
            }}
          >
            Exhibits
          </button>
          <button
            type="button"
            className="header__hamburger-option"
            onClick={() => {
              navigate("contact");
              setIsHamburgerOpen(false);
            }}
          >
            Contact
          </button>
        </div>
      )}
    </header>
  );
}

export default Header;

// Cart Icon Link
{
  /* <a target="_blank" href="https://icons8.com/icon/P6ZYIof6BwLW/shopping-cart">Cart</a> icon by <a target="_blank" href="https://icons8.com">Icons8</a> */
}
