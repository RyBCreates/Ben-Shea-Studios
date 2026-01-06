import { useState, useEffect } from "react";
import {
  fetchExhibits,
  createExhibit,
  updateExhibit,
  deleteExhibit,
  fetchArtItems,
} from "../../../utils/api/index";

import ExhibitCard from "../../ExhibitCard/ExhibitCard";
import ConfirmDeleteModal from "../../modals/ConfirmDeleteModal/ConfirmDeleteModal";
import AddExhibitModal from "../../modals/AddExhibitModal/AddExhibitModal";

import "./ExhibitEditor.css";

function ExhibitEditor() {
  const [exhibits, setExhibits] = useState([]);
  const [artItems, setArtItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedExhibit, setSelectedExhibit] = useState(null);
  const [currentModal, setCurrentModal] = useState(null);

  useEffect(() => {
    // Fetch exhibits and art items in parallel
    Promise.all([fetchExhibits(), fetchArtItems()])
      .then(([exhibitData, artData]) => {
        setExhibits(exhibitData);
        setArtItems(artData);
      })
      .catch((err) => console.error("Error fetching data:", err))
      .finally(() => setLoading(false));
  }, []);

  const handleAddExhibitClick = () => {
    setSelectedExhibit(null);
    setCurrentModal("add-exhibit");
  };

  const handleEditExhibitClick = (exhibit) => {
    setSelectedExhibit(exhibit);
    setCurrentModal("edit-exhibit");
  };

  const handleDeleteExhibitClick = (exhibit) => {
    setSelectedExhibit(exhibit);
    setCurrentModal("confirmation");
  };

  const handleDeleteExhibitConfirm = () => {
    if (!selectedExhibit) return;

    deleteExhibit(selectedExhibit._id)
      .then(() => {
        setExhibits((prev) =>
          prev.filter((ex) => ex._id !== selectedExhibit._id)
        );
        setSelectedExhibit(null);
        setCurrentModal(null);
      })
      .catch((err) => console.error("Failed to delete exhibit:", err));
  };

  const handleSaveExhibit = (data) => {
    const apiCall = selectedExhibit
      ? updateExhibit(selectedExhibit._id, data)
      : createExhibit(data);

    apiCall
      .then((savedExhibit) => {
        setExhibits((prev) => {
          if (selectedExhibit) {
            return prev.map((ex) =>
              ex._id === savedExhibit._id ? savedExhibit : ex
            );
          } else {
            return [savedExhibit, ...prev];
          }
        });
        setSelectedExhibit(null);
        setCurrentModal(null);
      })
      .catch((err) => console.error("Failed to save exhibit:", err));
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
            handleDeleteCardClick={handleDeleteExhibitClick} // <-- this is the correct prop
          />
        ))}
      </ul>

      <ConfirmDeleteModal
        closeModal={() => setCurrentModal(null)}
        currentModal={currentModal}
        onConfirm={handleDeleteExhibitConfirm}
      />

      {(currentModal === "add-exhibit" || currentModal === "edit-exhibit") && (
        <AddExhibitModal
          exhibit={selectedExhibit}
          artItems={artItems}
          onSaveExhibit={handleSaveExhibit}
          closeModal={() => setCurrentModal(null)}
          currentModal={currentModal}
        />
      )}
    </section>
  );
}

export default ExhibitEditor;
