import About from "../components/About.jsx";
import AIVisualization from "../components/AIVisualization.jsx";
import Hero from "../components/Hero.jsx";
import Industries from "../components/Industries.jsx";
import LatestNews from "../components/LatestNews.jsx";
import Mission from "../components/Mission.jsx";
import Projects from "../components/Projects.jsx";
import Testimonials from "../components/Testimonials.jsx";
import TrustSection from "../components/TrustSection.jsx";

export default function HomePage() {
  return (
    <>
      <Hero />
      <About />
      <Mission />
      <Projects />
      <AIVisualization />
      <Industries />
      <TrustSection />
      <Testimonials />
      <LatestNews />
    </>
  );
}
