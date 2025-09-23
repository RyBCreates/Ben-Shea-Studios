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
          <p>No Items in cart!</p>
        ) : (
          <>
            {cartList.map((cartItem) => (
              <CartItem cartItem={cartItem} key={cartItem.id} />
            ))}
            <p>Your Total: ${totalPrice}.00</p>
          </>
        )}
      </div>
    </div>
  );
}

export default CartMenu;
