"use client";

import { useEffect, useRef } from "react";

export default function AnimatedBackground() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const blobs = container.querySelectorAll('.blob');
    
    const animateBlobs = () => {
      blobs.forEach((blob, index) => {
        const element = blob as HTMLElement;
        const speed = 0.5 + index * 0.2;
        const amplitude = 50 + index * 30;
        const offset = index * Math.PI / 3;
        
        const x = Math.sin(Date.now() * 0.001 * speed + offset) * amplitude;
        const y = Math.cos(Date.now() * 0.001 * speed + offset) * amplitude;
        
        element.style.transform = `translate(${x}px, ${y}px)`;
      });
      
      requestAnimationFrame(animateBlobs);
    };

    animateBlobs();
  }, []);

  return (
    <div ref={containerRef} className="animated-background js-only" aria-hidden="true">
      <div className="blob blob-1"></div>
      <div className="blob blob-2"></div>
      <div className="blob blob-3"></div>
    </div>
  );
}
