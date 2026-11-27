import Icon from "./Icons.jsx";
import { SectionLabel } from "./Shared.jsx";

const benefits = [
  { title: "Web development", description: "Custom web pages and applications.", icon: "automation" },
  { title: "Static website design", description: "Responsive pages and considered assets.", icon: "spark" },
  { title: "Backend development", description: "Server-side logic, APIs, and integrations.", icon: "chart" },
  { title: "SEO & digital growth", description: "Technical and on-page SEO.", icon: "layers" },
  { title: "Improved performance", description: "Performance-aware web delivery.", icon: "arrow" },
  { title: "Business growth", description: "Solutions shaped around project goals.", icon: "network" },
];

const platforms = ["React", "Vite", "JavaScript", "CSS", "Node.js", "Express"];

function MissionOrbit() {
  return (
    <div className="mission-orbit" aria-hidden="true">
      <svg viewBox="0 0 600 600" className="mission-orbit__svg">
        <defs>
          <linearGradient id="missionChipTop" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0" stopColor="#46f7d3" />
            <stop offset=".42" stopColor="#1fc6e8" />
            <stop offset=".78" stopColor="#2f6bf5" />
            <stop offset="1" stopColor="#3b5df0" />
          </linearGradient>
          <linearGradient id="missionChipEdge" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0" stopColor="#0ad9b5" />
            <stop offset=".5" stopColor="#1f9bf0" />
            <stop offset="1" stopColor="#2f57ef" />
          </linearGradient>
          <linearGradient id="missionSideL" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" stopColor="#14467e" />
            <stop offset="1" stopColor="#081c3f" />
          </linearGradient>
          <linearGradient id="missionSideR" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" stopColor="#2c5fe0" />
            <stop offset="1" stopColor="#0e2a63" />
          </linearGradient>
          <linearGradient id="missionInnerPlate" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0" stopColor="#0d2c56" />
            <stop offset=".5" stopColor="#0a3a5c" />
            <stop offset="1" stopColor="#122a6b" />
          </linearGradient>
          <radialGradient id="missionAura" cx=".5" cy=".5" r=".5">
            <stop offset="0" stopColor="#00e9bb" stopOpacity=".28" />
            <stop offset=".45" stopColor="#0a5f8a" stopOpacity=".14" />
            <stop offset="1" stopColor="#06102b" stopOpacity="0" />
          </radialGradient>
          <radialGradient id="missionCoreGlow" cx=".5" cy=".5" r=".5">
            <stop offset="0" stopColor="#d6fff4" />
            <stop offset=".32" stopColor="#4dffd2" />
            <stop offset=".62" stopColor="#00d9a8" stopOpacity=".55" />
            <stop offset="1" stopColor="#00d9a8" stopOpacity="0" />
          </radialGradient>
          <filter id="missionGlow" x="-60%" y="-60%" width="220%" height="220%">
            <feGaussianBlur stdDeviation="3.2" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
          <filter id="missionSoft" x="-40%" y="-40%" width="180%" height="180%">
            <feGaussianBlur stdDeviation="14" />
          </filter>
        </defs>

        {/* ambient aura */}
        <ellipse cx="300" cy="300" rx="285" ry="285" fill="url(#missionAura)" opacity=".8" />
        <ellipse cx="300" cy="300" rx="285" ry="285" fill="none" stroke="#12395c" strokeWidth="1" strokeDasharray="3 9" opacity=".7" />

        {/* ===== back orbit arcs ===== */}
        <g className="mission-orbit__spin mission-orbit__spin--slow" opacity=".9">
          <ellipse
            cx="300"
            cy="300"
            rx="272"
            ry="272"
            fill="none"
            stroke="#1b6d84"
            strokeWidth="1.3"
            strokeDasharray="6 8"
            opacity=".65"
            transform="rotate(24 300 300)"
          />
        </g>

        {/* ===== chip circuit underlay ===== */}
        <g className="mission-chip" strokeLinecap="round" strokeLinejoin="round">
          <g
            className="mission-chip__traces"
            fill="none"
            stroke="#1c8ca3"
            strokeWidth="1.1"
            opacity=".75"
          >
            {/* top-left fan */}
            <path d="M168 248l-24-14v-22m0 0h18" />
            <path d="M186 238l-26-15v-26m0 0h20" />
            <path d="M204 228l-24-14v-24m0 0h22" />
            <path d="M222 218l-22-13v-22m0 0h18" />
            {/* top-right fan */}
            <path d="M378 218l22-13v-22m0 0h-18" />
            <path d="M396 228l24-14v-24m0 0h-22" />
            <path d="M414 238l26-15v-26m0 0h-20" />
            <path d="M432 248l24-14v-22m0 0h-18" />
            {/* bottom-left fan */}
            <path d="M168 352l-24 14v22m0 0h18" />
            <path d="M186 362l-26 15v26m0 0h20" />
            <path d="M204 372l-24 14v24m0 0h22" />
            <path d="M222 382l-22 13v22m0 0h18" />
            {/* bottom-right fan */}
            <path d="M378 382l22 13v22m0 0h-18" />
            <path d="M396 372l24 14v24m0 0h-20" />
            <path d="M414 362l26 15v26m0 0h-20" />
            <path d="M432 352l24 14v22m0 0h-18" />
            {/* side traces */}
            <path d="M132 300h-26m0 0l-12-10m12 10l-12 10" opacity=".8" />
            <path d="M468 300h26m0 0l12-10m-12 10l12 10" opacity=".8" />
          </g>
          <g fill="#2fe8c6" opacity=".9">
            <circle cx="144" cy="212" r="2.4" />
            <circle cx="160" cy="197" r="2.4" />
            <circle cx="180" cy="190" r="2.4" />
            <circle cx="200" cy="183" r="2.4" />
            <circle cx="400" cy="183" r="2.4" />
            <circle cx="420" cy="190" r="2.4" />
            <circle cx="440" cy="197" r="2.4" />
            <circle cx="456" cy="212" r="2.4" />
            <circle cx="144" cy="388" r="2.4" />
            <circle cx="160" cy="403" r="2.4" />
            <circle cx="182" cy="410" r="2.4" />
            <circle cx="418" cy="410" r="2.4" />
            <circle cx="440" cy="403" r="2.4" />
            <circle cx="456" cy="388" r="2.4" />
          </g>

          {/* drop shadow plate */}
          <polygon points="300,168 492,285 300,402 108,285" fill="#061a3d" opacity=".55" transform="translate(0 26)" />
          {/* thickness sides */}
          <polygon points="108,285 300,402 300,424 108,307" fill="url(#missionSideL)" />
          <polygon points="300,402 492,285 492,307 300,424" fill="url(#missionSideR)" />
          {/* main top face */}
          <polygon
            points="300,168 492,285 300,402 108,285"
            fill="url(#missionChipTop)"
            stroke="#8ff5ff"
            strokeWidth="1.2"
            opacity=".98"
          />
          <polygon points="300,168 492,285 300,402 108,285" fill="#06244d" opacity=".18" />
          {/* inner bevel plates */}
          <polygon points="300,200 448,292 300,384 152,292" fill="none" stroke="#062a52" strokeWidth="10" opacity=".55" />
          <polygon points="300,200 448,292 300,384 152,292" fill="url(#missionInnerPlate)" stroke="#5ff2ff" strokeWidth="1" opacity=".96" />
          <polygon points="300,228 408,297 300,366 192,297" fill="none" stroke="#0a3a58" strokeWidth="8" opacity=".5" />
          <polygon points="300,228 408,297 300,366 192,297" fill="#0a2347" stroke="#37d9ec" strokeWidth=".9" opacity=".97" />
          {/* inner pin rows like reference */}
          <g stroke="#4de6ff" strokeWidth="1" opacity=".7">
            <path d="M228 277l-38-22M240 284l-38-22M252 291l-38-22M264 298l-38-22M276 305l-38-22" />
            <path d="M372 277l38-22M360 284l38-22M348 291l38-22M336 298l38-22M324 305l38-22" />
            <path d="M228 317l-38 22M240 310l-38 22M252 303l-38 22M264 296l-38 22" />
            <path d="M372 317l38 22M360 310l38 22M348 303l38 22M336 296l38 22" />
          </g>
          {/* core die */}
          <polygon points="300,264 354,300 300,336 246,300" fill="#0b1e42" stroke="#63f5ff" strokeWidth="1" />
          <polygon points="300,272 342,300 300,328 258,300" fill="#0e2f63" opacity=".95" />
          <g fill="#2fd8f5" opacity=".8">
            {Array.from({ length: 5 }).map((_, r) =>
              Array.from({ length: 5 }).map((_, c) => (
                <circle key={`${r}-${c}`} cx={282 + c * 9} cy={288 + r * 6 + (c % 2 ? 1 : -1)} r="1.1" opacity=".7" />
              ))
            )}
          </g>
          {/* glowing core */}
          <ellipse className="mission-chip__core-halo" cx="300" cy="300" rx="34" ry="20" fill="url(#missionCoreGlow)" opacity=".95" />
          <ellipse cx="300" cy="298" rx="15" ry="12" fill="#c8fff2" />
          <ellipse cx="300" cy="299" rx="10" ry="8" fill="#3dffcc" />
        </g>

        {/* ===== tilted orbit rings ===== */}
        <g fill="none" strokeLinecap="round">
          <ellipse
            className="mission-orbit__dash mission-orbit__dash--equator"
            cx="300"
            cy="300"
            rx="272"
            ry="148"
            stroke="#e6f4ff"
            strokeWidth="1.7"
            strokeDasharray="8 7"
          />
          <ellipse
            className="mission-orbit__dash mission-orbit__dash--tilt-a"
            cx="300"
            cy="300"
            rx="272"
            ry="148"
            stroke="#1fe6c3"
            strokeWidth="1.5"
            strokeDasharray="5 7"
            opacity=".9"
            transform="rotate(62 300 300)"
          />
          <ellipse
            className="mission-orbit__dash mission-orbit__dash--tilt-b"
            cx="300"
            cy="300"
            rx="272"
            ry="148"
            stroke="#2f86ff"
            strokeWidth="1.4"
            strokeDasharray="4 8"
            opacity=".85"
            transform="rotate(-62 300 300)"
          />
          <ellipse
            className="mission-orbit__dash mission-orbit__dash--inner"
            cx="300"
            cy="300"
            rx="205"
            ry="112"
            stroke="#19c8d8"
            strokeWidth="1"
            strokeDasharray="3 8"
            opacity=".7"
            transform="rotate(62 300 300)"
          />
        </g>

        {/* ===== glowing nodes on orbits ===== */}
        <g filter="url(#missionGlow)">
          <g className="mission-node" fill="#2dffc4">
            <circle cx="28" cy="300" r="7" />
            <circle cx="572" cy="300" r="7" />
          </g>
          <g className="mission-node mission-node--alt" fill="#4dffd2">
            <circle cx="118" cy="200" r="5.5" />
            <circle cx="482" cy="200" r="5" />
            <circle cx="104" cy="408" r="6.5" />
            <circle cx="496" cy="408" r="5.5" />
            <circle cx="163" cy="475" r="6" />
            <circle cx="437" cy="475" r="6" />
            <circle cx="252" cy="90" r="6" />
            <circle cx="400" cy="116" r="6.5" />
            <circle cx="484" cy="164" r="4.5" />
            <circle cx="491" cy="238" r="6" />
          </g>
          <g className="mission-node mission-node--blue" fill="#6fb4ff">
            <circle cx="122" cy="130" r="5" />
            <circle cx="385" cy="494" r="6" />
            <circle cx="492" cy="480" r="5" />
          </g>
          <g fill="#5ff2d6" opacity=".9">
            <circle className="mission-node__mini" cx="212" cy="212" r="3.4" />
            <circle className="mission-node__mini" cx="232" cy="222" r="2.8" />
            <circle className="mission-node__mini" cx="392" cy="222" r="2.8" />
            <circle className="mission-node__mini" cx="246" cy="292" r="4.4" />
            <circle className="mission-node__mini" cx="354" cy="292" r="4.4" />
            <circle className="mission-node__mini" cx="398" cy="370" r="3.2" />
          </g>
        </g>

        {/* travelling energy dots */}
        <g fill="none">
          <circle className="mission-traveler" cx="0" cy="0" r="8" fill="#4dffd2" opacity=".32">
            <animateMotion dur="9s" repeatCount="indefinite" rotate="auto">
              <mpath href="#missionEquatorPath" />
            </animateMotion>
          </circle>
          <circle className="mission-traveler" cx="0" cy="0" r="4" fill="#c4fff0">
            <animateMotion dur="9s" repeatCount="indefinite" rotate="auto">
              <mpath href="#missionEquatorPath" />
            </animateMotion>
          </circle>
        </g>
        <defs>
          <path id="missionEquatorPath" d="M 28 300 A 272 148 0 1 0 572 300 A 272 148 0 1 0 28 300" fill="none" />
        </defs>

        {/* sparkle like reference */}
        <path
          className="mission-sparkle"
          d="M462 452c0-18 8-28 26-30-18-2-26-12-26-30 0 18-8 28-26 30 18 2 26 12 26 30z"
          fill="#c8d6ea"
          opacity=".8"
        />
        <path
          className="mission-sparkle mission-sparkle--small"
          d="M516 448c0-10 4-15 14-16-10-1-14-6-14-16 0 10-4 15-14 16 10 1 14 6 14 16z"
          fill="#c8d6ea"
          opacity=".7"
        />
      </svg>
    </div>
  );
}

