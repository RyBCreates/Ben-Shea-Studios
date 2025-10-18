import { useState } from "react";

import leftArrow from "../../assets/icons/left-arrow.png";
import rightArrow from "../../assets/icons/right-arrow.png";

import "./ItemCard.css";

function ItemCard({
  artItem,
  onAddToCart,
  variant,
  handleDeleteArtClick,
  handleEditArtClick,
}) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedVersion, setSelectedVersion] = useState("original");

  if (!artItem || !artItem.images || artItem.images.length === 0) return null;

  const images = artItem.images;

  const handleClickAdd = () => {
    const selectedItem = {
      _id: artItem._id,
      title: artItem.title,
      version: selectedVersion,
      price: artItem[selectedVersion]?.price,
      dimensions: artItem[selectedVersion].dimensions,
      image: images[0],
    };
    onAddToCart(selectedItem);
  };

  const goPrev = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? images.length - 1 : prevIndex - 1
    );
  };

  const goNext = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === images.length - 1 ? 0 : prevIndex + 1
    );
  };

  return (
    <div className="card">
      <div className="card__content">
        <img
          className="card__image"
          src={images[currentIndex] || ""}
          alt={artItem.title || "artwork"}
        />
      </div>

      {images.length > 1 && (
        <div className="card__pages">
          <button className="card__arrow" onClick={goPrev}>
            <img
              className="card__arrow-icon"
              src={leftArrow}
              alt="left arrow"
            />
          </button>

          {images.map((_, index) => (
            <button
              key={index}
              className={`card__pages-indicator ${
                index === currentIndex ? "card__pages-indicator_active" : ""
              }`}
              onClick={() => setCurrentIndex(index)}
            />
          ))}

          <button className="card__arrow" onClick={goNext}>
            <img
              className="card__arrow-icon"
              src={rightArrow}
              alt="right arrow"
            />
          </button>
        </div>
      )}

      <div className="card__info">
        <h2 className="card__title">{artItem.title}</h2>
        <ul className="card__details">
          <li className="card__detail">
            <label className="card__detail-label">
              <div className="card__type-container">
                <input
                  className="card__radio-button"
                  type="radio"
                  name={`version-${artItem._id}`}
                  value="original"
                  checked={selectedVersion === "original"}
                  onChange={(e) => setSelectedVersion(e.target.value)}
                  disabled={artItem.original.sold}
                />
                <h3 className="card__type">Original -</h3>
                {artItem.original.sold ? (
                  <p className="card__type card__type_sold">SOLD OUT</p>
                ) : (
                  <strong className="card__type card__type_price">
                    ${artItem.original.price}.00
                  </strong>
                )}
              </div>
              <em className="card__type card__type_size">
                Size {artItem.original.dimensions}
              </em>
            </label>
          </li>

          <li className="card__detail">
            <label className="card__detail-label">
              <div className="card__type-container">
                <input
                  className="card__radio-button"
                  type="radio"
                  name={`version-${artItem._id}`}
                  value="print"
                  checked={selectedVersion === "print"}
                  onChange={(e) => setSelectedVersion(e.target.value)}
                />
                <h3 className="card__type">Print -</h3>
                <strong className="card__type card__type_price">
                  ${artItem.print.price}.00
                </strong>
              </div>
              <em className="card__type card__type_size">
                Size {artItem.print.dimensions}
              </em>
            </label>
          </li>
        </ul>
      </div>
      {variant === "default" ? (
        <button
          className="card__add-button"
          onClick={handleClickAdd}
          disabled={artItem[selectedVersion]?.sold}
        >
          Add to Cart
        </button>
      ) : (
        <div className="card__button-container">
          <button
            className="card__edit-button"
            onClick={() => {
              handleEditArtClick(artItem);
            }}
          >
            Edit
          </button>
          <button
            className="card__delete-button"
            onClick={() => {
              handleDeleteArtClick(artItem);
            }}
          >
            Delete
          </button>
        </div>
      )}
    </div>
  );
}

export default ItemCard;
