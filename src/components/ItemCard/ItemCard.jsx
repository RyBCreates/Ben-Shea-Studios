import { useState } from "react";

import leftArrow from "../../assets/icons/left-arrow.png";
import rightArrow from "../../assets/icons/right-arrow.png";

import "./ItemCard.css";

function ItemCard({ mockArt, onAddToCart }) {
  const [currentIndex, setCurrentIndex] = useState(0);

  const handleClickAdd = () => {
    onAddToCart(mockArt);
  };

  const images = mockArt.images;

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
          src={images[currentIndex]}
          alt={mockArt.title}
        />
      </div>
      <div className="card__pages">
        {images.length > 1 ? (
          <>
            {images.length > 1 && (
              <button className="card__arrow" onClick={goPrev}>
                <img
                  className="card__arrow-icon"
                  src={leftArrow}
                  alt="left arrow"
                />
              </button>
            )}
            {images.map((_, index) => (
              <button
                key={index}
                className={`card__pages-indicator ${
                  index === currentIndex ? "card__pages-indicator_active" : ""
                }`}
                onClick={() => setCurrentIndex(index)}
              ></button>
            ))}
            {images.length > 1 && (
              <button className="card__arrow" onClick={goNext}>
                <img
                  className="card__arrow-icon"
                  src={rightArrow}
                  alt="right arrow"
                />
              </button>
            )}
          </>
        ) : (
          <></>
        )}
      </div>
      <div className="card__info">
        <h2 className="card__title">{mockArt.title}</h2>
        <ul className="card__details">
          <li className="card__detail">
            <p className="card__detail_type">Original -</p>
            <p className="card__detail_price">
              <strong>${mockArt.original.price}.00</strong>
            </p>
            <p className="card__detail_size">
              <em>Size {mockArt.original.dimensions}</em>
            </p>
            {mockArt.original.sold && <p className="card__detail_sold">SOLD</p>}
          </li>
          <li className="card__detail">
            <p className="card__detail_type">Print -</p>
            <p className="card__detail_price">
              <strong>${mockArt.print.price}.00</strong>
            </p>
            <p className="card__detail_size">
              <em>Size {mockArt.print.dimensions}</em>
            </p>
          </li>
        </ul>
      </div>

      <button className="card__add-button" onClick={handleClickAdd}>
        Add to Cart
      </button>
    </div>
  );
}

export default ItemCard;
