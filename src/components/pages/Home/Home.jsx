import Hero from "../../Hero/Hero";
import Gallery from "../../Gallery/Gallery";

import "./Home.css";

function Home({ onAddToCart, onGetDiscountClick, cartList }) {
  return (
    <section className="home">
      <Hero onGetDiscountClick={onGetDiscountClick} />
      <Gallery onAddToCart={onAddToCart} cartList={cartList} />
    </section>
  );
}

export default Home;
