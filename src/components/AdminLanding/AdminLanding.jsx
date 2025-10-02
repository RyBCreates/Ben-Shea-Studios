import LoginForm from "../LoginForm/LoginForm";

import "./AdminLanding.css";

function AdminLanding({ handleLogin }) {
  return (
    <div className="landing">
      <div className="landing__content">
        <h1 className="landing__title">Admin Dashboard</h1>
        <LoginForm handleLogin={handleLogin} />
      </div>
    </div>
  );
}

export default AdminLanding;
