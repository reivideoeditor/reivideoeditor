"use client";

import { useEffect, useState } from "react";
import { useForm, ValidationError } from "@formspree/react";

export default function ContactSection() {
  const [formId, setFormId] = useState(null);
  const [formState, setFormState] = useState(null);
  const [handleSubmit, setHandleSubmit] = useState(null);
  const [showPopup, setShowPopup] = useState(false);

  // 👇 Only runs in browser, never during prerender
  useEffect(() => {
    const id = process.env.NEXT_PUBLIC_FORMSPREE_FORM_ID;

    if (id) {
      const [state, submit] = useForm(id);
      setFormId(id);
      setFormState(state);
      setHandleSubmit(() => submit);
    }
  }, []);

  useEffect(() => {
    if (formState?.succeeded) {
      setShowPopup(true);
    }
  }, [formState?.succeeded]);

  // 👇 Prevents build-time crash
  if (!formId || !formState || !handleSubmit) {
    return null;
  }

  return (
    <>
      <section className="contact" id="contact">
        <h2 className="section-title">
          Get <span className="red">In Touch</span>
        </h2>

        <div className="contact-container">
          <div className="contact-form">
            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label htmlFor="name">Name</label>
                <input id="name" type="text" name="name" required />
                <ValidationError
                  prefix="Name"
                  field="name"
                  errors={formState.errors}
                />
              </div>

              <div className="form-group">
                <label htmlFor="email">Email</label>
                <input id="email" type="email" name="email" required />
                <ValidationError
                  prefix="Email"
                  field="email"
                  errors={formState.errors}
                />
              </div>

              <div className="form-group">
                <label htmlFor="subject">Subject</label>
                <input id="subject" type="text" name="subject" required />
                <ValidationError
                  prefix="Subject"
                  field="subject"
                  errors={formState.errors}
                />
              </div>

              <div className="form-group">
                <label htmlFor="message">Message</label>
                <textarea id="message" name="message" required />
                <ValidationError
                  prefix="Message"
                  field="message"
                  errors={formState.errors}
                />
              </div>

              <button
                type="submit"
                className="submit-btn"
                disabled={formState.submitting}
              >
                {formState.submitting ? "Sending..." : "Send Message"}
              </button>
            </form>
          </div>
        </div>
      </section>

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
