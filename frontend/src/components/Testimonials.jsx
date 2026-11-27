import { SectionLabel } from "./Shared.jsx";

const testimonials = [
  {
    name: "Riya Mehta",
    role: "Manager, Trendora",
    avatar: "/images/avatar-riya.jpg",
    source: "GoodFirms",
    quote: "We saw a big boost in engagement and sales with our new website. It loads fast, looks great, and the shopping experience feels perfect.",
  },
  {
    name: "Miguel Torres",
    role: "COO, Founder - DataFlow",
    avatar: "/images/avatar-miguel.jpg",
    source: "Clutch",
    quote: "Their SEO and development work saved us hours each week. Our rankings improved quickly, the site is fast, and results keep growing.",
  },
  {
    name: "Sebastian Clark",
    role: "Manager, SwiftLogic",
    avatar: "/images/avatar-sebastian.jpg",
    source: "Clutch",
    quote: "Their backend team saved us countless hours. Tasks that took days are now handled automatically. The ROI was almost immediate.",
  },
];

function Rating({ source }) {
  return (
    <div className="testimonial-rating" aria-label={`5 out of 5 stars on ${source}`}>
      <svg viewBox="0 0 20 20" aria-hidden="true"><path d="m10 1.5 2.65 5.37 5.93.86-4.29 4.18 1.01 5.91L10 15.03l-5.3 2.79 1.01-5.91L1.42 7.73l5.93-.86L10 1.5Z" /></svg>
      <span>{source}</span><span className="testimonial-rating__score">5.0</span>
    </div>
  );
}

function TestimonialsTrack({ hidden = false }) {
  const looped = [...testimonials, ...testimonials];
  return (
    <div className="testimonials-marquee__track" aria-hidden={hidden || undefined}>
      {looped.map((testimonial, index) => (
        <figure className="testimonial-card" key={`${hidden ? "dup" : "main"}-${testimonial.name}-${index}`}>
          <Rating source={testimonial.source} />
          <blockquote>"{testimonial.quote}"</blockquote>
          <figcaption>
            <img src={testimonial.avatar} alt="" width="240" height="240" loading="lazy" decoding="async" />
            <span><strong>{testimonial.name}</strong><small>{testimonial.role}</small></span>
          </figcaption>
        </figure>
      ))}
    </div>
  );
}

export default function Testimonials() {
  return (
    <section className="testimonials-section" aria-labelledby="testimonials-heading">
      <div className="site-container">
        <div className="testimonials-section__intro" data-reveal>
          <SectionLabel>Our Testimonials</SectionLabel>
          <h2 id="testimonials-heading">Hear from Our Happy Customers</h2>
        </div>
      </div>
      <div className="testimonials-marquee" role="marquee" aria-label="Customer testimonials, continuously scrolling">
        <div className="testimonials-marquee__viewport">
          <TestimonialsTrack />
          <TestimonialsTrack hidden />
        </div>
      </div>
    </section>
  );
}
