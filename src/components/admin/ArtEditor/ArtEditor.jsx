import { useState, useEffect } from "react";
import { fetchArtItems } from "../../../utils/api";

import ItemCard from "../../ItemCard/ItemCard";

import "./ArtEditor.css";

function ArtEditor({ handleAddArtItemClick }) {
  const [artItems, setArtItems] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchArtItems()
      .then(setArtItems)
      .catch((err) => console.error("Error fetching art items:", err))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <p>Loading artwork...</p>;

  return (
    <section className="editor">
      <button
        className="editor__add-button"
        type="button"
        onClick={() => {
          handleAddArtItemClick();
        }}
      >
        Add New Art Item
      </button>
      <div className="editor__gallery">
        {artItems.map((art) => (
          <ItemCard key={art._id} artItem={art} variant="admin" />
        ))}
      </div>
    </section>
  );
}

export default ArtEditor;
