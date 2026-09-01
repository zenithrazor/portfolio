'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import DotMenu from './DotMenu';

export default function NavBar() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    function onScroll() {
      setScrolled(window.scrollY > 40);
    }
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <nav id="nav" className={scrolled ? 'scrolled' : ''}>
      <div className="nav-inner">
        <Link href="/" className="nav-brand">
          <span className="brand-mark">
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
              <path
                d="M12 2L3 7V17L12 22L21 17V7L12 2Z"
                stroke="currentColor"
                strokeWidth="1.4"
                strokeLinejoin="round"
              />
              <path
                d="M12 2V22M3 7L12 12M21 7L12 12M3 17L12 12M21 17L12 12"
                stroke="currentColor"
                strokeWidth="1"
                opacity="0.5"
              />
            </svg>
          </span>
          ZenithRazor
        </Link>
        <DotMenu />
      </div>
    </nav>
  );
}
