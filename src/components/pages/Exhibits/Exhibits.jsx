import { mockExhibit } from "../../../utils/mockData/mockExhibits";
import ExhibitCard from "../../ExhibitCard/ExhibitCard";
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
      <ul className="exhibits__list">
        {mockExhibit.map((exhibit) => (
          <ExhibitCard exhibit={exhibit} key={exhibit._id} variant="default" />
        ))}
      </ul>
    </section>
  );
}

export default Exhibits;
