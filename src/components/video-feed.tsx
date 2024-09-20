import { useEffect, useRef, useState, MouseEvent } from "react";
import { Button } from "./ui/button";
import { Crosshair, SwitchCamera, Play, Pause } from "lucide-react";
import { closest, isLight } from "color-2-name";
import { PixelSquareMatrix, PixelMatrixType } from "./pixel-matrix";

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
  const [pixelMatrix, setPixelMatrix] = useState<PixelMatrixType>([]);
  const [isPaused, setIsPaused] = useState(false);

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

  const togglePlay = () => {
    if (isPaused) {
      videoRef.current?.play();
    } else {
      videoRef.current?.pause();
    }
    setIsPaused((prevState) => !prevState);
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
        const video = videoRef.current;
        const canvas = canvasRef.current;

        // Calculate the scaling factor to fill the canvas
        const scale = Math.max(
          canvas.width / video.videoWidth,
          canvas.height / video.videoHeight
        );

        // Calculate dimensions of the source rectangle
        const srcWidth = canvas.width / scale;
        const srcHeight = canvas.height / scale;
        const srcX = (video.videoWidth - srcWidth) / 2;
        const srcY = (video.videoHeight - srcHeight) / 2;

        // Draw the video frame
        context.drawImage(
          video,
          srcX,
          srcY,
          srcWidth,
          srcHeight, // Source rectangle
          0,
          0,
          canvas.width,
          canvas.height // Destination rectangle
        );

        // Get 7x7 pixel matrix
        const matrix = [];
        for (let y = -3; y <= 3; y++) {
          const row = [];
          for (let x = -3; x <= 3; x++) {
            const pixelData = context.getImageData(
              coordinates.x + x,
              coordinates.y + y,
              1,
              1
            ).data;
            row.push({ color: [pixelData[0], pixelData[1], pixelData[2]] });
          }
          matrix.push(row);
        }
        setPixelMatrix(matrix as PixelMatrixType);

        // Set center pixel color
        const centerPixel = matrix[3][3].color;
        setPixelColor(
          `rgb(${centerPixel[0]}, ${centerPixel[1]}, ${centerPixel[2]})`
        );
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
        <canvas
          ref={canvasRef}
          width="320"
          height="320"
          className="hidden"
        ></canvas>

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
