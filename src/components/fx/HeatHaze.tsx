"use client";

import { useEffect, useRef } from "react";

const VERT = /* glsl */ `
  attribute vec2 uv;
  attribute vec2 position;
  varying vec2 vUv;
  void main() {
    vUv = uv;
    gl_Position = vec4(position, 0.0, 1.0);
  }
`;

// Heat shimmer over the photo: slow rising sine waves everywhere, a soft
// ripple around the pointer/finger, and amplitude that swells with scroll
// velocity. Amplitudes are tiny on purpose — haze, not glitch.
const FRAG = /* glsl */ `
  precision highp float;
  uniform sampler2D tMap;
  uniform float uTime;
  uniform vec2 uPointer;
  uniform float uVelo;
  uniform vec2 uScale;
  uniform vec2 uFocal;
  varying vec2 vUv;

  void main() {
    vec2 st = uFocal + (vUv - 0.5) * uScale;

    float heat = 0.0016 + uVelo * 0.004;
    st.x += sin(st.y * 42.0 + uTime * 1.6) * heat;
    st.y += cos(st.x * 34.0 + uTime * 1.1) * heat * 0.6;

    float d = distance(vUv, uPointer);
    float ripple = smoothstep(0.32, 0.0, d);
    st += ripple * 0.008 * vec2(
      sin(d * 46.0 - uTime * 5.0),
      cos(d * 40.0 - uTime * 4.2)
    );

    gl_FragColor = texture2D(tMap, st);
  }
`;

type Props = {
  /** Public path of the image this canvas sits over (same crop math). */
  src: string;
  /** object-position of the underlying image, as 0–1 fractions. */
  focal?: [number, number];
  className?: string;
};

export default function HeatHaze({ src, focal = [0.5, 0.5], className }: Props) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let raf = 0;
    let disposed = false;
    let visible = true;
    let cleanup: (() => void) | undefined;

    (async () => {
      const { Renderer, Program, Mesh, Triangle, Texture } = await import(
        "ogl"
      );
      if (disposed) return;

      let renderer;
      try {
        // Phones render fewer pixels (DPR cap), not fewer effects.
        renderer = new Renderer({
          canvas,
          dpr: Math.min(window.devicePixelRatio || 1, 1.5),
          alpha: true,
          antialias: false,
        });
      } catch {
        return; // no WebGL — the next/image beneath is the experience
      }
      const gl = renderer.gl;

      const texture = new Texture(gl, { generateMipmaps: false });
      const img = new Image();
      img.src = (process.env.NEXT_PUBLIC_BASE_PATH ?? "") + src;

      const program = new Program(gl, {
        vertex: VERT,
        fragment: FRAG,
        uniforms: {
          tMap: { value: texture },
          uTime: { value: 0 },
          uPointer: { value: [0.5, 0.5] },
          uVelo: { value: 0 },
          uScale: { value: [1, 1] },
          uFocal: { value: focal },
        },
      });
      const mesh = new Mesh(gl, { geometry: new Triangle(gl), program });

      const fitCover = () => {
        // ogl writes inline px width/height on the canvas, so the canvas
        // itself is never a trustworthy measure — size from the parent.
        const box = canvas.parentElement!;
        const w = box.clientWidth || 1;
        const h = box.clientHeight || 1;
        renderer.setSize(w, h);
        if (!img.naturalWidth) return;
        const ca = w / h;
        const ia = img.naturalWidth / img.naturalHeight;
        // cover crop: scale the sampled window, anchored on the focal point
        const scale: [number, number] =
          ca > ia ? [1, ia / ca] : [ca / ia, 1];
        program.uniforms.uScale.value = scale;
        program.uniforms.uFocal.value = [
          Math.min(Math.max(focal[0], scale[0] / 2), 1 - scale[0] / 2),
          Math.min(Math.max(focal[1], scale[1] / 2), 1 - scale[1] / 2),
        ];
      };

      img.onload = () => {
        texture.image = img;
        fitCover();
        canvas.style.opacity = "1"; // fade in over the LCP image
      };

      const ro = new ResizeObserver(fitCover);
      ro.observe(canvas.parentElement!);

      const io = new IntersectionObserver(
        ([entry]) => {
          visible = entry.isIntersecting;
        },
        { threshold: 0 },
      );
      io.observe(canvas);

      let pointer: [number, number] = [0.5, 0.5];
      const onPointer = (e: PointerEvent) => {
        const rect = canvas.getBoundingClientRect();
        pointer = [
          (e.clientX - rect.left) / rect.width,
          // WebGL uv is y-up; screen y is down
          1 - (e.clientY - rect.top) / rect.height,
        ];
      };
      window.addEventListener("pointermove", onPointer, { passive: true });
      window.addEventListener("pointerdown", onPointer, { passive: true });

      let lastY = window.scrollY;
      let time = 0;
      let last = performance.now();

      const loop = (now: number) => {
        raf = requestAnimationFrame(loop);
        if (!visible || document.hidden || !img.naturalWidth) {
          last = now;
          return;
        }
        const dt = Math.min((now - last) / 1000, 0.05);
        last = now;
        time += dt;

        const y = window.scrollY;
        const velo = Math.min(Math.abs(y - lastY) / 60, 1);
        lastY = y;

        const u = program.uniforms;
        u.uTime.value = time;
        // ease pointer + velocity so the haze breathes instead of snapping
        u.uPointer.value = [
          u.uPointer.value[0] + (pointer[0] - u.uPointer.value[0]) * 0.06,
          u.uPointer.value[1] + (pointer[1] - u.uPointer.value[1]) * 0.06,
        ];
        u.uVelo.value += (velo - u.uVelo.value) * 0.08;

        renderer.render({ scene: mesh });
      };
      raf = requestAnimationFrame(loop);

      cleanup = () => {
        cancelAnimationFrame(raf);
        ro.disconnect();
        io.disconnect();
        window.removeEventListener("pointermove", onPointer);
        window.removeEventListener("pointerdown", onPointer);
        gl.getExtension("WEBGL_lose_context")?.loseContext();
      };
    })();

    return () => {
      disposed = true;
      cleanup?.();
    };
    // focal is intentionally excluded: the hero passes a constant, and
    // re-initing the WebGL context on array identity changes is wasteful.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [src]);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className={className}
      style={{ opacity: 0, transition: "opacity 0.8s ease" }}
    />
  );
}