export default function Mission() {
  return (
    <section className="mission-section" aria-labelledby="mission-heading">
      <div className="site-container">
        <div className="mission-section__intro" data-reveal>
          <SectionLabel>Why Choose Us</SectionLabel>
          <h2 id="mission-heading">Your Success Is Our Mission</h2>
        </div>
        <div className="mission-grid">
          <div className="mission-grid__side mission-grid__side--left">
            {benefits.slice(0, 3).map(({ title, description, icon }) => (
              <div className="mission-benefit" key={title} data-reveal>
                <span className="mission-benefit__copy"><strong>{title}</strong><small>{description}</small></span>
                <span className="mission-benefit__icon"><Icon name={icon} /></span>
              </div>
            ))}
          </div>
          <MissionOrbit />
          <div className="mission-grid__side mission-grid__side--right">
            {benefits.slice(3).map(({ title, description, icon }) => (
              <div className="mission-benefit" key={title} data-reveal>
                <span className="mission-benefit__icon"><Icon name={icon} /></span>
                <span className="mission-benefit__copy"><strong>{title}</strong><small>{description}</small></span>
              </div>
            ))}
          </div>
        </div>
        <div className="platforms" data-reveal>
          <SectionLabel>Technologies Used in This Project</SectionLabel>
          <div className="platforms__logos">
            {platforms.map((platform, index) => <span className={`platforms__logo platforms__logo--${index + 1}`} key={platform}>{platform}</span>)}
          </div>
        </div>
      </div>
    </section>
  );
}
