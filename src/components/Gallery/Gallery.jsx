// import { useState } from "react";
import ItemCard from "../ItemCard/ItemCard";
import { mockArt } from "../../utils/mockData/mockArt";

import "./Gallery.css";

function Gallery({ onAddToCart }) {
  // const [activeTab, setActiveTab] = useState("tab1");

  return (
    <div className="gallery">
      <ul className="gallery__tabs">
        <li className="gallery__tab">
          <button className="gallery__tab-button">24 x 18</button>
        </li>
        <li className="gallery__tab">
          <button className="gallery__tab-button">Tab 2</button>
        </li>
        <li className="gallery__tab">
          <button className="gallery__tab-button">Tab 3</button>
        </li>
      </ul>
      <div className="gallery__content">
        <div className="gallery__content-container">
          {mockArt.map((art) => (
            <ItemCard key={art.id} mockArt={art} onAddToCart={onAddToCart} />
          ))}
        </div>
      </div>
    </div>
    // <div className="gallery">
    //   <GalleryNav activeTab={activeTab} setActiveTab={setActiveTab} />

    //   <div className="gallery__tab-content">
    //     {activeTab === "tab1" && (
    //       <>
    //         {mockArt.map((art) => (
    //           <ItemCard key={art.id} mockArt={art} onAddToCart={onAddToCart} />
    //         ))}
    //       </>
    //     )}
    //   </div>
    // </div>
  );
}

export default Gallery;
