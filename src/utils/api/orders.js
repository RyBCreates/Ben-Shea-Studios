import { BASE_URL } from "../constants";

export const fetchOrders = async () => {
  const res = await fetch(`${BASE_URL}/orders`);
  if (!res.ok) throw new Error("failed to fetch orders");
  return res.json();
};

export const createOrder = async (orderData) => {
  console.log("Sending order data:", orderData);

  const response = await fetch(`${BASE_URL}/orders`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(orderData),
  });

  if (!response.ok) throw new Error("Failed to create order");
  const data = await response.json();
  console.log("Order created successfully:", data);
  return data;
};
