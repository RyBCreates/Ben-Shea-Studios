import "./Footer.css";

function Footer() {
  return (
    <footer className="footer">
      <ul className="footer__navbar">
        <li className="footer__social">
          <a
            className="footer__link"
            href="https://www.instagram.com/bensheastudios/"
            target="_blank"
          >
            <img className="footer__icon" alt="Instagram Icon"></img>Instagram
          </a>
        </li>
        <li className="footer__social">
          <a
            className="footer__link"
            href="https://www.facebook.com/benjamin.shea.608141"
            target="_blank"
          >
            <img className="footer__icon" alt="Facebook Icon"></img>Facebook
          </a>
        </li>
        <li className="footer__social">
          <img className="footer__icon" alt="Venmo Icon"></img>
          <p className="footer__link">Venmo</p>
        </li>
      </ul>
      <p className="footer__copyright">
        All art is owned by Ben Shea - Ben Shea Studios - Developed by: Ryan
        Bommarito
      </p>
    </footer>
  );
}

export default Footer;
