import { useState } from "react";

import SideBar from "../SideBar/SideBar";
import Orders from "../Orders/Orders";
import ArtEditor from "../ArtEditor/ArtEditor";
import ExhibitEditor from "../ExhibitEditor/ExhibitEditor";

import "./AdminDash.css";

function AdminDash({
  artItems,
  setArtItems,
  orders,
  setOrders,
  exhibits,
  setExhibits,
  selectedExhibit,
  setSelectedExhibit,
  closeModal,
  currentModal,
  setCurrentModal,
  setSelectedArtItem,
  handleLogOut,
  handleAddArtItemClick,
  handleDeleteArtClick,
  handleDeleteOrderClick,
  handleAddExhibitClick,
  handleEditExhibitClick,
  handleDeleteExhibitClick,
}) {
  const [activeTab, setActiveTab] = useState("orders");

  const onTabChange = (tab) => {
    setActiveTab(tab);
  };

  return (
    <section className="dashboard">
      <div className="dashboard__header">
        <h2 className="dashboard__title">Welcome to the Admin Dashboard</h2>
        <button
          type="button"
          className="dashboard__button dashboard__button_logout"
          onClick={() => handleLogOut()}
        >
          Log Out
        </button>
      </div>
      <div className="dashboard__content">
        <SideBar
          activeTab={activeTab}
          onTabChange={onTabChange}
          handleLogOut={handleLogOut}
        />
        {activeTab === "orders" ? (
          <Orders
            orders={orders}
            setOrders={setOrders}
            currentModal={currentModal}
            setCurrentModal={setCurrentModal}
            handleDeleteOrderClick={handleDeleteOrderClick}
          />
        ) : activeTab === "gallery" ? (
          <ArtEditor
            handleAddArtItemClick={handleAddArtItemClick}
            artItems={artItems}
            setArtItems={setArtItems}
            closeModal={closeModal}
            setCurrentModal={setCurrentModal}
            setSelectedArtItem={setSelectedArtItem}
            handleDeleteArtClick={handleDeleteArtClick}
          />
        ) : activeTab === "exhibits" ? (
          <ExhibitEditor
            handleDeleteExhibitClick={handleDeleteExhibitClick}
            handleAddExhibitClick={handleAddExhibitClick}
            handleEditExhibitClick={handleEditExhibitClick}
            exhibits={exhibits}
            setExhibits={setExhibits}
            artItems={artItems}
            setArtItems={setArtItems}
            currentModal={currentModal}
            closeModal={closeModal}
            selectedExhibit={selectedExhibit}
            setSelectedExhibit={setSelectedExhibit}
          />
        ) : (
          <Orders />
        )}
      </div>
    </section>
  );
}

export default AdminDash;
