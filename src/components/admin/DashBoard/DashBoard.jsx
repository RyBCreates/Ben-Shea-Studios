import { useState } from "react";

import SideBar from "../SideBar/SideBar";
import Orders from "../Orders/Orders";
import ArtEditor from "../ArtEditor/ArtEditor";
import ExhibitEditor from "../ExhibitEditor/ExhibitEditor";

import "./Dashboard.css";

function DashBoard({
  handleAddArtItemClick,
  artItems,
  setArtItems,
  onDeleteArt,
  closeModal,
  currentModal,
  setCurrentModal,
  orders,
  setOrders,
  selectedArtItem,
  setSelectedArtItem,
  handleLogOut,
}) {
  const [activeTab, setActiveTab] = useState("orders");

  const onTabChange = (tab) => {
    setActiveTab(tab);
  };

  return (
    <section className="dashboard">
      <h2 className="dashboard__title">Welcome to the Admin Dashboard</h2>
      <div className="dashboard__content">
        <SideBar
          activeTab={activeTab}
          onTabChange={onTabChange}
          handleLogOut={handleLogOut}
        />
        {activeTab === "orders" ? (
          <Orders orders={orders} setOrders={setOrders} />
        ) : activeTab === "gallery" ? (
          <ArtEditor
            handleAddArtItemClick={handleAddArtItemClick}
            artItems={artItems}
            setArtItems={setArtItems}
            onDeleteArt={onDeleteArt}
            closeModal={closeModal}
            currentModal={currentModal}
            setCurrentModal={setCurrentModal}
            selectedArtItem={selectedArtItem}
            setSelectedArtItem={setSelectedArtItem}
          />
        ) : activeTab === "exhibits" ? (
          <ExhibitEditor />
        ) : (
          <Orders />
        )}
      </div>
    </section>
  );
}

export default DashBoard;
