import { useRef } from "react";
import emailjs from "emailjs-com";

import "./Contact.css";

function Contact() {
  // MY KEYS
  const YOUR_SERVICE_ID = "service_axeg2pd";
  const YOUR_TEMPLATE_ID = "template_kihidjl";
  const YOUR_PUBLIC_KEY = "yFUuV-y41R3NpC0Nu";

  // BEN'S KEYS
  // const YOUR_SERVICE_ID = "service_axeg2pd";
  // Do I need this?? ^^^
  // const YOUR_TEMPLATE_ID = "template_kihidjl";
  // Get his Template ID KEY ^^^
  // const YOUR_PUBLIC_KEY = "oHL03YvyL0ocBTeH6";
  // const YOUR_PRIVATE_KEY = "LVo2bpW1R1KhM_K6mrEtz";
  // Figure out what to do with the Private Key

  const form = useRef();

  const sendEmail = (e) => {
    e.preventDefault();

    emailjs
      .sendForm(
        YOUR_SERVICE_ID,
        YOUR_TEMPLATE_ID,
        form.current,
        YOUR_PUBLIC_KEY
      )
      .then(
        (result) => {
          console.log("Message sent:", result.text);
          alert("Message sent!");
        },
        (error) => {
          console.log("Error:", error.text);
          alert("Failed to send message.");
        }
      );
  };

  return (
    <section className="contact">
      <div className="contact__content">
        <h1 className="contact__title">Get in Touch</h1>
        <p className="contact__subtitle">
          Have any questions? Fill out the form below and we will get right back
          to you.
        </p>
        <form ref={form} onSubmit={sendEmail} className="contact__form">
          <input
            className="contact__input"
            type="text"
            name="name"
            placeholder="Your Name"
          />
          <input
            className="contact__input"
            type="email"
            name="email"
            placeholder="Your Email"
          />
          <textarea
            className="contact__input contact__input_textarea"
            name="message"
            placeholder="Your Message"
          />
          <button className="contact__submit-button" type="submit">
            Send Message
          </button>
        </form>
        <p className="contact__email">bensheastudios@gmail.com</p>
        <p className="contact__phone">(479) 774-4213</p>
      </div>
    </section>
  );
}

export default Contact;
