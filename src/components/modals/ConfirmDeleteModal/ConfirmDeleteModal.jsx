import "./ConfirmDeleteModal.css";
import "../Modals.css";

function ConfirmDeleteModal({ closeModal, currentModal, onConfirm }) {
  return (
    <div
      className={`modal ${
        currentModal === "confirmation" ? "modal__opened" : ""
      }`}
    >
      <div className="modal__content">
        <button
          className="modal__close-button"
          type="button"
          onClick={closeModal}
        >
          X
        </button>
        <h3 className="modal__title">Are you sure you want to delete?</h3>
        <div className="confirmation__button-container">
          <button
            className="confirmation__delete-button"
            type="button"
            onClick={onConfirm}
          >
            Delete
          </button>
          <button className="confirmation__cancel-button" onClick={closeModal}>
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}

export default ConfirmDeleteModal;
