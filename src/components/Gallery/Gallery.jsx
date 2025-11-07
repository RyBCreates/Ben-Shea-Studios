import { useState, useEffect } from "react";
import { fetchArtItems } from "../../utils/api";
import ItemCard from "../ItemCard/ItemCard";

import "./Gallery.css";

function Gallery({ onAddToCart, cartList }) {
  const [activeTab, setActiveTab] = useState("all");
  const [artItems, setArtItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filteredArt, setFilteredArt] = useState(artItems);

  useEffect(() => {
    fetchArtItems()
      .then(setArtItems)
      .catch((err) => console.error("Error fetching art items:", err))
      .finally(() => setLoading(false));
  }, []);

  useEffect(() => {
    setFilteredArt(artItems);
  }, [artItems]);

  if (loading) return <p>Loading artwork...</p>;

  const handleTabClick = (tab) => {
    setActiveTab(tab);
    if (tab === "all") {
      setFilteredArt(artItems);
    } else {
      setFilteredArt(artItems.filter((art) => art.category === tab));
    }
  };

  return (
    <div className="gallery" id="gallery">
      {/* <ul className="gallery__tabs">
        <li className="gallery__tab">
          <button
            className="gallery__tab-button"
            onClick={() => {
              handleTabClick("all");
            }}
          >
            All Art
          </button>
        </li>
        <li className="gallery__tab">
          <button
            className="gallery__tab-button"
            onClick={() => {
              handleTabClick("20x30");
            }}
          >
            Landscapes
          </button>
        </li>
        <li className="gallery__tab">
          <button
            className="gallery__tab-button"
            onClick={() => {
              handleTabClick("24x36");
            }}
          >
            Abstracts
          </button>
        </li>
        <li className="gallery__tab">
          <button
            className="gallery__tab-button"
            onClick={() => {
              handleTabClick("30x40");
            }}
          >
            People
          </button>
        </li>
        <li className="gallery__tab">
          <button
            className="gallery__tab-button"
            onClick={() => {
              handleTabClick("30x40");
            }}
          >
            Pets
          </button>
        </li>
        <li className="gallery__tab">
          <button
            className="gallery__tab-button"
            onClick={() => {
              handleTabClick("30x40");
            }}
          >
            Sketches
          </button>
        </li>
        <li className="gallery__tab">
          <button
            className="gallery__tab-button"
            onClick={() => {
              handleTabClick("30x40");
            }}
          >
            Photography
          </button>
        </li>
        <li className="gallery__tab">
          <button
            className="gallery__tab-button"
            onClick={() => {
              handleTabClick("30x40");
            }}
          >
            Prints
          </button>
        </li>
      </ul> */}
      <ul className="gallery__tabs">
        {[
          "all",
          "landscape",
          "abstract",
          "people",
          "pets",
          "sketch",
          "photo",
          "print",
        ].map((tab) => (
          <li className="gallery__tab" key={tab}>
            <button
              className={`gallery__tab-button ${
                activeTab === tab ? "active" : ""
              }`}
              onClick={() => handleTabClick(tab)}
            >
              {tab === "all"
                ? "All Art"
                : tab.charAt(0).toUpperCase() + tab.slice(1)}
            </button>
          </li>
        ))}
      </ul>
      <div className="gallery__content">
        <div className="gallery__content-container">
          {filteredArt.map((art) => (
            <ItemCard
              key={art._id}
              artItem={art}
              onAddToCart={onAddToCart}
              variant="default"
              cartList={cartList}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

export default Gallery;
