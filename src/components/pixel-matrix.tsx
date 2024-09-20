interface Pixel {
  color: [R: number, G: number, B: number];
}

export type PixelMatrixType = Pixel[][];

interface PixelMatrixProps {
  pixels: PixelMatrixType;
  className?: string;
  highlight?: [x: number, y: number];
}

export function PixelSquareMatrix({
  pixels,
  className,
  highlight,
}: PixelMatrixProps) {
  if (!pixels.length || !pixels[0].length) {
    console.error("The pixel matrix is empty.");
    return null;
  }

  const matrixSize = pixels.length;

  return (
    <div
      className={className}
      style={{
        display: "grid",
        gridTemplateColumns: `repeat(${matrixSize}, 1fr)`,
        gap: "1px",
        aspectRatio: "1 / 1",
      }}
    >
      {pixels.flat().map((pixel, index) => {
        const x = index % matrixSize;
        const y = Math.floor(index / matrixSize);
        const isHighlighted =
          highlight && x === highlight[0] && y === highlight[1];

        return (
          <div
            key={index}
            className={isHighlighted ? "ring-1 ring-foreground rounded-sm" : ""}
            style={{
              backgroundColor: `rgb(${pixel.color[0]}, ${pixel.color[1]}, ${pixel.color[2]})`,
              aspectRatio: "1 / 1",
            }}
          />
        );
      })}
    </div>
  );
}
