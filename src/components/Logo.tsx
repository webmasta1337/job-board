'use client';

import { useState } from 'react';

interface LogoProps {
  src: string;
  fallback: string;
  alt: string;
  companyName: string;
  style?: React.CSSProperties;
}

export default function Logo({ src, fallback, alt, companyName, style }: LogoProps) {
  const [errorCount, setErrorCount] = useState(0);

  // If both local and external fallback fail, show a stylized placeholder
  if (errorCount >= 2) {
    return (
      <div style={{
        ...style,
        background: 'var(--foreground)',
        color: 'var(--background)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontWeight: '900',
        fontSize: '1.5rem',
        textTransform: 'uppercase',
        border: 'none'
      }}>
        {companyName.charAt(0)}
      </div>
    );
  }

  return (
    <img 
      src={errorCount === 0 ? src : fallback} 
      alt={alt}
      style={style}
      onError={() => {
        setErrorCount(prev => prev + 1);
      }}
      suppressHydrationWarning={true}
    />
  );
}
