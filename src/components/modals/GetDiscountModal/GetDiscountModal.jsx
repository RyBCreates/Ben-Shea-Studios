import emailjs from "@emailjs/browser";
import { useState } from "react";
import { submitDiscountEmail } from "../../../utils/api/discount";

import "./GetDiscountModal.css";
import "../Modals.css";

function GetDiscountModal({ activeModal, closeModal }) {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [isAccepted, setIsAccepted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const resetForm = () => {
    setFirstName("");
    setLastName("");
    setEmail("");
    setIsAccepted(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!isAccepted || isSubmitting) return;

    setIsSubmitting(true);

    try {
      const response = await submitDiscountEmail({
        firstName: firstName.trim(),
        lastName: lastName.trim(),
        email: email.trim(),
      });

      if (!response.discountCode) {
        alert(response.error || response.message || "Something went wrong.");
        return;
      }

      try {
        await sendDiscountEmail(response);
        alert("Check your email for your discount code!");
      } catch (emailErr) {
        console.error("EmailJS failed:", emailErr);
        alert(
          "Your discount was created, but the email could not be sent. Please contact support."
        );
      }

      closeModal();
      resetForm();
    } catch (err) {
      console.error(err);
      alert("Network error. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const sendDiscountEmail = async ({ email, firstName, discountCode }) => {
    return emailjs.send(
      import.meta.env.VITE_EMAILJS_SERVICE_ID,
      import.meta.env.VITE_EMAILJS_DISCOUNT_TEMPLATE_ID,
      {
        email: email,
        firstName: firstName || "there",
        discountCode: discountCode,
      },
      import.meta.env.VITE_EMAILJS_PUBLIC_KEY
    );
  };

  return (
    <div
      className={`modal ${activeModal === "discount" ? "modal__opened" : ""}`}
    >
      <div className="modal__content">
        <button className="modal__close-button" onClick={closeModal}>
          X
        </button>

        <h2 className="modal__title">Sign Up, Receive 25% Off!</h2>

        <p className="modal__description">
          Sign up for our mailing list to receive 25% off your first order!
        </p>

        <form className="modal__form" onSubmit={handleSubmit}>
          <div className="modal__name-container">
            <label className="modal__label">
              First Name
              <input
                className="modal__input"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
              />
            </label>

            <label className="modal__label">
              Last Name
              <input
                className="modal__input"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
              />
            </label>
          </div>

          <label className="modal__label">
            Email
            <input
              className="modal__input"
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </label>

          <label className="modal__label modal__label_radio">
            <input
              type="checkbox"
              checked={isAccepted}
              onChange={() => setIsAccepted(!isAccepted)}
              required
            />
            I agree to receive automated emails.
          </label>

          <div className="modal__buttons-container">
            <button
              className="modal__button modal__button_submit"
              disabled={!isAccepted || isSubmitting}
            >
              {isSubmitting ? "Sending..." : "Send me my code!"}
            </button>

            <button
              type="button"
              className="modal__button modal__button_cancel"
              onClick={closeModal}
            >
              Nevermind
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default GetDiscountModal;
