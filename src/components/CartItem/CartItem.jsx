import "./CartItem.css";

function CartItem({ cartItem }) {
  return (
    <li className="cart-item">
      <img
        className="cart-item__image"
        src={cartItem.images[0]}
        alt={cartItem.title}
      />
      <div className="cart-item__container">
        <h2 className="cart-item__title">{cartItem.title}</h2>
        <p className="cart-item__quantity">Qty:{cartItem.quantity ?? 1}</p>
      </div>
      <p className="cart-item__price">${cartItem.original.price}.00</p>
    </li>
  );
}

export default CartItem;
