
import { lazy, Suspense, useCallback, useEffect, useState } from "react";
import { Navigate, Route, Routes, useLocation } from "react-router-dom";

import Preloader from "./components/Preloader.jsx";
import AeroBackground from "./components/AeroBackground.jsx";
import Navbar from "./components/Navbar.jsx";
import Footer from "./components/Footer.jsx";
import { services, servicesBySlug } from "./serviceCatalog.js";

const AboutPage = lazy(() => import("./pages/AboutPage.jsx"));
const ContactPage = lazy(() => import("./pages/ContactPage.jsx"));
const HomePage = lazy(() => import("./pages/HomePage.jsx"));
const ProjectsPage = lazy(() => import("./pages/ProjectsPage.jsx"));
const ServicesPage = lazy(() => import("./pages/ServicesPage.jsx"));
const ServiceDetailPage = lazy(() => import("./pages/ServiceDetailPage.jsx"));

const pageMetadata = {
  home: {
    title: "VedanAI | Web Development, Backend & SEO",
    description:
      "VedanAI provides web development, backend engineering, static website design, and technical SEO services.",
    path: "/",
  },
  about: {
    title: "About VedanAI | Software Development Studio",
    description:
      "Learn about VedanAI's web development, backend engineering, and technical SEO services and project approach.",
    path: "/about",
  },
  services: {
    title: "Web Development, Backend & SEO Services | VedanAI",
    description:
      "Explore VedanAI's web development, static website design, backend development, and technical SEO services.",
    path: "/services",
  },
  projects: {
    title: "Illustrative Software Project Concepts | VedanAI",
    description:
      "Browse illustrative website, backend, commerce, and SEO project concepts. These examples are not published client case studies.",
    path: "/projects",
  },
  contact: {
    title: "Contact VedanAI | Start a Software Project",
    description:
      "Contact VedanAI about web development, backend engineering, static website design, or technical SEO.",
    path: "/contact",
  },
};

const organizationId = "https://vedanai.pages.dev/#organization";

