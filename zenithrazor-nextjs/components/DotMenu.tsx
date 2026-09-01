'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';

const NAV_ITEMS = [
  { href: '/', label: 'Home' },
  { href: '/about', label: 'About' },
  { href: '/experience', label: 'Experience' },
  { href: '/contact', label: 'Contact' },
];

export default function DotMenu() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  const menuRef = useRef<HTMLDivElement>(null);
  const btnRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  useEffect(() => {
    function onClick(e: MouseEvent) {
      if (
        menuRef.current &&
        !menuRef.current.contains(e.target as Node) &&
        btnRef.current &&
        !btnRef.current.contains(e.target as Node)
      ) {
        setOpen(false);
      }
    }
    function onKey(e: KeyboardEvent) {
      if (e.key === 'Escape') setOpen(false);
    }
    document.addEventListener('mousedown', onClick);
    document.addEventListener('keydown', onKey);
    return () => {
      document.removeEventListener('mousedown', onClick);
      document.removeEventListener('keydown', onKey);
    };
  }, []);

  return (
    <div className="dotmenu-wrap">
      <button
        ref={btnRef}
        className={`dotmenu-trigger${open ? ' is-open' : ''}`}
        aria-label="Open navigation menu"
        aria-expanded={open}
        onClick={() => setOpen((v) => !v)}
      >
        <span className="dot" />
        <span className="dot" />
        <span className="dot" />
      </button>

      <div className={`dotmenu-panel${open ? ' is-open' : ''}`} ref={menuRef}>
        <nav className="dotmenu-nav">
          {NAV_ITEMS.map((item, i) => {
            const active = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`dotmenu-link${active ? ' is-active' : ''}`}
                style={{ transitionDelay: open ? `${i * 40}ms` : '0ms' }}
              >
                <span className="dotmenu-link-index">{String(i + 1).padStart(2, '0')}</span>
                <span>{item.label}</span>
                {active && <span className="dotmenu-link-current">Current</span>}
              </Link>
            );
          })}
        </nav>
        <div className="dotmenu-footer">
          <a href="https://github.com/zenithrazor" target="_blank" rel="noopener noreferrer">
            GitHub
          </a>
          <a href="https://dsc.gg/apexis" target="_blank" rel="noopener noreferrer">
            Apexis
          </a>
        </div>
      </div>

      {open && <div className="dotmenu-overlay" onClick={() => setOpen(false)} />}
    </div>
  );
}
