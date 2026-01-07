import { useRef, useState } from "react";
import emailjs from "emailjs-com";

import "./Contact.css";

function Contact() {
  const SERVICE_ID = import.meta.env.VITE_EMAILJS_SERVICE_ID;
  const TEMPLATE_ID = import.meta.env.VITE_EMAILJS_TEMPLATE_ID;
  const PUBLIC_KEY = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;

  const form = useRef();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const sendEmail = (e) => {
    e.preventDefault();

    emailjs.sendForm(SERVICE_ID, TEMPLATE_ID, form.current, PUBLIC_KEY).then(
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
            value={name}
            onChange={(e) => {
              setName(e.target.value);
            }}
          />
          <input
            className="contact__input"
            type="email"
            name="email"
            placeholder="Your Email"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
            }}
          />
          <textarea
            className="contact__input contact__input_textarea"
            name="message"
            placeholder="Your Message"
            value={message}
            onChange={(e) => {
              setMessage(e.target.value);
            }}
          />
          <button
            className="contact__submit-button"
            type="submit"
            disabled={!name.trim() || !email.trim() || !message.trim()}
          >
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
