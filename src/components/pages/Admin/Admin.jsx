import { useState } from "react";

import DashBoard from "../DashBoard/DashBoard";
import AdminLanding from "../AdminLanding/AdminLanding";

import "./Admin.css";

function Admin() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleLogin = () => {
    setIsLoggedIn(true);
  };

  const handleLogOut = () => {
    setIsLoggedIn(false);
  };

  return (
    <section className="admin">
      {isLoggedIn ? (
        <DashBoard handleLogOut={handleLogOut} />
      ) : (
        <AdminLanding handleLogin={handleLogin} />
      )}
    </section>
  );
}

export default Admin;
