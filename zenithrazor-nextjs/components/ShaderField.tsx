'use client';

import { useEffect, useRef } from 'react';

const VERT_SRC = `
attribute vec2 a_pos;
void main() { gl_Position = vec4(a_pos, 0.0, 1.0); }
`;

const FRAG_SRC = `
precision highp float;
uniform vec2 u_resolution;
uniform float u_time;
uniform vec2 u_mouse;

float hash(vec2 p) { return fract(sin(dot(p, vec2(41.3, 289.1))) * 43758.5453); }
float noise(vec2 p) {
  vec2 i = floor(p);
  vec2 f = fract(p);
  float a = hash(i);
  float b = hash(i + vec2(1.0, 0.0));
  float c = hash(i + vec2(0.0, 1.0));
  float d = hash(i + vec2(1.0, 1.0));
  vec2 u = f * f * (3.0 - 2.0 * f);
  return mix(a, b, u.x) + (c - a) * u.y * (1.0 - u.x) + (d - b) * u.x * u.y;
}
float fbm(vec2 p) {
  float v = 0.0;
  float amp = 0.5;
  for (int i = 0; i < 5; i++) {
    v += amp * noise(p);
    p *= 2.02;
    amp *= 0.5;
  }
  return v;
}

void main() {
  vec2 uv = gl_FragCoord.xy / u_resolution.xy;
  vec2 p = uv;
  p.x *= u_resolution.x / u_resolution.y;

  float t = u_time * 0.045;

  vec2 mouse = u_mouse;
  mouse.x *= u_resolution.x / u_resolution.y;
  float mouseDist = length(p - mouse);
  float mouseInfluence = smoothstep(0.5, 0.0, mouseDist) * 0.12;

  vec2 flowP = p * 2.6 + vec2(t * 1.3, t * 0.7);
  flowP += mouseInfluence * normalize(p - mouse + 0.001);

  float n1 = fbm(flowP);
  float n2 = fbm(flowP * 1.7 + 4.0 - t * 0.5);
  float field = fbm(vec2(n1, n2) * 1.4 + t * 0.3);

  float lines = smoothstep(0.0, 0.02, abs(fract(field * 7.0) - 0.5) - 0.46);
  lines = 1.0 - lines;

  vec3 colBg = mix(vec3(0.039, 0.043, 0.055), vec3(0.055, 0.06, 0.09), uv.y);
  vec3 colAccent = vec3(0.345, 0.396, 0.949);
  vec3 colCyan = vec3(0.227, 0.745, 1.0);

  vec3 lineColor = mix(colAccent, colCyan, n2);
  vec3 col = colBg + lineColor * lines * 0.22 * (0.5 + 0.5 * field);

  col += colCyan * mouseInfluence * 0.35;

  float vig = smoothstep(1.1, 0.25, length(uv - 0.5));
  col *= mix(0.55, 1.0, vig);

  float grain = (hash(gl_FragCoord.xy + u_time) - 0.5) * 0.02;
  col += grain;

  gl_FragColor = vec4(col, 1.0);
}
`;

export default function ShaderField({
  mouseReactive = false,
  className = '',
}: {
  mouseReactive?: boolean;
  className?: string;
}) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const parent = canvas.parentElement;
    if (!parent) return;

    const gl = (canvas.getContext('webgl') ||
      canvas.getContext('experimental-webgl')) as WebGLRenderingContext | null;
    if (!gl) {
      canvas.style.display = 'none';
      return;
    }

    function compile(type: number, src: string) {
      const shader = gl!.createShader(type);
      if (!shader) return null;
      gl!.shaderSource(shader, src);
      gl!.compileShader(shader);
      if (!gl!.getShaderParameter(shader, gl!.COMPILE_STATUS)) {
        console.warn(gl!.getShaderInfoLog(shader));
        return null;
      }
      return shader;
    }

    const vs = compile(gl.VERTEX_SHADER, VERT_SRC);
    const fs = compile(gl.FRAGMENT_SHADER, FRAG_SRC);
    if (!vs || !fs) return;

    const program = gl.createProgram();
    if (!program) return;
    gl.attachShader(program, vs);
    gl.attachShader(program, fs);
    gl.linkProgram(program);
    if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
      console.warn(gl.getProgramInfoLog(program));
      return;
    }
    gl.useProgram(program);

    const posBuf = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, posBuf);
    gl.bufferData(
      gl.ARRAY_BUFFER,
      new Float32Array([-1, -1, 1, -1, -1, 1, -1, 1, 1, -1, 1, 1]),
      gl.STATIC_DRAW
    );

    const aPos = gl.getAttribLocation(program, 'a_pos');
    gl.enableVertexAttribArray(aPos);
    gl.vertexAttribPointer(aPos, 2, gl.FLOAT, false, 0, 0);

    const uRes = gl.getUniformLocation(program, 'u_resolution');
    const uTime = gl.getUniformLocation(program, 'u_time');
    const uMouse = gl.getUniformLocation(program, 'u_mouse');

    const mouse = { x: 0.5, y: 0.5 };
    const targetMouse = { x: 0.5, y: 0.5 };

    function handleMouseMove(e: MouseEvent) {
      const rect = parent!.getBoundingClientRect();
      targetMouse.x = (e.clientX - rect.left) / rect.width;
      targetMouse.y = 1.0 - (e.clientY - rect.top) / rect.height;
    }
    if (mouseReactive) {
      parent.addEventListener('mousemove', handleMouseMove);
    }

    function resize() {
      const rect = parent!.getBoundingClientRect();
      const dpr = Math.min(window.devicePixelRatio || 1, 1.6);
      canvas!.width = Math.max(1, Math.floor(rect.width * dpr));
      canvas!.height = Math.max(1, Math.floor(rect.height * dpr));
      gl!.viewport(0, 0, canvas!.width, canvas!.height);
    }
    resize();
    window.addEventListener('resize', resize);

    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const startTime = performance.now();
    let running = true;
    let rafId = 0;

    const visObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          running = entry.isIntersecting;
        });
      },
      { threshold: 0.01 }
    );
    visObserver.observe(canvas);

    function frame(now: number) {
      rafId = requestAnimationFrame(frame);
      if (!running) return;
      const t = (now - startTime) / 1000;

      mouse.x += (targetMouse.x - mouse.x) * 0.04;
      mouse.y += (targetMouse.y - mouse.y) * 0.04;

      gl!.useProgram(program);
      gl!.uniform2f(uRes, canvas!.width, canvas!.height);
      gl!.uniform1f(uTime, prefersReduced ? t * 0.15 : t);
      gl!.uniform2f(uMouse, mouse.x, mouse.y);
      gl!.drawArrays(gl!.TRIANGLES, 0, 6);
    }
    rafId = requestAnimationFrame(frame);

    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener('resize', resize);
      if (mouseReactive) parent.removeEventListener('mousemove', handleMouseMove);
      visObserver.disconnect();
    };
  }, [mouseReactive]);

  return (
    <div className={`shader-field ${className}`}>
      <canvas ref={canvasRef} />
    </div>
  );
}
