import Hero from "../../Hero/Hero";
import Gallery from "../../Gallery/Gallery";

import "./Home.css";

function Home({ onAddToCart, onGetDiscountClick }) {
  return (
    <section className="home">
      <Hero onGetDiscountClick={onGetDiscountClick} />
      <Gallery onAddToCart={onAddToCart} />
    </section>
  );
}

export default Home;
