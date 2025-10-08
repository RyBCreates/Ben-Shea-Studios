import { useState, useEffect } from "react";

import { createArtItem } from "../../../utils/api";

import DashBoard from "../DashBoard/DashBoard";
import AdminLanding from "../AdminLanding/AdminLanding";
import AddArtItemModal from "../../modals/AddArtItemModal/AddArtItemModal";

import "./Admin.css";

function Admin() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isAddArtModalOpen, setIsAddArtModalOpen] = useState(false);

  const handleLogin = () => {
    setIsLoggedIn(true);
  };

  const handleAddArtItemClick = () => {
    setIsAddArtModalOpen(true);
  };

  const closeModal = () => {
    setIsAddArtModalOpen(false);
  };

  // Repeated from App.jsx (Maybe put in a context)
  useEffect(() => {
    const handleEscClose = (e) => {
      if (e.key === "Escape") {
        setIsAddArtModalOpen(false);
      }
    };

    const handleClickOutside = (e) => {
      if (e.target.classList.contains("modal")) {
        setIsAddArtModalOpen(false);
      }
    };

    window.addEventListener("keydown", handleEscClose);
    window.addEventListener("click", handleClickOutside);

    return () => {
      window.removeEventListener("keydown", handleEscClose);
      window.removeEventListener("click", handleClickOutside);
    };
  }, []);

  const onAddArt = async (data) => {
    try {
      createArtItem(data);
    } catch {}
  };

  return (
    <section className="admin">
      {isLoggedIn ? (
        <>
          {isAddArtModalOpen ? (
            <AddArtItemModal
              isAddArtModalOpen={isAddArtModalOpen}
              closeModal={closeModal}
            />
          ) : (
            <></>
          )}
          <DashBoard handleAddArtItemClick={handleAddArtItemClick} />
        </>
      ) : (
        <AdminLanding handleLogin={handleLogin} />
      )}
    </section>
  );
}

export default Admin;
