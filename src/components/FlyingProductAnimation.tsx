import React, { useEffect, useState, useRef } from 'react';
import { useApp } from '../context/AppContext';
import { Sparkles } from 'lucide-react';

interface Particle {
  id: number;
  x: number;
  y: number;
  size: number;
  opacity: number;
  scale: number;
}

export const FlyingProductAnimation: React.FC = () => {
  const { flyingProduct, setFlyingProduct, triggerRoyalBoxBurst } = useApp();
  const [pos, setPos] = useState<{ x: number; y: number; scale: number; rotation: number; opacity: number } | null>(null);
  const [particles, setParticles] = useState<Particle[]>([]);
  const [impactBurst, setImpactBurst] = useState<{ x: number; y: number } | null>(null);
  const animFrameRef = useRef<number | null>(null);

  useEffect(() => {
    if (!flyingProduct) {
      setPos(null);
      setParticles([]);
      return;
    }

    const startX = flyingProduct.startRect.x + flyingProduct.startRect.width / 2;
    const startY = flyingProduct.startRect.y + flyingProduct.startRect.height / 2;
    const duration = 750; // ms
    const startTime = performance.now();

    // Determine target location: royal-cart-box-target inside cart drawer
    const getTargetPos = () => {
      const targetEl = document.getElementById('royal-cart-box-target');
      if (targetEl) {
        const rect = targetEl.getBoundingClientRect();
        return {
          x: rect.left + rect.width / 2,
          y: rect.top + rect.height / 2
        };
      }
      // Fallback target: left side drawer on desktop, upper-center on mobile
      const isMobile = window.innerWidth < 640;
      return {
        x: isMobile ? window.innerWidth / 2 : Math.min(220, window.innerWidth * 0.25),
        y: 180
      };
    };

    let particleIdCounter = 0;

    const animate = (currentTime: number) => {
      const elapsed = currentTime - startTime;
      const progress = Math.min(1, elapsed / duration);

      // Smooth custom cubic easing
      const ease = progress < 0.5 
        ? 4 * progress * progress * progress 
        : 1 - Math.pow(-2 * progress + 2, 3) / 2;

      const target = getTargetPos();

      // Parabolic arc: rises up by up to 130px in the middle of flight
      const arcLift = Math.sin(progress * Math.PI) * 130;
      const currentX = startX + (target.x - startX) * ease;
      const currentY = startY + (target.y - startY) * ease - arcLift;

      // Scale: starts at 1.0, inflates to 1.35 mid-air, compresses into 0.65 as it settles into the velvet box
      const currentScale = progress < 0.5 
        ? 1.0 + (progress * 2) * 0.35 
        : 1.35 - ((progress - 0.5) * 2) * 0.70;

      // Royal tilt rotation
      const currentRotation = Math.sin(progress * Math.PI) * 14;

      setPos({
        x: currentX,
        y: currentY,
        scale: Math.max(0.6, currentScale),
        rotation: currentRotation,
        opacity: progress > 0.92 ? 1 - (progress - 0.92) * 8 : 1
      });

      // Spawn golden trail spark particles
      if (Math.random() > 0.3) {
        particleIdCounter++;
        const newParticle: Particle = {
          id: particleIdCounter,
          x: currentX + (Math.random() - 0.5) * 35,
          y: currentY + (Math.random() - 0.5) * 35,
          size: Math.random() * 8 + 4,
          opacity: 0.9,
          scale: 1
        };
        setParticles(prev => [...prev.slice(-12), newParticle]);
      }

      if (progress < 1) {
        animFrameRef.current = requestAnimationFrame(animate);
      } else {
        // Landing impact inside royal box!
        triggerRoyalBoxBurst();
        setImpactBurst({ x: target.x, y: target.y });
        setPos(null);

        // Clear after landing ripple completes
        setTimeout(() => {
          setImpactBurst(null);
          setFlyingProduct(null);
        }, 500);
      }
    };

    animFrameRef.current = requestAnimationFrame(animate);

    return () => {
      if (animFrameRef.current) {
        cancelAnimationFrame(animFrameRef.current);
      }
    };
  }, [flyingProduct, setFlyingProduct, triggerRoyalBoxBurst]);

  if (!flyingProduct && !impactBurst && particles.length === 0) return null;

  return (
    <div className="fixed inset-0 z-[120] pointer-events-none overflow-hidden">
      {/* Golden Stardust Trail Particles */}
      {particles.map(p => (
        <div
          key={p.id}
          className="absolute rounded-full bg-gradient-to-r from-[#ffe07a] via-[#f2ca50] to-[#b38b33] shadow-[0_0_12px_#f2ca50] animate-ping"
          style={{
            left: `${p.x}px`,
            top: `${p.y}px`,
            width: `${p.size}px`,
            height: `${p.size}px`,
            transform: 'translate(-50%, -50%)',
            opacity: p.opacity
          }}
        />
      ))}

      {/* The Flying Perfume Bottle Artifact */}
      {pos && flyingProduct && (
        <div
          className="absolute will-change-transform flex flex-col items-center justify-center transition-opacity"
          style={{
            left: `${pos.x}px`,
            top: `${pos.y}px`,
            transform: `translate(-50%, -50%) scale(${pos.scale}) rotate(${pos.rotation}deg)`,
            opacity: pos.opacity
          }}
        >
          {/* Outer Royal Golden Aura Radiance */}
          <div className="absolute w-28 h-28 rounded-full bg-[#f2ca50]/30 blur-xl animate-pulse" />
          <div className="absolute w-20 h-20 rounded-full border-2 border-[#f2ca50]/60 shadow-[0_0_30px_#f2ca50] animate-spin" style={{ animationDuration: '3s' }} />

          {/* Flying Product Thumbnail Box */}
          <div className="relative w-20 h-20 rounded-2xl bg-[#0d0c0a] border-2 border-[#f2ca50] shadow-[0_10px_35px_rgba(242,202,80,0.6)] overflow-hidden p-1 flex items-center justify-center backdrop-blur-md">
            <img
              src={flyingProduct.product.image}
              alt={flyingProduct.product.nameAr}
              className="w-full h-full object-cover rounded-xl filter drop-shadow-[0_4px_10px_rgba(0,0,0,0.9)]"
            />
            {/* Gloss Reflection */}
            <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/20 to-transparent pointer-events-none" />
          </div>

          {/* Floating Royal Tag */}
          <div className="mt-1.5 px-2.5 py-0.5 rounded-full bg-[#141312]/95 border border-[#f2ca50]/80 shadow-lg text-[10px] font-bold text-[#f2ca50] flex items-center gap-1 whitespace-nowrap">
            <Sparkles className="w-3 h-3 text-[#f2ca50] animate-spin" />
            <span>متجه للعلبة الملكية...</span>
          </div>
        </div>
      )}

      {/* Impact Burst at Destination (The Royal Box) */}
      {impactBurst && (
        <div
          className="absolute"
          style={{
            left: `${impactBurst.x}px`,
            top: `${impactBurst.y}px`,
            transform: 'translate(-50%, -50%)'
          }}
        >
          {/* Expanding Shockwaves */}
          <div className="w-32 h-32 rounded-full border-2 border-[#f2ca50] animate-ping opacity-75 shadow-[0_0_35px_#f2ca50]" />
          <div className="absolute inset-0 w-20 h-20 -translate-x-1/2 -translate-y-1/2 m-auto rounded-full bg-[#f2ca50]/30 blur-lg animate-pulse" />
          
          {/* Arrival Badge */}
          <div className="absolute -top-10 left-1/2 -translate-x-1/2 px-3 py-1 bg-[#141312] border border-[#f2ca50] text-[#f2ca50] text-xs font-bold rounded-full shadow-2xl flex items-center gap-1.5 whitespace-nowrap animate-bounce">
            <Sparkles className="w-3.5 h-3.5 text-[#f2ca50]" />
            <span>اتحط جوه العلبة الملكية بنجاح! ✨</span>
          </div>
        </div>
      )}
    </div>
  );
};
