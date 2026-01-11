import { BASE_URL } from "../constants";

export const createCheckoutLink = async (
  customerInfo,
  cartList,
  discountValue = 0
) => {
  const response = await fetch(`${BASE_URL}/stripe/create-checkout-session`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ customerInfo, cartList, discountValue }),
  });

  const data = await response.json();
  return data;
};
