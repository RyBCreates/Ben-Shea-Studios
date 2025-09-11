import ItemCard from "../ItemCard/ItemCard";
import { mockArt } from "../../utils/mockData/mockArt";

import "./Gallery.css";

function Gallery() {
  return (
    <div className="gallery">
      <div className="gallery__content">
        {mockArt.map((art) => (
          <ItemCard key={art.id} mockArt={art} />
        ))}
      </div>
    </div>
  );
}

export default Gallery;
