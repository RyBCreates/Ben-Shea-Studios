import "./OrderCard.css";

function OrderCard({ order }) {
  return (
    <li className="order-card">
      <h3 className="order-card__title">{order.customerName}</h3>
    </li>
  );
}

export default OrderCard;
