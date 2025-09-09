import downtown from "../../../assets/exhibits-bg.png";
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
      <div className="exhibit-card">
        <div className="exhibit-card__info">
          <h2 className="exhibit-card__title">Downtown</h2>
          <p className="exhibit-card__subtitle">
            Our Downtown location features a modern collection of abstract and
            contemporary art.
          </p>
        </div>
        <img className="exhibit-card__image" src={downtown} alt="downtown" />
      </div>
      <div className="exhibit-card">
        <div className="exhibit-card__info">
          <h2 className="exhibit-card__title">Uptown</h2>
          <p className="exhibit-card__subtitle">
            The Uptown exhibit showcases colorful and vibrant artworks by local
            artists.
          </p>
        </div>
        <img className="exhibit-card__image" src={downtown} alt="downtown" />
      </div>
      <div className="exhibit-card">
        <div className="exhibit-card__info">
          <h2 className="exhibit-card__title">Midtown</h2>
          <p className="exhibit-card__subtitle">
            At our Midtown gallery, you'll find classical and traditional
            pieces, including portraits and landscapes.
          </p>
        </div>
        <img className="exhibit-card__image" src={downtown} alt="downtown" />
      </div>
    </section>
  );
}

export default Exhibits;
