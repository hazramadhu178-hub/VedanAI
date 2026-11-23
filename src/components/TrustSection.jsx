import { useState } from "react";
import { SectionLabel } from "./Shared.jsx";

export default function TrustSection() {
  const [formStatus, setFormStatus] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const subject = encodeURIComponent(`VedanAI consultation inquiry from ${data.get("name")}`);
    const body = encodeURIComponent(
      `Name: ${data.get("name")}\nEmail: ${data.get("email")}\nCompany: ${data.get("company") || "Not provided"}\nPhone: ${data.get("phone") || "Not provided"}\nService: ${data.get("service")}\n\nMessage:\n${data.get("message")}`,
    );

    setFormStatus("Your email app is opening with your inquiry ready to send. If it does not open, email us at hello@vedanai.com.");
    window.location.href = `mailto:hello@vedanai.com?subject=${subject}&body=${body}`;
  };

  return (
    <section className="trust-section" id="trusted" aria-labelledby="trust-heading">
      <div className="site-container trust-section__grid">
        <div className="trust-section__story" data-reveal>
          <SectionLabel>Our Achievements</SectionLabel>
          <h2 id="trust-heading">We Are Trusted<br />Software Agency</h2>
          <div className="trust-section__emblem" aria-hidden="true">V</div>
          <div className="trust-stats" aria-label="Our results">
            <div className="trust-stats__item"><strong>5K+</strong><span>Projects Successfully<br />Delivered</span></div>
            <div className="trust-stats__item"><strong>95%</strong><span>Client Satisfaction<br />Rate on Our Results</span></div>
          </div>
        </div>
        <div className="contact-panel" data-reveal>
          <h3>Ready to collaborate with us?</h3>
          <p>Who knows where a single message might lead you.</p>
          <form className="contact-form" onSubmit={handleSubmit}>
            <div className="contact-form__row">
              <label><span className="sr-only">Your name</span><input name="name" placeholder="Your Name*" autoComplete="name" required /></label>
              <label><span className="sr-only">Email address</span><input name="email" type="email" placeholder="Email Address*" autoComplete="email" required /></label>
            </div>
            <div className="contact-form__row">
              <label><span className="sr-only">Company name</span><input name="company" placeholder="Company Name" autoComplete="organization" /></label>
              <label><span className="sr-only">Phone number</span><input name="phone" type="tel" placeholder="Phone Number" autoComplete="tel" /></label>
            </div>
            <label className="contact-form__full"><span className="sr-only">Select a service</span>
              <select name="service" defaultValue="" required>
                <option value="" disabled>Select Service*</option>
                <option>Web Development</option><option>Static Website</option><option>Backend Development</option><option>SEO Service</option><option>Something Else</option>
              </select>
            </label>
            <label className="contact-form__full"><span className="sr-only">Your message</span><textarea name="message" placeholder="Your Message*" rows="5" required /></label>
            <button type="submit" className="contact-form__submit">SEND INQUIRY <span aria-hidden="true">&#8599;</span></button>
            {formStatus && <p className="contact-form__status" role="status">{formStatus} <a href="mailto:hello@vedanai.com">Open email</a></p>}
          </form>
        </div>
      </div>
    </section>
  );
}