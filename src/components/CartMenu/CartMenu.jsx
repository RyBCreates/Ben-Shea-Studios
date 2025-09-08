import "./CartMenu.css";

function CartMenu({ setIsCartMenuOpen }) {
  return (
    <div className="cart-menu">
      <div className="cart-menu__content">
        <button
          className="cart-menu__close-button"
          type="button"
          onClick={() => setIsCartMenuOpen(false)}
        >
          x
        </button>
        <h1 className="cart-menu__title">Your Cart</h1>
      </div>
    </div>
  );
}

export default CartMenu;
