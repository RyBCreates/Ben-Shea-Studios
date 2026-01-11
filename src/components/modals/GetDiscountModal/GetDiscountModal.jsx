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

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!isAccepted) return;

    setIsSubmitting(true);

    const newUser = { firstName, lastName, email };
    const response = await submitDiscountEmail(newUser);

    setIsSubmitting(false);

    alert(response.message || "Something went wrong.");

    if (response.message?.includes("sent")) {
      closeModal();
      setFirstName("");
      setLastName("");
      setEmail("");
      setIsAccepted(false);
    }
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
          Sign up for our mailing list to receive 25% off your first order! Stay
          updated with new artwork, exclusive offers, and major updates — you
          won’t want to miss out.
        </p>

        <form className="modal__form" onSubmit={handleSubmit}>
          <div className="modal__name-container">
            <label className="modal__label">
              First Name
              <input
                className="modal__input modal__input_text"
                type="text"
                placeholder="First Name"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
              />
            </label>

            <label className="modal__label">
              Last Name
              <input
                className="modal__input modal__input_text"
                type="text"
                placeholder="Last Name"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
              />
            </label>
          </div>

          <div className="modal__email-container">
            <label className="modal__label">
              Email
              <input
                className="modal__input modal__input_email"
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </label>
          </div>

          <label className="modal__label modal__label_radio">
            <input
              className="modal__input modal__input_radio"
              type="checkbox"
              checked={isAccepted}
              onChange={() => setIsAccepted(!isAccepted)}
              required
            />
            I agree to receive automated emails to the provided email address.
          </label>

          <div className="modal__buttons-container">
            <button
              className={`modal__button modal__button_submit`}
              type="submit"
              disabled={!isAccepted || isSubmitting}
            >
              {isSubmitting ? "Sending..." : "Send me my code!"}
            </button>

            <button
              className="modal__button modal__button_cancel"
              type="button"
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
