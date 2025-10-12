import "./ConfirmDeleteModal.css";
import "../Modals.css";

function ConfirmDeleteModal({
  closeModal,
  currentModal,
  handleDeleteArtConfirm,
}) {
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
          onClick={() => {
            closeModal();
          }}
        >
          X
        </button>
        <h3 className="modal__title">Are you sure you want to delete?</h3>
        <button
          className="modal__delete-button"
          type="button"
          onClick={() => {
            handleDeleteArtConfirm();
          }}
        >
          Delete
        </button>
        <button className="modal__cancel-button">Cancel</button>
      </div>
    </div>
  );
}

export default ConfirmDeleteModal;
