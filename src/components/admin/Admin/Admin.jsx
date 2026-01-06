import { useState, useEffect } from "react";

import {
  createArtItem,
  deleteArtItem,
  updateArtItem,
  deleteOrder,
  deleteExhibit,
} from "../../../utils/api";

import AdminDash from "../AdminDash/AdminDash";

import AdminLanding from "../AdminLanding/AdminLanding";
import AddArtItemModal from "../../modals/AddArtItemModal/AddArtItemModal";
import ConfirmDeleteModal from "../../modals/ConfirmDeleteModal/ConfirmDeleteModal";

import "./Admin.css";

function Admin() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [currentModal, setCurrentModal] = useState("");
  const [artItems, setArtItems] = useState([]);
  const [orders, setOrders] = useState([]);
  const [exhibits, setExhibits] = useState([]);

  const [deleteType, setDeleteType] = useState(null);

  const [selectedOrder, setSelectedOrder] = useState(null);
  const [selectedArtItem, setSelectedArtItem] = useState(null);
  const [selectedExhibit, setSelectedExhibit] = useState(null);

  const handleLogin = () => {
    setIsLoggedIn(true);
  };

  const handleLogOut = () => {
    setIsLoggedIn(false);
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

  const handleDeleteOrderClick = (order) => {
    setDeleteType("order");
    setSelectedOrder(order);
    setCurrentModal("confirmation");
  };

  const handleDeleteArtClick = (item) => {
    setSelectedArtItem(item);
    setDeleteType("art");
    setCurrentModal("confirmation");
  };

  const handleDeleteExhibitClick = (exhibit) => {
    setSelectedExhibit(exhibit);
    setDeleteType("exhibit");
    setCurrentModal("confirmation");
  };

  const handleDeleteConfirm = async () => {
    try {
      if (deleteType === "order" && selectedOrder) {
        await deleteOrder(selectedOrder._id);
        setOrders((prev) => prev.filter((o) => o._id !== selectedOrder._id));
        setSelectedOrder(null);
      }

      if (deleteType === "art" && selectedArtItem) {
        await deleteArtItem(selectedArtItem._id);
        setArtItems((prev) =>
          prev.filter((a) => a._id !== selectedArtItem._id)
        );
        setSelectedArtItem(null);
      }

      if (deleteType === "exhibit" && selectedExhibit) {
        await deleteExhibit(selectedExhibit._id).then(() => {
          setExhibits((prev) =>
            prev.filter((ex) => ex._id !== selectedExhibit._id)
          );
          setSelectedExhibit(null);
          setCurrentModal(null);
        });
      }
      setDeleteType(null);
      setCurrentModal("");
    } catch (err) {
      console.error("Delete failed:", err);
    }
  };

  return (
    <section className="admin">
      {isLoggedIn ? (
        <>
          <AdminDash
            handleAddArtItemClick={handleAddArtItemClick}
            artItems={artItems}
            setArtItems={setArtItems}
            orders={orders}
            setOrders={setOrders}
            exhibits={exhibits}
            setExhibits={setExhibits}
            onDeleteArt={onDeleteArt}
            closeModal={closeModal}
            currentModal={currentModal}
            setCurrentModal={setCurrentModal}
            selectedArtItem={selectedArtItem}
            setSelectedArtItem={setSelectedArtItem}
            handleLogOut={handleLogOut}
            handleDeleteOrderClick={handleDeleteOrderClick}
            handleDeleteArtClick={handleDeleteArtClick}
            handleDeleteExhibitClick={handleDeleteExhibitClick}
          />
          <AddArtItemModal
            onAddArt={onAddArt}
            onUpdateArt={onUpdateArt}
            currentModal={currentModal}
            closeModal={closeModal}
            artItem={selectedArtItem}
          />
          <ConfirmDeleteModal
            currentModal={currentModal}
            closeModal={closeModal}
            onConfirm={handleDeleteConfirm}
          />
        </>
      ) : (
        <AdminLanding handleLogin={handleLogin} />
      )}
    </section>
  );
}

export default Admin;
