import { useState } from "react";
import "./Header.css";

function Header() {
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
        <li className="navbar__link">
          <button className="header__cart-button">
            <img className="header__cart-icon"></img>
            Cart
          </button>
        </li>
      </ul>
    </header>
  );
}

export default Header;
