import "./About.css";

function About() {
  return (
    <section className="about">
      <div className="about__hero">
        <h1 className="about__hero_title">About the Artist</h1>
        <p className="about__hero_text">
          Ben Shea is a renowned artist from in Massachusetts.
        </p>
      </div>
      <div className="about__content">
        <h1 className="about__content_title">Biography</h1>
        <p className="about__content_text">
          Ben makes art out of the passion of his heart. He started making his
          art with vivid colors because he believes in inclusivity of all
          colors.
        </p>
      </div>
    </section>
  );
}

export default About;
