"use client";

import { PixelMatrixType } from "@/types";
import { pixelToHex, isLight } from "@/utils";
import { useState, MouseEvent, TouchEvent, useEffect, useRef } from "react";
import { Button } from "./ui/button";
import {
  Crosshair,
  SwitchCamera,
  Play,
  Aperture,
  Ellipsis,
  Hash,
  Palette,
  LetterText,
} from "lucide-react";
import { PixelSquareMatrix } from "./pixel-matrix";
import { VideoSampler } from "./video-sampler";
import { Frame } from "./frame";
import { ColorViewer } from "./color-viewer";
import { useSidebarMenu } from "@/hooks/use-sidebar-menu";

interface VideoFeedProps {}

function VideoFeed({}: VideoFeedProps) {
  const videoDivRef = useRef<HTMLDivElement>(null);
  const [coordinates, setCoordinates] = useState<{ x: number; y: number }>({
    x: -100,
    y: -100,
  });
  const [facingMode, setFacingMode] = useState<"user" | "environment">(
    "environment"
  );
  const [pixelMatrix, setPixelMatrix] = useState<PixelMatrixType>([]);
  const [isPaused, setIsPaused] = useState(false);
  const [pixelColor, setPixelColor] = useState<string>("rgb(0, 0, 0)");
  const [namingMode, setNamingMode] = useState<"hex" | "rgb" | "name">("name");
  const { setSidebarOpen } = useSidebarMenu();

  const togglePlay = () => {
    setIsPaused((prevState) => !prevState);
  };

  const toggleNamingMode = () => {
    setNamingMode((prevMode) =>
      prevMode === "hex" ? "rgb" : prevMode === "rgb" ? "name" : "hex"
    );
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
        onMouseUp={handleVideoInteraction}
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

      {pixelMatrix?.length > 0 && (
        <ColorViewer pixel={pixelMatrix[3][3]} mode={namingMode} />
      )}

      {pixelMatrix?.length > 0 && (
        <div className="flex mt-8 space-x-8">
          <PixelSquareMatrix
            pixels={pixelMatrix}
            className="w-32 h-32 rounded-md overflow-hidden"
            highlight={[3, 3]}
          />
          <div className="grid grid-cols-2 gap-1 opacity-80">
            <Button
              onClick={toggleCamera}
              variant="outline"
              className="w-16 h-16 border-2"
            >
              <SwitchCamera />
            </Button>
            <Button
              onClick={togglePlay}
              variant="outline"
              className="w-16 h-16 border-2"
            >
              {isPaused ? <Play /> : <Aperture />}
            </Button>
            <Button
              onClick={toggleNamingMode}
              variant="outline"
              className="w-16 h-16 border-2"
            >
              {namingMode === "hex" ? (
                <Hash />
              ) : namingMode === "rgb" ? (
                <Palette />
              ) : (
                <LetterText />
              )}
            </Button>
            <Button
              onClick={() => setSidebarOpen(true)}
              variant="outline"
              className="w-16 h-16 border-2"
            >
              <Ellipsis />
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}

export default VideoFeed;
