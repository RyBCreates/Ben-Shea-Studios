import SideBar from "../SideBar/SideBar";
import Orders from "../Orders/Orders";
import ArtEditor from "../ArtEditor/ArtEditor";

import "./Dashboard.css";

function DashBoard() {
  return (
    <section className="dashboard">
      <h2 className="dashboard__title">Welcome to the Admin Dashboard</h2>
      <div className="dashboard__content">
        <SideBar />
        {/* <Orders /> */}
        <ArtEditor />
      </div>
    </section>
  );
}

export default DashBoard;
