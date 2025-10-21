import "./SideBar.css";

function SideBar({ activeTab, onTabChange }) {
  return (
    <aside className="sidebar" aria-label="Admin sections">
      <ul className="sidebar__list">
        <li>
          <button
            type="button"
            className={`sidebar__button ${
              activeTab === "orders" ? "sidebar__button_active" : ""
            }`}
            onClick={() => onTabChange("orders")}
          >
            Orders
          </button>
        </li>
        <li>
          <button
            type="button"
            className={`sidebar__button ${
              activeTab === "gallery" ? "sidebar__button_active" : ""
            }`}
            onClick={() => onTabChange("gallery")}
          >
            Art Gallery
          </button>
        </li>
        <li>
          <button
            type="button"
            className={`sidebar__button ${
              activeTab === "exhibits" ? "sidebar__button_active" : ""
            }`}
            onClick={() => onTabChange("exhibits")}
          >
            Exhibitions
          </button>
        </li>
      </ul>
    </aside>
  );
}

export default SideBar;