export default function App() {
  const location = useLocation();
  const [loading, setLoading] = useState(true);

  const finishLoading = useCallback(() => setLoading(false), []);

  const pathname = location.pathname.replace(/\/+$/, "") || "/";
  const serviceSlug = pathname.startsWith("/services/")
    ? pathname.slice("/services/".length)
    : "";
  const service = servicesBySlug[serviceSlug];
  const page = {
    "/": "home",
    "/about": "about",
    "/services": "services",
    "/projects": "projects",
    "/contact": "contact",
  }[pathname] || (service ? "services" : "home");

  useEffect(() => {
    const metadata = service
      ? { ...service, title: service.metaTitle }
      : pageMetadata[page];
    document.title = metadata.title;
    document.querySelector('meta[name="description"]').setAttribute(
      "content",
      metadata.description
    );
    const canonicalPath = service ? `/services/${service.slug}` : metadata.path;
    const canonicalUrl = new URL(canonicalPath, "https://vedanai.pages.dev").href;
    document.querySelector('link[rel="canonical"]').setAttribute("href", canonicalUrl);
    document.querySelector('meta[property="og:title"]').setAttribute("content", metadata.title);
    document.querySelector('meta[property="og:description"]').setAttribute("content", metadata.description);
    document.querySelector('meta[property="og:url"]').setAttribute("content", canonicalUrl);
    document.querySelector('meta[name="twitter:title"]').setAttribute("content", metadata.title);
    document.querySelector('meta[name="twitter:description"]').setAttribute("content", metadata.description);
  }, [page, service]);

  useEffect(() => {
    const scriptId = "vedanai-services-structured-data";
    let script = document.getElementById(scriptId);
    const routeServices = service ? [service] : page === "services" ? services : [];

    if (!routeServices.length) {
      script?.remove();
      return;
    }

    if (!script) {
      script = document.createElement("script");
      script.id = scriptId;
      script.type = "application/ld+json";
      document.head.appendChild(script);
    }

    const graph = routeServices.map((item) => ({
      "@type": "Service",
      "@id": `https://vedanai.pages.dev/services/${item.slug}#service`,
      name: item.name,
      serviceType: item.name,
      description: item.description,
      url: `https://vedanai.pages.dev/services/${item.slug}`,
      provider: { "@id": organizationId },
    }));

    if (service) {
      graph.push({
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Home", item: "https://vedanai.pages.dev/" },
          { "@type": "ListItem", position: 2, name: "Services", item: "https://vedanai.pages.dev/services" },
          { "@type": "ListItem", position: 3, name: service.name, item: `https://vedanai.pages.dev/services/${service.slug}` },
        ],
      });
    }

    script.textContent = JSON.stringify({
      "@context": "https://schema.org",
      "@graph": graph,
    });
  }, [page, service]);

  useEffect(() => {
    const targetId = location.hash.slice(1);

    if (!targetId) {
      window.scrollTo({ top: 0, behavior: "instant" });
      return;
    }

    const timeout = window.setTimeout(() => {
      const target = document.getElementById(targetId);

      if (target) {
        target.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
      } else {
        window.scrollTo({ top: 0, behavior: "instant" });
      }
    }, 100);

    return () => window.clearTimeout(timeout);
  }, [location.pathname, location.hash]);

  useEffect(() => {
    const elements = [...document.querySelectorAll("[data-reveal]")];
    const reducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    if (reducedMotion || !window.IntersectionObserver) {
      elements.forEach((element) => {
        element.classList.remove("will-reveal");
        element.classList.add("is-visible");
      });
      return undefined;
    }

    const viewportH = window.innerHeight || 900;

    elements.forEach((element, idx) => {
      const rect = element.getBoundingClientRect();

      element.style.setProperty(
        "--reveal-delay",
        `${(idx % 3) * 70}ms`
      );

      if (rect.top > viewportH * 0.96) {
        element.classList.remove("is-visible");
        element.classList.add("will-reveal");
      } else {
        element.classList.remove("will-reveal");
        element.classList.add("is-visible");
      }
    });

    const revealObserver = new IntersectionObserver(
      (entries, observer) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.remove("will-reveal");
            entry.target.classList.add("is-visible");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.06, rootMargin: "0px 0px -30px 0px" }
    );

    elements.forEach((element) => {
      if (element.classList.contains("will-reveal")) {
        revealObserver.observe(element);
      }
    });

    return () => revealObserver.disconnect();
  }, [page]);

  useEffect(() => {
    if (!window.IntersectionObserver) return undefined;

    const reducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    const sections = [
      ...document.querySelectorAll("main > section, .site-footer"),
    ];

    const syncSvgs = (section, running) => {
      if (section.classList.contains("visualizer-section")) return;

      section.querySelectorAll("svg").forEach((svg) => {
        if (running && !reducedMotion) {
          svg.unpauseAnimations?.();
        } else {
          svg.pauseAnimations?.();
        }
      });
    };

    const viewportObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const active = entry.isIntersecting;

          entry.target.classList.toggle("is-offscreen", !active);
          syncSvgs(entry.target, active);
        });
      },
      { rootMargin: "220px 0px" }
    );

    sections.forEach((section) => viewportObserver.observe(section));

    return () => viewportObserver.disconnect();
  }, [page]);

  return (
    <>
      <AeroBackground paused={loading} />

      {loading && <Preloader onFinish={finishLoading} />}

      <div
        className={`site-shell ${loading ? "" : "site-shell--ready"}`}
        inert={loading || undefined}
        aria-busy={loading}
      >
        <Navbar page={page} />

        <Suspense fallback={null}>
          <main>
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/about" element={<AboutPage />} />
              <Route path="/services" element={<ServicesPage />} />
              <Route path="/services/:slug" element={<ServiceDetailPage />} />
              <Route path="/projects" element={<ProjectsPage />} />
              <Route path="/contact" element={<ContactPage />} />
              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
          </main>
          <Footer />
        </Suspense>
      </div>
    </>
  );
}
