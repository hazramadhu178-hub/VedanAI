import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import "./styles/global.css";
import "./styles/aero-background.css";
import "./styles/preloader.css";
import "./styles/navbar.css";
import "./styles/hero.css";
import "./styles/sections.css";
import "./styles/services.css";
import "./styles/about.css";
import "./styles/contact.css";
import "./styles/comingsoon.css";
import "./styles/maintenance.css";
import "./styles/projects.css";
import "./styles/footer.css";

// A page refresh always starts the website at the home section.
window.history.replaceState(null, "", "/#home");

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <App />
  </StrictMode>,
);