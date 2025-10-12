import { useState } from "react";

import "./GetDiscountModal.css";
import "../Modals.css";

function GetDiscountModal({ activeModal, closeModal }) {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [isAccepted, setIsAccepted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();

    const newUser = {
      firstName: firstName,
      lastName: lastName,
      email: email,
    };
  };

  return (
    <div
      className={`modal ${activeModal === "discount" ? "modal__opened" : ""}`}
    >
      <div className="modal__content">
        <button
          className="modal__close-button"
          onClick={() => {
            closeModal();
          }}
        >
          X
        </button>
        <h2 className="modal__title">Sign Up, Receive 30% Off!</h2>
        <p className="modal__description">
          Sign up for our mailing list to receive 30% off your first order! Stay
          updated with new artwork, exclusive offers, and major updates — you
          won’t want to miss out.
        </p>
        <form
          className="modal__form"
          onSubmit={(e) => {
            handleSubmit(e);
          }}
        >
          <div className="modal__name-container">
            <label className="modal__label">
              First Name
              <input
                className="modal__input modal__input_text"
                type="text"
                placeholder="First Name"
                value={firstName}
                onChange={(e) => {
                  setFirstName(e.target.value);
                }}
                required
              />
            </label>
            <label className="modal__label">
              Last Name
              <input
                className="modal__input modal__input_text"
                type="text"
                placeholder="Last Name"
                value={lastName}
                onChange={(e) => {
                  setLastName(e.target.value);
                }}
                required
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
                onChange={(e) => {
                  setEmail(e.target.value);
                }}
                required
              />
            </label>
          </div>
          <label className="modal__label modal__label_radio">
            <input
              className="modal__input modal__input_radio"
              type="radio"
              name="terms"
              onChange={() => {
                setIsAccepted(true);
              }}
              required
            />
            Do you agree to receive automated emails to the provided email
            address?
          </label>
          <div className="modal__buttons-container">
            <button
              className={`modal__button ${
                isAccepted ? "modal__button_submit" : "modal__button_disabled"
              }`}
              type="submit"
              disabled={isAccepted === false}
            >
              Send me my code!
            </button>
            <button
              className="modal__button modal__button_cancel"
              type="button"
              onClick={() => {
                closeModal();
              }}
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
