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

  const handleOrderStatusUpdate = (updatedOrder) => {
    setOrders((prevOrders) =>
      prevOrders.map((order) =>
        order._id === updatedOrder._id ? updatedOrder : order
      )
    );
  };

  if (loading) return <p>Loading orders...</p>;

  return (
    <div className="orders">
      <div className="orders__unfulfilled">
        <h2 className="orders__title">Unfulfilled Orders</h2>
        <ul className="orders__list_unfulfilled">
          {orders
            .filter(
              (order) => order.status === "pending" || order.status === "paid"
            )
            .map((order) => (
              <OrderCard
                key={order._id}
                order={order}
                onStatusChange={handleOrderStatusUpdate}
              />
            ))}
        </ul>
      </div>
      <div className="orders__fulfilled">
        <h2 className="orders__title">Completed Orders</h2>
        <ul className="orders__list_fulfilled">
          {orders
            .filter((order) => {
              return (
                order.status === "fulfilled" ||
                order.status === "cancelled" ||
                order.status === "shipped" ||
                order.status === "refunded"
              );
            })
            .map((order) => (
              <OrderCard
                key={order._id}
                order={order}
                onStatusChange={handleOrderStatusUpdate}
              />
            ))}
        </ul>
      </div>
    </div>
  );
}

export default Orders;
