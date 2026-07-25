import React, { useEffect, useRef, useState } from "react";
import * as THREE from "three";
import {
  Github,
  Mail,
  ArrowUpRight,
  ArrowRight,
  ArrowUp,
  Menu,
  X,
  Code2,
  Smartphone,
  Database,
  Server,
  Layers,
  Terminal,
  Plus,
  ShieldCheck,
  MessageCircle,
  Twitter,
  Instagram,
  Facebook,
  Youtube,
  Copy,
  Check,
  Compass,
  PenTool,
  Hammer,
  Rocket,
} from "lucide-react";

/* ----------------------------- content data ----------------------------- */

const GITHUB_URL = "https://github.com/zenithrazor";
const CONTACT_EMAIL = "contact@zenithrazor.com";

const NAV_LINKS = [
  { label: "Home", path: "/" },
  { label: "Work", path: "/work" },
  { label: "About", path: "/about" },
  { label: "Contact", path: "/contact" },
];

const STACK = [
  "React", "TypeScript", "Node.js", "Express", "Supabase",
  "PostgreSQL", "Three.js", "React Native", "Nginx", "PM2",
];

const PROJECTS = [
  {
    id: "01",
    name: "Aegis Security",
    role: "Cyber Crime Security — Indian NGO",
    desc: "A registered Indian non-profit working against cyber crime — running digital-safety awareness drives, reporting support for victims of online fraud and harassment, and community education on staying secure online.",
    tags: ["Registered Indian NGO", "Cyber Crime Awareness", "Digital Safety", "Community Outreach"],
    icon: ShieldCheck,
    socials: [
      { icon: MessageCircle, label: "Discord", href: "https://dsc.gg/aegis-security" },
      { icon: Twitter, label: "X", href: "https://link.me/aegissecurity" },
      { icon: Instagram, label: "Instagram", href: "https://link.me/aegissecurity" },
      { icon: Facebook, label: "Facebook", href: "https://link.me/aegissecurity" },
      { icon: Youtube, label: "YouTube", href: "https://link.me/aegissecurity" },
    ],
  },
  {
    id: "02",
    name: "GitHub",
    role: "Open-Source & Code",
    desc: "Repositories, builds, and experiments — the code behind every project lives here. Browse the full history and current work.",
    tags: ["Open Source", "Repositories", "Code"],
    icon: Github,
    link: GITHUB_URL,
  },
];

const PROCESS = [
  {
    icon: Compass,
    step: "01",
    title: "Discover",
    desc: "Understand the goal, the users, and the constraints before a single line of code is written.",
  },
  {
    icon: PenTool,
    step: "02",
    title: "Design",
    desc: "Structure the interface and the system behind it — architecture and layout decided together.",
  },
  {
    icon: Hammer,
    step: "03",
    title: "Build",
    desc: "Full-stack implementation — frontend, backend, and infrastructure — with steady, visible progress.",
  },
  {
    icon: Rocket,
    step: "04",
    title: "Ship",
    desc: "Deployed, monitored, and handed over in a state that is easy to maintain and extend.",
  },
];

const SERVICES = [
  {
    icon: Code2,
    title: "Web Development",
    desc: "Full-stack web platforms — from marketing sites to data-driven applications — architected, built, and shipped end to end.",
  },
  {
    icon: Smartphone,
    title: "App Development",
    desc: "Cross-platform mobile apps built for real use, from first screen through to store submission.",
  },
  {
    icon: Server,
    title: "Backend & APIs",
    desc: "Node/Express services, database design, and the infrastructure that keeps everything running quietly.",
  },
  {
    icon: Layers,
    title: "Admin & Dashboards",
    desc: "Internal tooling and admin panels that make the rest of the platform usable for non-technical teams.",
  },
];

const SKILLS = [
  {
    icon: Code2,
    title: "Frontend",
    items: ["React", "TypeScript", "Next.js", "Three.js / WebGL"],
  },
  {
    icon: Server,
    title: "Backend",
    items: ["Node.js", "Express", "REST APIs", "Auth & Sessions"],
  },
  {
    icon: Database,
    title: "Data",
    items: ["PostgreSQL", "Supabase", "Row Level Security", "Seeding & Migrations"],
  },
  {
    icon: Smartphone,
    title: "Mobile",
    items: ["React Native", "Cross-Platform Builds", "App Store Delivery"],
  },
  {
    icon: Layers,
    title: "Infrastructure",
    items: ["Nginx", "PM2", "CI/CD", "Deployment & Monitoring"],
  },
  {
    icon: Terminal,
    title: "Practice",
    items: ["Architecture First", "Admin Tooling", "Design to Deploy"],
  },
];

/* --------------------------------- hooks --------------------------------- */

function useHashRoute() {
  const [route, setRoute] = useState(
    () => window.location.hash.replace("#", "") || "/"
  );
  useEffect(() => {
    const onChange = () =>
      setRoute(window.location.hash.replace("#", "") || "/");
    window.addEventListener("hashchange", onChange);
    return () => window.removeEventListener("hashchange", onChange);
  }, []);
  return route;
}

