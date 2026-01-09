import { useState } from "react";
import CheckoutCart from "../../CheckoutCart/CheckoutCart";
import {
  createCheckoutLink,
  createOrder,
  checkDiscountCode,
} from "../../../utils/api/index";

import "./Checkout.css";

function Checkout({ cartList, onUpdateCart, handleRemove }) {
  const [formData, setFormData] = useState({
    email: "",
    fullName: "",
    phone: "",
    address: "",
    discountCode: "",
    instructions: "",
  });
  const [discountStatus, setDiscountStatus] = useState(null);
  const [discountValue, setDiscountValue] = useState(0);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleApplyDiscount = async () => {
    if (!formData.discountCode.trim()) {
      setDiscountStatus("Please enter a code.");
      setDiscountValue(0);
      return;
    }

    try {
      const result = await checkDiscountCode(formData.discountCode);

      if (result.valid) {
        setDiscountValue(result.discount);
        setDiscountStatus(`Discount applied: ${result.discount}% off`);
      } else {
        setDiscountValue(0);
        setDiscountStatus("Invalid or expired code.");
      }
    } catch (err) {
      console.error("Error validating discount code:", err);
      setDiscountValue(0);
      setDiscountStatus("Error checking discount code.");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!cartList || cartList.length === 0) {
      alert("Your cart is empty!");
      return;
    }

    try {
      // Save order to backend
      await createOrder({
        customerInfo: formData,
        cartList,
        discountValue,
      });

      // Create Stripe checkout session
      const { url } = await createCheckoutLink(cartList, discountValue);

      if (url) {
        window.location.href = url; // redirect to Stripe checkout
      } else {
        console.error("Stripe session URL missing");
      }
    } catch (err) {
      console.error("Error submitting checkout:", err);
      alert("Checkout failed. Please try again.");
    }
  };

  return (
    <section className="checkout">
      <div className="checkout__container">
        <form onSubmit={handleSubmit} className="checkout__form">
          <h2 className="checkout__title">Checkout</h2>
          <p className="checkout__description">
            Enter your details below to complete your purchase.
          </p>

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
            className="checkout__input_textarea"
            name="address"
            placeholder="Shipping Address"
            value={formData.address}
            onChange={handleChange}
            required
          />

          <div className="checkout__discount-container">
            <input
              type="text"
              name="discountCode"
              placeholder="Discount Code (Optional)"
              value={formData.discountCode}
              onChange={handleChange}
            />
            <button
              type="button"
              className="checkout__apply-button"
              onClick={handleApplyDiscount}
            >
              Apply Discount
            </button>
          </div>
          {discountStatus && (
            <p className="discount-message">{discountStatus}</p>
          )}

          <textarea
            className="checkout__input_textarea"
            name="instructions"
            placeholder="Special Instructions"
            value={formData.instructions}
            onChange={handleChange}
          />

          <button type="submit" className="checkout__submit-button">
            Proceed to Payment
          </button>
        </form>

        <CheckoutCart
          cartList={cartList}
          discountValue={discountValue} // pass discount
          onUpdateCart={onUpdateCart}
          handleRemove={handleRemove}
        />
      </div>
    </section>
  );
}

export default Checkout;
