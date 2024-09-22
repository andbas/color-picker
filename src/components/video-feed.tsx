import { PixelMatrixType } from "@/types";
import { pixelToHex, isLight } from "@/utils";
import { useState, MouseEvent, TouchEvent, useEffect, useRef } from "react";
import { Button } from "./ui/button";
import { Crosshair, SwitchCamera, Play, Pause } from "lucide-react";
import { closest } from "color-2-name";
import { PixelSquareMatrix } from "./pixel-matrix";
import { VideoSampler } from "./video-sampler";
import { Frame } from "./frame";
import { ColorViewer } from "./color-viewer";

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

  const handleVideoInteraction = (
    event: MouseEvent<HTMLDivElement> | TouchEvent<HTMLDivElement>
  ) => {
    const element = event.currentTarget;
    const rect = element.getBoundingClientRect();
    const client = "touches" in event ? event.touches[0] : event;

    const x = client.clientX - rect.left;
    const y = client.clientY - rect.top;
    setCoordinates({
      x: Math.round(x),
      y: Math.round(y),
    });
  };

  return (
    <div className="flex flex-col items-center">
      <div
        ref={videoDivRef}
        className="relative w-full aspect-square overflow-hidden touch-none"
        onTouchMove={handleVideoInteraction}
        onClick={handleVideoInteraction}
      >
        <VideoSampler
          facingMode={facingMode}
          coordinates={coordinates}
          onSample={(pixelMatrix) => {
            setPixelMatrix(pixelMatrix);
            const pixel = pixelMatrix[3][3];
            setPixelColor(pixelToHex(pixel));
          }}
          pause={isPaused}
        />
        <Frame />
        <Crosshair
          className={`absolute h-5 w-5 top-40 left-40 transition-colors duration-200 ease-in-out ${
            isLight(pixelColor) ? "text-black" : "text-white"
          }`}
          style={{
            top: `${coordinates.y - 10}px`,
            left: `${coordinates.x - 10}px`,
          }}
        />
      </div>

      {pixelMatrix?.length > 0 && <ColorViewer pixel={pixelMatrix[3][3]} />}

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
        <p className="mt-2">Closest: {`${closest(pixelColor).name}`}</p>
      </div>
    </div>
  );
}

export default VideoFeed;
