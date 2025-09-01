import aboutBackground from "../../../assets/about-bg.png";
import "./About.css";

function About() {
  return (
    <section>
      <img src={aboutBackground} />
      <div className="about__summary">
        <h1 className="about__title">About the Artist</h1>
        <p className="about__summary-text">
          Ben Shea is a renowned artist based in Boston, MA.
        </p>
      </div>
      <div>
        <h1>Biography</h1>
        <p>
          Ben makes art out of the passion of his heart. He started making his
          art with vivid colors because he believes in inclusivity of all
          colors.
        </p>
      </div>
    </section>
  );
}

export default About;
