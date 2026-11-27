import { Link } from "react-router-dom";
import Icon from "../components/Icons.jsx";
import { ArrowIcon, ButtonLink } from "../components/Shared.jsx";
import MaintenanceSection from "../components/MaintenanceSection.jsx";
import "../styles/services.css";
import "../styles/maintenance.css";

const checks = ["Project-scoped", "Responsive layouts", "Technical foundations"];
const technologies = ["React", "Vite", "JavaScript", "CSS"];

const features = [
  {
    title: "Web Development",
    description: "Websites and web applications planned around project requirements, content, users, and the features to be delivered.",
    icon: "chart",
    preview: "analytics",
    slug: "web-development",
    wide: true,
  },
  {
    title: "Static Websites",
    description: "Responsive static websites with focused page structures, clear content, and performance-conscious asset delivery.",
    icon: "automation",
    preview: "schedule",
    slug: "static-website-design",
    wide: true,
  },
  {
    title: "Backend Development",
    description: "Server-side functionality and API development scoped to the needs of a website or application.",
    icon: "network",
    preview: "team",
    slug: "backend-development",
    wide: true,
  },
  {
    title: "SEO Service",
    description: "Technical and on-page website improvements that support search engine discovery and help users understand site content.",
    icon: "spark",
    preview: "chat",
    slug: "seo-digital-growth",
    wide: true,
  },
];

const benefits = [
  {
    title: "Project-specific scope",
    description: "Requirements guide the proposed work, implementation choices, and delivery plan.",
    icon: "shield",
  },
  {
    title: "Responsive implementation",
    description: "Page layouts and interface behavior are developed with mobile and desktop use in mind.",
    icon: "automation",
  },
  {
    title: "Maintainable code",
    description: "Implementation choices consider the structure and ongoing needs of the website or application.",
    icon: "layers",
  },
  {
    title: "Technical foundations",
    description: "Page structure, metadata, and application behavior are considered as part of the project.",
    icon: "chart",
  },
  {
    title: "Search considerations",
    description: "Technical and on-page SEO can be included in the scope when relevant.",
    icon: "spark",
  },
];

const benefitChips = ["Project-specific", "Responsive design", "Maintainable code", "Technical SEO"];

function CheckIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="m5 12.5 4.2 4.2L19 7" />
    </svg>
  );
}

function MiniChart() {
  return (
    <svg className="services-mini-chart" viewBox="0 0 180 54" aria-hidden="true">
      <path d="M4 44 C28 38 34 24 52 28 S82 40 98 26 S132 8 176 12" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
      <path d="M4 50 H176" stroke="currentColor" strokeWidth="1" opacity=".25" />
      <circle cx="98" cy="26" r="3.5" fill="currentColor" />
    </svg>
  );
}

