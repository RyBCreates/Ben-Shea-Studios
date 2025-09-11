import { mockExhibit } from "../../../utils/mockExhibits";
import "./Exhibits.css";

function Exhibits() {
  return (
    <section className="exhibits">
      <div className="exhibits__hero">
        <h1 className="exhibits__title">Exhibits</h1>
        <p className="exhibits__subtitle">
          Explore current and upcoming exhibits featuring a diverse range of
          artwork.
        </p>
      </div>
      {mockExhibit.map((exhibit) => (
        <div className="exhibit-card">
          <div className="exhibit-card__info">
            <h2 className="exhibit-card__title">{exhibit.location}</h2>
            <p className="exhibit-card__subtitle">{exhibit.description}</p>
          </div>
          <img
            className="exhibit-card__image"
            src={exhibit.image}
            alt="downtown"
          />
        </div>
      ))}
    </section>
  );
}

export default Exhibits;
