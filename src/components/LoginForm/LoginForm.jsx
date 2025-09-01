import "./LoginForm.css";

function LoginForm({ handleLogin }) {
  return (
    <div className="login">
      <h2 className="login__title">Login</h2>
      <form className="login__form" onSubmit={() => handleLogin()}>
        <input
          className="login__input"
          placeholder="Email"
          type="email"
          autoComplete="username"
          //   Remove for deployment vvv
          value="email@email.com"
          required
        />
        <input
          className="login__input"
          placeholder="Password"
          type="password"
          autoComplete="current-password"
          //   Remove for deployment vvv
          value="email@email.com"
          required
        />
        <button className="login__submit-button" type="submit">
          Login
        </button>
      </form>
    </div>
  );
}

export default LoginForm;
