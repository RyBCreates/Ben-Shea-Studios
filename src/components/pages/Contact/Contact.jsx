import "./Contact.css";

function Contact() {
  return (
    <section className="contact">
      <div className="contact__content">
        <h1 className="contact__title">Get in Touch</h1>
        <p className="contact__subtitle">
          Have any questions? Fill out the form below and we will get right back
          to you.
        </p>
        <form className="contact__form">
          <input
            className="contact__input"
            type="text"
            placeholder="Your Name"
          />
          <input
            className="contact__input"
            type="text"
            placeholder="Your Email"
          />
          <textarea
            className="contact__input contact__input_textarea"
            type="text"
            placeholder="Your Message"
          />
          <button className="contact__submit-button" type="submit">
            Send Message
          </button>
        </form>
        <p className="contact__email">email@email.com</p>
        <p className="contact__phone">(123) 456-7890</p>
      </div>
    </section>
  );
}

export default Contact;
