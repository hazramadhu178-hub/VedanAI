export const services = [
  {
    slug: "web-development",
    metaTitle: "Web Development Services | VedanAI",
    name: "Web Development",
    title: "Custom Web Development",
    description:
      "Websites and web applications planned around project requirements, content, users, and the features to be delivered.",
    intro:
      "VedanAI develops websites and web applications with attention to interface structure, responsive behavior, and maintainable implementation. The scope and technology choices depend on the needs of each project.",
    sections: [
      {
        title: "What web development can include",
        items: [
          "Business websites and landing pages",
          "Interactive React interfaces and web application features",
          "Responsive page layouts and reusable components",
          "Integration with backend services and APIs",
        ],
      },
      {
        title: "A clear path from brief to build",
        items: [
          "Discuss project goals, content, users, and requirements",
          "Plan the page structure and implementation approach",
          "Develop and review the agreed functionality",
          "Prepare the website or application for launch",
        ],
      },
    ],
    technologyNote:
      "This website uses React, Vite, JavaScript, and CSS. Technology choices for other projects depend on their requirements.",
    faqs: [
      {
        question: "Can you build a website or a web application?",
        answer:
          "Yes. Project scope can range from a business website to an interactive web application, depending on the requirements.",
      },
      {
        question: "Can a project connect to an existing backend?",
        answer:
          "Integration can be discussed during scoping. The available options depend on the existing API and the requested functionality.",
      },
    ],
  },
  {
    slug: "static-website-design",
    metaTitle: "Static Website Design | VedanAI",
    name: "Static Website Design",
    title: "Static Website Design",
    description:
      "Responsive static websites with focused page structures, clear content, and performance-conscious asset delivery.",
    intro:
      "A static website can be a straightforward fit for marketing pages, portfolios, and other content that does not require server-rendered page content. VedanAI plans the page structure and implementation around the project's needs.",
    sections: [
      {
        title: "What a static website can include",
        items: [
          "Landing pages and small business websites",
          "Responsive layouts for mobile and desktop",
          "Content sections and navigation planned for the audience",
          "Optimized image delivery and page metadata",
        ],
      },
      {
        title: "How the work is scoped",
        items: [
          "Identify required pages, content, and interactions",
          "Agree on the visual direction and page structure",
          "Build and test the responsive website",
          "Review deployment and content update needs",
        ],
      },
    ],
    technologyNote:
      "The implementation approach is selected for the project. This website's frontend is built with React, Vite, JavaScript, and CSS.",
    faqs: [
      {
        question: "When is a static website a suitable option?",
        answer:
          "It can suit sites whose pages mostly present content and do not need personalized or frequently changing server-generated content.",
      },
      {
        question: "Can static pages include interactive features?",
        answer:
          "Yes. Client-side interactions can be added where appropriate; the required behavior and any integrations are defined during scoping.",
      },
    ],
  },
  {
    slug: "backend-development",
    metaTitle: "Backend Development Services | VedanAI",
    name: "Backend Development",
    title: "Backend Development",
    description:
      "Server-side functionality and API development scoped to the needs of a website or application.",
    intro:
      "Backend development covers the server-side logic that supports an application. VedanAI can help define API behavior, connect application features, and implement backend requirements in line with the agreed project scope.",
    sections: [
      {
        title: "Backend project areas",
        items: [
          "Server-side application logic",
          "REST API routes and request handling",
          "Integration between frontend features and backend services",
          "Error handling and validation for application workflows",
        ],
      },
      {
        title: "Requirements before implementation",
        items: [
          "Review the application and its expected users",
          "Define data flows, endpoints, and integrations",
          "Implement the agreed backend behavior",
          "Test the main request and response paths",
        ],
      },
    ],
    technologyNote:
      "The VedanAI project repository includes a Node.js and Express backend. The appropriate stack for another project depends on its existing system and requirements.",
    faqs: [
      {
        question: "Can you develop an API for an existing application?",
        answer:
          "API work can be scoped for existing applications. Requirements depend on the current architecture and the functionality needed.",
      },
      {
        question: "Do backend projects always need a database?",
        answer:
          "Not necessarily. Data storage needs depend on the application and its workflows; these are reviewed as part of project scoping.",
      },
    ],
  },
  {
    slug: "seo-digital-growth",
    metaTitle: "Technical SEO Services | VedanAI",
    name: "SEO & Digital Growth",
    title: "Technical SEO & Digital Growth",
    description:
      "Technical and on-page website improvements that support search engine discovery and help users understand site content.",
    intro:
      "VedanAI's SEO work focuses on the website itself: crawlable structure, useful metadata, clear page content, and technical details that help search engines interpret pages. Search rankings and traffic are not guaranteed and depend on many factors beyond implementation.",
    sections: [
      {
        title: "Technical and on-page areas",
        items: [
          "Page titles, descriptions, and canonical URLs",
          "Internal links and crawlable page structure",
          "Image alternatives and responsive image delivery",
          "Structured data that accurately reflects visible content",
        ],
      },
      {
        title: "A site-specific review",
        items: [
          "Review the existing pages and their purpose",
          "Identify relevant technical and content issues",
          "Prioritize changes based on the site and scope",
          "Implement and verify agreed updates",
        ],
      },
    ],
    technologyNote:
      "This website uses route-specific metadata, canonical URLs, responsive image sources, and JSON-LD structured data. Other site recommendations depend on an audit.",
    faqs: [
      {
        question: "Can SEO guarantee a specific search ranking?",
        answer:
          "No. Search rankings depend on competition, content, site quality, and search engine systems. SEO work can improve technical and on-page foundations but cannot guarantee a position.",
      },
      {
        question: "Can technical SEO be applied to an existing site?",
        answer:
          "Yes. The work begins with reviewing the existing site and agreeing which technical or on-page changes are appropriate.",
      },
    ],
  },
];

export const servicesBySlug = Object.fromEntries(
  services.map((service) => [service.slug, service])
);
