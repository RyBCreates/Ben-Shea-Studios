import { useState, useEffect } from "react";

import { uploadImages } from "../../../utils/api/index";

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
  const [imageUrlInput, setImageUrlInput] = useState("");
  const [imageUrls, setImageUrls] = useState([]);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadError, setUploadError] = useState(null);

  const [original, setOriginal] = useState({ price: "", dimensions: "" });
  const [prints, setPrints] = useState([{ price: "", dimensions: "" }]);
  const [categories, setCategories] = useState([]);

  const handleFileSelect = async (e) => {
    const files = Array.from(e.target.files);
    if (!files.length) return;

    setIsUploading(true);
    setUploadError(null);

    try {
      const uploadedUrls = await uploadImages(files);
      setImageUrls((prev) => [...prev, ...uploadedUrls]);
    } catch (err) {
      console.error(err);
      setUploadError("Failed to upload images");
    } finally {
      setIsUploading(false);
      e.target.value = "";
    }
  };

  const handleAddImageUrl = () => {
    if (!imageUrlInput.trim()) return;

    setImageUrls((prev) => [...prev, imageUrlInput.trim()]);
    setImageUrlInput("");
  };

  const handleRemoveImage = (index) => {
    setImageUrls((prev) => prev.filter((_, i) => i !== index));
  };

  const handleCategoryToggle = (category) =>
    setCategories((prev) =>
      prev.includes(category)
        ? prev.filter((cat) => cat !== category)
        : [...prev, category]
    );

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

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (isUploading) return;

    const artData = {
      title,
      description,
      images: imageUrls,
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
      } else {
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
    setImageUrls([]);
    setOriginal({ price: "", dimensions: "" });
    setPrints([{ price: "", dimensions: "" }]);
    setCategories([]);
    setUploadError(null);
  };

  useEffect(() => {
    if (currentModal === "edit-art" && artItem) {
      setTitle(artItem.title || "");
      setDescription(artItem.description || "");
      setImageUrls(artItem.images || []);
      setOriginal({
        price: artItem.original?.price || "",
        dimensions: artItem.original?.dimensions || "",
      });
      setPrints(
        artItem.prints?.length
          ? artItem.prints.map((p) => ({
              price: p.price ?? "",
              dimensions: p.size ?? "",
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

        <form className="art-form" onSubmit={handleSubmit}>
          {/* TITLE */}
          <label className="art-form__field">
            <span className="art-form__label">Title</span>
            <input
              className="art-form__input"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />
          </label>

          {/* DESCRIPTION */}
          <label className="art-form__field">
            <span className="art-form__label">Description</span>
            <textarea
              className="art-form__textarea"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              required
            />
          </label>

          {/* IMAGES */}
          <section className="art-form__section">
            <h3 className="art-form__section-title">Images</h3>

            <input
              type="file"
              multiple
              accept="image/*"
              onChange={handleFileSelect}
              disabled={isUploading}
              className="art-form__file-input"
            />

            {isUploading && (
              <p className="art-form__status">Uploading images…</p>
            )}
            {uploadError && <p className="art-form__error">{uploadError}</p>}

            <div className="art-form__image-grid">
              {imageUrls.map((url, index) => (
                <div key={url} className="art-form__image">
                  <img src={url} alt="art preview" />
                  <button
                    type="button"
                    className="art-form__image-remove"
                    onClick={() => handleRemoveImage(index)}
                  >
                    ✕
                  </button>
                </div>
              ))}
            </div>

            {/* IMAGE URL */}
            <div className="art-form__url-input">
              <input
                type="url"
                placeholder="Paste image URL"
                value={imageUrlInput}
                onChange={(e) => setImageUrlInput(e.target.value)}
                className="art-form__input"
              />
              <button
                type="button"
                className="art-form__button art-form__button--secondary"
                onClick={handleAddImageUrl}
              >
                Add URL
              </button>
            </div>
          </section>

          {/* CATEGORIES */}
          <section className="art-form__section">
            <h3 className="art-form__section-title">Categories</h3>
            <div className="art-form__checkbox-grid">
              {CATEGORY_OPTIONS.map((cat) => (
                <label key={cat} className="art-form__checkbox">
                  <input
                    type="checkbox"
                    checked={categories.includes(cat)}
                    onChange={() => handleCategoryToggle(cat)}
                  />
                  {cat}
                </label>
              ))}
            </div>
          </section>

          {/* ORIGINAL */}
          <section className="art-form__section art-form__section--boxed">
            <h4 className="art-form__subsection-title">Original</h4>
            <div className="art-form__row">
              <input
                type="number"
                placeholder="Price"
                value={original.price}
                onChange={(e) =>
                  setOriginal({ ...original, price: e.target.value })
                }
                required
                className="art-form__input"
              />
              <input
                type="text"
                placeholder="Dimensions"
                value={original.dimensions}
                onChange={(e) =>
                  setOriginal({ ...original, dimensions: e.target.value })
                }
                required
                className="art-form__input"
              />
            </div>
          </section>

          {/* PRINTS */}
          <section className="art-form__section art-form__section--boxed">
            <h4 className="art-form__subsection-title">Prints</h4>

            {prints.map((print, index) => (
              <div key={index} className="art-form__row">
                <input
                  type="number"
                  placeholder="Price"
                  value={print.price}
                  onChange={(e) =>
                    handlePrintChange(index, "price", e.target.value)
                  }
                  required
                  className="art-form__input"
                />
                <input
                  type="text"
                  placeholder="Dimensions"
                  value={print.dimensions}
                  onChange={(e) =>
                    handlePrintChange(index, "dimensions", e.target.value)
                  }
                  required
                  className="art-form__input"
                />

                {prints.length > 1 && (
                  <button
                    type="button"
                    className="art-form__button art-form__button--danger"
                    onClick={() => handleRemovePrint(index)}
                  >
                    Remove
                  </button>
                )}
              </div>
            ))}

            <button
              type="button"
              className="art-form__button art-form__button--secondary"
              onClick={handleAddPrint}
            >
              + Add Another Print
            </button>
          </section>

          <button
            type="submit"
            className="art-form__submit"
            disabled={isUploading || imageUrls.length === 0}
          >
            {buttonText}
          </button>
        </form>
      </div>
    </div>
  );
}

export default AddArtItemModal;
