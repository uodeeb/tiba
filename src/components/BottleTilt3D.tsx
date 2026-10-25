import React, { useState, useRef } from 'react';

interface BottleTilt3DProps {
  imageSrc: string;
  name: string;
  size?: 'sm' | 'md' | 'lg' | 'hero';
  badge?: string;
  className?: string;
  glowColor?: string;
}

export const BottleTilt3D: React.FC<BottleTilt3DProps> = ({
  imageSrc,
  name,
  size = 'md',
  badge,
  className = '',
  glowColor = 'rgba(242, 202, 80, 0.25)'
}) => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [rotateX, setRotateX] = useState<number>(0);
  const [rotateY, setRotateY] = useState<number>(0);
  const [glarePos, setGlarePos] = useState<{ x: number; y: number; opacity: number }>({ x: 50, y: 50, opacity: 0 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const rotX = ((y - centerY) / centerY) * -14;
    const rotY = ((x - centerX) / centerX) * 14;

    setRotateX(rotX);
    setRotateY(rotY);
    setGlarePos({
      x: (x / rect.width) * 100,
      y: (y / rect.height) * 100,
      opacity: 0.4
    });
  };

  const handleMouseLeave = () => {
    setRotateX(0);
    setRotateY(0);
    setGlarePos(prev => ({ ...prev, opacity: 0 }));
  };

  const sizeClasses = {
    sm: 'w-28 h-36',
    md: 'w-48 h-64',
    lg: 'w-64 h-80',
    hero: 'w-72 sm:w-96 h-96 sm:h-[480px]'
  }[size];

  return (
    <div
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className={`relative cursor-pointer transition-transform duration-300 ease-out select-none flex items-center justify-center ${className}`}
      style={{ perspective: '1000px' }}
    >
      <div
        className={`relative ${sizeClasses} transition-all duration-150 ease-out flex items-center justify-center`}
        style={{
          transform: `rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02, 1.02, 1.02)`,
          transformStyle: 'preserve-3d'
        }}
      >
        {/* Soft Radial Ambient Glow */}
        <div
          className="absolute inset-0 rounded-full blur-2xl pointer-events-none transition-opacity duration-300 -z-10"
          style={{ background: `radial-gradient(circle, ${glowColor} 0%, transparent 70%)` }}
        />

        {/* Flacon Image */}
        <img
          src={imageSrc}
          alt={name}
          className="w-full h-full object-cover rounded-2xl filter drop-shadow-[0_20px_35px_rgba(0,0,0,0.85)] pointer-events-none transition-transform border border-[#f2ca50]/20"
          onError={(e) => {
            (e.target as HTMLImageElement).src = '/assets/perfumes/royal_oud.jpg';
          }}
        />

        {/* Specular Liquid Gold Reflection Glare */}
        <div
          className="absolute inset-0 pointer-events-none rounded-2xl transition-opacity duration-200"
          style={{
            background: `radial-gradient(circle at ${glarePos.x}% ${glarePos.y}%, rgba(255, 247, 214, ${glarePos.opacity}) 0%, rgba(242, 202, 80, 0.05) 40%, transparent 70%)`
          }}
        />

        {/* Badge if present */}
        {badge && (
          <div className="absolute top-2 right-2 bg-gradient-to-r from-[#f2ca50] to-[#b38b33] text-[#090807] text-[11px] font-bold px-2.5 py-1 rounded-full shadow-lg border border-[#fff7d6]/30 uppercase tracking-wider">
            {badge}
          </div>
        )}
      </div>
    </div>
  );
};