function useReveal(threshold = 0.15) {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          obs.unobserve(el);
        }
      },
      { threshold }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [threshold]);
  return [ref, visible];
}

function Reveal({ children, className = "", delay = 0, as = "div" }) {
  const [ref, visible] = useReveal();
  const Tag = as;
  return (
    <Tag
      ref={ref}
      className={`reveal ${visible ? "reveal-visible" : ""} ${className}`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </Tag>
  );
}

/* ------------------------------ shader field ------------------------------ */
/* Signature element: a monochrome wireframe horizon grid, sine-displaced,   */
/* with soft depth fog and mouse-driven parallax tilt.                       */

function ShaderField() {
  const mountRef = useRef(null);

  useEffect(() => {
    const mount = mountRef.current;
    if (!mount) return;

    const reducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    const scene = new THREE.Scene();
    scene.fog = new THREE.Fog(0x000000, 4, 15);

    const camera = new THREE.PerspectiveCamera(
      55,
      mount.clientWidth / mount.clientHeight,
      0.1,
      100
    );
    camera.position.set(0, 1.6, 4.2);
    camera.rotation.x = -0.28;

    const renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: true,
      powerPreference: "low-power",
    });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setSize(mount.clientWidth, mount.clientHeight);
    mount.appendChild(renderer.domElement);

    const geometry = new THREE.PlaneGeometry(18, 18, 46, 46);
    const material = new THREE.ShaderMaterial({
      wireframe: true,
      transparent: true,
      uniforms: {
        uTime: { value: 0 },
        uMouse: { value: new THREE.Vector2(0, 0) },
      },
      vertexShader: `
        uniform float uTime;
        uniform vec2 uMouse;
        varying float vElevation;
        void main() {
          vec3 pos = position;
          float freq = 0.55;
          float amp = 0.55;
          float e = sin(pos.x * freq + uTime * 0.55) * amp
                  + sin(pos.y * freq * 0.7 - uTime * 0.35) * amp * 0.6;
          e += (uMouse.x * pos.x * 0.05) + (uMouse.y * pos.y * 0.04);
          pos.z += e;
          vElevation = e;
          gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
        }
      `,
      fragmentShader: `
        varying float vElevation;
        void main() {
          float intensity = smoothstep(-0.9, 1.3, vElevation);
          vec3 color = mix(vec3(0.12), vec3(1.0), intensity);
          gl_FragColor = vec4(color, 0.6);
        }
      `,
    });

    const plane = new THREE.Mesh(geometry, material);
    plane.rotation.x = -Math.PI / 2.35;
    plane.position.y = -0.6;
    plane.position.z = -2;
    scene.add(plane);

    let raf = 0;
    let time = 0;
    const mouse = { x: 0, y: 0 };
    const targetMouse = { x: 0, y: 0 };

    const onPointerMove = (e) => {
      const nx = (e.clientX / window.innerWidth) * 2 - 1;
      const ny = (e.clientY / window.innerHeight) * 2 - 1;
      targetMouse.x = nx;
      targetMouse.y = ny;
    };
    window.addEventListener("pointermove", onPointerMove);

    const animate = () => {
      time += reducedMotion ? 0.003 : 0.012;
      mouse.x += (targetMouse.x - mouse.x) * 0.03;
      mouse.y += (targetMouse.y - mouse.y) * 0.03;
      material.uniforms.uTime.value = time;
      material.uniforms.uMouse.value.set(mouse.x, mouse.y);
      camera.rotation.z = mouse.x * 0.03;
      camera.rotation.x = -0.28 + mouse.y * 0.02;
      renderer.render(scene, camera);
      raf = requestAnimationFrame(animate);
    };
    animate();

    const onResize = () => {
      if (!mount) return;
      camera.aspect = mount.clientWidth / mount.clientHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(mount.clientWidth, mount.clientHeight);
    };
    window.addEventListener("resize", onResize);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", onResize);
      window.removeEventListener("pointermove", onPointerMove);
      geometry.dispose();
      material.dispose();
      renderer.dispose();
      if (mount.contains(renderer.domElement)) {
        mount.removeChild(renderer.domElement);
      }
    };
  }, []);

  return <div ref={mountRef} className="shader-field" aria-hidden="true" />;
}

/* --------------------------------- grain --------------------------------- */

function Grain() {
  return (
    <svg className="grain" aria-hidden="true">
      <filter id="grainFilter">
        <feTurbulence type="fractalNoise" baseFrequency="0.85" numOctaves="2" stitchTiles="stitch" />
        <feColorMatrix type="saturate" values="0" />
      </filter>
      <rect width="100%" height="100%" filter="url(#grainFilter)" />
    </svg>
  );
}

/* -------------------------------- cursor -------------------------------- */

