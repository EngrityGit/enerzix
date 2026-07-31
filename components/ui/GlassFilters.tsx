export const GlassFilters = () => (
  <svg style={{ position: 'fixed', width: 0, height: 0 }}>
    <defs>
      {/* For the Liquid Glass Refraction */}
      <filter id="container-glass">
        <feGaussianBlur in="SourceGraphic" stdDeviation="10" result="blur" />
        <feColorMatrix in="blur" mode="matrix" values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 19 -9" result="goo" />
        <feComposite in="SourceGraphic" in2="goo" operator="atop" />
      </filter>

      {/* For the Button Liquid Effect */}
      <filter id="btn-glass">
        <feTurbulence type="fractalNoise" baseFrequency="0.01 0.08" numOctaves="1" result="noise" />
        <feDisplacementMap in="SourceGraphic" in2="noise" scale="5" />
      </filter>
    </defs>
  </svg>
);