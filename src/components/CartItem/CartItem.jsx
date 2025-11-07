import "./CartItem.css";

function CartItem({ cartItem, cartList, onUpdateCart, handleRemove }) {
  const isOriginal = cartItem.version === "original";

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
                cartList.map((item) =>
                  item.cartKey === cartItem.cartKey && item.quantity > 1
                    ? { ...item, quantity: item.quantity - 1 }
                    : item
                )
              )
            }
          >
            -
          </button>
          <span className="cart-item__quantity">{cartItem.quantity}</span>
          <button
            disabled={isOriginal}
            className={`cart-item__add-button ${
              isOriginal ? "cart-item__add-button--disabled" : ""
            }`}
            onClick={() =>
              !isOriginal &&
              onUpdateCart(
                cartList.map((item) =>
                  item.cartKey === cartItem.cartKey
                    ? { ...item, quantity: item.quantity + 1 }
                    : item
                )
              )
            }
          >
            +
          </button>
          <button
            className="cart-item__remove-button"
            onClick={() => handleRemove(cartItem.cartKey)}
          >
            Remove
          </button>
        </div>
      </div>
    </li>
  );
}

export default CartItem;