function CursorDot() {
  const dotRef = useRef(null);
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    const fine = window.matchMedia("(pointer: fine)").matches;
    setEnabled(fine);
    if (!fine) return;

    const dot = dotRef.current;
    let x = 0, y = 0;

    const onMove = (e) => {
      x = e.clientX;
      y = e.clientY;
      if (dot) dot.style.transform = `translate(${x}px, ${y}px)`;
    };
    const onOver = (e) => {
      if (e.target.closest("a, button")) dot?.classList.add("cursor-dot-hover");
    };
    const onOut = (e) => {
      if (e.target.closest("a, button")) dot?.classList.remove("cursor-dot-hover");
    };

    window.addEventListener("pointermove", onMove);
    document.addEventListener("pointerover", onOver);
    document.addEventListener("pointerout", onOut);
    return () => {
      window.removeEventListener("pointermove", onMove);
      document.removeEventListener("pointerover", onOver);
      document.removeEventListener("pointerout", onOut);
    };
  }, []);

  if (!enabled) return null;
  return <div ref={dotRef} className="cursor-dot" aria-hidden="true" />;
}

/* ------------------------------ back to top ------------------------------ */

function BackToTop() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 700);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  if (!visible) return null;
  return (
    <button
      className="back-to-top"
      aria-label="Back to top"
      onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
    >
      <ArrowUp size={18} strokeWidth={1.8} />
    </button>
  );
}

/* ---------------------------------- nav ---------------------------------- */

function Nav({ route }) {
  const [open, setOpen] = useState(false);
  useEffect(() => setOpen(false), [route]);

  return (
    <header className="nav">
      <a href="#/" className="nav-mark" aria-label="ZenithRazor home">
        <span className="nav-mark-box">ZR</span>
        <span className="nav-mark-text">ZENITHRAZOR</span>
      </a>

      <nav className="nav-links" aria-label="Primary">
        {NAV_LINKS.map((l) => (
          <a
            key={l.path}
            href={`#${l.path}`}
            className={`nav-link ${route === l.path ? "nav-link-active" : ""}`}
          >
            {l.label}
          </a>
        ))}
      </nav>

      <div className="nav-actions">
        <span className="status-pill" title="Available for new projects">
          <span className="status-dot" />
          Available for Work
        </span>
        <a
          href={GITHUB_URL}
          target="_blank"
          rel="noreferrer"
          className="icon-btn"
          aria-label="ZenithRazor on GitHub"
        >
          <Github size={18} strokeWidth={1.6} />
        </a>
        <button
          className="icon-btn nav-toggle"
          aria-label={open ? "Close menu" : "Open menu"}
          onClick={() => setOpen((v) => !v)}
        >
          {open ? <X size={20} strokeWidth={1.6} /> : <Menu size={20} strokeWidth={1.6} />}
        </button>
      </div>

      {open && (
        <div className="nav-mobile">
          {NAV_LINKS.map((l) => (
            <a key={l.path} href={`#${l.path}`} className="nav-mobile-link">
              {l.label}
              <ArrowUpRight size={16} strokeWidth={1.6} />
            </a>
          ))}
          <span className="status-pill status-pill-mobile">
            <span className="status-dot" />
            Available for Work
          </span>
        </div>
      )}
    </header>
  );
}

/* -------------------------------- marquee -------------------------------- */

function Marquee() {
  const loop = [...STACK, ...STACK];
  return (
    <div className="marquee" role="presentation">
      <div className="marquee-track">
        {loop.map((item, i) => (
          <span className="marquee-item" key={i}>
            {item}
            <span className="marquee-dot">•</span>
          </span>
        ))}
      </div>
    </div>
  );
}

/* --------------------------------- pages ---------------------------------- */

