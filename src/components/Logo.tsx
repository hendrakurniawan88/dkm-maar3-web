import React from 'react';

interface LogoProps {
  size?: number;
  className?: string;
}

export default function Logo({ size = 58, className = '' }: LogoProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 240 240"
      className={className}
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        {/* Top text path - clockwise arch perfectly centered in the green band (radius = 97) */}
        <path
          id="topTextPath"
          d="M 23,120 A 97,97 0 0,1 217,120"
          fill="none"
        />
        {/* Bottom text path - counter-clockwise bowl perfectly centered in the green band (radius = 97) */}
        <path
          id="bottomTextPath"
          d="M 23,120 A 97,97 0 0,0 217,120"
          fill="none"
        />
      </defs>

      {/* Outer clean light-gray circular outline as seen in the real logo */}
      <circle cx="120" cy="120" r="118.5" stroke="#e1e5e6" strokeWidth="1.5" fill="none" />
      <circle cx="120" cy="120" r="116.5" stroke="#ffffff" strokeWidth="1" fill="none" />

      {/* Main outer ring containing text (Rich DKM Islamic Green) */}
      <circle cx="120" cy="120" r="111" fill="#0d963c" stroke="#ffffff" strokeWidth="2" />

      {/* Symmetrical 5-pointed divider stars on left and right borders */}
      {/* Left Star */}
      <polygon
        points="22,116 23.5,119.3 27,119.3 24.1,121.2 25.2,124.5 22,122.5 18.8,124.5 20,121.2 17,119.3 20.5,119.3"
        fill="#ffffff"
      />
      
      {/* Right Star */}
      <polygon
        points="218,116 219.5,119.3 223,119.3 220.1,121.2 221.2,124.5 218,122.5 214.8,124.5 216,121.2 213,119.3 216.5,119.3"
        fill="#ffffff"
      />

      {/* Curved Texts with clean bold sans fonts and precise SVG line-spacing/fonts */}
      <text
        fontFamily="system-ui, -apple-system, sans-serif"
        fontSize="12"
        fontWeight="800"
        fill="#ffffff"
        letterSpacing="0.10em"
      >
        <textPath href="#topTextPath" startOffset="50%" textAnchor="middle">
          DEWAN KEMAKMURAN MASJID
        </textPath>
      </text>

      <text
        fontFamily="system-ui, -apple-system, sans-serif"
        fontSize="8"
        fontWeight="800"
        fill="#ffffff"
        letterSpacing="0.08em"
      >
        <textPath href="#bottomTextPath" startOffset="50%" textAnchor="middle">
          PERUMAHAN MUSLIM ORCHID GREEN PARK
        </textPath>
      </text>

      {/* Inner Area - Bright neon/lime green background with mathematically computed outward notches */}
      <path
        d="M 37.1,116 H 28 A 4,4 0 0,0 28,124 H 37.1 A 83,83 0 0,0 202.9,124 H 212 A 4,4 0 0,0 212,116 H 202.9 A 83,83 0 0,0 37.1,116 Z"
        fill="#6efe00"
        stroke="#ffffff"
        strokeWidth="2.5"
      />

      {/* Symmetric horizontal slot details inside the left & right notches */}
      <path d="M 29.5,120 H 34.5" stroke="#0d963c" strokeWidth="2.5" strokeLinecap="round" />
      <path d="M 210.5,120 H 205.5" stroke="#0d963c" strokeWidth="2.5" strokeLinecap="round" />

      {/* Double Overlapping Squares (8-pointed Islamic Star) with Solid Vivid Orange Fill */}
      {/* Square 1 */}
      <rect
        x="72"
        y="72"
        width="96"
        height="96"
        fill="#ff8500"
        stroke="#ffffff"
        strokeWidth="2.5"
        strokeLinejoin="round"
      />
      {/* Square 2 (rotated 45 degrees) */}
      <rect
        x="72"
        y="72"
        width="96"
        height="96"
        fill="#ff8500"
        stroke="#ffffff"
        strokeWidth="2.5"
        strokeLinejoin="round"
        transform="rotate(45, 120, 120)"
      />

      {/* Interlocking geometric square corner chain links of dark green with white borders */}
      <g stroke="#ffffff" strokeLinejoin="miter">
        {/* Top-Left Link */}
        <rect x="62" y="62" width="20" height="20" fill="none" strokeWidth="6" />
        <rect x="62" y="62" width="20" height="20" fill="none" stroke="#0d963c" strokeWidth="3" />
        
        {/* Top-Right Link */}
        <rect x="158" y="62" width="20" height="20" fill="none" strokeWidth="6" />
        <rect x="158" y="62" width="20" height="20" fill="none" stroke="#0d963c" strokeWidth="3" />
        
        {/* Bottom-Left Link */}
        <rect x="62" y="158" width="20" height="20" fill="none" strokeWidth="6" />
        <rect x="62" y="158" width="20" height="20" fill="none" stroke="#0d963c" strokeWidth="3" />
        
        {/* Bottom-Right Link */}
        <rect x="158" y="158" width="20" height="20" fill="none" strokeWidth="6" />
        <rect x="158" y="158" width="20" height="20" fill="none" stroke="#0d963c" strokeWidth="3" />
      </g>

      {/* Central Circle over middle - recreating green center with Moon, Star & Mosque */}
      <circle cx="120" cy="120" r="39" fill="#0d963c" stroke="#ffffff" strokeWidth="2.5" />

      {/* High-Fidelity Silhouette of Crescent Moon pointing top-right */}
      <path
        d="M 112,94 C 103,101 99,116 104,128 C 109,140 123,141 133,133 C 123,135 111,130 109,119 C 107,110 113,101 112,94 Z"
        fill="#ffffff"
      />

      {/* Small Star near the crescent moon pointing top right - perfect symmetrical 5-pointed star */}
      <polygon
        points="133,102 134,104.15 136.2,104.15 134.4,105.4 135.1,107.5 133,106.25 130.9,107.5 131.6,106.4 129.8,104.15 132,104.15"
        fill="#ffffff"
      />

      {/* Elegant Mosque Dome & Minaret set next to each other inside the crescent */}
      {/* Mosque Dome (Left) */}
      <path
        d="M 105,128 H 115 C 117,125 117.5,121 114.5,119 C 112,117.5 111,114.5 110,112 C 109,114.5 108,117.5 105.5,119 C 102.5,121 103,125 105,128 Z"
        fill="#ffffff"
      />
      {/* Dome spire crescent assembly */}
      <line x1="110" y1="112" x2="110" y2="108.5" stroke="#ffffff" strokeWidth="0.8" />
      <circle cx="110" cy="108" r="0.7" fill="#ffffff" />

      {/* Mosque Minaret (Right) */}
      {/* Tower body */}
      <rect x="120" y="109" width="3" height="19" fill="#ffffff" />
      {/* Balcony */}
      <rect x="119" y="113.5" width="5" height="1.5" fill="#ffffff" />
      {/* Minaret cone cap */}
      <polygon points="120,109 123,109 121.5,105" fill="#ffffff" />
    </svg>
  );
}

