
import { useState } from "react";
import { Link } from "react-router-dom";
import { ArrowIcon, ButtonLink, SectionLabel } from "../components/Shared.jsx";
import { submitContact } from "../utils/submitContact.js";

const contactCards = [
  {
    label: "Email us",
    value: "hello@vedanai.com",
    detail: "We reply within 24 hours",
    href: "mailto:hello@vedanai.com",
    icon: "mail",
  },
  {
    label: "Call us",
    value: "+1 (312) 458 2857",
    detail: "Mon – Fri, 9:00 AM – 6:00 PM",
    href: "tel:+13124582857",
    icon: "phone",
  },
  {
    label: "Visit us",
    value: "4517 Washington Ave.",
    detail: "United States",
    href: "https://maps.google.com/?q=Washington+DC",
    icon: "location",
  },
  {
    label: "Working hours",
    value: "9:00 AM – 6:00 PM",
    detail: "Monday to Friday",
    icon: "clock",
  },
];

const socials = [
  { label: "LinkedIn", href: "https://www.linkedin.com/" },
  { label: "X / Twitter", href: "https://x.com/" },
  { label: "Instagram", href: "https://www.instagram.com/" },
  { label: "YouTube", href: "https://www.youtube.com/" },
];

const faqs = [
  {
    question: "How much does a website project cost?",
    answer: "Every project is scoped to your goals, so pricing varies. A focused static website typically starts lower, while custom web applications and platforms are quoted based on features and complexity. We provide a clear, detailed estimate before any work begins.",
  },
  {
    question: "How long does it take to build a website?",
    answer: "A marketing or static website usually takes 2–4 weeks. Larger web applications and e-commerce builds typically run 6–12 weeks depending on scope. We share a realistic timeline up front and keep you updated at every milestone.",
  },
  {
    question: "Do you work with startups and small businesses?",
    answer: "Absolutely. We partner with everyone from early-stage startups to established enterprises. Our approach flexes to fit your stage and budget, without compromising on quality or performance.",
  },
  {
    question: "Do you offer ongoing support and maintenance?",
    answer: "Yes. After launch we offer flexible support plans covering updates, security, performance monitoring, SEO and new feature development — so your product keeps improving long after day one.",
  },
  {
    question: "What technologies do you work with?",
    answer: "We build with modern, proven tools including React, Next.js, Node.js, TypeScript, PostgreSQL, AWS and Docker. We choose the stack that best fits your project rather than forcing a one-size-fits-all solution.",
  },
  {
    question: "Can you help improve my search rankings?",
    answer: "Definitely. Our SEO service covers technical optimization, on-page strategy, content guidance and analytics. We focus on sustainable growth that turns search visibility into real, measurable business results.",
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
            Have a project in mind or just want to explore an idea? Tell us what you&rsquo;re working on and our team will get back to you within 24 hours.
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

            <h2>Reach Us Anytime</h2>

            <p className="contact-info__lead">
              Fill out the form and our team will get back to you within one business day.
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

            <div className="contact-info__socials">
              <span>Follow us</span>

              <ul>
                {socials.map(({ label, href }) => (
                  <li key={label}>
                    <a
                      href={href}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={`${label} (opens in a new tab)`}
                    >
                      {label}
                      <ArrowIcon />
                    </a>
                  </li>
                ))}
              </ul>
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
