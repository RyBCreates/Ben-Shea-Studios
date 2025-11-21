import { useState, useEffect } from "react";
import "./AddArtItemModal.css";
import "../Modals.css";

const CATEGORY_OPTIONS = [
  "landscape",
  "abstract",
  "people",
  "pets",
  "sketch",
  "photo",
  "print",
];

function AddArtItemModal({
  currentModal,
  closeModal,
  onAddArt,
  artItem,
  onUpdateArt,
}) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [imageUrls, setImageUrls] = useState([""]);
  const [originalPrice, setOriginalPrice] = useState("");
  const [originalDimensions, setOriginalDimensions] = useState("");
  const [printPrice, setPrintPrice] = useState("");
  const [printDimensions, setPrintDimensions] = useState("");
  const [categories, setCategories] = useState([]);

  const handleAddImageField = () => {
    setImageUrls([...imageUrls, ""]);
  };

  const handleImageChange = (index, value) => {
    const newImages = [...imageUrls];
    newImages[index] = value;
    setImageUrls(newImages);
  };

  const handleCategoryToggle = (category) => {
    setCategories((prev) =>
      prev.includes(category)
        ? prev.filter((categories) => categories !== category)
        : [...prev, category]
    );
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const artData = {
      title,
      description,
      images: imageUrls.filter((url) => url.trim() !== ""),
      categories,
      original: {
        price: Number(originalPrice),
        sold: artItem?.original?.sold || false,
        dimensions: originalDimensions,
      },
      print: {
        price: Number(printPrice),
        sold: artItem?.print?.sold || false,
        dimensions: printDimensions,
      },
    };
    try {
      if (currentModal === "add-art") {
        await onAddArt(artData);
      } else if (currentModal === "edit-art") {
        await onUpdateArt({ ...artData, _id: artItem._id });
      }

      resetForm();
      closeModal();
    } catch (err) {
      console.error("Error submitting art item", err);
    }
  };

  const resetForm = () => {
    setTitle("");
    setDescription("");
    setImageUrls([""]);
    setOriginalPrice("");
    setOriginalDimensions("");
    setPrintPrice("");
    setPrintDimensions("");
    setCategories([]);
  };

  useEffect(() => {
    if (currentModal === "edit-art" && artItem) {
      setTitle(artItem.title || "");
      setDescription(artItem.description || "");
      setImageUrls(artItem.images?.length ? artItem.images : [""]);
      setOriginalPrice(artItem.original?.price || "");
      setOriginalDimensions(artItem.original?.dimensions || "");
      setPrintPrice(artItem.print?.price || "");
      setPrintDimensions(artItem.print?.dimensions || "");
      setCategories(artItem.categories || []);
    } else if (currentModal === "add-art") {
      setTitle("");
      setDescription("");
      setImageUrls([""]);
      setOriginalPrice("");
      setOriginalDimensions("");
      setPrintPrice("");
      setPrintDimensions("");
    }
  }, [artItem, currentModal]);

  let modalTitle = "";
  let buttonText = "";

  if (currentModal === "add-art") {
    modalTitle = "Add a new art item";
    buttonText = "Add Art Item";
  } else if (currentModal === "edit-art") {
    modalTitle = "edit an art item";
    buttonText = "Save Art Item";
  }

  return (
    <div
      className={`modal ${
        currentModal === "add-art" || currentModal === "edit-art"
          ? "modal__opened"
          : ""
      }`}
    >
      <div className="modal__content add-art-modal">
        <button className="modal__close-button" onClick={closeModal}>
          &times;
        </button>
        <h2 className="modal__title">{modalTitle}</h2>

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
          <h3>Categories</h3>
          <div className="categories-container">
            {CATEGORY_OPTIONS.map((cat) => (
              <label key={cat} className="category-checkbox">
                <input
                  type="checkbox"
                  checked={categories.includes(cat)}
                  onChange={() => handleCategoryToggle(cat)}
                />
                {cat.charAt(0).toUpperCase() + cat.slice(1)}
              </label>
            ))}
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
            {buttonText}
          </button>
        </form>
      </div>
    </div>
  );
}

export default AddArtItemModal;
