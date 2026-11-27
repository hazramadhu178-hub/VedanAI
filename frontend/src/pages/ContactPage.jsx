
import { useState } from "react";
import { Link } from "react-router-dom";
import { ArrowIcon, ButtonLink, SectionLabel } from "../components/Shared.jsx";
import { submitContact } from "../utils/submitContact.js";
import "../styles/contact.css";

const contactCards = [
  {
    label: "Email",
    value: "hello@vedanai.com",
    detail: "For project inquiries",
    href: "mailto:hello@vedanai.com",
    icon: "mail",
  },
];

const faqs = [
  {
    question: "What services does VedanAI provide?",
    answer: "VedanAI offers web development, static website design, backend development, and technical SEO. Visit the services pages for details about each area.",
  },
  {
    question: "How do I request a project estimate?",
    answer: "Use the contact form to share your requirements, preferred service, and relevant project context. Scope and pricing can be discussed once the requirements are understood.",
  },
  {
    question: "What information should I include in my inquiry?",
    answer: "Describe what you want to build or improve, who it is for, and any important features, integrations, or constraints. You can also include a target timeframe or budget if you have one.",
  },
  {
    question: "Can you work on an existing website or application?",
    answer: "Send the current site or application details and explain what you would like to change. Feasibility and next steps depend on the technology and project scope.",
  },
  {
    question: "How can I contact VedanAI?",
    answer: "Send a message using the form on this page or email hello@vedanai.com.",
  },
];

function ContactIcon({ name }) {
  const common = {
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: "1.7",
    strokeLinecap: "round",
    strokeLinejoin: "round",
    "aria-hidden": "true",
  };

  const paths = {
    mail: (
      <>
        <rect x="2.5" y="5" width="19" height="14" rx="2.5" />
        <path d="m3 7 9 7 9-7" />
      </>
    ),

    phone: (
      <path d="M22 16.9v3a2 2 0 0 1-2.2 2 19.8 19.8 0 0 1-8.6-3.1 19.5 19.5 0 0 1-6-6A19.8 19.8 0 0 1 2.1 4.2 2 2 0 0 1 4.1 2h3a2 2 0 0 1 2 1.7c.1 1 .4 1.9.7 2.8a2 2 0 0 1-.5 2.1L8.1 9.9a16 16 0 0 0 6 6l1.3-1.2a2 2 0 0 1 2.1-.5c.9.3 1.8.6 2.8.7a2 2 0 0 1 1.7 2Z" />
    ),

    location: (
      <>
        <path d="M20 10c0 6-8 12-8 12S4 16 4 10a8 8 0 0 1 16 0Z" />
        <circle cx="12" cy="10" r="3" />
      </>
    ),

    clock: (
      <>
        <circle cx="12" cy="12" r="9" />
        <path d="M12 7v5l3 2" />
      </>
    ),
  };

  return <svg {...common}>{paths[name]}</svg>;
}

