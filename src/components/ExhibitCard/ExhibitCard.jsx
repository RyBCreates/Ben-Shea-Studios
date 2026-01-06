import { useState } from "react";
import "./ExhibitCard.css";

function ExhibitCard({ exhibit, variant = "default" }) {
  const [isOpen, setIsOpen] = useState(false);

  const handleCardClick = () => {
    setIsOpen((prev) => !prev);
  };

  const handleDeleteCardClick = () => {};
  const handleEditCardClick = () => {};

  return (
    <li
      className={`exhibit-card ${
        variant === "admin" ? "exhibit-card__admin" : ""
      } ${isOpen ? "exhibit-card__open" : ""}`}
      onClick={handleCardClick}
    >
      {/* TOP ROW (image + info) */}
      <div className="exhibit-card__main">
        {variant === "admin" && (
          <div className="exhibit-card__admin-controls">
            <button
              className="exhibit-card__icon-btn"
              onClick={(e) => {
                e.stopPropagation();
                handleEditCardClick(exhibit);
              }}
            >
              ✏️
            </button>
            <button
              className="exhibit-card__icon-btn"
              onClick={(e) => {
                e.stopPropagation();
                handleDeleteCardClick(exhibit);
              }}
            >
              🗑
            </button>
          </div>
        )}

        <div className="exhibit-card__info">
          <div>
            <h2 className="exhibit-card__title">{exhibit.location}</h2>
            <p className="exhibit-card__subtitle">{exhibit.description}</p>
          </div>
          <div className="exhibit-card__address-container">
            <p className="exhibit-card__address">{exhibit.address}</p>
          </div>
        </div>

        <img
          className="exhibit-card__image"
          src={exhibit.image}
          alt={exhibit.location}
        />
      </div>

      {/* DROPDOWN */}
      <div className="exhibit-card__artwork">
        <div className="exhibit-card__artwork-track">
          {exhibit.artItems.map((art) => (
            <div
              key={art._id}
              className={`exhibit-card__artwork-item ${
                art.original.sold ? "is-sold" : ""
              }`}
              onClick={(e) => e.stopPropagation()}
            >
              <img
                src={art.images[0]}
                alt={art.title}
                className="exhibit-card__artwork-image"
              />
              {art.original.sold && (
                <span className="exhibit-card__artwork-badge">
                  Original Sold
                </span>
              )}
            </div>
          ))}
        </div>
      </div>
    </li>
  );
}

export default ExhibitCard;
