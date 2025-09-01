import { useState } from "react";
import LoginForm from "../../LoginForm/LoginForm";
import "./Admin.css";

function Admin() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleLogin = () => {
    setIsLoggedIn(true);
  };

  return (
    <section className="admin">
      {isLoggedIn ? (
        <>Currently Logged In</>
      ) : (
        <div className="admin__content">
          <h1 className="admin__title">Admin Dashboard</h1>
          <LoginForm handleLogin={handleLogin} />
        </div>
      )}
    </section>
  );
}

export default Admin;
