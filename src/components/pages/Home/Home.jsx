import Hero from "../../Hero/Hero";
import Gallery from "../../Gallery/Gallery";

import "./Home.css";

function Home({ onAddToCart }) {
  return (
    <section>
      <Hero />
      <Gallery onAddToCart={onAddToCart} />
    </section>
  );
}

export default Home;