export default function ContactPage() {
  const [formStatus, setFormStatus] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [openFaq, setOpenFaq] = useState(0);

  const handleSubmit = async (event) => {
    event.preventDefault();

    const form = event.currentTarget;
    const data = new FormData(form);

    const formData = {
      name: data.get("name").trim(),
      email: data.get("email").trim(),
      company: data.get("company").trim(),
      phone: data.get("phone").trim(),
      budget: data.get("budget") || "Not provided",
      service: data.get("service"),
      message: data.get("message").trim(),
    };

    setIsSubmitting(true);
    setFormStatus("");

    try {
      const result = await submitContact(
        formData,
        "Contact Page"
      );

      setFormStatus(result.message);

      form.reset();

    } catch (error) {
      console.error("Contact Form Error:", error);

      setFormStatus(
        error.message || "Unable to send your inquiry. Please try again."
      );

    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section
      className="contact-page"
      id="contact"
      aria-labelledby="contact-heading"
    >
      <div className="site-container contact-page__inner">

        {/* ---------- Hero ---------- */}

        <div className="contact-hero" data-reveal>
          <p className="contact-hero__eyebrow">
            <span className="contact-hero__dot" aria-hidden="true" />
            Get In Touch
          </p>

          <h1 id="contact-heading">
            Let&rsquo;s Start Something
            <br />
            Great Together.
          </h1>

          <p className="contact-hero__lead">
            Share a little about your project or the digital solution you have in mind.
          </p>

          <div className="contact-hero__actions">
            <ButtonLink to="#contact-form">
              START A PROJECT
            </ButtonLink>

            <Link
              className="contact-ghost-button"
              to="#contact-faq"
            >
              Browse our FAQ <ArrowIcon />
            </Link>
          </div>
        </div>

        {/* ---------- Info + Form ---------- */}

        <div className="contact-main" data-reveal>

          <div className="contact-info">
            <SectionLabel>Contact Information</SectionLabel>

            <h2>Get in Touch</h2>

            <p className="contact-info__lead">
              Send your project inquiry by email or use the form on this page.
            </p>

            <div className="contact-info__cards">
              {contactCards.map(
                ({ label, value, detail, href, icon }) => {
                  const content = (
                    <>
                      <span className="contact-info__icon">
                        <ContactIcon name={icon} />
                      </span>

                      <span className="contact-info__body">
                        <small>{label}</small>
                        <strong>{value}</strong>
                        <em>{detail}</em>
                      </span>
                    </>
                  );

                  return href ? (
                    <a
                      className="contact-info__card"
                      href={href}
                      key={label}
                      target={
                        href.startsWith("http")
                          ? "_blank"
                          : undefined
                      }
                      rel={
                        href.startsWith("http")
                          ? "noopener noreferrer"
                          : undefined
                      }
                    >
                      {content}
                      <ArrowIcon className="contact-info__arrow" />
                    </a>
                  ) : (
                    <div
                      className="contact-info__card"
                      key={label}
                    >
                      {content}
                    </div>
                  );
                }
              )}
            </div>

          </div>

          <div
            className="contact-form-panel"
            id="contact-form"
          >
            <h2>Send Us a Message</h2>

            <p>
              Tell us a little about your project and we&rsquo;ll take it from there.
            </p>

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

              <div className="contact-form__row">

                <label>
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

                <label>
                  <span className="sr-only">Estimated budget</span>

                  <select
                    name="budget"
                    defaultValue=""
                  >
                    <option value="" disabled>
                      Estimated Budget
                    </option>

                    <option>Under $5,000</option>
                    <option>$5,000 – $15,000</option>
                    <option>$15,000 – $50,000</option>
                    <option>$50,000+</option>
                  </select>
                </label>

              </div>

              <label className="contact-form__full">
                <span className="sr-only">Your message</span>

                <textarea
                  name="message"
                  placeholder="Tell us about your project*"
                  rows="6"
                  required
                />
              </label>

              <button
                type="submit"
                className="contact-form__submit"
                disabled={isSubmitting}
              >
                {isSubmitting ? "SENDING..." : "SEND MESSAGE"}

                <span aria-hidden="true">
                  &#8599;
                </span>
              </button>

              {formStatus && (
                <p
                  className="contact-form__status"
                  role="status"
                >
                  {formStatus}
                </p>
              )}

            </form>
          </div>

        </div>

        {/* ---------- FAQ ---------- */}

        <div
          className="contact-faq"
          id="contact-faq"
          data-reveal
        >
          <div className="contact-faq__intro">
            <SectionLabel>FAQ</SectionLabel>

            <h2>Frequently Asked Questions</h2>

            <p>
              Quick answers to the things clients ask us most. Can&rsquo;t find what you&rsquo;re looking for? Just send us a message.
            </p>
          </div>

          <div className="contact-faq__list">
            {faqs.map((faq, index) => {
              const isOpen = openFaq === index;

              return (
                <div
                  className={`faq-item ${
                    isOpen ? "faq-item--open" : ""
                  }`}
                  key={faq.question}
                >
                  <h3 className="faq-item__heading">
                    <button
                      className="faq-item__trigger"
                      type="button"
                      onClick={() =>
                        setOpenFaq(isOpen ? -1 : index)
                      }
                      aria-expanded={isOpen}
                      aria-controls={`faq-answer-${index}`}
                    >
                      <span>{faq.question}</span>

                      <span
                        className="faq-item__icon"
                        aria-hidden="true"
                      >
                        <span />
                        <span />
                      </span>
                    </button>
                  </h3>

                  <div
                    className="faq-item__answer"
                    id={`faq-answer-${index}`}
                    hidden={!isOpen}
                  >
                    <p>{faq.answer}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

      </div>
    </section>
  );
}
