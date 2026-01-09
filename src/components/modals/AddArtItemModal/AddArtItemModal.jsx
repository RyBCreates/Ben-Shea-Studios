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
  const [original, setOriginal] = useState({ price: "", dimensions: "" });
  const [prints, setPrints] = useState([{ price: "", dimensions: "" }]);
  const [categories, setCategories] = useState([]);

  // --- Image handlers ---
  const handleAddImageField = () => setImageUrls([...imageUrls, ""]);
  const handleImageChange = (index, value) => {
    const newImages = [...imageUrls];
    newImages[index] = value;
    setImageUrls(newImages);
  };

  // --- Category handler ---
  const handleCategoryToggle = (category) =>
    setCategories((prev) =>
      prev.includes(category)
        ? prev.filter((cat) => cat !== category)
        : [...prev, category]
    );

  // --- Print handlers ---
  const handlePrintChange = (index, field, value) => {
    const newPrints = [...prints];
    newPrints[index][field] = value;
    setPrints(newPrints);
  };

  const handleAddPrint = () =>
    setPrints([...prints, { price: "", dimensions: "" }]);
  const handleRemovePrint = (index) => {
    if (prints.length === 1) return;
    setPrints(prints.filter((_, i) => i !== index));
  };

  // --- Submit handler ---
  const handleSubmit = async (e) => {
    e.preventDefault();

    const artData = {
      title,
      description,
      images: imageUrls.filter((url) => url.trim() !== ""),
      categories,
      original: {
        price: Number(original.price),
        sold: artItem?.original?.sold || false,
        dimensions: original.dimensions,
      },
      prints: prints.map((p) => ({
        price: Number(p.price),
        size: p.dimensions,
        available: true,
      })),
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

  // --- Reset form ---
  const resetForm = () => {
    setTitle("");
    setDescription("");
    setImageUrls([""]);
    setOriginal({ price: "", dimensions: "" });
    setPrints([{ price: "", dimensions: "" }]);
    setCategories([]);
  };

  // --- Load existing art for edit ---
  useEffect(() => {
    if (currentModal === "edit-art" && artItem) {
      setTitle(artItem.title || "");
      setDescription(artItem.description || "");
      setImageUrls(artItem.images?.length ? artItem.images : [""]);
      setOriginal({
        price: artItem.original?.price || "",
        dimensions: artItem.original?.dimensions || "",
      });
      setPrints(
        artItem.prints?.length
          ? artItem.prints.map((p) => ({
              price: p.price != null ? p.price : "",
              dimensions: p.size != null ? p.size : "",
            }))
          : [{ price: "", dimensions: "" }]
      );
      setCategories(artItem.categories || []);
    } else if (currentModal === "add-art") {
      resetForm();
    }
  }, [artItem, currentModal]);

  const modalTitle =
    currentModal === "add-art" ? "Add a New Art Item" : "Edit an Art Item";
  const buttonText =
    currentModal === "add-art" ? "Add Art Item" : "Save Art Item";

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
        <form className="add-art__form" onSubmit={handleSubmit}>
          <label className="add-art__input-label">
            Title:
            <input
              className="add-art__input"
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />
          </label>
          <label className="add-art__input-label">
            Description:
            <textarea
              className="add-art__textarea"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              required
            />
          </label>
          <div className="add-art__image-inputs">
            <label className="add-art__input-label">Images:</label>
            {imageUrls.map((url, index) => (
              <input
                key={index}
                className="add-art__input"
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
          <h3 className="add-art__section-title">Categories</h3>
          <div className="add-art__categories-container">
            {CATEGORY_OPTIONS.map((cat) => (
              <label key={cat} className="add-art__checkbox-label">
                <input
                  type="checkbox"
                  checked={categories.includes(cat)}
                  onChange={() => handleCategoryToggle(cat)}
                  className="add-art__checkbox"
                />
                {cat.charAt(0).toUpperCase() + cat.slice(1)}
              </label>
            ))}
          </div>
          <div className="add-art__types">
            <div className="add-art__type_original">
              <h4 className="add-art__subsection-title">Original</h4>
              <div className="add-art__type-details">
                <label className="add-art__input-label_price">
                  Price:
                  <input
                    className="add-art__input"
                    type="number"
                    value={original.price}
                    onChange={(e) =>
                      setOriginal({ ...original, price: e.target.value })
                    }
                    required
                  />
                </label>
                <label className="add-art__input-label_dimensions">
                  Dimensions:
                  <input
                    className="add-art__input"
                    type="text"
                    value={original.dimensions}
                    onChange={(e) =>
                      setOriginal({ ...original, dimensions: e.target.value })
                    }
                    required
                  />
                </label>
              </div>
            </div>
            <div className="add-art__type_print">
              <h4 className="add-art__subsection-title">Prints</h4>
              {prints.map((print, index) => (
                <div key={index} className="add-art__type-details">
                  <label className="add-art__input-label_price">
                    Price:
                    <input
                      className="add-art__input"
                      type="number"
                      value={print.price}
                      onChange={(e) =>
                        handlePrintChange(index, "price", e.target.value)
                      }
                      required
                    />
                  </label>
                  <label className="add-art__input-label_dimensions">
                    Dimensions:
                    <input
                      className="add-art__input"
                      type="text"
                      value={print.dimensions}
                      onChange={(e) =>
                        handlePrintChange(index, "dimensions", e.target.value)
                      }
                      required
                    />
                  </label>
                  {prints.length > 1 && (
                    <button
                      type="button"
                      className="remove-print-btn"
                      onClick={() => handleRemovePrint(index)}
                    >
                      Remove
                    </button>
                  )}
                </div>
              ))}
              <button
                type="button"
                className="add-print-btn"
                onClick={handleAddPrint}
              >
                + Add Another Print
              </button>
            </div>
          </div>
          <button type="submit" className="modal__submit">
            {buttonText}
          </button>
        </form>
      </div>
    </div>
  );
}

export default AddArtItemModal;
