import { BASE_URL } from "../constants";

export async function submitDiscountEmail(data) {
  try {
    const res = await fetch(`${BASE_URL}/discount/signup`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });

    return await res.json();
  } catch (error) {
    console.error("Discount submission failed:", error);
    return { message: "Network error" };
  }
}
