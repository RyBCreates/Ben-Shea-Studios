import "./CheckoutCart.css";

function CheckoutCart({ cartList, onUpdateCart }) {
  const handleRemove = (id) => {
    onUpdateCart(cartList.filter((item) => item.id !== id));
  };

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
          {cartList.map((item) => (
            <li key={item.id} className="checkout-cart__item">
              <img src={item.image} alt={item.title} />
              <div>
                <h4>{item.title}</h4>
                <p>${item.price.toFixed(2)}</p>
                <div className="checkout-cart__controls">
                  <button
                    onClick={() =>
                      onUpdateCart(
                        cartList.map((i) =>
                          i.id === item.id && i.quantity > 1
                            ? { ...i, quantity: i.quantity - 1 }
                            : i
                        )
                      )
                    }
                  >
                    -
                  </button>
                  <span>{item.quantity}</span>
                  <button
                    onClick={() =>
                      onUpdateCart(
                        cartList.map((i) =>
                          i.id === item.id
                            ? { ...i, quantity: i.quantity + 1 }
                            : i
                        )
                      )
                    }
                  >
                    +
                  </button>
                  <button onClick={() => handleRemove(item.id)}>Remove</button>
                </div>
              </div>
            </li>
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
