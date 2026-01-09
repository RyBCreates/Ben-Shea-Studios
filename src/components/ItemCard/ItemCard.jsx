import { useState } from "react";

import leftArrow from "../../assets/icons/left-arrow.png";
import rightArrow from "../../assets/icons/right-arrow.png";

import "./ItemCard.css";

function ItemCard({
  cartList,
  artItem,
  onAddToCart,
  variant,
  handleDeleteArtClick,
  handleEditArtClick,
}) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedVersion, setSelectedVersion] = useState("original");
  const [selectedPrintIndex, setSelectedPrintIndex] = useState(0);

  if (!artItem || !artItem.images || artItem.images.length === 0) return null;

  const images = artItem.images;

  const handleClickAdd = () => {
    let itemToAdd;
    if (selectedVersion === "original") {
      if (artItem.original.sold) return;
      itemToAdd = {
        _id: artItem._id,
        title: artItem.title,
        version: "original",
        price: artItem.original.price,
        dimensions: artItem.original.dimensions,
        image: images[0],
      };
    } else {
      const printOption = artItem.prints[selectedPrintIndex];
      itemToAdd = {
        _id: artItem._id,
        title: artItem.title,
        version: "print",
        price: printOption.price,
        dimensions: printOption.size,
        image: images[0],
      };
    }
    onAddToCart(itemToAdd);
  };

  const goPrev = () =>
    setCurrentIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  const goNext = () =>
    setCurrentIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));

  // Disable Add button if original sold or already in cart
  const isOriginalInCart = cartList?.some(
    (item) => item._id === artItem._id && item.version === "original"
  );
  const isDisabled =
    selectedVersion === "original" &&
    (artItem.original.sold || isOriginalInCart);

  const buttonLabel =
    selectedVersion === "original"
      ? artItem.original.sold
        ? "SOLD OUT"
        : isOriginalInCart
        ? "Already in Cart"
        : "Add to Cart"
      : "Add to Cart";

  return (
    <div className="card">
      <div className="card__content">
        <img
          className="card__image"
          src={images[currentIndex] || ""}
          alt={artItem.title}
        />
      </div>

      {images.length > 1 && (
        <div className="card__pages">
          <button className="card__arrow" onClick={goPrev}>
            <img className="card__arrow-icon" src={leftArrow} alt="previous" />
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
            <img className="card__arrow-icon" src={rightArrow} alt="next" />
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
                  type="radio"
                  name={`version-${artItem._id}`}
                  value="original"
                  checked={selectedVersion === "original"}
                  onChange={() => setSelectedVersion("original")}
                  disabled={artItem.original.sold}
                />
                <h3 className="card__type">Original - </h3>
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

          {artItem.prints.map((print, index) => (
            <li key={index} className="card__detail">
              <label className="card__detail-label">
                <div className="card__type-container">
                  <input
                    type="radio"
                    name={`version-${artItem._id}`}
                    value="print"
                    checked={
                      selectedVersion === "print" &&
                      selectedPrintIndex === index
                    }
                    onChange={() => {
                      setSelectedVersion("print");
                      setSelectedPrintIndex(index);
                    }}
                  />
                  <h3 className="card__type">Print - </h3>
                  <strong className="card__type card__type_price">
                    ${print.price}.00
                  </strong>
                </div>
                <em className="card__type card__type_size">
                  Size {print.size}
                </em>
              </label>
            </li>
          ))}
        </ul>
      </div>

      {variant === "default" ? (
        <button
          className={`card__add-button ${
            isDisabled ? "card__add-button_disabled" : ""
          }`}
          onClick={handleClickAdd}
          disabled={isDisabled}
        >
          {buttonLabel}
        </button>
      ) : (
        <div className="card__button-container">
          <button
            className="card__edit-button"
            onClick={() => handleEditArtClick(artItem)}
          >
            Edit
          </button>
          <button
            className="card__delete-button"
            onClick={() => handleDeleteArtClick(artItem)}
          >
            Delete
          </button>
        </div>
      )}
    </div>
  );
}

export default ItemCard;
