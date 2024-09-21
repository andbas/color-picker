export function Frame() {
  return (
    <svg
      className="absolute inset-0 flex items-center justify-center text-background"
      viewBox="0 0 100 100"
      preserveAspectRatio="xMidYMid meet"
    >
      <rect
        x="0"
        y="0"
        width="100"
        height="100"
        rx="6" // Adjust the radius for rounded corners
        fill="none"
        stroke="currentColor" // Use current color for stroke
        strokeWidth="10"
        style={{ opacity: 0.7 }}
      />
    </svg>
  );
}
