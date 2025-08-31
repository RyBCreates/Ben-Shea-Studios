import { useState } from "react";
import cartIcon from "../../assets/icons/cart-icon.png";
import "./Header.css";

function Header({ cartList, cartMenuToggle }) {
  const [isHamburgerOpen, setIsHamburgerOpen] = useState(false);

  const hamburgerToggle = () => {
    setIsHamburgerOpen((prev) => !prev);
  };
  return (
    <header className="header">
      <div className="header__logo">
        <h1 className="header__title">Ben Shea Studios</h1>
      </div>
      <button
        type="button"
        className="header__hamburger"
        onClick={() => {
          hamburgerToggle();
        }}
      >
        |||
      </button>

      {isHamburgerOpen && (
        <div className="header__hamburger-menu">
          <button
            type="button"
            className="header__hamburger-option"
            onClick={() => {
              // navigate("favorite-recipes");
              setIsHamburgerOpen(false);
            }}
          >
            About
          </button>
          <button
            type="button"
            className="header__hamburger-option"
            onClick={() => {
              // navigate("shopping-list");
              setIsHamburgerOpen(false);
            }}
          >
            Exhibitions
          </button>
          <button
            type="button"
            className="header__hamburger-option"
            onClick={() => {
              // navigate("profile-settings");
              setIsHamburgerOpen(false);
            }}
          >
            Gallery
          </button>
        </div>
      )}

      <ul className="navbar">
        <li className="navbar__link">About</li>
        <li className="navbar__link">Exhibits</li>
        <li className="navbar__link">Contact</li>
      </ul>
      <button
        className="header__cart-button"
        onClick={() => {
          cartMenuToggle();
        }}
      >
        {cartList.length}
        <img className="header__cart-icon" src={cartIcon}></img>
      </button>
    </header>
  );
}

export default Header;

// Cart Icon Link
{
  /* <a target="_blank" href="https://icons8.com/icon/P6ZYIof6BwLW/shopping-cart">Cart</a> icon by <a target="_blank" href="https://icons8.com">Icons8</a> */
}
