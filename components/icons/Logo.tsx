import React from 'react';

interface LogoProps {
  className?: string;
  scrolled?: boolean;
}

export const EnerzixLogo: React.FC<LogoProps> = ({ className = "", scrolled = false }) => {
  // Brand Colors from your reference
  const navy = scrolled ? "#1a1a1a" : "#232B7A"; // Dark Navy
  const brandBlue = "#005FFF"; // Enerzix Blue

  return (
    <div className={`relative flex items-center justify-center ${className}`}>
      <svg
        width="220"
        height="90"
        viewBox="0 0 280 110"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="drop-shadow-sm"
      >
        {/* Main Text: "Enerzi" */}
        <text
          x="10"
          y="65"
          fill={navy}
          style={{
            fontFamily: 'Inter, system-ui, sans-serif',
            fontSize: '68px',
            fontWeight: '800',
            letterSpacing: '-2px',
          }}
        >
          Enerzi
        </text>

        {/* Custom "X" Geometry */}
        <g transform="translate(202, 28)">
          {/* Navy part of the X (Left arm) */}
          <path
            d="M5 37 L30 10"
            stroke={navy}
            strokeWidth="13"
            strokeLinecap="butt"
          />

          {/* The Iconic Blue Slash (Right arm of X) — CSS-only draw-in, no JS animation library needed */}
          <path
            className="logo-x-stroke"
            d="M-15 75 L60 -20"
            stroke={brandBlue}
            strokeWidth="13"
            strokeLinecap="butt"
            pathLength={1}
          />
        </g>

        {/* Bottom Section: Lines and "Water" */}
        <g transform="translate(0, 85)">
          {/* Left Horizontal Line */}
          <line
            x1="15" y1="5" x2="75" y2="5"
            stroke={scrolled ? "#e2e8f0" : brandBlue}
            strokeWidth="1.5"
          />

          {/* "Water" Text */}
          <text
            x="95"
            y="13"
            fill={brandBlue}
            style={{
              fontFamily: 'Inter, system-ui, sans-serif',
              fontSize: '22px',
              fontWeight: '600',
              letterSpacing: '0.4em',
              textTransform: 'uppercase'
            }}
          >
            Water
          </text>

          {/* Right Horizontal Line */}
          <line
            x1="205" y1="5" x2="265" y2="5"
            stroke={scrolled ? "#e2e8f0" : brandBlue}
            strokeWidth="1.5"
          />
        </g>

        {/* The Dot on the 'i' - making it a perfect circle like the ref */}
        <circle cx="189" cy="27" r="6" fill={navy} />
      </svg>
    </div>
  );
};

export default EnerzixLogo;
