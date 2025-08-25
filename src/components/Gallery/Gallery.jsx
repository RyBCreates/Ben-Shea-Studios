import ItemCard from "../ItemCard/ItemCard";
import "./Gallery.css";

function Gallery() {
  return (
    <div className="gallery">
      <div className="gallery__content">
        <ItemCard />
        <ItemCard />
        <ItemCard />
        <ItemCard />
      </div>
    </div>
  );
}

export default Gallery;
