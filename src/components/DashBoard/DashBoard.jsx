import SideBar from "../SideBar/SideBar";
import "./Dashboard.css";

function DashBoard() {
  return (
    <section className="dashboard">
      <div className="admin__content">
        <h2 className="admin__title admin__title_logged-in">
          Welcome to the Admin Dashboard
        </h2>
        <SideBar />
      </div>
    </section>
  );
}

export default DashBoard;
