import Icon from "./Icons.jsx";
import { SectionLabel } from "./Shared.jsx";

const industries = [
  { name: "Healthcare", icon: "heart", description: "Better care through intelligent insights." },
  { name: "Marketing", icon: "chart", description: "Closer connections with every customer." },
  { name: "E-commerce", icon: "bag", description: "Smarter shopping, from start to finish." },
  { name: "Finance", icon: "finance", description: "Faster decisions with clarity and trust." },
  { name: "Manufacturing", icon: "factory", description: "More resilient, efficient operations." },
];

function IndustriesTrack({ hidden = false }) {
  return (
    <div className="industries-marquee__track" aria-hidden={hidden || undefined}>
      {industries.map(({ name, icon, description }) => (
        <div className="industry-card" key={`${hidden ? "dup" : "main"}-${name}`}>
          <span className="industry-card__icon icon-disc">
            <Icon name={icon} />
          </span>
          <h3>{name}</h3>
          <p>{description}</p>
        </div>
      ))}
    </div>
  );
}

export default function Industries() {
  return (
    <section className="industries-section" aria-labelledby="industries-heading">
      <div className="site-container">
        <div className="industries-section__intro" data-reveal>
          <SectionLabel>Industries Served</SectionLabel>
          <h2 id="industries-heading">Industries We Serve</h2>
        </div>
      </div>
      <div className="industries-marquee" role="marquee" aria-label="Industries we serve, continuously scrolling">
        <div className="industries-marquee__viewport">
          <IndustriesTrack />
          <IndustriesTrack hidden />
        </div>
      </div>
    </section>
  );
}
