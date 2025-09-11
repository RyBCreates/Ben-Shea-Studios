import ItemCard from "../ItemCard/ItemCard";
import { mockArt } from "../../utils/mockData/mockArt";

import "./Gallery.css";

function Gallery({ onAddToCart }) {
  return (
    <div className="gallery">
      <div className="gallery__content">
        {mockArt.map((art) => (
          <ItemCard key={art.id} mockArt={art} onAddToCart={onAddToCart} />
        ))}
      </div>
    </div>
  );
}

export default Gallery;
