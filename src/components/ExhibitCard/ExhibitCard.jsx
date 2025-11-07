import "./ExhibitCard.css";

function ExhibitCard({ exhibit, variant = "default" }) {
  const handleDeleteCardClick = () => {};
  const handleEditCardClick = () => {};

  return (
    <li className="exhibit-card" key={exhibit._id}>
      <div className="exhibit-card__info">
        <h2 className="exhibit-card__title">{exhibit.location}</h2>
        <p className="exhibit-card__subtitle">{exhibit.description}</p>
      </div>
      <img className="exhibit-card__image" src={exhibit.image} alt="downtown" />
      {variant === "admin" ? (
        <div className="exhibit-card__button-container">
          <button
            className="exhibit-card__edit-button"
            onClick={() => {
              handleEditCardClick(card);
            }}
          >
            Edit
          </button>
          <button
            className="exhibit-card__delete-button"
            onClick={() => {
              handleDeleteCardClick(card);
            }}
          >
            Delete
          </button>
        </div>
      ) : (
        ""
      )}
    </li>
  );
}

export default ExhibitCard;
