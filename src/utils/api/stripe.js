import { BASE_URL } from "../constants";

export const createCheckoutLink = async (cartList) => {
  const response = await fetch(`${BASE_URL}/stripe/create-checkout-session`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ cartList }),
  });

  const data = await response.json();
  window.location.href = data.url;
};
