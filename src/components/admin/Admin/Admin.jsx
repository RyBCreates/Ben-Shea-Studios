import { useState, useEffect } from "react";

import { createArtItem, deleteArtItem } from "../../../utils/api";

import DashBoard from "../DashBoard/DashBoard";
import AdminLanding from "../AdminLanding/AdminLanding";
import AddArtItemModal from "../../modals/AddArtItemModal/AddArtItemModal";

import "./Admin.css";

function Admin() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  // Change to global Modal controller VVVV
  const [isAddArtModalOpen, setIsAddArtModalOpen] = useState(false);
  const [currentModal, setCurrentModal] = useState("");
  const [artItems, setArtItems] = useState([]);

  const handleLogin = () => {
    setIsLoggedIn(true);
  };

  const handleAddArtItemClick = () => {
    setIsAddArtModalOpen(true);
  };

  const closeModal = () => {
    setIsAddArtModalOpen(false);
    setCurrentModal("");
  };

  // Repeated from App.jsx (Maybe put in a context)
  useEffect(() => {
    const handleEscClose = (e) => {
      if (e.key === "Escape") {
        setIsAddArtModalOpen(false);
        setCurrentModal("");
      }
    };

    const handleClickOutside = (e) => {
      if (e.target.classList.contains("modal")) {
        setIsAddArtModalOpen(false);
        setCurrentModal("");
      }
    };

    window.addEventListener("keydown", handleEscClose);
    window.addEventListener("click", handleClickOutside);

    return () => {
      window.removeEventListener("keydown", handleEscClose);
      window.removeEventListener("click", handleClickOutside);
    };
  }, []);

  // Add a new Art Item
  const onAddArt = async (data) => {
    try {
      const newArtItem = await createArtItem(data);
      setArtItems((prevItems) => [...prevItems, newArtItem]);
    } catch (err) {
      console.error("Failed to Create art item", err);
    }
  };

  // Delete an Art Item
  const onDeleteArt = async (itemId) => {
    try {
      console.log(itemId);
      const deletedItem = await deleteArtItem(itemId);
      const filteredList = artItems.filter((item) => {
        return item._id !== deletedItem._id;
      });
      setArtItems((prevItems) => [...prevItems, filteredList]);
    } catch (err) {
      console.error("Failed to delete the selected item", err);
    }
  };

  return (
    <section className="admin">
      {isLoggedIn ? (
        <>
          <DashBoard
            handleAddArtItemClick={handleAddArtItemClick}
            artItems={artItems}
            setArtItems={setArtItems}
            onDeleteArt={onDeleteArt}
            closeModal={closeModal}
            currentModal={currentModal}
            setCurrentModal={setCurrentModal}
          />
          <AddArtItemModal
            isAddArtModalOpen={isAddArtModalOpen}
            onAddArt={onAddArt}
            closeModal={closeModal}
          />
        </>
      ) : (
        <AdminLanding handleLogin={handleLogin} />
      )}
    </section>
  );
}

export default Admin;
