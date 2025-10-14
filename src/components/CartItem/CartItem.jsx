import "./CartItem.css";

function CartItem({ cartItem, cartList, onUpdateCart, handleRemove }) {
  return (
    <li className="cart-item">
      <img
        className="cart-item__image"
        src={cartItem.image}
        alt={cartItem.title}
      />
      <div>
        <h4 className="cart-item__title">{cartItem.title}</h4>
        <p className="cart-item__price">${cartItem.price.toFixed(2)}</p>
        <div className="cart-item__controls">
          <button
            onClick={() =>
              onUpdateCart(
                cartList.map((i) =>
                  i._id === cartItem._id && i.quantity > 1
                    ? { ...i, quantity: i.quantity - 1 }
                    : i
                )
              )
            }
          >
            -
          </button>
          <span className="cart-item__quantity">{cartItem.quantity}</span>
          <button
            onClick={() =>
              onUpdateCart(
                cartList.map((i) =>
                  i._id === cartItem._id
                    ? { ...i, quantity: i.quantity + 1 }
                    : i
                )
              )
            }
          >
            +
          </button>
          <button
            className="cart-item__remove-button"
            onClick={() => handleRemove(cartItem._id)}
          >
            Remove
          </button>
        </div>
      </div>
    </li>
  );
}

export default CartItem;
