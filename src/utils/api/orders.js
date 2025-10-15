import { BASE_URL } from "../constants";

export const fetchOrders = async () => {
  const res = await fetch(`${BASE_URL}/orders`);
  if (!res.ok) throw new Error("failed to fetch orders");
  return res.json();
};
