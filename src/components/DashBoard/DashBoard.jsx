import SideBar from "../SideBar/SideBar";
import Orders from "../Orders/Orders";
import "./Dashboard.css";

function DashBoard() {
  return (
    <section className="dashboard">
      <h2 className="dashboard__title">Welcome to the Admin Dashboard</h2>
      <div className="dashboard__content">
        <SideBar />
        <Orders />
      </div>
    </section>
  );
}

export default DashBoard;
