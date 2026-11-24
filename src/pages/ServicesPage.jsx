import Icon from "../components/Icons.jsx";
import { ArrowIcon, ButtonLink } from "../components/Shared.jsx";
import MaintenanceSection from "../components/MaintenanceSection.jsx";

const checks = ["Customizable", "Peak Performance", "Top Security"];
const partners = ["OpenAI", "Microsoft", "NVIDIA", "Google Cloud", "AWS", "Anthropic"];

const features = [
  {
    title: "Web Development",
    description: "Custom websites and web apps built for speed and growth.",
    icon: "chart",
    preview: "analytics",
    wide: true,
  },
  {
    title: "Static Websites",
    description: "Lightning-fast static sites optimized for performance and SEO.",
    icon: "automation",
    preview: "schedule",
    wide: true,
  },
  {
    title: "Backend Development",
    description: "Scalable APIs, secure databases and reliable infrastructure.",
    icon: "network",
    preview: "team",
    wide: true,
  },
  {
    title: "SEO Service",
    description: "Boost rankings and turn search traffic into real customers.",
    icon: "spark",
    preview: "chat",
    wide: true,
  },
];

const benefits = [
  {
    title: "Expert Developers",
    description: "An expert engineering team ready to tackle your challenges with modern solutions and proven strategies.",
    icon: "shield",
  },
  {
    title: "Fast and Scalable",
    description: "Scale your business effortlessly with software designed to grow alongside your evolving needs.",
    icon: "automation",
  },
  {
    title: "Customizable for You",
    description: "Customize every build to perfectly align with your business's unique requirements and goals.",
    icon: "layers",
  },
  {
    title: "Maximum Efficiency",
    description: "Maximize efficiency with optimized code and clean architecture that eliminate bottlenecks.",
    icon: "chart",
  },
  {
    title: "SEO Optimized",
    description: "Every site ships with clean, search-friendly structure so you get found faster by customers.",
    icon: "spark",
  },
];

const benefitChips = ["Robust Security", "Customizable", "Responsive Design", "Fast Performance", "SEO Ready"];

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
          <span>Average Daily Sales</span>
          <strong>$41,379</strong>
        </div>
        <MiniChart />
        <div className="service-preview__bars">
          <span style={{ height: "34%" }} /><span style={{ height: "58%" }} /><span style={{ height: "44%" }} /><span style={{ height: "76%" }} /><span style={{ height: "62%" }} /><span style={{ height: "92%" }} />
        </div>
        <div className="service-preview__metric">
          <span>Revenue</span>
          <strong>$12,482.50</strong>
        </div>
      </div>
    );
  }

  if (type === "schedule") {
    return (
      <div className="service-preview service-preview--schedule" aria-hidden="true">
        <div className="service-preview__tabs"><span className="is-active">Team Briefing</span><span>Pending</span><span>Post</span></div>
        <div className="service-preview__schedule-row"><span className="service-preview__dot" /><div><strong>Product Launch Review</strong><small>10:00 AM - 11:30 AM</small></div><span className="service-preview__status">Ready</span></div>
        <div className="service-preview__schedule-row"><span className="service-preview__dot service-preview__dot--blue" /><div><strong>Client Sync</strong><small>2:00 PM - 3:00 PM</small></div><span className="service-preview__status service-preview__status--blue">Scheduled</span></div>
      </div>
    );
  }

  if (type === "team") {
    return (
      <div className="service-preview service-preview--team" aria-hidden="true">
        <div className="service-preview__avatars">
          <img src="/images/avatar-riya.jpg" alt="" />
          <img src="/images/avatar-miguel.jpg" alt="" />
          <img src="/images/avatar-sebastian.jpg" alt="" />
          <span>+8</span>
        </div>
        <div className="service-preview__invite"><strong>Invite friends to your company</strong><span>Share workspace access</span></div>
        <span className="service-preview__invite-button">Invite</span>
      </div>
    );
  }

  if (type === "chat") {
    return (
      <div className="service-preview service-preview--chat" aria-hidden="true">
        <div className="service-preview__chat-head"><span>Project Room</span><span>Today</span></div>
        <div className="service-preview__bubble service-preview__bubble--left"><img src="/images/avatar-riya.jpg" alt="" /><span>How can I help directly from the support team?</span></div>
        <div className="service-preview__bubble service-preview__bubble--right"><span>Connect with our support agents who are ready to assist.</span><img src="/images/avatar-miguel.jpg" alt="" /></div>
        <div className="service-preview__bubble service-preview__bubble--left"><img src="/images/avatar-sebastian.jpg" alt="" /><span>Great, I will update the workflow now.</span></div>
      </div>
    );
  }

  return (
    <div className="service-preview service-preview--dashboard" aria-hidden="true">
      <div className="service-preview__dashboard-head"><span>Dashboard</span><span>Live</span></div>
      <div className="service-preview__dashboard-grid">
        <div><span>Total Revenue</span><strong>$348,261</strong><small>+12.4%</small></div>
          <div><span>Active Users</span><strong>15,708.98</strong><small>+8.2%</small></div>
        <div><span>Automation</span><strong>98.4%</strong><small>Live</small></div>
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
          <p className="services-pill"><span>New</span> Smart Software Features</p>
          <h2 id="services-heading">Perfect Every Step<br />for Extraordinary Growth.<br />With Smart Software.</h2>
          <p className="services-lead">Enhance your digital presence with fast, reliable websites and targeted growth strategies.</p>
          <ul className="services-checks">
            {checks.map((check) => <li key={check}><CheckIcon />{check}</li>)}
          </ul>
          <div className="services-actions">
            <ButtonLink href="#services-features">EXPLORE SERVICES</ButtonLink>
            <a className="services-ghost-button" href="#contact">Request a Demo <ArrowIcon /></a>
          </div>

          <div className="services-trust">
            <p>Join 4,000+ companies already growing with us</p>
            <ul>{partners.map((partner) => <li key={partner}>{partner}</li>)}</ul>
          </div>
        </div>

        <div className="services-features" id="services-features" data-reveal>
          <p className="services-section-label">Valuable Services</p>
          <h2>Customizable Solutions for Every Need</h2>
          <p className="services-section-lead">Adapt our services to suit your unique business needs with flexible, scalable web solutions designed to grow with you.</p>
          <div className="services-feature-grid">
            {features.map((feature) => (
              <article className={`service-feature-card ${feature.wide ? "service-feature-card--wide" : ""}`} key={feature.title}>
                <div className="service-feature-card__head">
                  <h3>{feature.title}</h3>
                  <span className="service-feature-card__icon"><Icon name={feature.icon} /></span>
                </div>
                <p>{feature.description}</p>
                <FeaturePreview type={feature.preview} />
              </article>
            ))}
          </div>
        </div>

        <MaintenanceSection />

        <div className="services-benefits" data-reveal>
          <div className="services-benefits__intro">
            <p className="services-section-label">Benefits</p>
            <h2>Unlock a New Era of<br />Digital Excellence<br />and Growth</h2>
            <p>Unlock digital excellence and growth with our modern development and streamlined delivery.</p>
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
