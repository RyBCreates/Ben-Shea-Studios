import { BASE_URL } from "../constants";

export const fetchOrders = async () => {
  const res = await fetch(`${BASE_URL}/orders`);
  if (!res.ok) throw new Error("failed to fetch orders");
  return res.json();
};

export const createOrder = async (customerInfo, cartList, totalAmount) => {
  const response = await fetch(`${BASE_URL}/orders`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ customerInfo, cartList, totalAmount }),
  });

  if (!response.ok) throw new Error("Failed to create order");
  return response.json();
};
