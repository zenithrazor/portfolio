import Link from 'next/link';

export default function SiteFooter() {
  return (
    <footer className="site-footer">
      <div className="section-inner footer-inner">
        <div className="footer-brand">
          <span className="brand-mark">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
              <path
                d="M12 2L3 7V17L12 22L21 17V7L12 2Z"
                stroke="currentColor"
                strokeWidth="1.4"
                strokeLinejoin="round"
              />
            </svg>
          </span>
          ZenithRazor
        </div>
        <p className="footer-note">Discord Developer &amp; Cloud Engineer — zenithrazor.com</p>
        <div className="footer-links">
          <a href="https://github.com/zenithrazor" target="_blank" rel="noopener noreferrer">
            GitHub
          </a>
          <a href="https://dsc.gg/apexis" target="_blank" rel="noopener noreferrer">
            Apexis
          </a>
          <Link href="/contact">Contact</Link>
        </div>
      </div>
    </footer>
  );
}
