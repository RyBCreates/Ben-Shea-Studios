import "./ExhibitCard.css";

function ExhibitCard({ exhibit }) {
  return (
    <li className="exhibit-card" key={exhibit._id}>
      <div className="exhibit-card__info">
        <h2 className="exhibit-card__title">{exhibit.location}</h2>
        <p className="exhibit-card__subtitle">{exhibit.description}</p>
      </div>
      <img className="exhibit-card__image" src={exhibit.image} alt="downtown" />
    </li>
  );
}

export default ExhibitCard;
