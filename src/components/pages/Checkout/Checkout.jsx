import { useState } from "react";

import {
  createCheckoutLink,
  createOrder,
  checkDiscountCode,
} from "../../../utils/api/index";

import CheckoutCart from "../../CheckoutCart/CheckoutCart";

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

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await createOrder({
        customerInfo: formData,
        cartList,
      });
      await createCheckoutLink(cartList, discountValue);
    } catch (error) {
      console.error("Error submitting Checkout", error);
    }
  };

  const handleApplyDiscount = async () => {
    if (!formData.discountCode.trim()) {
      setDiscountStatus("Please enter a code.");
      return;
    }

    const result = await checkDiscountCode(formData.discountCode);

    if (result.valid) {
      setDiscountValue(result.discount);
      setDiscountStatus(`Discount applied: ${result.discount}% off`);
    } else {
      setDiscountValue(0);
      setDiscountStatus("Invalid or expired code.");
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
          <div>
            <input
              type="text"
              name="discountCode"
              placeholder="Discount Code (Optional)"
              value={formData.discountCode}
              onChange={handleChange}
            />
            <button
              className="checkout__apply-button"
              type="button"
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
          onUpdateCart={onUpdateCart}
          handleRemove={handleRemove}
        />
      </div>
    </section>
  );
}

export default Checkout;
