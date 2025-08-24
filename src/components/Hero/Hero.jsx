import "./Hero.css";

function Hero() {
  return (
    <section className="hero">
      <div>
        <div>
          <h2 className="hero__title">
            Art is <span className="hero__title_bold">Cool.</span>
          </h2>
          <p className="hero__subtitle">Buy this ART, because it's cool.</p>
        </div>
        <div className="hero__button-container">
          <button className="hero__button hero__button_main">
            Get a Discount
          </button>
          <button className="hero__button hero__button_secondary">
            Start Shopping!
          </button>
        </div>
      </div>
    </section>
  );
}

export default Hero;
