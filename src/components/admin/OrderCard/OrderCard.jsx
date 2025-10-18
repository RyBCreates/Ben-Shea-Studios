import { useState } from "react";
import { handleStatusChange } from "../../../utils/api/index";
import "./OrderCard.css";

function OrderCard({ order, onStatusChange }) {
  const [isCardShown, setIsCardShown] = useState(false);
  const [status, setStatus] = useState(order.status);

  const toggleCardDetails = () => {
    setIsCardShown(!isCardShown);
    console.log(order);
  };

  const handleStatusClick = async (e) => {
    const newStatus = e.target.value;
    const orderId = order._id;

    setStatus(newStatus);
    const updatedOrder = await handleStatusChange(newStatus, orderId);

    if (updatedOrder) {
      onStatusChange(updatedOrder);
    }
  };

  if (!order) return null;
  return (
    <li className="order-card">
      <div className="order-card__main">
        <h3 className="order-card__title">
          {order.fullName || order._id}
          <span className="order-card__status">({order.status})</span>
        </h3>
        <button className="order-card__dropdown" onClick={toggleCardDetails}>
          v
        </button>
      </div>
      {isCardShown ? (
        <>
          <p>{order.email}</p>
          <p>{order.phone}</p>
          <p>{order.address}</p>
          <p>{new Date(order.createdAt).toLocaleString()}</p>
        </>
      ) : (
        <></>
      )}
      <label className="order-card__label">
        Set order status
        <select
          className="order-card__selector"
          value={status}
          onChange={handleStatusClick}
        >
          <option>pending</option>
          <option>paid</option>
          <option>fulfilled</option>
          <option>shipped</option>
          <option>cancelled</option>
          <option>refunded</option>
        </select>
      </label>
    </li>
  );
}

export default OrderCard;
