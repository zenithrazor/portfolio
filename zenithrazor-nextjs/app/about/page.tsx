import type { Metadata } from 'next';
import NodeNetwork from '@/components/NodeNetwork';
import Reveal from '@/components/Reveal';

export const metadata: Metadata = {
  title: 'About — ZenithRazor',
  description:
    'Learn more about ZenithRazor — a Discord developer, cloud engineer, and Server Head at Apexis.',
};

export default function AboutPage() {
  return (
    <>
      <section className="inner-hero">
        <div className="section-inner">
          <div className="page-kicker">
            <span className="status-dot small" />
            About
          </div>
          <h1>The person behind the infrastructure.</h1>
          <p className="lead">
            A closer look at how I got here, how I work, and what I care about when
            I&apos;m building for a client or a community.
          </p>
        </div>
      </section>

      <section className="about-body">
        <div className="section-inner about-grid">
          <Reveal as="div" className="about-text">
            <h2>Who I am</h2>
            <p>
              I&apos;m ZenithRazor, a Discord developer and cloud engineer. My work sits
              at the intersection of code and operations — I build the bots and servers
              that communities rely on, and I engineer the hosting and cloud
              infrastructure that keeps those systems running without interruption.
            </p>
            <p>
              Alongside development work, I manage teams and partnerships. I currently
              hold the <strong>Server Head</strong> position at{' '}
              <strong>Apexis</strong>, ranked No. 1, where I oversee day-to-day server
              operations, and I work closely with <strong>Noren</strong> in an ongoing
              management capacity.
            </p>

            <h2>How I work</h2>
            <p>
              I treat reliability as a first-class feature, not an afterthought.
              A bot that works most of the time isn&apos;t finished — hosting,
              monitoring, and recovery are part of the build, not a separate concern
              bolted on later. I write code that&apos;s meant to be maintained, not
              just shipped.
            </p>
            <p>
              On the operations side, I bring the same structure to managing people and
              partnerships that I bring to managing infrastructure: clear
              responsibilities, predictable processes, and communication that doesn&apos;t
              leave people guessing. I work with clients and teams across different
              regions and time zones, including a number of international clients, and
              I keep communication straightforward regardless of where someone is
              writing in from.
            </p>

            <h2>What I care about</h2>
            <div className="values-grid">
              <div className="value-card">
                <div className="value-icon">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
                    <path d="M12 2l3 6.5 7 1-5 5 1.2 7L12 18l-6.2 3.5L7 14.5 2 9.5l7-1L12 2z" />
                  </svg>
                </div>
                <h3>Reliability</h3>
                <p>Uptime and stability are treated as requirements, not stretch goals.</p>
              </div>
              <div className="value-card">
                <div className="value-icon">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
                    <path d="M9 11l3 3L22 4" />
                    <path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11" />
                  </svg>
                </div>
                <h3>Clarity</h3>
                <p>Clear structure and communication, so nothing depends on guesswork.</p>
              </div>
              <div className="value-card">
                <div className="value-icon">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
                    <circle cx="12" cy="12" r="9" />
                    <path d="M12 3a9 9 0 0 1 0 18M3 12h18" />
                  </svg>
                </div>
                <h3>Global reach</h3>
                <p>Comfortable working with clients and teams across regions and time zones.</p>
              </div>
            </div>
          </Reveal>

          <Reveal as="div">
            <NodeNetwork label="Systems I maintain" />
            <dl className="fact-list" style={{ marginTop: '28px' }}>
              <div className="fact-row">
                <dt>Name</dt>
                <dd>ZenithRazor</dd>
              </div>
              <div className="fact-row">
                <dt>Role</dt>
                <dd>Discord &amp; Cloud Developer</dd>
              </div>
              <div className="fact-row">
                <dt>Position</dt>
                <dd>Server Head at Apexis (No. 1)</dd>
              </div>
              <div className="fact-row">
                <dt>Managing</dt>
                <dd>Noren</dd>
              </div>
              <div className="fact-row">
                <dt>Focus</dt>
                <dd>Bots, hosting, cloud, operations</dd>
              </div>
              <div className="fact-row">
                <dt>Clients</dt>
                <dd>Domestic and international</dd>
              </div>
            </dl>
          </Reveal>
        </div>
      </section>
    </>
  );
}
