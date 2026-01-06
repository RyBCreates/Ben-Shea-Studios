import "./ExhibitCard.css";

function ExhibitCard({ exhibit, variant = "default" }) {
  const handleDeleteCardClick = () => {};
  const handleEditCardClick = () => {};

  return (
    <li
      className={`exhibit-card ${
        variant === "admin" ? "exhibit-card--admin" : ""
      }`}
    >
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
    </li>
  );
}

export default ExhibitCard;
