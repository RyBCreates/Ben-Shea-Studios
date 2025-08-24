import Header from "../Header/Header";
import Hero from "../Hero/Hero";
import Footer from "../Footer/Footer";
import "./App.css";

function App() {
  return (
    <div className="app">
      <div className="app__content">
        <Header />
        <Hero />
        <Footer />
      </div>
    </div>
  );
}

export default App;