function HomePage() {
  return (
    <>
      <section className="hero">
        <ShaderField />
        <div className="hero-inner">
          <Reveal className="eyebrow">WEB &amp; APP DEVELOPMENT STUDIO</Reveal>
          <h1 className="hero-title">
            <Reveal as="span" className="hero-line" delay={80}>
              Precision-Engineered
            </Reveal>
            <Reveal as="span" className="hero-line hero-line-outline" delay={180}>
              Web &amp; App Software
            </Reveal>
          </h1>
          <Reveal delay={280} className="hero-sub">
            Full-stack platforms and cross-platform apps, built end to end —
            architecture, interface, and infrastructure, under one roof.
          </Reveal>
          <Reveal delay={360} className="hero-actions">
            <a href="#/work" className="btn btn-solid">
              View the Work
              <ArrowRight size={16} strokeWidth={1.8} />
            </a>
            <a href={GITHUB_URL} target="_blank" rel="noreferrer" className="btn btn-ghost">
              <Github size={16} strokeWidth={1.8} />
              Source
            </a>
          </Reveal>
        </div>
        <div className="scroll-cue" aria-hidden="true">
          <span>SCROLL</span>
          <span className="scroll-line" />
        </div>
      </section>

      <Marquee />

      <section className="section">
        <div className="section-head">
          <Reveal className="eyebrow">WHAT I BUILD</Reveal>
          <Reveal delay={80}>
            <h2 className="section-title">Services</h2>
          </Reveal>
          <Reveal delay={140} className="section-lede">
            One developer, working across the whole stack — so the interface,
            the server behind it, and the tooling that runs it all stay
            consistent.
          </Reveal>
        </div>
        <div className="services-grid">
          {SERVICES.map((s, i) => {
            const Icon = s.icon;
            return (
              <Reveal key={s.title} delay={i * 80} className="service-card">
                <Icon size={22} strokeWidth={1.5} />
                <h3>{s.title}</h3>
                <p>{s.desc}</p>
              </Reveal>
            );
          })}
        </div>
      </section>

      <section className="section process-section">
        <div className="section-head">
          <Reveal className="eyebrow">HOW I WORK</Reveal>
          <Reveal delay={80}>
            <h2 className="section-title">Process</h2>
          </Reveal>
        </div>
        <div className="process-grid">
          {PROCESS.map((p, i) => {
            const Icon = p.icon;
            return (
              <Reveal key={p.step} delay={i * 80} className="process-card">
                <span className="process-step">{p.step}</span>
                <Icon size={22} strokeWidth={1.5} />
                <h3>{p.title}</h3>
                <p>{p.desc}</p>
              </Reveal>
            );
          })}
        </div>
      </section>

      <section className="section">
        <div className="section-head">
          <Reveal className="eyebrow">SELECTED WORK</Reveal>
          <Reveal delay={80}>
            <h2 className="section-title">Recent builds</h2>
          </Reveal>
        </div>
        <div className="work-grid work-grid-compact">
          {PROJECTS.map((p, i) => (
            <ProjectCard project={p} key={p.id} delay={i * 90} />
          ))}
        </div>
        <Reveal className="section-cta">
          <a href="#/work" className="text-link">
            See all case studies
            <ArrowUpRight size={16} strokeWidth={1.8} />
          </a>
        </Reveal>
      </section>

      <section className="section cta-banner">
        <Reveal>
          <h2 className="contact-title">Let&rsquo;s build something precise.</h2>
        </Reveal>
        <Reveal delay={100} className="hero-actions">
          <a href="#/contact" className="btn btn-solid">
            Start a Project
            <ArrowRight size={16} strokeWidth={1.8} />
          </a>
          <a href={GITHUB_URL} target="_blank" rel="noreferrer" className="btn btn-ghost">
            <Github size={16} strokeWidth={1.8} />
            Source
          </a>
        </Reveal>
      </section>
    </>
  );
}

function ProjectCard({ project, delay = 0 }) {
  const Icon = project.icon || Plus;
  return (
    <Reveal delay={delay} className="project-card">
      <div className={`project-media ${project.placeholder ? "project-media-empty" : ""}`}>
        <Icon size={30} strokeWidth={1.3} />
        <span className="project-id">{project.id}</span>
      </div>
      <div className="project-body">
        <div className="project-heading">
          <h3>{project.name}</h3>
          {!project.placeholder && project.link && (
            <a
              href={project.link}
              target="_blank"
              rel="noreferrer"
              className="icon-btn icon-btn-sm"
              aria-label={`Open ${project.name} on GitHub`}
            >
              <ArrowUpRight size={16} strokeWidth={1.8} />
            </a>
          )}
        </div>
        <p className="project-role">{project.role}</p>
        <p className="project-desc">{project.desc}</p>
        <div className="tag-row">
          {project.tags.map((t) => (
            <span className="tag" key={t}>
              {t}
            </span>
          ))}
        </div>
        {project.socials && (
          <div className="social-row">
            {project.socials.map((s) => {
              const SIcon = s.icon;
              return (
                <a
                  key={s.label}
                  href={s.href}
                  target="_blank"
                  rel="noreferrer"
                  className="icon-btn icon-btn-sm"
                  aria-label={`${project.name} on ${s.label}`}
                >
                  <SIcon size={15} strokeWidth={1.7} />
                </a>
              );
            })}
          </div>
        )}
      </div>
    </Reveal>
  );
}

function WorkPage() {
  return (
    <section className="section section-top">
      <div className="section-head">
        <Reveal className="eyebrow">SELECTED WORK</Reveal>
        <Reveal delay={80}>
          <h2 className="section-title">Case studies</h2>
        </Reveal>
        <Reveal delay={140} className="section-lede">
          A working sample of platforms shipped end to end — product thinking,
          interface, and the infrastructure underneath.
        </Reveal>
      </div>
      <div className="work-grid">
        {PROJECTS.map((p, i) => (
          <ProjectCard project={p} key={p.id} delay={i * 90} />
        ))}
      </div>
    </section>
  );
}

