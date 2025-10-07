import { useState } from "react";

import { createArtItem } from "../../../utils/api";

import DashBoard from "../DashBoard/DashBoard";
import AdminLanding from "../AdminLanding/AdminLanding";
import AddArtItemModal from "../modals/AddItemModal/AddItemModal";

import "./Admin.css";

function Admin() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isAddArtModalOpen, setIsAddArtModalOpen] = useState(false);

  const handleLogin = () => {
    setIsLoggedIn(true);
  };

  return (
    <section className="admin">
      {isLoggedIn ? (
        <DashBoard />
      ) : (
        <>
          {isAddArtModalOpen ? (
            <AddArtItemModal />
          ) : (
            <AdminLanding handleLogin={handleLogin} />
          )}
        </>
      )}
    </section>
  );
}

export default Admin;
