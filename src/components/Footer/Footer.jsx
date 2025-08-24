import "./Footer.css";

function Footer() {
  return (
    <footer className="footer">
      <ul className="footer__navbar">
        <li className="footer__social">
          <img className="footer__icon"></img>
          <p className="footer__link">Instagram</p>
        </li>
        <li className="footer__social">
          <img className="footer__icon"></img>
          <p className="footer__link">Facebook</p>
        </li>
        <li className="footer__social">
          <img className="footer__icon"></img>
          <p className="footer__link">Venmo</p>
        </li>
      </ul>
      <p>All art is owned by Ben Shea - Ben Shea Studios - Ryan Bommarito</p>
    </footer>
  );
}

export default Footer;
