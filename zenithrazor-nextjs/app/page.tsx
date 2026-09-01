import Link from 'next/link';
import ShaderField from '@/components/ShaderField';
import NodeNetwork from '@/components/NodeNetwork';
import Reveal from '@/components/Reveal';

export default function HomePage() {
  return (
    <>
      {/* HERO */}
      <section className="hero">
        <ShaderField mouseReactive />
        <div className="hero-content">
          <div className="hero-kicker">
            <span className="status-dot" />
            Available for select engagements
          </div>
          <h1 className="hero-title">
            Building the systems
            <br />
            behind Discord communities
            <br />
            that scale.
          </h1>
          <p className="hero-sub">
            I&apos;m ZenithRazor — a Discord developer and cloud engineer designing bots,
            servers, and hosting infrastructure for communities and businesses worldwide.
            I currently serve as <strong>Server Head at Apexis</strong>, a sponsorship
            agency, where I hold the No. 1 server position.
          </p>
          <div className="hero-actions">
            <Link href="/contact" className="btn btn-primary">
              Start a project
            </Link>
            <a
              href="https://github.com/zenithrazor"
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-ghost"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 .5C5.73.5.75 5.48.75 11.75c0 5.02 3.26 9.28 7.78 10.78.57.1.78-.25.78-.55 0-.27-.01-1.15-.02-2.09-3.17.69-3.84-1.36-3.84-1.36-.52-1.31-1.26-1.67-1.26-1.67-1.03-.7.08-.69.08-.69 1.14.08 1.74 1.17 1.74 1.17 1.01 1.74 2.66 1.24 3.31.95.1-.73.4-1.24.72-1.53-2.53-.29-5.19-1.27-5.19-5.63 0-1.24.44-2.26 1.17-3.06-.12-.29-.51-1.45.11-3.02 0 0 .96-.31 3.13 1.17a10.9 10.9 0 0 1 5.7 0c2.17-1.48 3.13-1.17 3.13-1.17.62 1.57.23 2.73.11 3.02.73.8 1.17 1.82 1.17 3.06 0 4.37-2.67 5.33-5.21 5.61.41.36.77 1.05.77 2.12 0 1.53-.01 2.76-.01 3.14 0 .3.2.66.79.55A11.26 11.26 0 0 0 23.25 11.75C23.25 5.48 18.27.5 12 .5Z" />
              </svg>
              View GitHub
            </a>
          </div>
          <div className="hero-stats">
            <div className="stat">
              <span className="stat-num">4</span>
              <span className="stat-label">Core disciplines under one roof</span>
            </div>
            <div className="stat-divider" />
            <div className="stat">
              <span className="stat-num">24/7</span>
              <span className="stat-label">Uptime-first hosting mindset</span>
            </div>
            <div className="stat-divider" />
            <div className="stat">
              <span className="stat-num">No. 1</span>
              <span className="stat-label">Server Head ranking at Apexis</span>
            </div>
            <div className="stat-divider" />
            <div className="stat">
              <span className="stat-num">Global</span>
              <span className="stat-label">Clients across regions</span>
            </div>
          </div>
        </div>
        <div className="scroll-cue">
          <span>Scroll</span>
          <div className="scroll-line">
            <div className="scroll-fill" />
          </div>
        </div>
      </section>

      {/* TICKER */}
      <div className="ticker-wrap">
        <div className="ticker">
          <div className="ticker-track">
            <span>Discord Bot Development</span>
            <span className="tdot">•</span>
            <span>Cloud Infrastructure</span>
            <span className="tdot">•</span>
            <span>Server Architecture</span>
            <span className="tdot">•</span>
            <span>Hosting Solutions</span>
            <span className="tdot">•</span>
            <span>Sponsorship Operations</span>
            <span className="tdot">•</span>
            <span>Discord Bot Development</span>
            <span className="tdot">•</span>
            <span>Cloud Infrastructure</span>
            <span className="tdot">•</span>
            <span>Server Architecture</span>
            <span className="tdot">•</span>
            <span>Hosting Solutions</span>
            <span className="tdot">•</span>
            <span>Sponsorship Operations</span>
            <span className="tdot">•</span>
          </div>
        </div>
      </div>

      {/* SERVICES */}
      <section className="services">
        <div className="section-inner">
          <Reveal as="div" className="section-head">
            <h2>What I build</h2>
            <p>Four disciplines, one operator. Each one supports the others.</p>
          </Reveal>
          <div className="service-grid">
            <Reveal as="article" className="service-card">
              <div className="service-icon">
                <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <rect x="3" y="3" width="18" height="18" rx="2" />
                  <path d="M3 9h18M9 21V9" />
                </svg>
              </div>
              <h3>Discord Bot &amp; Server Development</h3>
              <p>
                Custom bots for moderation, automation, ticketing, economy systems, and
                integrations — paired with server architecture designed for clarity,
                permissions, and growth.
              </p>
            </Reveal>

            <Reveal as="article" className="service-card">
              <div className="service-icon">
                <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <path d="M17.5 19H9a7 7 0 1 1 1.1-13.9A5.5 5.5 0 0 1 20 8.5a4.5 4.5 0 0 1-2.5 10.5Z" />
                </svg>
              </div>
              <h3>Hosting &amp; Deployment</h3>
              <p>
                Reliable hosting setups for bots and applications — process management,
                uptime monitoring, and deployment pipelines built so services stay
                online without babysitting.
              </p>
            </Reveal>

            <Reveal as="article" className="service-card">
              <div className="service-icon">
                <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <ellipse cx="12" cy="5" rx="8" ry="3" />
                  <path d="M4 5v6c0 1.66 3.58 3 8 3s8-1.34 8-3V5M4 11v6c0 1.66 3.58 3 8 3s8-1.34 8-3v-6" />
                </svg>
              </div>
              <h3>Cloud Infrastructure</h3>
              <p>
                Server provisioning, environment configuration, and scaling strategy for
                projects that need to grow from a single instance to a distributed setup
                without a rebuild.
              </p>
            </Reveal>

            <Reveal as="article" className="service-card">
              <div className="service-icon">
                <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
                  <circle cx="9" cy="7" r="4" />
                  <path d="M23 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75" />
                </svg>
              </div>
              <h3>Operations &amp; Management</h3>
              <p>
                Running the human side of technical projects — coordinating team members,
                structuring workflows, and managing partner relationships end to end.
              </p>
            </Reveal>
          </div>
        </div>
      </section>

      {/* SNAPSHOT */}
      <section className="snapshot">
        <div className="section-inner snapshot-grid">
          <Reveal as="div" className="snapshot-text">
            <h2 style={{ fontSize: 'clamp(1.8rem, 3.2vw, 2.6rem)', lineHeight: 1.15, marginBottom: '26px' }}>
              I work at the layer
              <br />
              most people never see.
            </h2>
            <p>
              Communities run on infrastructure they rarely think about — the bot that
              keeps roles in sync, the server that stays online at 3am, the pipeline that
              moves a sponsorship deal from first message to signed contract. That layer
              is where I operate.
            </p>
            <p>
              My work spans four connected disciplines: building and hosting Discord bots,
              engineering the cloud and server infrastructure they run on, and managing
              the people and operations that depend on both. I currently hold the{' '}
              <strong>Server Head</strong> position at <strong>Apexis</strong> — ranked No.
              1 — overseeing structure and coordination alongside <strong>Noren</strong>.
            </p>
            <div className="snapshot-links">
              <Link href="/about" className="btn btn-ghost">
                More about me
              </Link>
              <Link href="/experience" className="btn btn-ghost">
                View experience
              </Link>
            </div>
          </Reveal>
          <Reveal as="div">
            <NodeNetwork />
          </Reveal>
        </div>
      </section>

      {/* CTA BAND */}
      <section className="cta-band">
        <div className="section-inner">
          <Reveal as="div" className="cta-card">
            <div className="cta-card-glow" />
            <h2>Let&apos;s build something that stays online.</h2>
            <p>
              Foreign and international clients welcome. Reach out on Discord or GitHub to
              start a conversation about your project.
            </p>
            <div className="cta-actions">
              <Link href="/contact" className="btn btn-primary">
                Contact me
              </Link>
              <a
                href="https://dsc.gg/apexis"
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-ghost"
              >
                See Apexis
              </a>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
