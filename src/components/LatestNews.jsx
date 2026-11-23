import { useCallback, useState } from "react";
import { ArrowIcon, ButtonLink, SectionLabel } from "./Shared.jsx";
import ContentModal from "./ContentModal.jsx";

const articles = [
  {
    title: "How Web Development Is Transforming Modern Business Operations",
    description: "A practical look at the modern websites and web apps helping ambitious teams do more with less and create room for what comes next.",
    image: "/images/news-compute.webp",
    category: "Web Development",
    date: "March 24, 2026",
    details: ["Modern web development is moving beyond simple pages and into the everyday work of growing businesses. The biggest opportunities often start with small, focused improvements to speed and usability.", "From responsive design to performance tuning, thoughtful engineering helps people find what they need and gives teams more time to focus on the work that matters."],
  },
  {
    title: "Static Websites vs. Dynamic Sites: Which Is Best for Your Business?",
    description: "The most effective websites combine fast static delivery with the flexibility modern businesses need.",
    image: "/images/about-humanoid.webp",
    category: "Static Websites",
    date: "April 17, 2026",
    details: ["The question is no longer whether to choose static or dynamic. Great websites are built by knowing what each does best.", "Static sites deliver speed and security instantly, while dynamic systems bring flexibility for content and commerce."],
  },
  {
    title: "How Brands Use SEO to Increase Traffic and Sales",
    description: "Explore how technical SEO, content strategy, and analytics can turn search visibility into better business results.",
    image: "/images/news-interface.webp",
    category: "SEO Service",
    date: "March 11, 2026",
    details: ["Modern search is about understanding what people need, not simply publishing more pages.", "When technical SEO, content strategy, and analytics work together, brands can build more relevant experiences at every step of the journey."],
  },
];

export default function LatestNews() {
  const [selectedArticle, setSelectedArticle] = useState(null);
  const closeModal = useCallback(() => setSelectedArticle(null), []);

  return (
    <section className="news-section" id="news" aria-labelledby="news-heading">
      <div className="site-container news-section__grid">
        <div className="news-section__intro" data-reveal>
          <SectionLabel>Our Latest News</SectionLabel>
          <h2 id="news-heading">Our Latest<br />News</h2>
          <ButtonLink href="#news-articles">VIEW MORE BLOG</ButtonLink>
        </div>
        <div className="news-articles" id="news-articles">
          {articles.map((article, index) => (
            <article className={`news-card ${index === 0 ? "news-card--featured" : ""}`} key={article.title} data-reveal>
              <button className="news-card__image" type="button" onClick={() => setSelectedArticle(article)} aria-label={`Read ${article.title}`}>
                <img src={article.image} alt="" />
              </button>
              <div className="news-card__body">
                <p className="news-card__meta"><span>{article.category}</span><span>{article.date}</span></p>
                <h3>{article.title}</h3>
                {index === 0 && <p className="news-card__description">{article.description}</p>}
                <button className="news-card__link" type="button" onClick={() => setSelectedArticle(article)}>READ MORE <ArrowIcon /></button>
              </div>
            </article>
          ))}
        </div>
      </div>
      <ContentModal item={selectedArticle} label="VedanAI Insights" onClose={closeModal} />
    </section>
  );
}