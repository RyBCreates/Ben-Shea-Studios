import "./Hero.css";

function Hero({ onGetDiscountClick }) {
  return (
    <section className="hero">
      <div className="hero__background"></div>
      <div className="hero__content">
        <div>
          <h2 className="hero__title">
            Experience Art in <span className="hero__title_style">Color.</span>
          </h2>
          <p className="hero__subtitle">
            Original artwork available for purchase
          </p>
        </div>
        <div className="hero__button-container">
          <button
            className="hero__button hero__button_main"
            onClick={() => {
              onGetDiscountClick();
            }}
          >
            Get a Discount
          </button>
          <button
            className="hero__button hero__button_secondary"
            onClick={() => {
              const section = document.getElementById("gallery");
              if (section) {
                section.scrollIntoView({ behavior: "smooth" });
              }
            }}
          >
            Start Shopping!
          </button>
        </div>
      </div>
    </section>
  );
}

export default Hero;
