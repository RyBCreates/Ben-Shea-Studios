import facebook from "../../assets/icons/socials/facebook-dark.png";
import instagram from "../../assets/icons/socials/instagram-dark.png";
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
            <img
              className="footer__icon"
              src={instagram}
              alt="Instagram Icon"
            ></img>
            Instagram
          </a>
        </li>
        <li className="footer__social">
          <a
            className="footer__link"
            href="https://www.facebook.com/benjamin.shea.608141"
            target="_blank"
          >
            <img
              className="footer__icon"
              src={facebook}
              alt="Facebook Icon"
            ></img>
            Facebook
          </a>
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

// Facebook Logo - Light
/* <a target="_blank" href="https://icons8.com/icon/118468/facebook">Facebook</a> icon by <a target="_blank" href="https://icons8.com">Icons8</a> */

// Facebook Logo - Dark
{
  /* <a target="_blank" href="https://icons8.com/icon/118467/facebook">Facebook</a> icon by <a target="_blank" href="https://icons8.com">Icons8</a> */
}

// Instagram Logo - Light
// <a target="_blank" href="https://icons8.com/icon/32292/instagram">Instagram Logo</a> icon by <a target="_blank" href="https://icons8.com">Icons8</a>

// Instagram Logo - Dark
/* <a target="_blank" href="https://icons8.com/icon/32309/instagram">Instagram</a> icon by <a target="_blank" href="https://icons8.com">Icons8</a> */

// Venmo Logo - Light
{
  /* <a target="_blank" href="https://icons8.com/icon/102678/venmo">Venmo</a> icon by <a target="_blank" href="https://icons8.com">Icons8</a> */
}

// Venmo Logo - Dark
{
  /* <a target="_blank" href="https://icons8.com/icon/96905/venmo">Venmo</a> icon by <a target="_blank" href="https://icons8.com">Icons8</a> */
}
