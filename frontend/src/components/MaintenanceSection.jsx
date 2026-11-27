import Icon from "./Icons.jsx";
import { ArrowIcon, ButtonLink, SectionLabel } from "./Shared.jsx";

const careFeatures = [
  { title: "Update planning", description: "Review update requirements and compatibility for the project.", icon: "automation" },
  { title: "Monitoring setup", description: "Discuss monitoring options appropriate to the website and hosting.", icon: "chart" },
  { title: "Backup planning", description: "Define backup needs and recovery steps for the project.", icon: "shield" },
  { title: "Performance review", description: "Review website performance as part of an agreed maintenance scope.", icon: "spark" },
];

function AreaChart() {
  return (
    <svg className="maint-chart" viewBox="0 0 560 190" preserveAspectRatio="none" aria-hidden="true">
      <defs>
        <linearGradient id="maintFill" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#00eea6" stopOpacity=".45" />
          <stop offset="1" stopColor="#00eea6" stopOpacity="0" />
        </linearGradient>
        <linearGradient id="maintLine" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0" stopColor="#00eea6" />
          <stop offset="1" stopColor="#25cde8" />
        </linearGradient>
      </defs>
      {[30, 75, 120, 165].map((y) => (
        <line key={y} x1="0" y1={y} x2="560" y2={y} stroke="rgba(148,184,236,.12)" strokeWidth="1" />
      ))}
      <path
        d="M0 150 C60 140 80 110 130 118 S210 150 260 96 S330 74 380 88 S470 46 560 34 L560 190 L0 190 Z"
        fill="url(#maintFill)"
      />
      <path
        d="M0 150 C60 140 80 110 130 118 S210 150 260 96 S330 74 380 88 S470 46 560 34"
        fill="none"
        stroke="url(#maintLine)"
        strokeWidth="3"
        strokeLinecap="round"
      />
      <circle className="maint-chart__dot" cx="380" cy="88" r="5" fill="#00eea6" />
      <circle className="maint-chart__dot maint-chart__dot--end" cx="560" cy="34" r="6" fill="#25cde8" />
    </svg>
  );
}

function Bars() {
  const heights = [42, 58, 36, 70, 52, 82, 64, 94, 72, 88];
  return (
    <div className="maint-bars" aria-hidden="true">
      {heights.map((height, index) => (
        <span key={index} style={{ height: `${height}%` }} className={index === heights.length - 1 ? "maint-bars__bar maint-bars__bar--active" : "maint-bars__bar"} />
      ))}
    </div>
  );
}

export default function MaintenanceSection() {
  return (
    <section className="maintenance-section" id="maintenance" aria-labelledby="maintenance-heading">
      <div className="maintenance-section__inner">
        <div className="maintenance-copy" data-reveal>
          <SectionLabel>Optional Project Scope</SectionLabel>
          <h2 id="maintenance-heading">Maintenance<br />&amp; Support</h2>
          <p className="maintenance-copy__lead">
            Website maintenance and support requirements can be discussed and scoped for your project.
          </p>

          <ul className="maintenance-features">
            {careFeatures.map(({ title, description, icon }) => (
              <li key={title}>
                <span className="maintenance-features__icon"><Icon name={icon} /></span>
                <div>
                  <strong>{title}</strong>
                  <span>{description}</span>
                </div>
              </li>
            ))}
          </ul>

          <ButtonLink to="/contact">DISCUSS MAINTENANCE</ButtonLink>
        </div>

        {/* ---------- Live dashboard ---------- */}
        <div className="maintenance-dashboard" data-reveal aria-hidden="true">
          <div className="maintenance-dashboard__glow" aria-hidden="true" />

          <div className="maintenance-dashboard__head">
            <div className="maintenance-dashboard__dots" aria-hidden="true"><span /><span /><span /></div>
            <span className="maintenance-dashboard__title">Example dashboard</span>
            <span className="maintenance-dashboard__live"><i aria-hidden="true" />Illustrative</span>
          </div>

          <div className="maintenance-dashboard__stats">
            <div className="maint-stat">
              <span>Updates</span>
              <strong>Review</strong>
              <em className="maint-stat__up">Scope-specific</em>
            </div>
            <div className="maint-stat">
              <span>Monitoring</span>
              <strong>Optional</strong>
              <em className="maint-stat__up">Discussed per project</em>
            </div>
            <div className="maint-stat">
              <span>Backups</span>
              <strong>Planned</strong>
              <em className="maint-stat__live">Project scope</em>
            </div>
          </div>

          <div className="maintenance-dashboard__chart">
            <div className="maintenance-dashboard__chart-head">
              <span>Illustrative activity view</span>
              <span className="maint-legend"><i aria-hidden="true" />Example</span>
            </div>
            <AreaChart />
          </div>

          <div className="maintenance-dashboard__split">
            <div className="maint-bars-card">
              <span>Review areas</span>
              <Bars />
            </div>
            <ul className="maint-status">
              <li><span className="maint-status__dot maint-status__dot--ok" aria-hidden="true" /><span>Updates</span><strong>Review</strong></li>
              <li><span className="maint-status__dot maint-status__dot--ok" aria-hidden="true" /><span>Backups</span><strong>Plan</strong></li>
              <li><span className="maint-status__dot maint-status__dot--ok" aria-hidden="true" /><span>Performance</span><strong>Review</strong></li>
            </ul>
          </div>

          <div className="maintenance-dashboard__foot">
            <span><ArrowIcon /> Example maintenance scope</span>
            <span>Details depend on project</span>
          </div>
        </div>
      </div>
    </section>
  );
}
