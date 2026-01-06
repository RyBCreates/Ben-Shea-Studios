import { BASE_URL } from "../constants";

export const fetchOrders = async () => {
  const res = await fetch(`${BASE_URL}/orders`);
  if (!res.ok) throw new Error("failed to fetch orders");
  return res.json();
};

export const createOrder = async (orderData) => {
  const res = await fetch(`${BASE_URL}/orders`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(orderData),
  });

  if (!res.ok) throw new Error("Failed to create order");
  const data = await res.json();
  return data;
};

export const handleStatusChange = async (status, orderId) => {
  try {
    const res = await fetch(`${BASE_URL}/orders/${orderId}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ status }),
    });

    if (!res.ok) {
      console.error("Response status:", res.status);
      throw new Error("Failed to update status");
    }

    const updatedOrder = await res.json();
    return updatedOrder;
  } catch (err) {
    console.error("Error updating order status:", err);
    alert("Failed to update order status");
  }
};

export const deleteOrder = async (orderId) => {
  const res = await fetch(`${BASE_URL}/orders/${orderId}`, {
    method: "DELETE",
  });

  if (!res.ok) {
    throw new Error("Failed to delete order");
  }

  return res.json();
};
