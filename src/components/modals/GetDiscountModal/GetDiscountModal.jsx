import "./GetDiscountModal.css";
import "../Modals.css";

function GetDiscountModal({ activeModal }) {
  return (
    <div
      className={`modal ${activeModal === "discount" ? "modal__opened" : ""}`}
    >
      <div className="modal__content">
        <h2 className="modal__title">Discount Modal</h2>
      </div>
    </div>
  );
}

export default GetDiscountModal;
