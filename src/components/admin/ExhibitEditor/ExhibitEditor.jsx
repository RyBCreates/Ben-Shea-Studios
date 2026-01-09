import { useState, useEffect } from "react";
import {
  fetchExhibits,
  createExhibit,
  updateExhibit,
  fetchArtItems,
} from "../../../utils/api/index";

import ExhibitCard from "../../ExhibitCard/ExhibitCard";
import AddExhibitModal from "../../modals/AddExhibitModal/AddExhibitModal";

import "./ExhibitEditor.css";

function ExhibitEditor({
  handleDeleteExhibitClick,
  handleAddExhibitClick,
  handleEditExhibitClick,
  exhibits,
  setExhibits,
  artItems,
  setArtItems,
  closeModal,
  currentModal,
  setCurrentModal,
  selectedExhibit,
  setSelectedExhibit,
}) {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Promise.all([fetchExhibits(), fetchArtItems()])
      .then(([exhibitData, artData]) => {
        setExhibits(exhibitData);
        setArtItems(artData);
      })
      .catch((err) => console.error("Error fetching data:", err))
      .finally(() => setLoading(false));
  }, []);

  const handleSaveExhibit = async (data) => {
    try {
      if (selectedExhibit) {
        await updateExhibit(selectedExhibit._id, data);
      } else {
        await createExhibit(data);
      }

      const refreshedExhibits = await fetchExhibits();
      setExhibits(refreshedExhibits);

      setSelectedExhibit(null);
      setCurrentModal(null);
    } catch (err) {
      console.error("Failed to save exhibit:", err);
    }
  };

  if (loading) return <p>Loading exhibits...</p>;

  return (
    <section className="exhibit-editor">
      <h2 className="exhibit-editor__title">Exhibit Editor</h2>
      <button
        className="art-editor__add-button"
        type="button"
        onClick={handleAddExhibitClick}
      >
        + Add New Exhibit
      </button>
      <ul className="exhibit-editor__list">
        {exhibits.map((exhibit) => (
          <ExhibitCard
            key={exhibit._id}
            exhibit={exhibit}
            variant="admin"
            handleEditCardClick={handleEditExhibitClick}
            handleDeleteCardClick={handleDeleteExhibitClick}
          />
        ))}
      </ul>
      {(currentModal === "add-exhibit" || currentModal === "edit-exhibit") && (
        <AddExhibitModal
          exhibit={selectedExhibit}
          artItems={artItems}
          onSaveExhibit={handleSaveExhibit}
          closeModal={closeModal}
          currentModal={currentModal}
        />
      )}
    </section>
  );
}

export default ExhibitEditor;
