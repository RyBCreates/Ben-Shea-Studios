import "./OrderCard.css";

function OrderCard({ order }) {
  console.log(order);
  return (
    <li className="order-card">
      <h3 className="order-card__title">
        {order._id}
        <span>({order.status})</span>
      </h3>
      <p>{order.email}</p>
      <p>{order.phone}</p>
      <p>{order.address}</p>
      <p>{order.createdAt}</p>
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
