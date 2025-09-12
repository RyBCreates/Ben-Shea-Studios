import "./CartItem.css";

function CartItem({ cartItem }) {
  return (
    <div className="cart-item">
      <h2 className="cart-item__title">{cartItem.title}</h2>
      <p>${cartItem.original.price}.00</p>
    </div>
  );
}

export default CartItem;
