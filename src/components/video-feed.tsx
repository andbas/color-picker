import { useEffect, useRef, useState, MouseEvent } from "react";
import { Button } from "./ui/button";
import { Crosshair, SwitchCamera } from "lucide-react";
import { closest, isLight } from "color-2-name";

function VideoFeed() {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [pixelColor, setPixelColor] = useState<string>("rgb(0, 0, 0)");
  const [coordinates, setCoordinates] = useState<{ x: number; y: number }>({
    x: 160,
    y: 160,
  });
  const [facingMode, setFacingMode] = useState<"user" | "environment">(
    "environment"
  );

  const startCamera = () => {
    navigator.mediaDevices
      .getUserMedia({ video: { facingMode: facingMode } })
      .then((stream) => {
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
        }
      })
      .catch((err) => console.error("Error accessing the camera:", err));
  };

  useEffect(() => {
    startCamera();
  }, [facingMode]);

  const toggleCamera = () => {
    setFacingMode((prevMode) => (prevMode === "user" ? "environment" : "user"));
  };

  const processFrame = () => {
    if (canvasRef.current && videoRef.current) {
      const context = canvasRef.current.getContext("2d", {
        willReadFrequently: true,
      });
      if (context) {
        context.drawImage(
          videoRef.current,
          0,
          0,
          canvasRef.current.width,
          canvasRef.current.height
        );
        const pixelData = context.getImageData(
          coordinates.x,
          coordinates.y,
          1,
          1
        ).data;
        let [r, g, b] = pixelData;
        const color = `rgb(${r}, ${g}, ${b})`;
        setPixelColor(color);
      }
    }
    requestAnimationFrame(processFrame);
  };

  useEffect(() => {
    requestAnimationFrame(processFrame);
  }, [coordinates]);

  const handleVideoClick = (event: MouseEvent<HTMLVideoElement>) => {
    const rect = videoRef.current?.getBoundingClientRect();
    if (rect) {
      const x = event.clientX - rect.left;
      const y = event.clientY - rect.top;
      setCoordinates({ x: Math.round(x), y: Math.round(y) });
    }
  };

  return (
    <div className="flex flex-col items-center mt-6">
      <div className="relative w-80 h-80">
        <video
          ref={videoRef}
          autoPlay
          playsInline
          className="absolute top-0 left-0 w-full h-full object-cover bg-background rounded-md"
          onClick={handleVideoClick}
        ></video>

        <Crosshair
          className="absolute h-5 w-5 top-40 left-40"
          style={{
            top: `${coordinates.y - 10}px`,
            left: `${coordinates.x - 10}px`,
            color: isLight(pixelColor) ? "#000" : "#fff",
          }}
        />
      </div>
      <Button onClick={toggleCamera} variant="outline" className="mt-4">
        <SwitchCamera />
      </Button>
      <canvas
        ref={canvasRef}
        width="320"
        height="320"
        className="hidden"
      ></canvas>
      <div
        className="mt-4 w-20 h-20"
        style={{ backgroundColor: pixelColor }}
      ></div>
      <div className="mt-4">
        <p className="mt-2">
          Pixel Coordinates: ({coordinates.x}, {coordinates.y})
        </p>
        {/* <p className="mt-2">Pixel Color: {pixelColor}</p> */}
        <p className="mt-2">Closest: {`${closest(pixelColor).name}`}</p>
      </div>
    </div>
  );
}

export default VideoFeed;
