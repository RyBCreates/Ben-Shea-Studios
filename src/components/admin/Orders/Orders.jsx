import "./Orders.css";

function Orders() {
  return (
    <div className="orders">
      <h2 className="orders__title">Unfulfilled Orders</h2>
      <ul>
        <li>Here is an order</li>
        <li>Here is an order</li>
        <li>Here is an order</li>
        <li>Here is an order</li>
      </ul>
      <h2 className="orders__title">Completed Orders</h2>
      <ul>
        <li>Here is an order</li>
        <li>Here is an order</li>
        <li>Here is an order</li>
        <li>Here is an order</li>
      </ul>
    </div>
  );
}

export default Orders;
