import { useCallback, useEffect, useRef } from "react";
import { PixelMatrixType } from "@/types";

interface VideoSamplerProps {
  facingMode: "user" | "environment";
  coordinates: { x: number; y: number };
  samplingSquareDimensions?: number;
  onSample: (sample: PixelMatrixType) => void;
  pause: boolean;
}

export function VideoSampler({
  facingMode,
  coordinates,
  samplingSquareDimensions = 7,
  onSample,
  pause = false,
}: VideoSamplerProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    navigator.mediaDevices
      .getUserMedia({ video: { facingMode: facingMode } })
      .then((stream) => {
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
        }
      })
      .catch((error) => {
        console.error("Error accessing video stream:", error);
      });

    // Flip the image horizontally if facingMode is user

    const canvas = canvasRef.current;
    if (!canvas) return;
    const context = canvas.getContext("2d", {
      colorSpace: "display-p3",
      willReadFrequently: true,
    });
    if (!context) return;
    if (facingMode === "user") {
      // I don't have a good explanation for this, but restore() -> save() works
      context.restore();
      context.save();
      context.scale(-1, 1);
      context.translate(-canvas.width, 0);
    } else {
      context.restore();
      context.save();
    }
  }, [facingMode]);

  useEffect(() => {
    if (pause) {
      videoRef.current?.pause();
    } else {
      // TODO: Fix this, play return a promise and we need to wait for it to resolve before we can call play or pause
      videoRef.current?.play();
    }
  }, [pause]);

  const refreshCanvas = useCallback(() => {
    if (!videoRef.current || !canvasRef.current) return;

    const context = canvasRef.current.getContext("2d", {
      colorSpace: "display-p3",
      willReadFrequently: true,
    });
    if (!context) return;

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

    return context;
  }, []);

  const sampleCanvas = useCallback(
    (context: CanvasRenderingContext2D): PixelMatrixType => {
      const canvas = canvasRef.current;
      if (!canvas) return [];

      const rect = canvas.getBoundingClientRect();
      const scaleX = canvas.width / rect.width;
      const scaleY = canvas.height / rect.height;

      const adjustedX = Math.round(coordinates.x * scaleX);
      const adjustedY = Math.round(coordinates.y * scaleY);

      const halfDim = Math.floor(samplingSquareDimensions / 2);
      const matrix = [];
      for (let y = -halfDim; y <= halfDim; y++) {
        const row = [];
        for (let x = -halfDim; x <= halfDim; x++) {
          const pixelData = context.getImageData(
            adjustedX + x,
            adjustedY + y,
            1,
            1
          ).data;
          row.push({ color: [pixelData[0], pixelData[1], pixelData[2]] });
        }
        matrix.push(row);
      }
      return matrix as PixelMatrixType;
    },
    [samplingSquareDimensions, coordinates, canvasRef]
  );

  useEffect(() => {
    let animationFrameId: number;
    let lastFrameTime = 0;
    const fps = 30; // Desired frames per second
    const frameInterval = 1000 / fps; // Minimum time between frames in ms

    const animate = (currentTime: number) => {
      animationFrameId = requestAnimationFrame(animate);

      // Calculate time elapsed since last frame
      const deltaTime = currentTime - lastFrameTime;

      // Only update if enough time has passed
      if (deltaTime >= frameInterval) {
        const context = refreshCanvas();
        lastFrameTime = currentTime - (deltaTime % frameInterval);

        if (!context) return;
        const pixelMatrix = sampleCanvas(context);
        onSample(pixelMatrix);
      }
    };

    animationFrameId = requestAnimationFrame(animate);

    return () => {
      cancelAnimationFrame(animationFrameId);
    };
  }, [refreshCanvas, sampleCanvas]);

  return (
    <div className="relative w-full h-full">
      <video
        ref={videoRef}
        muted
        autoPlay={!pause}
        playsInline
        className="absolute top-0 left-0 w-full h-full object-cover filter-none"
      ></video>
      <canvas
        ref={canvasRef}
        width={
          videoRef.current?.clientWidth
            ? videoRef.current?.clientWidth * (window.devicePixelRatio || 1)
            : videoRef.current?.clientWidth
        }
        height={
          videoRef.current?.clientHeight
            ? videoRef.current?.clientHeight * (window.devicePixelRatio || 1)
            : videoRef.current?.clientHeight
        }
        className="absolute top-0 left-0 w-full h-full object-cover filter-none bg-background"
      ></canvas>
    </div>
  );
}
