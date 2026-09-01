'use client';

import { useEffect, useRef } from 'react';

type Node = { x: number; y: number; vx: number; vy: number; r: number };

export default function NodeNetwork({ label = 'Live network view' }: { label?: string }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const panel = panelRef.current;
    if (!canvas || !panel) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let width = 0;
    let height = 0;
    let dpr = 1;
    let nodes: Node[] = [];
    const NODE_COUNT = 26;
    const LINK_DIST = 120;

    function resize() {
      const rect = panel!.getBoundingClientRect();
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      width = rect.width;
      height = rect.height;
      canvas!.width = width * dpr;
      canvas!.height = height * dpr;
      ctx!.setTransform(dpr, 0, 0, dpr, 0, 0);
    }

    function makeNodes() {
      nodes = [];
      for (let i = 0; i < NODE_COUNT; i++) {
        nodes.push({
          x: Math.random() * width,
          y: Math.random() * height,
          vx: (Math.random() - 0.5) * 0.28,
          vy: (Math.random() - 0.5) * 0.28,
          r: Math.random() * 1.6 + 1.2,
        });
      }
    }

    resize();
    makeNodes();

    function handleResize() {
      resize();
      makeNodes();
    }
    window.addEventListener('resize', handleResize);

    let running = true;
    const visObserver = new IntersectionObserver(
      (entries) => entries.forEach((e) => (running = e.isIntersecting)),
      { threshold: 0.01 }
    );
    visObserver.observe(canvas);

    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    let rafId = 0;

    function step() {
      rafId = requestAnimationFrame(step);
      if (!running) return;

      ctx!.clearRect(0, 0, width, height);

      if (!prefersReduced) {
        nodes.forEach((n) => {
          n.x += n.vx;
          n.y += n.vy;
          if (n.x < 0 || n.x > width) n.vx *= -1;
          if (n.y < 0 || n.y > height) n.vy *= -1;
        });
      }

      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          const dx = nodes[i].x - nodes[j].x;
          const dy = nodes[i].y - nodes[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < LINK_DIST) {
            const alpha = (1 - dist / LINK_DIST) * 0.35;
            ctx!.strokeStyle = `rgba(88, 101, 242, ${alpha})`;
            ctx!.lineWidth = 1;
            ctx!.beginPath();
            ctx!.moveTo(nodes[i].x, nodes[i].y);
            ctx!.lineTo(nodes[j].x, nodes[j].y);
            ctx!.stroke();
          }
        }
      }

      nodes.forEach((n) => {
        ctx!.beginPath();
        ctx!.arc(n.x, n.y, n.r, 0, Math.PI * 2);
        ctx!.fillStyle = 'rgba(58, 190, 255, 0.85)';
        ctx!.fill();
      });
    }
    rafId = requestAnimationFrame(step);

    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener('resize', handleResize);
      visObserver.disconnect();
    };
  }, []);

  return (
    <div className="node-panel" ref={panelRef}>
      <canvas ref={canvasRef} />
      <div className="node-panel-label">
        <span className="status-dot small" />
        {label}
      </div>
    </div>
  );
}
