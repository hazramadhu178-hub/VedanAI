import { Link, Navigate, useParams } from "react-router-dom";
import { ArrowIcon, ButtonLink, SectionLabel } from "../components/Shared.jsx";
import { servicesBySlug } from "../serviceCatalog.js";
import "../styles/services.css";

export default function ServiceDetailPage() {
  const { slug } = useParams();
  const service = servicesBySlug[slug];

  if (!service) return <Navigate to="/services" replace />;

  return (
    <article className="service-detail" aria-labelledby="service-detail-heading">
      <div className="site-container service-detail__inner">
        <nav className="service-detail__breadcrumbs" aria-label="Breadcrumb">
          <Link to="/">Home</Link>
          <span aria-hidden="true">/</span>
          <Link to="/services">Services</Link>
          <span aria-hidden="true">/</span>
          <span aria-current="page">{service.name}</span>
        </nav>

        <header className="service-detail__hero" data-reveal>
          <SectionLabel>VedanAI Services</SectionLabel>
          <h1 id="service-detail-heading">{service.title}</h1>
          <p>{service.intro}</p>
          <div className="service-detail__actions">
            <ButtonLink to="/contact">DISCUSS A PROJECT</ButtonLink>
            <Link className="services-ghost-button" to="/services">
              All services <ArrowIcon />
            </Link>
          </div>
        </header>

        <div className="service-detail__sections">
          {service.sections.map((section) => (
            <section className="service-detail__section" key={section.title}>
              <h2>{section.title}</h2>
              <ul>
                {section.items.map((item) => <li key={item}>{item}</li>)}
              </ul>
            </section>
          ))}
        </div>

        <section className="service-detail__technology">
          <h2>Technology and implementation</h2>
          <p>{service.technologyNote}</p>
        </section>

        <section className="service-detail__faq" aria-labelledby="service-faq-heading">
          <SectionLabel>Questions</SectionLabel>
          <h2 id="service-faq-heading">Frequently Asked Questions</h2>
          <div className="service-detail__faq-list">
            {service.faqs.map((faq) => (
              <details key={faq.question}>
                <summary>{faq.question}</summary>
                <p>{faq.answer}</p>
              </details>
            ))}
          </div>
        </section>

        <aside className="service-detail__cta">
          <div>
            <h2>Have a project in mind?</h2>
            <p>Share your requirements and discuss whether this service fits your project.</p>
          </div>
          <ButtonLink to="/contact">CONTACT VEDANAI</ButtonLink>
        </aside>
      </div>
    </article>
  );
}
