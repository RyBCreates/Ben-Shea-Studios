import { useState } from "react";

import AdminDash from "../AdminDash/AdminDash";
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
        <AdminDash handleLogOut={handleLogOut} />
      ) : (
        <AdminLanding handleLogin={handleLogin} />
      )}
    </section>
  );
}

export default Admin;
