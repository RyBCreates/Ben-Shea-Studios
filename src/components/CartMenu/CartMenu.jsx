import CartItem from "../CartItem/CartItem";
import "./CartMenu.css";

function CartMenu({ setIsCartMenuOpen, cartList }) {
  const totalPrice = 200;

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
                <CartItem cartItem={cartItem} key={cartItem.id} />
              ))}
            </ul>
            <div className="cart-menu__checkout">
              <p className="cart-menu__total">Your Total: ${totalPrice}.00</p>
              <button className="cart-menu__checkout-button" type="button">
                Checkout
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default CartMenu;
