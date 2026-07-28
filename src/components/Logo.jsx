import React from 'react';

const Logo = ({ className = "h-20", wrapperClassName = "", variant = "full", color = "gold" }) => {
  // Color configuration
  const colorMap = {
    gold: {
      crest: "#C5A880",
      text: "#C5A880",
    },
    white: {
      crest: "#FFFFFF",
      text: "#FFFFFF",
    },
    dark: {
      crest: "#0f172a",
      text: "#0f172a",
    }
  };

  const colors = colorMap[color] || colorMap.gold;

  return (
    <div className={`flex flex-col items-center justify-center ${wrapperClassName}`}>
      {/* CREST SVG */}
      <svg
        viewBox="0 0 200 180"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className={`${className} w-auto object-contain`}
      >
        {/* Shield Outer Outline with decorative curves */}
        <path
          d="M100 25 C125 15, 140 30, 140 50 C140 100, 100 145, 100 145 C100 145, 60 100, 60 50 C60 30, 75 15, 100 25 Z"
          stroke={colors.crest}
          strokeWidth="3.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        
        {/* Inner Shield Accent line */}
        <path
          d="M100 32 C120 24, 132 35, 132 50 C132 90, 100 132, 100 132 C100 132, 68 90, 68 50 C68 35, 80 24, 100 32 Z"
          stroke={colors.crest}
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          opacity="0.75"
        />

        {/* Serif Letter 'P' inside shield */}
        <text
          x="100"
          y="85"
          fill={colors.crest}
          fontFamily="Cinzel, Georgia, serif"
          fontSize="48"
          fontWeight="bold"
          textAnchor="middle"
          dominantBaseline="middle"
        >
          P
        </text>

        {/* Left Laurel Branch */}
        <path
          d="M52 110 C50 95, 52 80, 58 65 C60 60, 56 50, 50 60 C46 68, 44 80, 45 92 M50 90 C45 80, 42 70, 42 60 C40 55, 36 50, 36 60 C36 72, 38 85, 43 97 M52 110 C46 114, 40 116, 34 116 C30 116, 32 108, 38 106 C44 104, 48 106, 52 110 Z"
          fill={colors.crest}
          opacity="0.85"
        />
        {/* Additional leafy accents for left branch */}
        <path
          d="M58 80 C50 78, 48 70, 53 72 C58 74, 59 78, 58 80 Z M61 95 C55 90, 50 88, 54 92 C58 96, 60 96, 61 95 Z M53 60 C45 55, 48 48, 52 52 C56 56, 56 59, 53 60 Z"
          fill={colors.crest}
        />

        {/* Right Laurel Branch */}
        <path
          d="M148 110 C150 95, 148 80, 142 65 C140 60, 144 50, 150 60 C154 68, 156 80, 155 92 M150 90 C155 80, 158 70, 158 60 C160 55, 164 50, 164 60 C164 72, 162 85, 157 97 M148 110 C154 114, 160 116, 166 116 C170 116, 168 108, 162 106 C156 104, 152 106, 148 110 Z"
          fill={colors.crest}
          opacity="0.85"
        />
        {/* Additional leafy accents for right branch */}
        <path
          d="M142 80 C150 78, 152 70, 147 72 C142 74, 141 78, 142 80 Z M139 95 C145 90, 150 88, 146 92 C142 96, 140 96, 139 95 Z M147 60 C155 55, 152 48, 148 52 C144 56, 144 59, 147 60 Z"
          fill={colors.crest}
        />

        {/* Top Scrollwork Ribbon Details (Crown/Crest topper) */}
        <path
          d="M80 18 C85 10, 100 12, 100 12 C100 12, 115 10, 120 18 M90 22 C95 18, 100 20, 100 20 C100 20, 105 18, 110 22"
          stroke={colors.crest}
          strokeWidth="2"
          strokeLinecap="round"
        />
        <circle cx="100" cy="8" r="2.5" fill={colors.crest} />
        <circle cx="88" cy="11" r="1.5" fill={colors.crest} />
        <circle cx="112" cy="11" r="1.5" fill={colors.crest} />
      </svg>

      {/* TEXT BRANDING */}
      {variant === "full" && (
        <div className="mt-4 text-center">
          <h1 
            className="text-xl md:text-2xl font-bold tracking-[0.4em] uppercase font-serif"
            style={{ color: colors.text }}
          >
            Panache Hotels
          </h1>
          <span 
            className="text-[9px] tracking-[0.6em] uppercase opacity-75 font-sans font-bold block mt-2"
            style={{ color: colors.text }}
          >
            Luxury Franchise
          </span>
        </div>
      )}
    </div>
  );
};

export default Logo;
