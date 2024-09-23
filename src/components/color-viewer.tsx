import { Pixel } from "@/types";
import { isLight, pixelToHex, pixelToX } from "@/utils";
import { useDebounce } from "@uidotdev/usehooks";
import { ClipboardCopy, Sparkle } from "lucide-react";
import { useState } from "react";

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

  const pixelColor = pixelToHex(pixel);
  const pixelValue = pixelToX(pixel, mode);
  const value =
    mode === "name"
      ? useDebounce(pixelValue, delay)
      : useDebounce(pixelValue, 0);

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
