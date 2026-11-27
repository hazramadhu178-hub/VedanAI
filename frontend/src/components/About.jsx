import { SectionLabel } from "./Shared.jsx";

const gallery = [
  {
    src: "/images/about-robotics.webp",
    alt: "Industrial robotic arm in a modern automated workspace",
    tag: "01 / WEB DEVELOPMENT",
    title: "Responsive Web Apps",
    variant: "wide",
  },
  {
    src: "/images/about-humanoid.webp",
    alt: "Humanoid robot representing human-centered interface design",
    tag: "02 / UI ENGINEERING",
    title: "Modern Interfaces",
    variant: "center",
  },
  {
    src: "/images/about-processor.webp",
    alt: "Computer processor and circuit board representing scalable software systems",
    tag: "03 / BACKEND SYSTEMS",
    title: "Scalable Architecture",
    variant: "wide",
  },
  {
    src: "/images/news-interface.webp",
    alt: "Abstract illuminated technology ring representing search optimization",
    tag: "04 / SEO GROWTH",
    title: "Search Optimization",
    variant: "center",
  },
  {
    src: "/images/news-compute.webp",
    alt: "Futuristic computer hardware module representing cloud infrastructure",
    tag: "05 / DEPLOYMENT",
    title: "Cloud Infrastructure",
    variant: "wide",
  },
];

function MarqueeTrack({ items, hidden = false }) {
  return (
    <div className="about-marquee__track" aria-hidden={hidden || undefined}>
      {items.map((image, index) => (
        <figure
          className={`about-gallery__frame about-gallery__frame--${image.variant} about-gallery__frame--${(index % 3) + 1}`}
          key={`${hidden ? "dup" : "main"}-${image.src}`}
        >
          <img src={image.src} alt={hidden ? "" : image.alt} loading="lazy" decoding="async" />
          <div className="about-gallery__sheen" aria-hidden="true" />
          <figcaption className="about-gallery__overlay">
            <span className="about-gallery__tag">{image.tag}</span>
            <strong className="about-gallery__title">{image.title}</strong>
          </figcaption>
        </figure>
      ))}
    </div>
  );
}

export default function About() {
  return (
    <section className="about-section" id="about" aria-labelledby="about-heading">
      <div className="site-container about-section__intro" data-reveal>
        <SectionLabel>Who We Are</SectionLabel>
        <h2 id="about-heading">We Help Businesses Grow and Scale with Smart, Modern Software</h2>
      </div>
      <div className="about-marquee" aria-label="A closer look at our technology">
        <div className="about-marquee__viewport">
          <MarqueeTrack items={gallery} />
          <MarqueeTrack items={gallery} hidden />
        </div>
      </div>
    </section>
  );
}