function FeaturePreview({ type }) {
  if (type === "analytics") {
    return (
      <div className="service-preview service-preview--analytics" aria-hidden="true">
        <div className="service-preview__row">
          <span>Website structure</span>
          <strong>Pages</strong>
        </div>
        <MiniChart />
        <div className="service-preview__bars">
          <span style={{ height: "34%" }} /><span style={{ height: "58%" }} /><span style={{ height: "44%" }} /><span style={{ height: "76%" }} /><span style={{ height: "62%" }} /><span style={{ height: "92%" }} />
        </div>
        <div className="service-preview__metric">
          <span>Focus</span>
          <strong>Clear navigation</strong>
        </div>
      </div>
    );
  }

  if (type === "schedule") {
    return (
      <div className="service-preview service-preview--schedule" aria-hidden="true">
        <div className="service-preview__tabs"><span className="is-active">Structure</span><span>Content</span><span>Review</span></div>
        <div className="service-preview__schedule-row"><span className="service-preview__dot" /><div><strong>Page layout</strong><small>Responsive structure</small></div><span className="service-preview__status">Plan</span></div>
        <div className="service-preview__schedule-row"><span className="service-preview__dot service-preview__dot--blue" /><div><strong>Image assets</strong><small>Delivery and dimensions</small></div><span className="service-preview__status service-preview__status--blue">Review</span></div>
      </div>
    );
  }

  if (type === "team") {
    return (
      <div className="service-preview service-preview--team" aria-hidden="true">
        <div className="service-preview__avatars">
          <span>API</span><span>Data</span><span>App</span>
        </div>
        <div className="service-preview__invite"><strong>Backend project areas</strong><span>Routes, logic, and integrations</span></div>
        <span className="service-preview__invite-button">Project scope</span>
      </div>
    );
  }

  if (type === "chat") {
    return (
      <div className="service-preview service-preview--chat" aria-hidden="true">
        <div className="service-preview__chat-head"><span>Technical SEO</span><span>Review areas</span></div>
        <div className="service-preview__bubble service-preview__bubble--left"><span>Page titles and descriptions</span></div>
        <div className="service-preview__bubble service-preview__bubble--right"><span>Internal links and crawlable structure</span></div>
        <div className="service-preview__bubble service-preview__bubble--left"><span>Structured data aligned with page content</span></div>
      </div>
    );
  }

  return (
    <div className="service-preview service-preview--dashboard" aria-hidden="true">
      <div className="service-preview__dashboard-head"><span>Website review</span><span>Example</span></div>
      <div className="service-preview__dashboard-grid">
        <div><span>Pages</span><strong>Content</strong><small>Structure</small></div>
        <div><span>Interface</span><strong>Layout</strong><small>Responsive</small></div>
        <div><span>Metadata</span><strong>Titles</strong><small>Review</small></div>
      </div>
      <MiniChart />
    </div>
  );
}

export default function ServicesPage() {
  return (
    <section className="services-page" id="services" aria-labelledby="services-heading">
      <div className="site-container services-page__inner">
        <div className="services-hero" data-reveal>
          <p className="services-pill">VedanAI Software Services</p>
          <h1 id="services-heading">Web, Backend &amp; SEO<br />Services for Your Project</h1>
          <p className="services-lead">Explore web development, static website design, backend engineering, and technical SEO services.</p>
          <ul className="services-checks">
            {checks.map((check) => <li key={check}><CheckIcon />{check}</li>)}
          </ul>
          <div className="services-actions">
            <ButtonLink to="#services-features">EXPLORE SERVICES</ButtonLink>
            <Link className="services-ghost-button" to="/contact">Discuss a Project <ArrowIcon /></Link>
          </div>

          <div className="services-trust">
            <p>Technologies used on this website</p>
            <ul>{technologies.map((technology) => <li key={technology}>{technology}</li>)}</ul>
          </div>
        </div>

        <div className="services-features" id="services-features" data-reveal>
          <p className="services-section-label">Valuable Services</p>
          <h2>Services Shaped Around Project Requirements</h2>
          <p className="services-section-lead">Explore the focus and scope of each service. Implementation details are agreed for each project.</p>
          <div className="services-feature-grid">
            {features.map((feature) => (
              <article className={`service-feature-card ${feature.wide ? "service-feature-card--wide" : ""}`} key={feature.title}>
                <div className="service-feature-card__head">
                  <h3>{feature.title}</h3>
                  <span className="service-feature-card__icon"><Icon name={feature.icon} /></span>
                </div>
                <p>{feature.description}</p>
                <FeaturePreview type={feature.preview} />
                <Link className="service-feature-card__link" to={`/services/${feature.slug}`}>
                  Explore {feature.title} <ArrowIcon />
                </Link>
              </article>
            ))}
          </div>
        </div>

        <MaintenanceSection />

        <div className="services-benefits" data-reveal>
          <div className="services-benefits__intro">
            <p className="services-section-label">Benefits</p>
            <h2>Clear Scope,<br />Thoughtful Implementation</h2>
            <p>Each project is discussed and scoped around its requirements and intended users.</p>
            <ul className="services-benefits__chips">
              {benefitChips.map((chip) => <li key={chip}>{chip}</li>)}
            </ul>
          </div>
          <div className="services-benefits__list">
            {benefits.map((benefit) => (
              <article className="service-benefit" key={benefit.title}>
                <span className="service-benefit__icon"><Icon name={benefit.icon} /></span>
                <div>
                  <h3>{benefit.title}</h3>
                  <p>{benefit.description}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
