import Hero from "../../Hero/Hero";
import Gallery from "../../Gallery/Gallery";

import "./Home.css";

function Home({
  onAddToCart,
  onGetDiscountClick,
  cartList,
  artItems,
  artItemsLoading,
}) {
  return (
    <section className="home">
      <Hero onGetDiscountClick={onGetDiscountClick} />
      <Gallery
        onAddToCart={onAddToCart}
        cartList={cartList}
        artItems={artItems}
        artItemsLoading={artItemsLoading}
      />
    </section>
  );
}

export default Home;
