import { ButtonLink, responsiveImageProps } from "./Shared.jsx";
import ServiceCards from "./ServiceCards.jsx";

const partners = ["OpenAI", "Microsoft", "NVIDIA", "Google Cloud", "AWS", "Anthropic"];

export default function Hero() {
  return (
    <section className="hero" id="home" aria-labelledby="hero-title">
      <div className="hero__content site-container">
        <div className="hero__copy">
          <p className="hero__eyebrow">VedanAI <span>/</span> SOFTWARE DEVELOPMENT STUDIO</p>
          <h1 id="hero-title">
            Empower Your Business
            <br />
            With Smarter Software.
          </h1>
          <p className="hero__description">
            Unlock growth and efficiency with tailored software solutions. We use modern web development, backend engineering and data-driven strategies to help you innovate and scale.
          </p>
          <div className="hero__cta-wrap">
            <span className="hero__cta-glow" aria-hidden="true" />
            <ButtonLink to="/contact">BEGIN TODAY WITH US</ButtonLink>
          </div>
        </div>
      </div>

      <figure className="hero__hands">
        <img
          src="/images/hero-hands.webp"
          {...responsiveImageProps(
            "/images/hero-hands.webp",
            "(max-width: 1240px) 100vw, 1240px"
          )}
          alt="A metallic robotic hand and a human hand reaching toward each other"
          fetchPriority="high"
          loading="eager"
          decoding="sync"
        />
      </figure>

      <div className="hero__trust site-container">
        <p>Trusted by teams of every scale</p>
        <ul>
          {partners.map((partner) => (
            <li key={partner}>{partner}</li>
          ))}
        </ul>
      </div>

      <ServiceCards />
    </section>
  );
}
