import React from "react";

interface DoodleProps extends React.SVGProps<SVGSVGElement> {
  className?: string;
  color?: string;
}

export const ScribbleUnderline: React.FC<DoodleProps> = ({
  className = "",
  color = "#ffd709",
  ...props
}) => {
  return (
    <svg
      viewBox="0 0 200 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      preserveAspectRatio="none"
      className={`absolute left-0 right-0 -bottom-2 h-3 w-full pointer-events-none ${className}`}
      {...props}
    >
      <path
        d="M5,12 C40,3 100,5 150,8 C175,9.5 190,14 195,15 C180,14.5 130,11 90,12 C60,12.5 25,15 15,16"
        stroke={color}
        strokeWidth="3"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="path-draw"
      />
    </svg>
  );
};

export const ScribbleUnderlineDouble: React.FC<DoodleProps> = ({
  className = "",
  color = "#ff88b6",
  ...props
}) => {
  return (
    <svg
      viewBox="0 0 200 25"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      preserveAspectRatio="none"
      className={`absolute left-0 right-0 -bottom-3.5 h-5 w-full pointer-events-none ${className}`}
      {...props}
    >
      <path
        d="M4,10 C50,4 120,6 195,9 C150,8 80,7 20,11"
        stroke={color}
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M15,18 C65,13 135,14 190,16"
        stroke={color}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

export const CurlyArrow: React.FC<DoodleProps & { direction?: "left" | "right" | "up" | "down" }> = ({
  className = "",
  color = "#ffd709",
  direction = "right",
  ...props
}) => {
  // Arrow SVGs pointing different directions
  let pathD = "M10,80 C30,40 60,30 110,40 C125,43 130,55 120,65 C110,75 90,65 95,50 C100,30 130,15 170,25";
  let headD = "M150,15 L175,25 L160,45";

  if (direction === "left") {
    pathD = "M170,80 C150,40 120,30 70,40 C55,43 50,55 60,65 C70,75 90,65 85,50 C80,30 50,15 10,25";
    headD = "M30,15 L5,25 L20,45";
  } else if (direction === "down") {
    pathD = "M30,10 C20,35 25,65 40,95 C45,105 58,110 65,100 C72,90 62,75 50,80 C30,85 20,115 35,145";
    headD = "M20,130 L35,150 L50,135";
  } else if (direction === "up") {
    pathD = "M30,150 C20,125 25,95 40,65 C45,55 58,50 65,60 C72,70 62,85 50,80 C30,75 20,45 35,15";
    headD = "M20,30 L35,10 L50,25";
  }

  return (
    <svg
      viewBox="0 0 180 160"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={`pointer-events-none ${className}`}
      {...props}
    >
      <path
        d={pathD}
        stroke={color}
        strokeWidth="3.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d={headD}
        stroke={color}
        strokeWidth="3.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

export const HandDrawnCircle: React.FC<DoodleProps> = ({
  className = "",
  color = "#9b9cff",
  ...props
}) => {
  return (
    <svg
      viewBox="0 0 100 100"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={`absolute pointer-events-none ${className}`}
      {...props}
    >
      <path
        d="M50,5 C78,6 96,24 95,50 C94,76 74,96 48,95 C22,94 4,74 5,48 C6,22 28,4 52,6 C68,7 85,20 88,38"
        stroke={color}
        strokeWidth="3"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

export const SketchyStar: React.FC<DoodleProps> = ({
  className = "",
  color = "#ffd709",
  ...props
}) => {
  return (
    <svg
      viewBox="0 0 50 50"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={`pointer-events-none ${className}`}
      {...props}
    >
      <path
        d="M25,5 L30,18 L44,18 L33,27 L37,40 L25,32 L13,40 L17,27 L6,18 L20,18 Z"
        stroke={color}
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M23,10 L27,19 L37,19 L29,25 L32,34 L23,28 L14,34 L17,25 L9,19 L19,19 Z"
        stroke={color}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        opacity="0.7"
      />
    </svg>
  );
};

export const SparkleDoodle: React.FC<DoodleProps> = ({
  className = "",
  color = "#ff88b6",
  ...props
}) => {
  return (
    <svg
      viewBox="0 0 50 50"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={`pointer-events-none ${className}`}
      {...props}
    >
      <path d="M25,5 C25,16 34,25 45,25 C34,25 25,34 25,45 C25,34 16,25 5,25 C16,25 25,16 25,5 Z" fill={color} />
    </svg>
  );
};

export const BadgeStamp: React.FC<{
  text: string;
  type?: "pink" | "yellow";
  className?: string;
}> = ({ text, type = "pink", className = "" }) => {
  return (
    <div
      className={`retro-stamp ${
        type === "pink" ? "retro-stamp-pink" : "retro-stamp-yellow"
      } font-black text-sm select-none pointer-events-none ${className}`}
    >
      {text}
    </div>
  );
};
