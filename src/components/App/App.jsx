import { useState } from "react";
import Header from "../Header/Header";
import Hero from "../Hero/Hero";
import Gallery from "../Gallery/Gallery";
import Footer from "../Footer/Footer";
import "./App.css";

function App() {
  const [cartList, setCartList] = useState([]);

  return (
    <div className="app">
      <div className="app__content">
        <Header cartList={cartList} />
        <Hero />
        <Gallery />
        <Footer />
      </div>
    </div>
  );
}

export default App;
