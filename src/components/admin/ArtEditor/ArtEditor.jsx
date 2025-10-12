import { useState, useEffect } from "react";
import { fetchArtItems } from "../../../utils/api";

import ItemCard from "../../ItemCard/ItemCard";
import ConfirmDeleteModal from "../../modals/ConfirmDeleteModal/ConfirmDeleteModal";

import "./ArtEditor.css";

function ArtEditor({
  handleAddArtItemClick,
  artItems,
  setArtItems,
  onDeleteArt,
  closeModal,
  currentModal,
  setCurrentModal,
}) {
  const [loading, setLoading] = useState(true);
  const [itemToDelete, setItemToDelete] = useState(null);

  useEffect(() => {
    fetchArtItems()
      .then(setArtItems)
      .catch((err) => console.error("Error fetching art items:", err))
      .finally(() => setLoading(false));
  }, []);

  const handleDeleteArtClick = (item) => {
    console.log(item);
    setItemToDelete(item);
    setCurrentModal("confirmation");
  };

  const handleDeleteArtConfirm = () => {
    if (!itemToDelete) return;

    onDeleteArt(itemToDelete._id)
      .then(() => {
        setArtItems((prevItems) =>
          prevItems.filter((artItem) => artItem._id !== itemToDelete._id)
        );
        setItemToDelete(null);
        closeModal();
      })
      .catch((error) => {
        console.error("Failed to delete Item:", error);
      });
  };

  if (loading) return <p>Loading artwork...</p>;

  return (
    <section className="art-editor">
      <h2 className="art-editor__title">Art Editor</h2>
      <button
        className="art-editor__add-button"
        type="button"
        onClick={() => {
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
            />
          ))}
      </div>
      <ConfirmDeleteModal
        closeModal={closeModal}
        currentModal={currentModal}
        handleDeleteArtConfirm={handleDeleteArtConfirm}
      />
    </section>
  );
}

export default ArtEditor;