function AboutPage() {
  return (
    <section className="section section-top">
      <div className="about-grid">
        <div>
          <Reveal className="eyebrow">ABOUT</Reveal>
          <Reveal delay={80}>
            <h2 className="section-title">Built by one developer, shipped like a team.</h2>
          </Reveal>
          <Reveal delay={160} className="about-copy">
            ZenithRazor is an independent development practice working across
            the full stack — from interface down to the server it runs on.
            Recent work spans editorial platforms with live data, admin
            tooling that non-technical teams can actually use, and product
            builds for small, independent teams.
          </Reveal>
          <Reveal delay={220} className="badge-row">
            <span className="badge">Full-Stack</span>
            <span className="badge">Web + Mobile</span>
            <span className="badge">Design to Deploy</span>
          </Reveal>
        </div>

        <div className="skills-grid">
          {SKILLS.map((s, i) => {
            const Icon = s.icon;
            return (
              <Reveal key={s.title} delay={i * 70} className="skill-card">
                <Icon size={20} strokeWidth={1.6} />
                <h3>{s.title}</h3>
                <ul>
                  {s.items.map((it) => (
                    <li key={it}>{it}</li>
                  ))}
                </ul>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}

function ContactPage() {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(CONTACT_EMAIL);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // clipboard unavailable — mailto link below still works
    }
  };

  return (
    <section className="section section-top contact-section">
      <Reveal className="eyebrow">CONTACT</Reveal>
      <Reveal delay={80}>
        <h2 className="contact-title">Let&rsquo;s build something precise.</h2>
      </Reveal>
      <Reveal delay={160} className="hero-sub contact-sub">
        Available for web and app development projects — new builds,
        rebuilds, or the admin tooling nobody wants to write.
      </Reveal>
      <Reveal delay={240} className="hero-actions">
        <a href={`mailto:${CONTACT_EMAIL}`} className="btn btn-solid">
          <Mail size={16} strokeWidth={1.8} />
          {CONTACT_EMAIL}
        </a>
        <button
          className="icon-btn"
          onClick={handleCopy}
          aria-label="Copy email address"
          title="Copy email address"
        >
          {copied ? <Check size={16} strokeWidth={1.8} /> : <Copy size={16} strokeWidth={1.8} />}
        </button>
        <a href={GITHUB_URL} target="_blank" rel="noreferrer" className="btn btn-ghost">
          <Github size={16} strokeWidth={1.8} />
          GitHub
        </a>
      </Reveal>
    </section>
  );
}

/* --------------------------------- footer --------------------------------- */

function Footer() {
  return (
    <footer className="footer">
      <span>© {new Date().getFullYear()} ZenithRazor. All rights reserved.</span>
      <a href={GITHUB_URL} target="_blank" rel="noreferrer" className="icon-btn icon-btn-sm">
        <Github size={16} strokeWidth={1.6} />
      </a>
    </footer>
  );
}

/* ---------------------------------- app ---------------------------------- */

export default function App() {
  const route = useHashRoute();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [route]);

  let Page = HomePage;
  if (route === "/work") Page = WorkPage;
  else if (route === "/about") Page = AboutPage;
  else if (route === "/contact") Page = ContactPage;

  return (
    <div className="app-root">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@300..700&family=JetBrains+Mono:wght@400;500&family=Inter:wght@400;500;600&display=swap');

        :root {
          --bg: #0a0a0a;
          --fg: #f5f5f0;
          --muted: #8a8a85;
          --line: #2a2a28;
          --white: #ffffff;
        }
        * { box-sizing: border-box; }
        .app-root {
          background: var(--bg);
          color: var(--fg);
          font-family: 'Inter', sans-serif;
          min-height: 100vh;
          position: relative;
          overflow-x: hidden;
        }
        a { color: inherit; text-decoration: none; }
        ul { list-style: none; margin: 0; padding: 0; }
        button { font: inherit; background: none; border: none; color: inherit; cursor: pointer; }

        :focus-visible { outline: 1px solid var(--white); outline-offset: 3px; }

        .grain {
          position: fixed; inset: 0; width: 100%; height: 100%;
          opacity: 0.035; mix-blend-mode: overlay; pointer-events: none; z-index: 60;
        }

        .cursor-dot {
          position: fixed; top: 0; left: 0; width: 8px; height: 8px; margin: -4px 0 0 -4px;
          border-radius: 50%; background: var(--fg); pointer-events: none; z-index: 70;
          transition: transform 0.08s linear, width 0.2s ease, height 0.2s ease, margin 0.2s ease, opacity 0.2s ease;
          mix-blend-mode: difference;
        }
        .cursor-dot-hover { width: 34px; height: 34px; margin: -17px 0 0 -17px; background: var(--fg); }

        .back-to-top {
          position: fixed; right: clamp(16px, 4vw, 40px); bottom: clamp(16px, 4vw, 40px); z-index: 40;
          width: 44px; height: 44px; display: flex; align-items: center; justify-content: center;
          border: 1px solid var(--line); background: rgba(10,10,10,0.85); backdrop-filter: blur(6px);
          transition: border-color 0.2s, transform 0.2s;
          animation: fadeUp 0.3s ease;
        }
        .back-to-top:hover { border-color: var(--fg); transform: translateY(-2px); }
        @keyframes fadeUp { from { opacity: 0; transform: translateY(8px); } to { opacity: 1; transform: translateY(0); } }

        .page-fade { animation: pageFade 0.5s ease; }
        @keyframes pageFade { from { opacity: 0; transform: translateY(10px); } to { opacity: 1; transform: translateY(0); } }

        /* ---------- nav ---------- */
        .nav {
          position: sticky; top: 0; z-index: 50;
          display: flex; align-items: center; justify-content: space-between;
          padding: 20px clamp(20px, 5vw, 56px);
          border-bottom: 1px solid var(--line);
          background: rgba(10,10,10,0.75);
          backdrop-filter: blur(10px);
        }
        .nav-mark { display: flex; align-items: center; gap: 10px; }
        .nav-mark-box {
          width: 30px; height: 30px; display: flex; align-items: center; justify-content: center;
          border: 1px solid var(--fg); font-family: 'JetBrains Mono', monospace; font-size: 11px;
        }
        .nav-mark-text {
          font-family: 'JetBrains Mono', monospace; font-size: 12px; letter-spacing: 0.14em;
        }
        .nav-links { display: flex; gap: 32px; }
        .nav-link {
          font-family: 'JetBrains Mono', monospace; font-size: 12px; letter-spacing: 0.06em;
          color: var(--muted); position: relative; padding-bottom: 4px; transition: color 0.2s;
        }
        .nav-link:hover { color: var(--fg); }
        .nav-link-active { color: var(--fg); }
        .nav-link-active::after {
          content: ''; position: absolute; left: 0; right: 0; bottom: -1px; height: 1px; background: var(--fg);
        }
        .nav-actions { display: flex; align-items: center; gap: 8px; }
        .icon-btn {
          width: 36px; height: 36px; display: flex; align-items: center; justify-content: center;
          border: 1px solid var(--line); transition: border-color 0.2s, transform 0.2s;
        }
        .icon-btn:hover { border-color: var(--fg); transform: translateY(-1px); }
        .icon-btn-sm { width: 30px; height: 30px; }
        .nav-toggle { display: none; }
        .nav-mobile {
          position: absolute; top: 100%; left: 0; right: 0;
          background: var(--bg); border-bottom: 1px solid var(--line);
          display: flex; flex-direction: column; padding: 8px clamp(20px, 5vw, 56px) 20px;
        }
        .nav-mobile-link {
          display: flex; justify-content: space-between; align-items: center;
          padding: 14px 0; border-bottom: 1px solid var(--line);
          font-family: 'Space Grotesk', sans-serif; font-size: 18px;
        }
        .status-pill {
          display: flex; align-items: center; gap: 8px; padding: 8px 14px;
          border: 1px solid var(--line); font-family: 'JetBrains Mono', monospace;
          font-size: 11px; letter-spacing: 0.05em; color: var(--muted); text-transform: uppercase;
        }
        .status-dot {
          width: 6px; height: 6px; border-radius: 50%; background: var(--fg); position: relative; flex-shrink: 0;
        }
        .status-dot::after {
          content: ''; position: absolute; inset: -4px; border-radius: 50%; border: 1px solid var(--fg);
          animation: statusPulse 2s ease-out infinite;
        }
        @keyframes statusPulse {
          0% { transform: scale(0.6); opacity: 0.8; }
          100% { transform: scale(1.8); opacity: 0; }
        }
        .status-pill-mobile { margin-top: 16px; align-self: flex-start; }

        /* ---------- hero ---------- */
        .hero {
          position: relative; min-height: 92vh; display: flex; flex-direction: column;
          justify-content: center; padding: 0 clamp(20px, 5vw, 56px); overflow: hidden;
        }
        .shader-field { position: absolute; inset: 0; z-index: 0; opacity: 0.9; }
        .hero-inner { position: relative; z-index: 2; max-width: 900px; }
        .eyebrow {
          font-family: 'JetBrains Mono', monospace; font-size: 12px; letter-spacing: 0.18em;
          color: var(--muted); text-transform: uppercase; margin-bottom: 18px; display: block;
        }
        .hero-title { margin: 0 0 22px; font-family: 'Space Grotesk', sans-serif; font-weight: 600; }
        .hero-line {
          display: block; font-size: clamp(38px, 7.2vw, 92px); line-height: 1.02;
          letter-spacing: -0.01em;
        }
        .hero-line-outline { color: transparent; -webkit-text-stroke: 1px var(--fg); }
        .hero-sub {
          max-width: 520px; color: var(--muted); font-size: 16px; line-height: 1.6; margin-bottom: 34px;
          display: block;
        }
        .hero-actions { display: flex; flex-wrap: wrap; gap: 14px; }

        .btn {
          display: inline-flex; align-items: center; gap: 8px; padding: 14px 24px;
          font-family: 'JetBrains Mono', monospace; font-size: 12px; letter-spacing: 0.06em;
          text-transform: uppercase; border: 1px solid var(--fg); transition: all 0.2s;
        }
        .btn-solid { background: var(--fg); color: var(--bg); }
        .btn-solid:hover { background: transparent; color: var(--fg); }
        .btn-ghost { color: var(--fg); border-color: var(--line); }
        .btn-ghost:hover { border-color: var(--fg); }

        .scroll-cue {
          position: absolute; bottom: 28px; left: clamp(20px, 5vw, 56px); z-index: 2;
          display: flex; flex-direction: column; align-items: center; gap: 10px;
        }
        .scroll-cue span:first-child {
          font-family: 'JetBrains Mono', monospace; font-size: 10px; letter-spacing: 0.2em; color: var(--muted);
        }
        .scroll-line { width: 1px; height: 40px; background: linear-gradient(var(--muted), transparent); animation: scrollPulse 2.2s ease-in-out infinite; }
        @keyframes scrollPulse { 0%,100% { opacity: 0.3; } 50% { opacity: 1; } }

        /* ---------- marquee ---------- */
        .marquee {
          border-top: 1px solid var(--line); border-bottom: 1px solid var(--line);
          overflow: hidden; padding: 18px 0; position: relative; z-index: 2; background: var(--bg);
        }
        .marquee-track { display: flex; width: max-content; animation: marqueeScroll 32s linear infinite; }
        .marquee-item {
          display: flex; align-items: center; gap: 24px; padding: 0 24px;
          font-family: 'JetBrains Mono', monospace; font-size: 13px; letter-spacing: 0.05em; color: var(--muted);
          white-space: nowrap;
        }
        .marquee-dot { color: var(--line); }
        @keyframes marqueeScroll { from { transform: translateX(0); } to { transform: translateX(-50%); } }

        /* ---------- sections ---------- */
        .section { padding: 110px clamp(20px, 5vw, 56px); position: relative; z-index: 2; }
        .section-top { padding-top: 150px; }
        .section-head { max-width: 640px; margin-bottom: 56px; }
        .section-title { font-family: 'Space Grotesk', sans-serif; font-size: clamp(28px, 4vw, 44px); font-weight: 600; margin: 0 0 14px; letter-spacing: -0.01em; }
        .section-lede { color: var(--muted); font-size: 16px; line-height: 1.6; }
        .section-cta { margin-top: 48px; }
        .text-link { display: inline-flex; align-items: center; gap: 8px; font-family: 'JetBrains Mono', monospace; font-size: 13px; letter-spacing: 0.05em; border-bottom: 1px solid var(--line); padding-bottom: 4px; transition: border-color 0.2s; }
        .text-link:hover { border-color: var(--fg); }

        .services-grid { display: grid; grid-template-columns: repeat(4, 1fr); gap: 1px; background: var(--line); border: 1px solid var(--line); }
        .service-card { background: var(--bg); padding: 28px 24px; }
        .service-card h3 { font-family: 'Space Grotesk', sans-serif; font-size: 17px; margin: 16px 0 10px; font-weight: 600; }
        .service-card p { font-size: 13px; line-height: 1.6; color: var(--muted); margin: 0; }

        .process-section { border-top: 1px solid var(--line); }
        .process-grid { display: grid; grid-template-columns: repeat(4, 1fr); gap: 1px; background: var(--line); border: 1px solid var(--line); }
        .process-card { background: var(--bg); padding: 28px 24px; position: relative; }
        .process-step {
          display: block; font-family: 'JetBrains Mono', monospace; font-size: 11px;
          color: var(--muted); letter-spacing: 0.08em; margin-bottom: 14px;
        }
        .process-card h3 { font-family: 'Space Grotesk', sans-serif; font-size: 17px; margin: 16px 0 10px; font-weight: 600; }
        .process-card p { font-size: 13px; line-height: 1.6; color: var(--muted); margin: 0; }

        .cta-banner {
          border-top: 1px solid var(--line); text-align: center;
          display: flex; flex-direction: column; align-items: center;
        }
        .cta-banner .contact-title { font-size: clamp(28px, 4.5vw, 52px); max-width: 640px; }
        .cta-banner .hero-actions { justify-content: center; }

        /* ---------- work grid ---------- */
        .work-grid { display: grid; grid-template-columns: repeat(2, 1fr); gap: 1px; background: var(--line); border: 1px solid var(--line); }
        .work-grid-compact { grid-template-columns: repeat(2, 1fr); }
        .project-card { background: var(--bg); display: flex; flex-direction: column; }
        .project-media {
          position: relative; aspect-ratio: 4 / 3; overflow: hidden; background: #050505;
          display: flex; align-items: center; justify-content: center; color: var(--fg);
          background-image:
            linear-gradient(var(--line) 1px, transparent 1px),
            linear-gradient(90deg, var(--line) 1px, transparent 1px);
          background-size: 28px 28px; background-position: center;
          transition: color 0.3s ease, background-color 0.3s ease;
        }
        .project-card:hover .project-media { color: var(--white); background-color: #0f0f0d; }
        .project-media-empty { color: var(--line); }
        .project-card:hover .project-media-empty { color: var(--muted); background-color: transparent; }
        .project-id { position: absolute; top: 14px; left: 14px; font-family: 'JetBrains Mono', monospace; font-size: 11px; color: var(--muted); background: rgba(10,10,10,0.6); padding: 3px 8px; }
        .project-body { padding: 28px; flex: 1; display: flex; flex-direction: column; }
        .project-heading { display: flex; align-items: flex-start; justify-content: space-between; gap: 12px; }
        .project-heading h3 { font-family: 'Space Grotesk', sans-serif; font-size: 22px; margin: 0 0 6px; font-weight: 600; }
        .project-role { font-family: 'JetBrains Mono', monospace; font-size: 11px; letter-spacing: 0.06em; text-transform: uppercase; color: var(--muted); margin: 0 0 14px; }
        .project-desc { color: var(--muted); font-size: 14px; line-height: 1.6; margin: 0 0 20px; flex: 1; }
        .tag-row { display: flex; flex-wrap: wrap; gap: 8px; }
        .tag { font-family: 'JetBrains Mono', monospace; font-size: 10px; letter-spacing: 0.04em; text-transform: uppercase; border: 1px solid var(--line); padding: 5px 9px; color: var(--muted); }
        .social-row { display: flex; flex-wrap: wrap; gap: 8px; margin-top: 18px; padding-top: 18px; border-top: 1px solid var(--line); }

        /* ---------- about ---------- */
        .about-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 64px; align-items: start; }
        .about-copy { color: var(--muted); font-size: 16px; line-height: 1.7; max-width: 480px; margin-bottom: 26px; display: block; }
        .badge-row { display: flex; flex-wrap: wrap; gap: 10px; }
        .badge { font-family: 'JetBrains Mono', monospace; font-size: 11px; letter-spacing: 0.06em; text-transform: uppercase; border: 1px solid var(--fg); padding: 8px 14px; }
        .skills-grid { display: grid; grid-template-columns: repeat(2, 1fr); gap: 1px; background: var(--line); border: 1px solid var(--line); }
        .skill-card { background: var(--bg); padding: 24px; }
        .skill-card h3 { font-family: 'Space Grotesk', sans-serif; font-size: 16px; margin: 14px 0 12px; font-weight: 600; }
        .skill-card li { font-size: 13px; color: var(--muted); padding: 5px 0; border-top: 1px solid var(--line); }
        .skill-card li:first-child { border-top: none; }

        /* ---------- contact ---------- */
        .contact-section { min-height: 70vh; display: flex; flex-direction: column; justify-content: center; }
        .contact-title { font-family: 'Space Grotesk', sans-serif; font-size: clamp(34px, 6vw, 68px); font-weight: 600; max-width: 780px; margin: 0 0 22px; letter-spacing: -0.01em; }
        .contact-sub { margin-bottom: 34px; }

        /* ---------- footer ---------- */
        .footer {
          display: flex; align-items: center; justify-content: space-between;
          padding: 26px clamp(20px, 5vw, 56px); border-top: 1px solid var(--line);
          font-family: 'JetBrains Mono', monospace; font-size: 11px; color: var(--muted);
        }

        /* ---------- reveal ---------- */
        .reveal { opacity: 0; transform: translateY(16px); transition: opacity 0.7s ease, transform 0.7s ease; }
        .reveal-visible { opacity: 1; transform: translateY(0); }

        @media (prefers-reduced-motion: reduce) {
          .marquee-track { animation: none; }
          .scroll-line { animation: none; }
          .reveal { transition: none; opacity: 1; transform: none; }
          .status-dot::after { animation: none; }
          .page-fade { animation: none; }
          .back-to-top { animation: none; }
          .cursor-dot { transition: none; }
        }

        @media (max-width: 860px) {
          .nav-links { display: none; }
          .nav-toggle { display: flex; }
          .work-grid, .work-grid-compact, .skills-grid { grid-template-columns: 1fr; }
          .services-grid { grid-template-columns: 1fr 1fr; }
          .process-grid { grid-template-columns: 1fr 1fr; }
          .about-grid { grid-template-columns: 1fr; gap: 40px; }
          .status-pill { display: none; }
        }
      `}</style>

      <Grain />
      <CursorDot />
      <Nav route={route} />
      <div className="page-fade" key={route}>
        <Page />
      </div>
      <Footer />
      <BackToTop />
    </div>
  );
}
