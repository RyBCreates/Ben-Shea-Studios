import { useState, useEffect } from "react";

import "./AddExhibitModal.css";
import "../Modals.css";

function AddExhibitModal({
  currentModal,
  closeModal,
  onSaveExhibit,
  exhibit,
  artItems = [],
}) {
  const [location, setLocation] = useState("");
  const [address, setAddress] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState("");
  const [selectedArtItems, setSelectedArtItems] = useState([]);

  // Pre-fill fields for editing
  useEffect(() => {
    if (currentModal === "edit-exhibit" && exhibit) {
      setLocation(exhibit.location || "");
      setAddress(exhibit.address || "");
      setDescription(exhibit.description || "");
      setImage(exhibit.image || "");
      setSelectedArtItems(exhibit.artItems?.map((art) => art._id) || []);
    } else if (currentModal === "add-exhibit") {
      setLocation("");
      setAddress("");
      setDescription("");
      setImage("");
      setSelectedArtItems([]);
    }
  }, [exhibit, currentModal]);

  const handleToggleArtItem = (id) => {
    setSelectedArtItems((prev) =>
      prev.includes(id) ? prev.filter((artId) => artId !== id) : [...prev, id]
    );
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const exhibitData = {
      location,
      address,
      description,
      image,
      artItems: artItems.filter((art) => selectedArtItems.includes(art._id)),
    };

    try {
      if (currentModal === "add-exhibit" || currentModal === "edit-exhibit") {
        await onSaveExhibit(exhibitData);
      }
      resetForm();
      closeModal();
    } catch (err) {
      console.error("Failed to save exhibit:", err);
    }
  };

  const resetForm = () => {
    setLocation("");
    setAddress("");
    setDescription("");
    setImage("");
    setSelectedArtItems([]);
  };

  const modalTitle =
    currentModal === "add-exhibit" ? "Add New Exhibit" : "Edit Exhibit";
  const buttonText =
    currentModal === "add-exhibit" ? "Add Exhibit" : "Save Exhibit";

  return (
    <div
      className={`modal ${
        currentModal === "add-exhibit" || currentModal === "edit-exhibit"
          ? "modal__opened"
          : ""
      }`}
    >
      <div className="modal__content add-exhibit-modal">
        <button className="modal__close-button" onClick={closeModal}>
          &times;
        </button>
        <h2 className="modal__title">{modalTitle}</h2>

        <form className="add-exhibit__form" onSubmit={handleSubmit}>
          <label className="add-exhibit__input-label">
            Location:
            <input
              type="text"
              className="add-exhibit__input"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              required
            />
          </label>

          <label className="add-exhibit__input-label">
            Address:
            <input
              type="text"
              className="add-exhibit__input"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              required
            />
          </label>

          <label className="add-exhibit__input-label">
            Description:
            <textarea
              className="add-exhibit__textarea"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              required
            />
          </label>

          <label className="add-exhibit__input-label">
            Main Image URL:
            <input
              type="text"
              className="add-exhibit__input"
              value={image}
              onChange={(e) => setImage(e.target.value)}
              required
            />
          </label>

          <h3 className="add-exhibit__section-title">Include Art Items</h3>
          <div className="add-exhibit__art-items-container">
            {artItems.map((art) => (
              <label key={art._id} className="add-exhibit__checkbox-label">
                <input
                  type="checkbox"
                  checked={selectedArtItems.includes(art._id)}
                  onChange={() => handleToggleArtItem(art._id)}
                  className="add-exhibit__checkbox"
                />
                {art.title}
              </label>
            ))}
          </div>

          <button type="submit" className="modal__submit">
            {buttonText}
          </button>
        </form>
      </div>
    </div>
  );
}

export default AddExhibitModal;
