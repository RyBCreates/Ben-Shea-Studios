import { useState } from "react";
import "./AddArtItemModal.css";
import "../Modals.css";

function AddArtItemModal({ isAddArtModalOpen, closeModal, onAddArt }) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [imageUrls, setImageUrls] = useState([""]);
  const [originalPrice, setOriginalPrice] = useState("");
  const [originalDimensions, setOriginalDimensions] = useState("");
  const [printPrice, setPrintPrice] = useState("");
  const [printDimensions, setPrintDimensions] = useState("");

  const handleAddImageField = () => {
    setImageUrls([...imageUrls, ""]);
  };

  const handleImageChange = (index, value) => {
    const newImages = [...imageUrls];
    newImages[index] = value;
    setImageUrls(newImages);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const newArtItem = {
      title,
      description,
      images: imageUrls.filter((url) => url.trim() !== ""),
      original: {
        price: Number(originalPrice),
        sold: false,
        dimensions: originalDimensions,
      },
      print: {
        price: Number(printPrice),
        sold: false,
        dimensions: printDimensions,
      },
    };

    onAddArt(newArtItem);
    closeModal();
    setTitle("");
    setDescription("");
    setImageUrls([""]);
    setOriginalPrice("");
    setOriginalDimensions("");
    setPrintPrice("");
    setPrintDimensions("");
  };

  return (
    <div className={`modal ${isAddArtModalOpen ? "modal__opened" : ""}`}>
      <div className="modal__content add-art-modal">
        <button className="modal__button_close" onClick={closeModal}>
          &times;
        </button>
        <h2 className="modal__title">Add New Art Item</h2>

        <form className="modal__form" onSubmit={handleSubmit}>
          <label>
            Title:
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />
          </label>

          <label>
            Description:
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              required
            />
          </label>

          <div className="image-inputs">
            <label>Images:</label>
            {imageUrls.map((url, index) => (
              <input
                key={index}
                type="text"
                placeholder="Image URL"
                value={url}
                onChange={(e) => handleImageChange(index, e.target.value)}
                required={index === 0}
              />
            ))}
            <button
              type="button"
              className="add-image-btn"
              onClick={handleAddImageField}
            >
              + Add Another Image
            </button>
          </div>

          <h3>Original</h3>
          <label>
            Price:
            <input
              type="number"
              value={originalPrice}
              onChange={(e) => setOriginalPrice(e.target.value)}
              required
            />
          </label>
          <label>
            Dimensions:
            <input
              type="text"
              value={originalDimensions}
              onChange={(e) => setOriginalDimensions(e.target.value)}
              required
            />
          </label>

          <h3>Print</h3>
          <label>
            Price:
            <input
              type="number"
              value={printPrice}
              onChange={(e) => setPrintPrice(e.target.value)}
              required
            />
          </label>
          <label>
            Dimensions:
            <input
              type="text"
              value={printDimensions}
              onChange={(e) => setPrintDimensions(e.target.value)}
              required
            />
          </label>

          <button type="submit" className="modal__submit">
            Add Art Item
          </button>
        </form>
      </div>
    </div>
  );
}

export default AddArtItemModal;
