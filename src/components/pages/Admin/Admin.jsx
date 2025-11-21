import { useState } from "react";

import Dashboard from "../Dashboard/Dashboard";
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
        <Dashboard handleLogOut={handleLogOut} />
      ) : (
        <AdminLanding handleLogin={handleLogin} />
      )}
    </section>
  );
}

export default Admin;
