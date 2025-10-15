import { BASE_URL } from "../constants";

export const createCheckoutLink = async (cartItems) => {
  const response = await fetch(`${BASE_URL}/stripe/create-checkout-session`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ cartItems }),
  });

  const data = await response.json();
  window.location.href = data.url;
};
