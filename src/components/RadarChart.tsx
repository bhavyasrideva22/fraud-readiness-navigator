import { WiscarScore } from "@/data/assessmentData";

interface RadarChartProps {
  scores: WiscarScore;
  className?: string;
}

export const RadarChart = ({ scores, className }: RadarChartProps) => {
  const dimensions = [
    { key: 'will' as keyof WiscarScore, label: 'Will', angle: 0 },
    { key: 'interest' as keyof WiscarScore, label: 'Interest', angle: 60 },
    { key: 'skill' as keyof WiscarScore, label: 'Skill', angle: 120 },
    { key: 'cognitive' as keyof WiscarScore, label: 'Cognitive', angle: 180 },
    { key: 'ability' as keyof WiscarScore, label: 'Ability to Learn', angle: 240 },
    { key: 'realWorld' as keyof WiscarScore, label: 'Real-World Fit', angle: 300 },
  ];

  const centerX = 150;
  const centerY = 150;
  const maxRadius = 120;
  const gridLevels = 5;

  // Generate grid circles
  const gridCircles = Array.from({ length: gridLevels }, (_, i) => {
    const radius = (maxRadius * (i + 1)) / gridLevels;
    return (
      <circle
        key={i}
        cx={centerX}
        cy={centerY}
        r={radius}
        fill="none"
        stroke="hsl(var(--border))"
        strokeWidth="1"
        opacity={0.3}
      />
    );
  });

  // Generate grid lines
  const gridLines = dimensions.map((dim, i) => {
    const angle = (dim.angle * Math.PI) / 180;
    const x2 = centerX + maxRadius * Math.cos(angle - Math.PI / 2);
    const y2 = centerY + maxRadius * Math.sin(angle - Math.PI / 2);
    
    return (
      <line
        key={i}
        x1={centerX}
        y1={centerY}
        x2={x2}
        y2={y2}
        stroke="hsl(var(--border))"
        strokeWidth="1"
        opacity={0.3}
      />
    );
  });

  // Generate data polygon
  const dataPoints = dimensions.map((dim) => {
    const score = scores[dim.key];
    const normalizedScore = score / 100; // Assuming scores are 0-100
    const radius = maxRadius * normalizedScore;
    const angle = (dim.angle * Math.PI) / 180;
    const x = centerX + radius * Math.cos(angle - Math.PI / 2);
    const y = centerY + radius * Math.sin(angle - Math.PI / 2);
    return `${x},${y}`;
  });

  const polygonPoints = dataPoints.join(' ');

  // Generate labels
  const labels = dimensions.map((dim, i) => {
    const angle = (dim.angle * Math.PI) / 180;
    const labelRadius = maxRadius + 30;
    const x = centerX + labelRadius * Math.cos(angle - Math.PI / 2);
    const y = centerY + labelRadius * Math.sin(angle - Math.PI / 2);
    
    return (
      <text
        key={i}
        x={x}
        y={y}
        textAnchor="middle"
        dominantBaseline="middle"
        className="text-sm font-medium fill-foreground"
      >
        {dim.label}
      </text>
    );
  });

  // Generate score dots
  const scoreDots = dimensions.map((dim, i) => {
    const score = scores[dim.key];
    const normalizedScore = score / 100;
    const radius = maxRadius * normalizedScore;
    const angle = (dim.angle * Math.PI) / 180;
    const x = centerX + radius * Math.cos(angle - Math.PI / 2);
    const y = centerY + radius * Math.sin(angle - Math.PI / 2);
    
    return (
      <circle
        key={i}
        cx={x}
        cy={y}
        r="4"
        fill="hsl(var(--primary))"
        stroke="white"
        strokeWidth="2"
      />
    );
  });

  return (
    <div className={`${className} flex justify-center`}>
      <svg width="300" height="300" className="overflow-visible">
        {/* Grid */}
        {gridCircles}
        {gridLines}
        
        {/* Data area */}
        <polygon
          points={polygonPoints}
          fill="hsl(var(--primary))"
          fillOpacity="0.2"
          stroke="hsl(var(--primary))"
          strokeWidth="2"
        />
        
        {/* Score dots */}
        {scoreDots}
        
        {/* Labels */}
        {labels}
      </svg>
    </div>
  );
};