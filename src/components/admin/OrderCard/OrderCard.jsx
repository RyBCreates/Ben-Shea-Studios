import { useState } from "react";
import { handleStatusChange } from "../../../utils/api/index";
import "./OrderCard.css";

function OrderCard({ order, onStatusChange }) {
  const [isCardShown, setIsCardShown] = useState(false);
  const [status, setStatus] = useState(order.status);

  const toggleCardDetails = () => setIsCardShown(!isCardShown);

  const handleStatusClick = async (e) => {
    const newStatus = e.target.value;
    setStatus(newStatus);

    console.log(order);
    const updatedOrder = await handleStatusChange(newStatus, order._id);
    if (updatedOrder) onStatusChange(updatedOrder);
  };

  if (!order) return null;

  return (
    <li className="order-card" onClick={toggleCardDetails}>
      <div
        className={`${
          isCardShown ? "order-card__main_active" : "order-card__main"
        }`}
      >
        <div className="order-card__title-container">
          <div
            className={`order-card__indicator order-card__indicator_${order.status}`}
          ></div>
          <h3 className="order-card__title" title={order.fullName || order._id}>
            {order.fullName || order._id}
          </h3>
        </div>

        <select
          className="order-card__selector"
          name="status"
          value={status}
          onChange={handleStatusClick}
          onClick={(e) => {
            e.stopPropagation();
          }}
        >
          <option>pending</option>
          <option>paid</option>
          <option>fulfilled</option>
          <option>shipped</option>
          <option>cancelled</option>
          <option>refunded</option>
        </select>
      </div>

      {isCardShown && (
        <div className="order-card__details">
          <div className="order-card__section">
            <h4 className="order-card__section-title">Customer Info</h4>
            <div className="order-card__info-block">
              <div>
                <strong>Email</strong>
                <p>{order.email}</p>
              </div>
              <div>
                <strong>Phone</strong>
                <p>{order.phone}</p>
              </div>
              <div>
                <strong>Address</strong>
                <p className="order-card__address-text">{order.address}</p>
              </div>
            </div>
          </div>
          <div className="order-card__section">
            <h4 className="order-card__section-title">Items Ordered</h4>
            <ul className="order-card__cart-list">
              {order.cartList?.map((item) => (
                <li key={item._id} className="order-card__cart-item">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="order-card__cart-img"
                  />
                  <div className="order-card__cart-info">
                    <p className="order-card__cart-title">{item.title}</p>
                    <p className="order-card__cart-qty">
                      Quantity: {item.quantity}
                    </p>
                    <p className="order-card__cart-price">
                      ${item.price.toFixed(2)}
                    </p>
                  </div>
                </li>
              ))}
            </ul>
            <div className="order-card__total">
              <strong>Total:</strong> ${order.totalAmount}
            </div>
          </div>
          <div className="order-card__section">
            <h4 className="order-card__section-title">Special Instructions</h4>
            <p className="order-card__instructions">
              {order.instructions || "None provided"}
            </p>
          </div>

          <div className="order-card__dates">
            <p>
              <strong>Created:</strong>
              {new Date(order.createdAt).toLocaleString()}
            </p>
            <p>
              <strong>Updated:</strong>
              {new Date(order.updatedAt).toLocaleString()}
            </p>
          </div>
        </div>
      )}
    </li>
  );
}

export default OrderCard;
