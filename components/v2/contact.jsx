"use client";

import { useForm, ValidationError } from "@formspree/react";
import { useEffect, useState } from "react";

export default function ContactSection() {
  const formId = process.env.NEXT_PUBLIC_FORMSPREE_FORM_ID || "";
  const [state, handleSubmit] = useForm(formId);
  const [showPopup, setShowPopup] = useState(false);

  useEffect(() => {
    if (state.succeeded) {
      setShowPopup(true);
    }
  }, [state.succeeded]);

  return (
    <>
      <section className="contact" id="contact">
        <h2 className="section-title">
          Get <span className="red">In Touch</span>
        </h2>

        <div className="contact-container">
          {/* FORM */}
          <div className="contact-form">
            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label htmlFor="name">Name</label>
                <input id="name" type="text" name="name" required />
                <ValidationError
                  prefix="Name"
                  field="name"
                  errors={state.errors}
                />
              </div>

              <div className="form-group">
                <label htmlFor="email">Email</label>
                <input id="email" type="email" name="email" required />
                <ValidationError
                  prefix="Email"
                  field="email"
                  errors={state.errors}
                />
              </div>

              <div className="form-group">
                <label htmlFor="subject">Subject</label>
                <input id="subject" type="text" name="subject" required />
                <ValidationError
                  prefix="Subject"
                  field="subject"
                  errors={state.errors}
                />
              </div>

              <div className="form-group">
                <label htmlFor="message">Message</label>
                <textarea id="message" name="message" required />
                <ValidationError
                  prefix="Message"
                  field="message"
                  errors={state.errors}
                />
              </div>

              <button
                type="submit"
                className="submit-btn"
                disabled={state.submitting || !formId}
              >
                {state.submitting ? "Sending..." : "Send Message"}
              </button>
            </form>
          </div>

          {/* CONTACT INFO */}
          <div className="contact-info">
            <h3>Connect With Us</h3>

            <div className="info-item">
              <img className="info-icon" src="/discord.svg" alt="Discord" />
              <div className="info-details">
                <h4>Discord</h4>
                <a
                  href="https://discord.com/users/760193927797669981"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="contact-link"
                >
                  Message on Discord
                </a>
              </div>
            </div>

            <div className="info-item">
              <img className="info-icon" src="/mail.svg" alt="Email" />
              <div className="info-details">
                <h4>Email</h4>
                <a
                  href="mailto:studio.vyke@gmail.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="contact-link"
                >
                  studio.vyke@gmail.com
                </a>
              </div>
            </div>

            <div className="info-item">
              <img className="info-icon" src="/phone.svg" alt="Phone" />
              <div className="info-details">
                <h4>Phone</h4>
                <a
                  href="tel:+918239981234"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="contact-link"
                >
                  +91 8239981234
                </a>
              </div>
            </div>

            <div className="info-item">
              <img className="info-icon" src="/insta.svg" alt="Instagram" />
              <div className="info-details">
                <h4>Instagram</h4>
                <a
                  href="https://www.instagram.com/reii_aep"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="contact-link"
                >
                  @reii_aep
                </a>
              </div>
            </div>

            <p className="contact-note">
              We usually respond within <strong>24 hours</strong>. Let’s build
              something impactful together.
            </p>
          </div>
        </div>
      </section>

      {/* SUCCESS POPUP */}
      {showPopup && (
        <div className="popup-backdrop" onClick={() => setShowPopup(false)}>
          <div className="popup" onClick={(e) => e.stopPropagation()}>
            <h3>Message Sent 🚀</h3>
            <p>
              Your message has been received.
              <br />
              We’ll reach back to you shortly.
            </p>
            <button className="popup-btn" onClick={() => setShowPopup(false)}>
              Close
            </button>
          </div>
        </div>
      )}
    </>
  );
}
