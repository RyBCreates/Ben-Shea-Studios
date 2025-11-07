import { useState, useEffect } from "react";
import { fetchArtItems } from "../../../utils/api/index";

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
  selectedArtItem,
  setSelectedArtItem,
}) {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchArtItems()
      .then(setArtItems)
      .catch((err) => console.error("Error fetching art items:", err))
      .finally(() => setLoading(false));
  }, []);

  const handleDeleteArtClick = (item) => {
    setSelectedArtItem(item);
    setCurrentModal("confirmation");
  };

  const handleEditArtClick = (item) => {
    setSelectedArtItem(item);
    setCurrentModal("edit-art");
  };

  const handleDeleteArtConfirm = () => {
    if (!selectedArtItem) return;

    onDeleteArt(selectedArtItem._id)
      .then(() => {
        setArtItems((prevItems) =>
          prevItems.filter((artItem) => artItem._id !== selectedArtItem._id)
        );
        setSelectedArtItem(null);
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
      <ConfirmDeleteModal
        closeModal={closeModal}
        currentModal={currentModal}
        handleDeleteArtConfirm={handleDeleteArtConfirm}
      />
    </section>
  );
}

export default ArtEditor;
