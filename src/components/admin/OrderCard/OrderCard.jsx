import { useState } from "react";
import "./OrderCard.css";

function OrderCard({ order }) {
  const [isCardShown, setIsCardShown] = useState(false);

  const toggleCardDetails = () => {
    setIsCardShown(!isCardShown);
    console.log(order);
  };

  if (!order) return null;
  return (
    <li className="order-card">
      <h3 className="order-card__title">
        {order._id}
        <span>({order.status})</span>
      </h3>
      <button className="order-card__dropdown" onClick={toggleCardDetails}>
        v
      </button>

      {isCardShown ? (
        <>
          <p>{order.email}</p>
          <p>{order.phone}</p>
          <p>{order.address}</p>
          <p>{order.createdAt}</p>
        </>
      ) : (
        <></>
      )}
      <label>
        Set order status
        <select>
          <option>pending</option>
          <option>paid</option>
        </select>
      </label>
    </li>
  );
}

export default OrderCard;
