import { Pixel } from "@/types";
import { isLight, pixelToHex, pixelToX } from "@/utils";
import { ClipboardCopy, Sparkle } from "lucide-react";
import { useState, useEffect } from "react";

interface ColorViewerProps {
  pixel: Pixel;
  mode?: "hex" | "rgb" | "name";
  delay?: number;
}

export function ColorViewer({
  pixel,
  mode = "hex",
  delay = 150,
}: ColorViewerProps) {
  const [copied, setCopied] = useState(false);
  const [value, setValue] = useState(pixelToX(pixel, mode));
  const [lastUpdate, setLastUpdate] = useState(Date.now());

  const pixelColor = pixelToHex(pixel);
  const pixelValue = pixelToX(pixel, mode);

  useEffect(() => {
    if (mode !== "name") {
      setValue(pixelValue);
      return;
    }

    const update = () => {
      setValue(pixelValue);
      setLastUpdate(Date.now());
    };

    // Slow down the update cause jumping words are annoying
    if (Date.now() - lastUpdate >= delay) {
      update();
    } else {
      const timer = setTimeout(update, delay);
      return () => clearTimeout(timer);
    }

    // pixelColor is more sensetive
  }, [pixelValue, mode, delay]);

  const handleClick = () => {
    navigator.clipboard.writeText(value).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 1000);
    });
  };

  return (
    <div
      onClick={handleClick}
      className={`flex w-full justify-center items-center h-12 transition-colors duration-200 ${
        isLight(pixelColor) ? "text-black" : "text-white"
      }`}
      style={{
        backgroundColor: pixelColor,
      }}
    >
      <div className="flex items-center relative">
        <span
          className={`absolute inset-0 flex items-center justify-center transition-opacity duration-200 ${
            copied ? "fade-in" : "fade-out opacity-0"
          }`}
        >
          <Sparkle className="w-5 h-5 pr-3" />
          <ClipboardCopy className="w-5 h-5" />
          <Sparkle className="w-5 h-5 pl-3" />
        </span>

        <span
          className={`font-mono transition-opacity duration-200 ${
            copied ? "fade-out opacity-0" : "fade-in"
          }`}
        >
          {value}
        </span>
      </div>
    </div>
  );
}
