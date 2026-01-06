import { useState, useEffect } from "react";
import ItemCard from "../ItemCard/ItemCard";

import "./Gallery.css";

function Gallery({ onAddToCart, cartList, artItems, artItemsLoading }) {
  const [activeTab, setActiveTab] = useState("all");
  const [filteredArt, setFilteredArt] = useState(artItems);

  useEffect(() => {
    setFilteredArt(artItems);
  }, [artItems]);

  if (artItemsLoading) return <p>Loading artwork...</p>;

  const handleTabClick = (tab) => {
    setActiveTab(tab);

    if (tab === "all") {
      setFilteredArt(artItems);
    } else {
      setFilteredArt(artItems.filter((art) => art.categories?.includes(tab)));
    }
  };

  return (
    <div className="gallery" id="gallery">
      <div className="gallery__tab-controls">
        <select
          className="gallery__tab-select"
          value={activeTab}
          onChange={(e) => handleTabClick(e.target.value)}
        >
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
            <option key={tab} value={tab}>
              {tab === "all"
                ? "All Art"
                : tab.charAt(0).toUpperCase() + tab.slice(1)}
            </option>
          ))}
        </select>
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
      </div>
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
