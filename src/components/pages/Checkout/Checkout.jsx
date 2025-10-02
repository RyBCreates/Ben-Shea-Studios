import { loadStripe } from "@stripe/stripe-js";
import { useState } from "react";

import "./Checkout.css";

function Checkout() {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    address: "",
    discountCode: "",
    instructions: "",
  });

  const handleChange = (e) => {
    // setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    // e.preventDefault();
    // // Create a utils folder and add this to StripeApi.js
    // const res = await fetch("/api/create-checkout-session", {
    //   method: "POST",
    //   headers: { "Content-Type": "application/json" },
    //   body: JSON.stringify(formData),
    // });
    // const { url } = await res.json();
    // window.location.href = url;
  };

  const stripePromise =
    loadStripe();
    // "pk_test_51SDWFrAg1BofyoLMJLZaZm0qaoIgLmarxMVA6PAF1Un1yLQUjc6eBWE19gnYbWR53pldAUn1cIxBp1MtL8rgGQMV005euKVUOg"

  return (
    <section className="checkout">
      <form onSubmit={handleSubmit} className="checkout__form">
        <input
          type="text"
          name="fullName"
          placeholder="Full Name"
          value={formData.fullName}
          onChange={handleChange}
          required
        />
        <input
          type="email"
          name="email"
          placeholder="Email Address"
          value={formData.email}
          onChange={handleChange}
          required
        />
        <input
          type="tel"
          name="phone"
          placeholder="Phone Number"
          value={formData.phone}
          onChange={handleChange}
          required
        />
        <textarea
          name="address"
          placeholder="Shipping Address"
          value={formData.address}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="discountCode"
          placeholder="Discount Code (Optional)"
          value={formData.discountCode}
          onChange={handleChange}
        />
        <textarea
          name="instructions"
          placeholder="Special Instructions"
          value={formData.instructions}
          onChange={handleChange}
        />
        <button className="checkout__submit-button">Place Order!</button>
      </form>
    </section>
  );
}

export default Checkout;
