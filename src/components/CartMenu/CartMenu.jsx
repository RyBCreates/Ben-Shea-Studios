import { Link } from "react-router-dom";

import CartItem from "../CartItem/CartItem";
import "./CartMenu.css";

function CartMenu({ setIsCartMenuOpen, cartList, onUpdateCart, handleRemove }) {
  const calculateCartTotal = (cartItems) => {
    let total = 0;
    for (const item of cartItems) {
      total += item.price * item.quantity;
    }
    return total;
  };

  const cartTotal = calculateCartTotal(cartList);

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
        {cartList.length === 0 ? (
          <p className="cart-menu__empty">No items in your cart yet!</p>
        ) : (
          <div className="cart-menu__items-list">
            <ul className="cart-menu__items">
              {cartList.map((cartItem) => (
                <CartItem
                  key={cartItem.cartKey}
                  cartItem={cartItem}
                  cartList={cartList}
                  onUpdateCart={onUpdateCart}
                  handleRemove={handleRemove}
                />
              ))}
            </ul>
            <div className="cart-menu__checkout">
              <p className="cart-menu__total">Your Total: ${cartTotal}.00</p>
              <Link to="checkout" className="cart-menu__link-container">
                <button
                  className="cart-menu__checkout-button"
                  type="button"
                  onClick={() => {
                    setIsCartMenuOpen(false);
                  }}
                >
                  Checkout
                </button>
              </Link>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default CartMenu;
