import { useState, MouseEvent, useEffect, useRef } from "react";
import { Button } from "./ui/button";
import { Crosshair, SwitchCamera, Play, Pause } from "lucide-react";
import { closest, isLight } from "color-2-name";
import { PixelSquareMatrix, PixelMatrixType } from "./pixel-matrix";
import { VideoSampler } from "./video-sampler";
import { Frame } from "./frame";

function VideoFeed() {
  const videoDivRef = useRef<HTMLDivElement>(null);
  const [coordinates, setCoordinates] = useState<{ x: number; y: number }>({
    x: Math.floor(window.innerWidth / 2),
    y: Math.floor(window.innerWidth / 2),
  });
  const [facingMode, setFacingMode] = useState<"user" | "environment">(
    "environment"
  );
  const [pixelMatrix, setPixelMatrix] = useState<PixelMatrixType>([]);
  const [isPaused, setIsPaused] = useState(false);
  const [pixelColor, setPixelColor] = useState<string>("rgb(0, 0, 0)");

  const togglePlay = () => {
    setIsPaused((prevState) => !prevState);
  };

  useEffect(() => {
    if (!videoDivRef.current) return;
    setCoordinates({
      x: Math.floor(videoDivRef.current.clientWidth / 2),
      y: Math.floor(videoDivRef.current.clientHeight / 2),
    });
  }, [videoDivRef]);

  const toggleCamera = () => {
    setFacingMode((prevMode) => (prevMode === "user" ? "environment" : "user"));
  };

  const handleClick = (event: MouseEvent<HTMLElement>) => {
    const element = event.currentTarget;
    const rect = element.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;
    setCoordinates({
      x: Math.round(x),
      y: Math.round(y),
    });
  };

  return (
    <div className="flex flex-col items-center">
      <div
        ref={videoDivRef}
        className="relative w-full aspect-square overflow-hidden"
        onClick={handleClick}
      >
        <VideoSampler
          facingMode={facingMode}
          coordinates={coordinates}
          onSample={(pixelMatrix) => {
            setPixelMatrix(pixelMatrix);
            const pixel = pixelMatrix[3][3];
            setPixelColor(
              `rgb(${pixel.color[0]}, ${pixel.color[1]}, ${pixel.color[2]})`
            );
          }}
          pause={isPaused}
        />
        <Frame />
        <Crosshair
          className="absolute h-5 w-5 top-40 left-40"
          style={{
            top: `${coordinates.y - 10}px`,
            left: `${coordinates.x - 10}px`,
            color: isLight(pixelColor) ? "#000" : "#fff",
            transition: "color 0.2s ease-in-out",
          }}
        />
      </div>
      <div className="flex mt-4 space-x-2">
        <Button
          onClick={toggleCamera}
          variant="outline"
          size="icon"
          className="p-2"
        >
          <SwitchCamera />
        </Button>
        <Button
          onClick={togglePlay}
          variant="outline"
          size="icon"
          className="p-2"
        >
          {isPaused ? <Play /> : <Pause />}
        </Button>
      </div>

      {pixelMatrix?.length > 0 && (
        <div className="flex mt-4 space-x-4">
          <PixelSquareMatrix
            pixels={pixelMatrix}
            className="w-20 h-20 rounded-md overflow-hidden"
            highlight={[3, 3]}
          />
          <div
            className="w-20 h-20 rounded-md"
            style={{ backgroundColor: pixelColor }}
          ></div>
        </div>
      )}
      <div className="mt-4">
        <p className="mt-2">
          Pixel Coordinates: ({coordinates.x}, {coordinates.y})
        </p>
        <p className="mt-2">Closest: {`${closest(pixelColor).name}`}</p>
      </div>
    </div>
  );
}

export default VideoFeed;
