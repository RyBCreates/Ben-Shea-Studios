import CartItem from "../CartItem/CartItem";

import "./CheckoutCart.css";

function CheckoutCart({ cartList, onUpdateCart, handleRemove }) {
  const subtotal = cartList.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );
  const tax = subtotal * 0.07;
  const total = subtotal + tax;

  return (
    <aside className="checkout-cart">
      <h3 className="checkout-cart__title">Your Cart</h3>
      {cartList.length === 0 ? (
        <p className="checkout-cart__empty">Your cart is empty.</p>
      ) : (
        <ul className="checkout-cart__list">
          {cartList.map((cartItem) => (
            <CartItem
              key={cartItem._id}
              cartItem={cartItem}
              cartList={cartList}
              onUpdateCart={onUpdateCart}
              handleRemove={handleRemove}
            />
          ))}
        </ul>
      )}
      <div className="checkout-cart__totals">
        <p>Subtotal: ${subtotal.toFixed(2)}</p>
        <p>Tax (7%): ${tax.toFixed(2)}</p>
        <h4>Total: ${total.toFixed(2)}</h4>
      </div>
    </aside>
  );
}

export default CheckoutCart;
