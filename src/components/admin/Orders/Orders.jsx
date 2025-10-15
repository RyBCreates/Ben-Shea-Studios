import { useEffect, useState } from "react";

import "./Orders.css";

import { fetchOrders } from "../../../utils/api/index";
import OrderCard from "../OrderCard/OrderCard";

function Orders({ orders, setOrders }) {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchOrders()
      .then(setOrders)
      .catch((err) => console.error("Error fetching orders:", err))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <p>Loading orders...</p>;

  return (
    <div className="orders">
      <h2 className="orders__title">Unfulfilled Orders</h2>
      <ul>
        {orders
          .filter((order) => order.status === "pending" || "paid")
          .map((order) => (
            <OrderCard key={order._id} order={order} />
          ))}
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
