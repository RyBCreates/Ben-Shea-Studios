import leftArrow from "../../assets/icons/left-arrow.png";
import rightArrow from "../../assets/icons/right-arrow.png";

import "./ItemCard.css";

function ItemCard() {
  return (
    <div className="card">
      <div className="card__content">
        <button className="card__arrow">
          <img className="card__arrow-icon" src={leftArrow}></img>
        </button>
        <img
          className="card__image"
          src="https://drive.google.com/uc?export=view&id=1lFyIh3qHN60iqa8AQyjClXPzyHj2CN3J"
          alt="Artwork"
        />
        <button className="card__arrow">
          <img className="card__arrow-icon" src={rightArrow}></img>
        </button>
      </div>
      <div className="card__pages">
        <button className="card__pages-indicator card__pages-indicator_active"></button>
        <button className="card__pages-indicator"></button>
        <button className="card__pages-indicator"></button>
      </div>
      <div className="card__info">
        <h2 className="card__title">The Colors of Humanity</h2>
        <ul className="card__details">
          <li className="card__detail">
            <p className="card__detail_type">Original -</p>
            <p className="card__detail_price">
              <strong>$100.00</strong>
            </p>
            <p className="card__detail_size">
              <em>Size 5' x 9'</em>
            </p>
          </li>
          <li className="card__detail">
            <p className="card__detail_type">Print -</p>
            <p className="card__detail_price">
              <strong>$80.00</strong>
            </p>
            <p className="card__detail_size">
              <em>Size 4' x 5'</em>
            </p>
          </li>
        </ul>
      </div>
      <button className="card__add-button">Add to Cart</button>
    </div>
  );
}

export default ItemCard;
