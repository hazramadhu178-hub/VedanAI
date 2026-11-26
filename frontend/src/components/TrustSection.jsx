
import { useState } from "react";
import { SectionLabel } from "./Shared.jsx";
import { submitContact } from "../utils/submitContact.js";

export default function TrustSection() {
  const [formStatus, setFormStatus] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();

    const form = event.currentTarget;
    const data = new FormData(form);

    const formData = {
      name: data.get("name").trim(),
      email: data.get("email").trim(),
      company: data.get("company").trim(),
      phone: data.get("phone").trim(),
      service: data.get("service"),
      message: data.get("message").trim(),
      source: "Home Page",
    };

    setIsSubmitting(true);
    setFormStatus("");

    try {
      await submitContact(formData, "Home Page");

      setFormStatus(
        "Thank you! Your inquiry has been sent successfully."
      );

      form.reset();

    } catch (error) {
      console.error("Contact Form Error:", error);

      setFormStatus(
        error.message || "Something went wrong. Please try again."
      );

    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section
      className="trust-section"
      id="trusted"
      aria-labelledby="trust-heading"
    >
      <div className="site-container trust-section__grid">

        <div className="trust-section__story" data-reveal>
          <SectionLabel>Our Achievements</SectionLabel>

          <h2 id="trust-heading">
            We Are Trusted
            <br />
            Software Agency
          </h2>

          <div
            className="trust-section__emblem"
            aria-hidden="true"
          >
            V
          </div>

          <div className="trust-stats" aria-label="Our results">
            <div className="trust-stats__item">
              <strong>5K+</strong>
              <span>
                Projects Successfully
                <br />
                Delivered
              </span>
            </div>

            <div className="trust-stats__item">
              <strong>95%</strong>
              <span>
                Client Satisfaction
                <br />
                Rate on Our Results
              </span>
            </div>
          </div>
        </div>

        <div className="contact-panel" data-reveal>
          <h3>Ready to collaborate with us?</h3>

          <p>Who knows where a single message might lead you.</p>

          <form
            className="contact-form"
            onSubmit={handleSubmit}
          >
            <div className="contact-form__row">

              <label>
                <span className="sr-only">Your name</span>

                <input
                  name="name"
                  placeholder="Your Name*"
                  autoComplete="name"
                  required
                />
              </label>

              <label>
                <span className="sr-only">Email address</span>

                <input
                  name="email"
                  type="email"
                  placeholder="Email Address*"
                  autoComplete="email"
                  required
                />
              </label>

            </div>

            <div className="contact-form__row">

              <label>
                <span className="sr-only">Company name</span>

                <input
                  name="company"
                  placeholder="Company Name"
                  autoComplete="organization"
                />
              </label>

              <label>
                <span className="sr-only">Phone number</span>

                <input
                  name="phone"
                  type="tel"
                  placeholder="Phone Number"
                  autoComplete="tel"
                />
              </label>

            </div>

            <label className="contact-form__full">
              <span className="sr-only">Select a service</span>

              <select
                name="service"
                defaultValue=""
                required
              >
                <option value="" disabled>
                  Select Service*
                </option>

                <option>Web Development</option>
                <option>Static Website</option>
                <option>Backend Development</option>
                <option>SEO Service</option>
                <option>Something Else</option>
              </select>
            </label>

            <label className="contact-form__full">
              <span className="sr-only">Your message</span>

              <textarea
                name="message"
                placeholder="Your Message*"
                rows="5"
                required
              />
            </label>

            <button
              type="submit"
              className="contact-form__submit"
              disabled={isSubmitting}
            >
              {isSubmitting ? "SENDING..." : "SEND INQUIRY"}

              <span aria-hidden="true">&#8599;</span>
            </button>

            {formStatus && (
              <p
                className="contact-form__status"
                role="status"
              >
                {formStatus}

                {" "}

                {!isSubmitting && (
                  <a href="mailto:hello@vedanai.com">
                    Contact us
                  </a>
                )}
              </p>
            )}

          </form>
        </div>

      </div>
    </section>
  );
}
