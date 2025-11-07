import { useState, useEffect } from "react";

import {
  createArtItem,
  deleteArtItem,
  updateArtItem,
} from "../../../utils/api";

import DashBoard from "../DashBoard/DashBoard";
import AdminLanding from "../AdminLanding/AdminLanding";
import AddArtItemModal from "../../modals/AddArtItemModal/AddArtItemModal";

import "./Admin.css";

function Admin() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [currentModal, setCurrentModal] = useState("");
  const [artItems, setArtItems] = useState([]);
  const [orders, setOrders] = useState([]);
  const [selectedArtItem, setSelectedArtItem] = useState(null);

  const handleLogin = () => {
    setIsLoggedIn(true);
  };

  const handleAddArtItemClick = () => {
    setCurrentModal("add-art");
  };

  const closeModal = () => {
    setCurrentModal("");
  };

  // Repeated from App.jsx (Maybe put in a context)
  useEffect(() => {
    const handleEscClose = (e) => {
      if (e.key === "Escape") {
        setCurrentModal("");
      }
    };

    const handleClickOutside = (e) => {
      if (e.target.classList.contains("modal")) {
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

  const onUpdateArt = async (data) => {
    try {
      const { _id, ...updateFields } = data;
      const updatedArtItem = await updateArtItem(_id, updateFields);
      setArtItems((prevItems) =>
        prevItems.map((item) =>
          item._id === updatedArtItem._id ? updatedArtItem : item
        )
      );
    } catch (err) {
      console.error("Failed to Update art item", err);
    }
  };

  // Delete an Art Item
  const onDeleteArt = async (itemId) => {
    try {
      const deletedItem = await deleteArtItem(itemId);
      const filteredList = artItems.filter((item) => {
        return item._id !== deletedItem._id;
      });
      setArtItems(filteredList);
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
            orders={orders}
            setOrders={setOrders}
            onDeleteArt={onDeleteArt}
            closeModal={closeModal}
            currentModal={currentModal}
            setCurrentModal={setCurrentModal}
            selectedArtItem={selectedArtItem}
            setSelectedArtItem={setSelectedArtItem}
          />
          <AddArtItemModal
            onAddArt={onAddArt}
            onUpdateArt={onUpdateArt}
            currentModal={currentModal}
            closeModal={closeModal}
            artItem={selectedArtItem}
          />
        </>
      ) : (
        <AdminLanding handleLogin={handleLogin} />
      )}
    </section>
  );
}

export default Admin;
