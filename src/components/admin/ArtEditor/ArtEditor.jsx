import { useState, useEffect } from "react";
import { fetchArtItems } from "../../../utils/api/index";

import ItemCard from "../../ItemCard/ItemCard";

import "./ArtEditor.css";

function ArtEditor({
  handleAddArtItemClick,
  artItems,
  setArtItems,
  setCurrentModal,
  setSelectedArtItem,
  handleDeleteArtClick,
}) {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchArtItems()
      .then(setArtItems)
      .catch((err) => console.error("Error fetching art items:", err))
      .finally(() => setLoading(false));
  }, []);

  const handleEditArtClick = (item) => {
    setSelectedArtItem(item);
    setCurrentModal("edit-art");
  };

  if (loading) return <p>Loading artwork...</p>;

  return (
    <section className="art-editor">
      <h2 className="art-editor__title">Art Editor</h2>
      <button
        className="art-editor__add-button"
        type="button"
        onClick={() => {
          setSelectedArtItem(null);
          handleAddArtItemClick();
        }}
      >
        + Add New Art Item
      </button>
      <div className="art-editor__gallery">
        {artItems
          .filter((art) => art && art.images && art.images.length > 0)
          .map((art) => (
            <ItemCard
              key={art._id}
              artItem={art}
              variant="admin"
              handleDeleteArtClick={handleDeleteArtClick}
              handleEditArtClick={handleEditArtClick}
            />
          ))}
      </div>
    </section>
  );
}

export default ArtEditor;
