import "./Header.css";

function Header() {
  return (
    <header className="header">
      <div className="header__logo">
        <img></img>
        <h1 className="header__title">Ben Shea Studios</h1>
      </div>
      <ul className="navbar">
        <li className="navbar__link">About</li>
        <li className="navbar__link">Exhibits</li>
        <li className="navbar__link">Contact</li>
      </ul>
    </header>
  );
}

export default Header;
