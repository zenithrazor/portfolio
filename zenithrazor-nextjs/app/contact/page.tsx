import type { Metadata } from 'next';
import ShaderField from '@/components/ShaderField';
import CopyButton from '@/components/CopyButton';
import Reveal from '@/components/Reveal';

export const metadata: Metadata = {
  title: 'Contact — ZenithRazor',
  description:
    'Get in touch with ZenithRazor on Discord (zenithrazor) or GitHub to discuss a Discord bot, hosting, or cloud infrastructure project.',
};

export default function ContactPage() {
  return (
    <section className="contact-body">
      <div className="contact-hero">
        <ShaderField className="contact-shader" />
        <div className="section-inner" style={{ position: 'relative', zIndex: 1 }}>
          <Reveal as="div" className="section-head" style={{ margin: 0 }}>
            <div className="page-kicker">
              <span className="status-dot small" />
              Contact
            </div>
            <h1>Let&apos;s build something that stays online.</h1>
            <p>
              Foreign and international clients welcome. The fastest way to reach me is
              Discord — message me directly to start a conversation about your project.
            </p>
          </Reveal>
        </div>
      </div>

      <div className="section-inner" style={{ position: 'relative', zIndex: 1 }}>
        <Reveal as="div" className="contact-grid">
          <div className="contact-card">
            <div className="contact-card-icon">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                <path d="M20.317 4.37a19.79 19.79 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.25.077.077 0 0 0-.079-.037A19.74 19.74 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057 19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028 14.09 14.09 0 0 0 1.226-1.994.076.076 0 0 0-.041-.106 13.107 13.107 0 0 1-1.872-.892.077.077 0 0 1-.008-.128c.126-.094.252-.192.372-.291a.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.099.246.198.373.291a.077.077 0 0 1-.006.128 12.3 12.3 0 0 1-1.873.892.076.076 0 0 0-.04.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.84 19.84 0 0 0 6.001-3.03.077.077 0 0 0 .031-.057c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.028ZM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.419 2.157-2.419 1.211 0 2.176 1.096 2.157 2.419 0 1.334-.955 2.419-2.157 2.419Zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.419 2.157-2.419 1.211 0 2.176 1.096 2.157 2.419 0 1.334-.946 2.419-2.157 2.419Z" />
              </svg>
            </div>
            <div className="contact-card-body">
              <span className="contact-label">Discord</span>
              <span className="contact-value">zenithrazor</span>
            </div>
            <CopyButton value="zenithrazor" />
          </div>

          <a
            href="https://github.com/zenithrazor"
            target="_blank"
            rel="noopener noreferrer"
            className="contact-card contact-card-link"
          >
            <div className="contact-card-icon">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 .5C5.73.5.75 5.48.75 11.75c0 5.02 3.26 9.28 7.78 10.78.57.1.78-.25.78-.55 0-.27-.01-1.15-.02-2.09-3.17.69-3.84-1.36-3.84-1.36-.52-1.31-1.26-1.67-1.26-1.67-1.03-.7.08-.69.08-.69 1.14.08 1.74 1.17 1.74 1.17 1.01 1.74 2.66 1.24 3.31.95.1-.73.4-1.24.72-1.53-2.53-.29-5.19-1.27-5.19-5.63 0-1.24.44-2.26 1.17-3.06-.12-.29-.51-1.45.11-3.02 0 0 .96-.31 3.13 1.17a10.9 10.9 0 0 1 5.7 0c2.17-1.48 3.13-1.17 3.13-1.17.62 1.57.23 2.73.11 3.02.73.8 1.17 1.82 1.17 3.06 0 4.37-2.67 5.33-5.21 5.61.41.36.77 1.05.77 2.12 0 1.53-.01 2.76-.01 3.14 0 .3.2.66.79.55A11.26 11.26 0 0 0 23.25 11.75C23.25 5.48 18.27.5 12 .5Z" />
              </svg>
            </div>
            <div className="contact-card-body">
              <span className="contact-label">GitHub</span>
              <span className="contact-value">github.com/zenithrazor</span>
            </div>
            <span className="contact-arrow">
              <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M7 17L17 7M7 7h10v10" />
              </svg>
            </span>
          </a>

          <a
            href="https://dsc.gg/apexis"
            target="_blank"
            rel="noopener noreferrer"
            className="contact-card contact-card-link"
          >
            <div className="contact-card-icon">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
                <circle cx="9" cy="7" r="4" />
                <path d="M23 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75" />
              </svg>
            </div>
            <div className="contact-card-body">
              <span className="contact-label">Apexis</span>
              <span className="contact-value">dsc.gg/apexis</span>
            </div>
            <span className="contact-arrow">
              <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M7 17L17 7M7 7h10v10" />
              </svg>
            </span>
          </a>
        </Reveal>

        <Reveal as="div" className="contact-note">
          <div className="contact-note-icon">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
              <circle cx="12" cy="12" r="9" />
              <path d="M12 3a9 9 0 0 1 0 18M3 12h18" />
            </svg>
          </div>
          <div>
            <h3>Working with international clients</h3>
            <p>
              I regularly work with clients outside my own time zone. If you&apos;re
              reaching out from another region, mention your timezone and preferred
              hours in your first message on Discord and I&apos;ll work scheduling
              around it.
            </p>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
